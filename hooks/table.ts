import React from "react";
import { CommonDataType } from "../types";
import { sliceData } from "../utils";
import { createPagination } from "../utils/pagination";

export const useTable = (data: CommonDataType[], currentPage: number, rowsPerPage: number) => {
  const [pages, setPages] = React.useState<(number | string)[]>([]);
  const [pageData, setPageData] = React.useState<CommonDataType[]>([]);

  React.useEffect(() => {
    const pagesArray: (number | string)[] = createPagination(currentPage, rowsPerPage, data.length)
    setPages(pagesArray);

    const pData: CommonDataType[] = sliceData(data, currentPage, rowsPerPage);
    setPageData([...pData]);
  }, [data, currentPage, rowsPerPage, setPageData]);


  return { pageData, pages };
};
