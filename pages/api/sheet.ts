// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

type Table = {
  rows: Array<any>;
};

let table: Table = {
  rows: [],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Table>
) {
  if (req.method === "GET") {
    res.status(200).json(table);
  } else if (req.method === "POST") {
    let newRows = JSON.parse(req.body).rows;
    table.rows.push(...newRows);
    console.log(table);
    res.status(200);
  }
}
