import React from "react";
import TableFooter from './tableFooter';
import { AppContext, AppContextType } from "../../context/appContext";
import { calculateRange, sliceData } from "../../utils";

const TableCell = ({
  label = ""
}) => {

  return (
    <td>{label}</td>
  )
}

const TableRow = ({
  data = {},
  headings = []
}: any) => {

  return (
    <tr>
      {
        headings.map(h =>
          <TableCell
            key={`${data.id}-${h.name}`}
            label={data[h.name]}
          />
        )
      }
    </tr>
  )
}


const TableView = () => {
  const { headings = [], tableData } = React.useContext(AppContext) as AppContextType
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const { slice, range, totalPages } = useTable(tableData, page, rowsPerPage);
  const sss = tableData.length ? [tableData[1], tableData[2]] : []
  console.log(">>>>>", slice, range)

  const handlePagination = (event) => {
    setPage(event.target.value)
  }

  return (
    <div className="table-view-wrapper">
      <table className="table-auto">
        <thead>
          <tr>
            {
              headings.map((item, index) =>
                <th key={index}>{item.title}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
            {
              slice.map((item, index) =>
                <TableRow headings={headings} data={item} key={index} />
              )
            }
        </tbody>
      </table>
      {/* <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
      /> */}
    </div>
  )
}


const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = React.useState([]);
  const [slice, setSlice] = React.useState([]);

  React.useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice: [] = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  const totalPages = Math.ceil(tableRange.length / rowsPerPage)

  return { slice, range: tableRange, totalPages };
};


// export default useTable;

export default TableView;
