'use client'

import AddToHomeScreen from "@/components/AddToHomeScreen";
import Header from "@/components/header";
import InvestmentTable from "@/components/investmentTable";
import { useEffect, useState } from "react";



export default function Inicio() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("casalInvest_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
  },[])

  return (
    <>
      <div className="min-h-full">
        <Header />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mapa de Investimento</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {user?.uid && <InvestmentTable id_user={user?.uid} />}
          </div>
        </main>
      </div>
      <AddToHomeScreen />
    </>
  )
}
