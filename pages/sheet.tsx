import type { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";

interface Tables {
  rows: Array<any>;
}

const Sheet: NextPage = () => {
  const [tables, setTables] = useState<Tables>({ rows: [] });
  const [isEditable, setIsEditable] = useState({ row: -1, column: -1 });
  const [newColumnValue, setNewColumnValue] = useState("");

  useEffect(() => {
    async function getAllData() {
      const response = await fetch("/api/sheet");
      const data = await response.json();

      console.log(data);
      setTables(data);
    }

    getAllData();
  }, []);

  console.log(tables);

  const handleEditItem = (row: number, column: number, value: string) => {
    setNewColumnValue(value);
  };

  return (
    <div>
      <table>
        <tbody>
          {tables?.rows?.map((row, indexRow) => (
            <tr key={indexRow}>
              {row.map((column: string, indexColumn: number) => (
                <td
                  style={{ border: "1px solid black" }}
                  onClick={() =>
                    setIsEditable({ row: indexRow, column: indexColumn })
                  }
                  key={indexColumn}
                >
                  {isEditable.row === indexRow &&
                  isEditable.column === indexColumn ? (
                    <input
                      type="text"
                      value={newColumnValue}
                      onChange={({ target }) =>
                        handleEditItem(indexRow, indexColumn, target.value)
                      }
                    />
                  ) : (
                    column
                  )}
                </td>
              ))}
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <input type="text"></input>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sheet;
