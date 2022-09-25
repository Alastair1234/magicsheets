// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

type Table = {
  rows: Array<any>;
};

const table: Table = {
  rows: [],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Table>
) {
  if (req.method === "GET") {
    res.status(200).json(table);
  } else if (req.method === "POST") {
    const newTable = JSON.parse(req.body).rows;
    console.log(JSON.parse(req.body).rows);
    table.rows.push(...newTable);
    res.status(200);
  }
}
