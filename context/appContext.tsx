import * as React from 'react';
import { CommonDataType } from '../types';

export type AppContextType = {
  headings: CommonDataType[]
  tableData: CommonDataType[]
  setCsvData: (newData: CommonDataType[], tableHeadings: CommonDataType[]) => void;
  addCsvData: (newData: CommonDataType) => void;
  // updateCsvData: (id: number) => void;
};


export const AppContext = React.createContext<AppContextType | null>(null);

interface AppProviderType {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderType) => {
  const [tableData, setData] = React.useState<CommonDataType[]>([]);
  const [headings, setHeadings] = React.useState<CommonDataType[]>([]);
  const setCsvData = (newData: CommonDataType[], tableHeadings: CommonDataType[]) => {
    setData(newData);
    setHeadings(tableHeadings)
  };
  const addCsvData = (newItem: CommonDataType) => {
    setData([...tableData, newItem]);
  };

  return (
    <AppContext.Provider value={{ headings, tableData, setCsvData, addCsvData }}>
      {children}
    </AppContext.Provider>
  );

};
