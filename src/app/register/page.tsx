// pages/register.tsx
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig"; // Importe o Firestore
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Importe o Firebase Storage

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); // Novo estado para o nome de exibição
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (displayName.length < 1) {
      setError("O nome é Obrigatório");
      return;
    }

    if (!email.includes("@") && !email.includes(".")) {
      setError("Email com formato errado!");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres!");
      return;
    }


    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;

    
      // // // Cria um documento no Firestore para o usuário
      // // await setDoc(doc(db, "users", user.uid), {
      // //   displayName: user.displayName,
      // //   email: user.email,
      // //   createdAt: new Date(),
      // // });

      // Redireciona para a página de login após o registro
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      
      setError("Erro ao registrar o usuário. Verifique os dados e tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastro</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
         
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
