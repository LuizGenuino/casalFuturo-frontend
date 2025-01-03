'use client'
import { useEffect, useState } from "react";
import { auth } from "@/services/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import Logo from "@/assets/logo.png";
import Woman from "@/assets/Kauane.png";
import Man from "@/assets/Luiz.png"
import InvestmentTable from "@/components/investmentTable";

const navigation = [
  { name: 'Inicio', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Inicio() {
  
  const [user, setUser] = useState<any>(null);  // Estado para armazenar o usuário
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // Armazena as informações do usuário 
      } else {
        router.push("/login");  // Redireciona para a página de login se não houver usuário
      }
      setLoading(false);  // Finaliza o carregamento
    });

    return () => unsubscribe();  // Limpeza do listener quando o componente for desmontado
  }, [router]);

  if (loading) return <p>Carregando...</p>; 

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                <Image src={Logo} alt="Logo" className="size-8" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
            

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image src={user?.displayName === "Luiz Gustavo"? Man : Woman} alt="User" className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                       <MenuItem>
                          <a
                             onClick={async () => {
                              await auth.signOut();
                              router.push("/login"); // Redireciona para a página de login ao sair
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Sair
                          </a>
                        </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                <Image src={user?.displayName === "Luiz Gustavo"? Man : Woman} alt="User" className="size-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">{user?.displayName}</div>
                  <div className="text-sm font-medium text-gray-400">{user?.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    onClick={async () => {
                      await auth.signOut();
                      router.push("/login"); // Redireciona para a página de login ao sair
                    }}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sair
                  </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mapa de Investimento</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <InvestmentTable id_user={user?.uid} />
          </div>
        </main>
      </div>
    </>
  )
}
