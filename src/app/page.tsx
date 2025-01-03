// src/app/page.tsx
'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function HomePage(){
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Se o usuário está logado, redireciona para a página de início
        router.push("/inicio");
      } else {
        // Se o usuário não está logado, redireciona para a página de login
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  // Exibir um carregando enquanto verifica o estado de autenticação
  if (loading) return <p>Carregando...</p>;

  return null;
};
