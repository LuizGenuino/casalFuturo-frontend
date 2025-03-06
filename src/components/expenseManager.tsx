
export default function ExpenseManager({ user, dataDocs, objDocs, total }: { user: any, dataDocs: any, objDocs: any, total: any }) {


    if(!user && !dataDocs && !objDocs && !total){
        return <p>aguarde....</p>
    }

    return (
        <div>
            <div className="flex flex-col w-[100%] justify-center items-center" >
                <p className="my-4 text-lg" ><strong>Meu Salario Atual:</strong> {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(objDocs?.salario || 0)}</p>

                <div className="mt-4 w-[90%] max-w-[600px]" >
                <div className=" border-b border-slate-400 flex w-[100%] justify-between my-3">
                            <p className="w-[55%]">Despesas</p>
                            <p className="w-[15%]">%</p>
                            <p className="w-[30%] text-end">Valor</p>

                        </div>
                    {dataDocs?.map((item: any, index: any) => (
                        <div className=" border-b border-slate-300 flex w-[100%] justify-between my-3" key={index}>
                            <p className="w-[55%]">{item[0]}:</p>
                            <p className="w-[15%]">{item[1]}%</p>
                            <p className="w-[30%] text-end">{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format((objDocs?.salario * item[1]) / 100)}</p>

                        </div>
                    ))}
                    {total < 100 && (<div className="border-b border-slate-300 flex w-[100%] justify-around my-3">
                        <p className="w-[55%]">Disponivel:</p>
                        <p className="w-[15%]" >{100 - total}%</p>
                        <p className="w-[30%] text-end" >{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format((objDocs?.salario * (100 - total)) / 100)}</p>
                    </div>)}
                </div>
            </div>
        </div >
    );
}
