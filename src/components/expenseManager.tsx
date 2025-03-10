import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

Chart.register(CategoryScale);

export default function ExpenseManager({ user, dataDocs, objDocs, gastoDocs, totalGasto }: { user: any, dataDocs: any, objDocs: any, gastoDocs: any, totalGasto: any }) {
    const [dataChart, setDataChart] = useState<any>()
    const [expenseList, setExpenseList] = useState<any>()
    const [month, setMonth] = useState(0)

    useEffect(() => {

        if (dataDocs) {
            console.log(dataDocs);
            
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

        if (gastoDocs) {
            console.log(gastoDocs);
            const array = Object.entries(gastoDocs).filter((item: any) => {
                const currentDate = new Date().getMonth()
                const expenseDate = new Date(item[1].data).getMonth()
                return expenseDate === currentDate && item
            })
            setExpenseList(array)

        }

    }, [gastoDocs, month])


    if (!user && !dataDocs && !gastoDocs && !totalGasto) {
        return <p>aguarde....</p>
    }

    return (
        <div>
            <div className="flex flex-col w-[100%] justify-center items-center border-2 rounded-lg p-2" >
                {expenseList && expenseList.map((item: any, index: any) => {
                    const bgColor = `bg-[${item[1].categoria[0]}]`
                    
                    return (
                    <div key={index} className="border-b flex flex-col w-[100%]  p-2">
                        <div className="flex flex-row justify-between">
                            <p className="text-xl font-bold" >{item[1].titulo}</p>
                            <p className="bg-green-200 text-green-900 me-2 px-3 py-1 rounded-lg text-base font-bold">{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(item[1].valor || 0)}</p>
                        </div>
                        <p >{item[1].descricao}</p>
                        <div className="flex flex-row justify-between" >
                            <p className={`${bgColor} text-white me-2 px-3 py-1 rounded-lg`} >{item[1].categoria[0]}</p>
                            <p >{new Intl.DateTimeFormat("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }).format(new Date(item[1].data))}</p>
                        </div>

                    </div>
                )})}
            </div>
            {dataChart && (<div>
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
