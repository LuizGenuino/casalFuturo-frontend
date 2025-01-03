import InvestmentsTable from "@/intefaces/InvestmentsTable";
import ItemTable from "@/intefaces/ItemTable";
import UserData from "@/intefaces/UserData";
import { db } from "@/services/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserAndInvestmentTable = (id_user: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [investmentTable, setInvestmentTable] = useState<InvestmentsTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar os dados do Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", id_user);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) throw new Error("Usuário não encontrado.");
      const userData = userSnapshot.data() as UserData;
      setUserData(userData);

      if (!userData.id_table) throw new Error("ID da tabela de investimentos não definido.");

      const tableDoc = doc(db, "investimentos", userData.id_table);
      const tableSnapshot = await getDoc(tableDoc);

      if (!tableSnapshot.exists()) throw new Error("Tabela de investimento não encontrada.");
      setInvestmentTable(tableSnapshot.data() as InvestmentsTable);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados.");
    } finally {
      setLoading(false);
    }
  };

  // Atualizar tabela no Firestore
  const updateTableInFirestore = async (updatedTable: InvestmentsTable) => {
    if (userData?.id_table) {
      try {
        const tableDoc = doc(db, "investimentos", userData.id_table);
        await updateDoc(tableDoc, updatedTable);
      } catch (error) {
        console.error("Erro ao atualizar tabela no Firestore:", error);
      }
    }
  };

  // Atualizar item específico na tabela
  const toggleItem = (index: number) => {
    if (!investmentTable || !userData) return;

    const updatedTable = { ...investmentTable };
    const updatedData = [...(updatedTable.data || [])];
    const item = updatedData[index];

    if (!item) return;

    if (!item.marked) {
      item.marked = true;
      item.user_marked = userData.id;
      updatedTable.total_value = (updatedTable.total_value || 0) + item.value;

      if (updatedTable.user_1 && updatedTable.user_1?.id === userData.id) {
        updatedTable.user_1.total_value = (updatedTable.user_1.total_value || 0) + item.value;
      } else if (updatedTable.user_2 && updatedTable.user_2?.id === userData.id) {
        updatedTable.user_2.total_value = (updatedTable.user_2.total_value || 0) + item.value;
      }
    } else if (item.user_marked === userData.id) {
      item.marked = false;
      item.user_marked = null;
      updatedTable.total_value = (updatedTable.total_value || 0) - item.value;

      if (updatedTable.user_1 && updatedTable.user_1?.id === userData.id) {
        updatedTable.user_1.total_value = (updatedTable.user_1.total_value || 0) - item.value;
      } else if (updatedTable.user_2 && updatedTable.user_2?.id === userData.id) {
        updatedTable.user_2.total_value = (updatedTable.user_2.total_value || 0) - item.value;
      }
    } else {
      return;
    }

    updatedData[index] = item;
    updatedTable.data = updatedData;
    setInvestmentTable(updatedTable);
    updateTableInFirestore(updatedTable);
  };

  useEffect(() => {
    fetchData();
  }, [id_user]);

  return {
    userData,
    investmentTable,
    loading,
    error,
    toggleItem,
  };
};
