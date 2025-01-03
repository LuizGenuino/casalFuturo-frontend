import ItemTable from "@/intefaces/ItemTable";

export const generateDataArray = (): ItemTable[] => 
    Array.from({ length: 365 }, (_, i) => ({
      marked: false,
      user_marked: null,
      value: i + 1,
    }));
  