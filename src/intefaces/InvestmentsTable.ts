import ItemTable from "./ItemTable";
import UserTable from "./UserTable";

export default interface InvestmentsTable {
  data?: Array<ItemTable>;
  dating_date?: string;
  total_value?: number;
  user_1?: UserTable;
  user_2?: UserTable;
  [key: string]: any;
}
