import type { NextPage, NextPageContext } from "next";
import { useEffect, useState } from "react";

interface Tables {
  rows: Array<any>;
}

interface Props {
  tables: Tables;
}
const Sheet: NextPage<Props> = (props) => {
  const [isEditable, setIsEditable] = useState({ row: -1, column: -1 });
  const [newColumnValue, setNewColumnValue] = useState("");
  const { tables } = props;

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

export async function getServerSideProps(context: any) {
  const protocol = context.req.headers.referer?.split("://")[0];

  let data = null;
  if (protocol) {
    const res = await fetch(
      `${protocol}://${context.req.headers.host}/api/sheet`
    );
    data = await res.json();
  }

  return {
    props: {
      tables: data,
    },
  };
}

export default Sheet;
