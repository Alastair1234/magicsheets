// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method==='GET'){
    res.status(200).json({ name: 'Testing' })
    
    } else if(req.method==='POST'){
      console.log(console.log(req.body.row));
      res.status(200);  
    }
}
