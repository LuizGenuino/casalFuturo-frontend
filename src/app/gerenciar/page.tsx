'use client'

import Header from "@/components/header";
import InputsModal from "@/components/inputsModal";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ExpenseManager from "@/components/expenseManager";
import AddGastosModal from "@/components/addGastosModal";



export default function Gerenciar() {
  const [user, setUser] = useState<any>(null);
  const [userRef, setUserRef] = useState<any>(null);
  const [dataDocs, setDataDocs] = useState<any>(null);
  const [objDocs, setObjDocs] = useState<any>(null);
  const [total, setTotal] = useState(0)
  const [gastoDocs, setGastoDocs] = useState<any>(null);
  const [totalGasto, setTotalGasto] = useState(0)
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

      getUserData(user.uid)

    }
  }, [user])

  useEffect(() => {

    if (userRef) {
      getExpenseData()
    }
  }, [userRef])



  const createOrGetUserDocument = async (userId: string) => {
    const userRef = doc(db, "gerenciar", userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {})
    }
    return userRef
  }

  const getUserData = async (userId: string) => {
    const userRef = doc(db, "organizacao", userId);
    const docSnap = await getDoc(userRef);
    let soma = 0

    if (docSnap.exists()) {
      let array: any = Object.entries( docSnap.data() || {}).filter((item: any) => item[0] !== 'salario');

      array.forEach((element: any) => { 
        soma += element[1]
      });    
      setObjDocs(docSnap.data())
      setDataDocs(array);
      setTotal(soma)  
      
    }
  };
  const getExpenseData = async () => {
    const docSnap = await getDoc(userRef);
    let soma = 0

    if (docSnap.exists()) {
      let array: any = Object.entries( docSnap.data() || {})

      array.forEach((element: any) => { 
        soma += element[1]?.valor
      });    
      setGastoDocs(docSnap.data())
      setTotalGasto(soma)  
      
    }
  };


  const updateExpenseField = async (obj: object) => {

    await updateDoc(userRef, {
      [ Object.keys(gastoDocs || {}).length  || 0]: obj
    });

    await getExpenseData()
  };

  const deleteUserField = async (item: string) => {
    await updateDoc(userRef, {
      [item]: deleteField()
    });

    await getExpenseData()
  };


  if (!user && !dataDocs && !objDocs ) return <p>aguarde....</p>

  
  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gerenciar Gastos</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <AddGastosModal updateExpenseField={updateExpenseField} dataDocs={dataDocs} />
            <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light mt-6">
                  {/* <ExpenseManager dataDocs={dataDocs} objDocs={objDocs} total={total} user={user} /> */}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
