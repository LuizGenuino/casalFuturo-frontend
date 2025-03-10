'use client'

import Header from "@/components/header";
import InputsModal from "@/components/inputsModal";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SalaryManager from "@/components/salaryManager";


const coresPieChart = [
  "#FF6384", // rosa avermelhado
  "#36A2EB", // azul
  "#FFCE56", // amarelo
  "#4BC0C0", // turquesa
  "#9966FF", // roxo
  "#FF9F40", // laranja
  "#C9CBCF", // cinza claro
  "#FFCD56", // amarelo pastel
  "#4D5360", // cinza escuro
  "#8BC34A", // verde limão
  "#F06292", // rosa claro
  "#BA68C8", // lilás
  "#7986CB", // azul violeta
  "#4DB6AC", // verde água
  "#FFD54F", // amarelo dourado
  "#A1887F", // marrom claro
  "#90A4AE", // cinza azulado
  "#E57373", // vermelho claro
  "#81C784", // verde claro
  "#64B5F6"  // azul claro
];



export default function Organize() {
  const [user, setUser] = useState<any>(null);
  const [userRef, setUserRef] = useState<any>(null);
  const [dataDocs, setDataDocs] = useState<any>(null);
  const [objDocs, setObjDocs] = useState<any>(null);
  const [total, setTotal] = useState(0)
  const [salario, setSalario] = useState('')
  const db = getFirestore()
  const auth = getAuth()


  useEffect(() => {
    const userData = localStorage.getItem("casalInvest_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {

    if (user) {
      createOrGetUserDocument(user.uid).then((data) => {
        setUserRef(data)
      })

    }
  }, [user])

  useEffect(() => {

    if (userRef) {
      getUserData()
    }
  }, [userRef])



  const createOrGetUserDocument = async (userId: string) => {
    const userRef = doc(db, "organizacao", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {"Disponivel": [100, coresPieChart[0]]})
    }
    return userRef
  }

  const getUserData = async () => {
    const docSnap = await getDoc(userRef);
    let soma = 0

    if (docSnap.exists()) {
      let array: any = Object.entries( docSnap.data() || {}).filter((item: any) => item[0] !== 'salario');

      array.forEach((element: any) => {
        if(element[0] !== "Disponivel") 
        soma += element[1][0]
      });    
      setObjDocs(docSnap.data())
      setDataDocs(array);
      setTotal(soma)  
      
    }
  };


  const updateUserField = async (field: string, value: number) => {
    await updateDoc(userRef, {
      [field]:field === 'salario'? value : [ value, coresPieChart[dataDocs.length || 0]]
    });

    if(field !== 'salario'){  
      await updateDoc(userRef, {
        ["Disponivel"]: [( 100 - (total + value)),  coresPieChart[0]]
      });
    }

    await getUserData()
  };

  const deleteUserField = async (field: string, value: any) => {
    await updateDoc(userRef, {
      [field]: deleteField()
    });

    if(field !== 'salario'){
      await updateDoc(userRef, {
        ["Disponivel"]: [ (100 - (total - value[0])),  coresPieChart[0]]
      });
    }
  
    await getUserData()
  };

  const operation = (op: string, field: string, value: any) => {
    if (op === "update") {
      updateUserField(field, value)
    }

    if (op === "delete") {
      deleteUserField(field, value)
    }
  }

  if (!user && !dataDocs && !objDocs ) return <p>aguarde....</p>

  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Organizador de Salário</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <InputsModal operation={operation} dataDocs={dataDocs} total={total} />
            <div className="w-[100%] flex justify-around sm:justify-center items-end mt-4 sm:mt-0" >
              <div className="w-[70%] sm:w-[40%] mr-2">
                <label className="block text-gray-700">Atualizar Salario</label>
                <input type="number"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="w-[20%] sm:w-[25%] ">
                <button
                  onClick={() => {
                    if(salario === ""){
                      return
                    }
                    operation("update", 'salario', Number(salario))
                    setSalario('')

                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  type="button"
                >
                  Salvar
                </button>
              </div>
            </div>

            <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light mt-6">
                  <SalaryManager dataDocs={dataDocs} objDocs={objDocs} user={user} />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
