import { CommonDataType } from "../types";

export const formateCsvData = (data: CommonDataType[]) => {
  let headings: CommonDataType[] = [];
  const tableData: CommonDataType[] = [];

  data.map((item: any, index) => {
    if(index === 0) {
      headings = item.map((h: any) => ({
        name: h || '',
        title: h.replace(/\_/g, ' ') || ''
      }))
      return;
    }
    const rowIndex = index - 1;
    item.map((d: string, dIndex: number) => {
      const key: string = headings[dIndex].name as string;
      if(!tableData[rowIndex]) {
        tableData[rowIndex] = { id: `${rowIndex}`, [key]: d || '', }
        return;
      }

      tableData[rowIndex][key] = d || ''
    });
  });

  return { headings, tableData };
}

export const calculateRange = (data: [], rowsPerPage: number) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

export const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

