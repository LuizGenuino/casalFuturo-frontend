export default interface ItemTable {
    marked?: boolean;
    user_marked?: string | null;
    value: number;
    [key: string]: any;
  }