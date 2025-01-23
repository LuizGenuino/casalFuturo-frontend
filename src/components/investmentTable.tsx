import { useUserAndInvestmentTable } from "@/hooks/useUserAndInvestmentTable";
import ItemTable from "@/intefaces/ItemTable";


const no_marked = "w-24 bg-gray-100 text-gray-800 text-xs font-medium m-2 py-2 rounded border border-gray-500 cursor-pointer"
const marked_user_1 = "w-24 bg-blue-100 text-blue-800 text-xs font-medium m-2 py-2 rounded border border-blue-500 cursor-pointer"
const marked_user_2 = "w-24 bg-pink-100 text-pink-800 text-xs font-medium m-2 py-2 rounded border border-pink-500 cursor-pointer"

export default function InvestmentTable({ id_user }: { id_user: string }) {
  const { userData, investmentTable, loading, error, toggleItem } = useUserAndInvestmentTable(id_user);

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Tabela de Investimentos</h1>

      {/* Carregamento ou erro do usuário */}
      {loading ? (
        <p>Carregando dados do usuário...</p>
      ) : error && (
        <p className="text-red-500">{error}</p>
      )}
      {loading ? (
        <p>Carregando tabela de investimentos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        investmentTable && (
          <div className="mt-4">
            <p className=" text-center" ><strong>Inicio do Namoro:</strong> {investmentTable.dating_date || "Não informado"}</p>

            <div className="flex flex-col md:flex-row justify-between items-center my-6">
              <div className="bg-blue-500 rounded-full p-3 text-white">
                <p>Nome: {investmentTable.user_1?.name}</p>
                <p>Total Investido: {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(investmentTable.user_1?.total_value || 0)}</p>
              </div>
              <div className="my-4 md:my-0" >
                <p>Investimento Atual do Casal: R$ {investmentTable.total_value}</p>
                <p>
                  Investimento Desejado: {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(
                    investmentTable.data && investmentTable.data.length > 0
                      ? (investmentTable.data.length * (investmentTable.data.length + 1)) / 2
                      : (365 * (365 + 1)) / 2
                  )}
                </p>
              </div>
              <div className="bg-pink-500 rounded-full p-3 text-white">
                <p>Nome: {investmentTable.user_2?.name}</p>
                <p>Total Investido: {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(investmentTable.user_2?.total_value || 0)}</p>
              </div>
            </div>

            <div className="flex flex-wrap" >
              {
                investmentTable.data?.map((item, index) => {
                  return (
                    <div key={index}
                      className={!item.marked ? no_marked : item.user_marked === investmentTable.user_1?.id ? marked_user_1 : marked_user_2}
                      onClick={() => toggleItem(index)}
                    >
                      <p className="text-center font-black ">{item.value}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      )}
    </div>
  );
}