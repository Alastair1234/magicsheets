import React from "react";
import { CommonDataType } from "../../types";

interface TableRowType {
  data: CommonDataType;
  headings: CommonDataType[];
  index: number;
  currentPage: number;
  rowsPerPage: number;
}

interface TableCellType {
  label: string
}

const TableCell = ({
  label = ""
}: TableCellType) => {

  return (
    <td className="py-4 px-6">{label}</td>
  )
}

const TableRow = ({
  data = {},
  headings = [],
  index,
  currentPage,
  rowsPerPage
}: TableRowType) => {

  const rowClass = index % 2 == 1 ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700" : "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"
  const itemNo = ((currentPage * rowsPerPage) - rowsPerPage) + (index + 1);

  return (
    <tr className={`${rowClass}`}>
      <TableCell
        label={`${itemNo}`}
      />
      {
        headings.map((h: CommonDataType) =>
          <TableCell
            key={`${data.id}-${h.name}`}
            label={data[h.name as string] as string}
          />
        )
      }
    </tr>
  )
}

export default TableRow;
