export default interface UserData {
  createdAt?: Date;
  displayName?: string;
  email?: string;
  id?: string;
  id_table?: string;
  value_invested?: number;
  [key: string]: any;
}