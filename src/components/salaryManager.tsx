import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

Chart.register(CategoryScale);

export default function SalaryManager({ user, dataDocs, objDocs }: { user: any, dataDocs: any, objDocs: any}) {
    const [dataChart, setDataChart] = useState<any>()

    useEffect(() => {

        if (dataDocs) {         

            const data = {
                labels: dataDocs?.map((item: any) => item[0]),
                datasets: [{
                    label: 'Porcentagem',
                    data: dataDocs?.map((item: any) => item[1][0]),
                    backgroundColor: dataDocs?.map((item: any) => item[1][1]),
                    hoverOffset: 4,
                    borderColor: "black",
                    borderWidth: 1
                }]
            }

            setDataChart(data)
        }

    }, [dataDocs])


    if (!user && !dataDocs && !objDocs) {
        return <p>aguarde....</p>
    }

    return (
        <div>
            <div className="flex flex-col w-[100%] justify-center items-center" >
                <p className="my-4 text-lg" ><strong>Meu Salario Atual:</strong> {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(objDocs?.salario ? objDocs.salario : 0)}</p>

                <div className="mt-4 w-[90%] max-w-[600px]" >
                    <div className=" border-b border-slate-400 flex w-[100%] justify-between my-3">
                        <p className="w-[55%]">Despesas</p>
                        <p className="w-[15%]">%</p>
                        <p className="w-[30%] text-end">Valor</p>

                    </div>
                    {dataDocs?.map((item: any, index: any) => (
                        <div className=" border-b border-slate-300 flex w-[100%] justify-between my-3" key={index}>
                            <p className="w-[55%]">{item[0]}:</p>
                            <p className="w-[15%]">{item[1][0]}%</p>
                            <p className="w-[30%] text-end">{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format((objDocs?.salario * item[1][0]) / 100 || 0)}</p>

                        </div>
                    ))}
                </div>
            </div>
            { dataChart && (<div>
                <Pie
                    data={dataChart}
                    options={{
                        responsive: true, // Permite definir altura e largura manualmente
                        maintainAspectRatio: false, // Impede que o gráfico tente manter proporções fixas
                        plugins: {
                            title: {
                                display: true,
                                text: "Gráfico de Despesas"
                            }
                        }
                    }}
                    width={400} // Define a largura do canvas
                    height={400} // Define a altura do canvas
                />
            </div>)}
        </div >
    );
}
