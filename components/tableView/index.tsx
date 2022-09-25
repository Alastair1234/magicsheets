import React from "react";
import Pagination from './pagination';
import TableRow from './tableRow';
import { AppContext, AppContextType } from "../../context/appContext";
import { useTable } from "../../hooks/table";

const TableView = () => {
  const { headings = [], tableData } = React.useContext(AppContext) as AppContextType
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const { pageData, pages } = useTable(tableData, page, rowsPerPage);

  const handleSetPage = (selectedPage: number) => {
    window.scrollTo(0, 0);
    setPage(selectedPage);
  }
  
  const handleSetRowsPerPage = (pageRowNum: number) => {
    setRowsPerPage(pageRowNum);
    handleSetPage(1);
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto relative">
        {
          !tableData.length &&
          <h2 className="mt-2">No data found upload CSV and try again</h2>
        }
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">#</th>
              {
                headings.map((item, index) =>
                  <th key={index} scope="col" className="py-3 px-6">{item.title}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              pageData.map((item, index) =>
                <TableRow
                  headings={headings}
                  data={item}
                  key={index}
                  index={index}
                  currentPage={page}
                  rowsPerPage={rowsPerPage}
                />
              )
            }
          </tbody>
        </table>

      </div>
      <Pagination
        rowsPerPage={rowsPerPage}
        totalItem={tableData.length}
        setPage={handleSetPage}
        currentPage={page}
        pages={pages}
        setRowsPerPage={handleSetRowsPerPage}
      />
    </div>
  )
}

export default TableView;
