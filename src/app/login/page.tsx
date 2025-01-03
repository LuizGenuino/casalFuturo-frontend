// pages/login.tsx
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Importando Firestore
import Image from 'next/image';
import Logo from "@/assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const db = getFirestore(); // Instanciando o Firestore

  // Função de login com email e senha
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@") && !email.includes(".")) {
      setError("Email com formato errado!");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/inicio"); // Redireciona após login
    } catch (err: any) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  // Função de login com Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Verifica se é o primeiro login e cria a coleção no Firestore
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc); // Usando getDoc ao invés de get()

      if (!userSnapshot.exists()) {
        // Criar a coleção no Firestore com as informações do usuário
        await setDoc(userDoc, {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
      }

      router.push("/inicio"); // Redireciona após login com Google
    } catch (err: any) {
      setError("Erro ao fazer login com o Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <Image src={Logo} alt="Logo" className="mb-4" />
        <form onSubmit={handleLogin}>
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
          >
            Entrar
          </button>
        </form>
        {/* <p className="text-sm text-gray-600 mt-4 text-center">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Cadastre-se
          </a>
        </p>
        <p className="text-center">ou</p>
        Botão de login com Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
