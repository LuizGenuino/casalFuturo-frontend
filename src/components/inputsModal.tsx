import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from '@mdi/js';
import { useState } from "react";

export default function InputsModal({ user, operation, dataDocs, total }) {
    const [isOpen, setIsOpen] = useState(false);
    const [field, setField] = useState('')
    const [value, setValue] = useState('')

    console.log(dataDocs);
    
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                type="button"
            >
                Gerenciar Campos
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
                            <div className="w-[100%] sm:w-[40%] mb-4  sm:mb-1">
                                <label className="block text-gray-700 mb-2">Campo</label>
                                <input type="text"
                                    value={field}
                                    onChange={(e) => setField(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[30%] mb-4  sm:mb-1">
                                <label className="block text-gray-700 mb-2">Valor (1% - 100%)</label>
                                <input type="number"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-[100%] sm:w-[25%] mb-4 sm:mb-1">
                                <button
                                    onClick={() => {
                                        operation("update", field, Number(value))
                                        setField('')
                                        setValue('')
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                    type="button"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                            {dataDocs.map((item, index) => (
                                <div className="flex w-[100%] justify-around" key={index}>
                                    <p className="w-[100%]">{item[0]}:</p>
                                    <p className="w-[50px]">{item[1]}%</p>
                                    <p className="w-[50px]">
                                        {/* <button className="bg-green-400 p-1 rounded mr-1">
                                            <Icon path={mdiPencil}
                                                size={0.8}
                                                horizontal
                                                vertical
                                                rotate={90}
                                                color="green" />
                                        </button> */}
                                        <button className="bg-red-400 p-1 rounded"
                                            onClick={()=> operation('delete', item[0], item[1])}
                                        >
                                            <Icon path={mdiTrashCan}
                                                size={0.8}
                                                color="red" />
                                        </button>
                                    </p>

                                </div>
                            ))}
                            {total < 100 && (<div className="flex w-[100%] justify-around">
                                <p className="w-[100%]" >Disponivel:</p>
                                <p className="w-[50px]" >{100 - total}%</p>
                                <p className="w-[50px]" ></p>
                            </div>)}
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
