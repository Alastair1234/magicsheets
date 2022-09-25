import { CommonDataType } from "../types";

export const formateCsvData = (data: CommonDataType[]) => {
  let headings: CommonDataType[] = [];
  const tableData: CommonDataType[] = [];

  data.map((item: any, index) => {
    if (index === 0) {
      headings = item.map((h: any) => ({
        name: h || '',
        title: h.replace(/\_/g, ' ') || ''
      }))
      return;
    }
    const rowIndex = index - 1;
    item.map((d: string, dIndex: number) => {
      const key: string = headings[dIndex].name as string;
      if (!tableData[rowIndex]) {
        tableData[rowIndex] = { id: `${rowIndex}`, [key]: d || '', }
        return;
      }

      tableData[rowIndex][key] = d || ''
    });
  });

  headings = headings.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return { headings, tableData };
}

export const sliceData = (data: CommonDataType[], page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

