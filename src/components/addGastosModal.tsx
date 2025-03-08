import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from '@mdi/js';
import { useState } from "react";

export default function AddGastosModal({ updateExpenseField, dataDocs }: { updateExpenseField: any, dataDocs: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [data, setData] = useState('')
    const [valor, setValor] = useState('')

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                type="button"
            >
                Adicionar Gastos
            </button>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative m-4 p-4 w-[600px] max-w-[90vw] rounded-lg bg-white shadow-sm"
                    >
                        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
                            Gerenciador de Campos
                        </div>
                        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light flex justify-between items-end flex-wrap">
                            <div className="w-[100%] sm:w-[45%] my-2  ">
                                <label className="block text-gray-700 mb-2">Titulo</label>
                                <input type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[45%] my-2  ">
                                <label className="block text-gray-700 mb-2">Descrição</label>
                                <input type="text"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[45%] my-2  ">
                                <label className="block text-gray-700 mb-2">Data</label>
                                <input type="datetime-local"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[45%] my-2  ">
                                <label className="block text-gray-700 mb-2">Cateogira</label>

                                <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                name="categoria" id="categoria" value={categoria}  onChange={(e) => setCategoria(e.target.value)} required>
                                     <option value="">escolha....</option>
                                     {dataDocs && dataDocs.map((item:any, index:any) => (
                                        <option value={item[0]} key={index}>{item[0]}</option>
                                     ))}
                                </select>
                            </div>
                            <div className="w-[100%] sm:w-[45%] my-2  ">
                                <label className="block text-gray-700 mb-2">Valor Gasto</label>
                                <input type="number"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[45%] my-2 ">
                                <button
                                    onClick={() => {
                                        if(titulo === '' && valor === '' && categoria === ''){
                                            return
                                        }
                                        updateExpenseField({titulo, descricao, data, categoria, valor: Number(valor)})
                                        setCategoria('')
                                        setData('')
                                        setDescricao('')
                                        setValor('')
                                        setTitulo('')
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    type="button"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                type="button"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
