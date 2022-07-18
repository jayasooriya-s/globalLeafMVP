import type { NextApiRequest, NextApiResponse } from "next";
import branch_1 from "../../../assets/branch_1.json";
import branch_2 from "../../../assets/branch_2.json";
import branch_3 from "../../../assets/branch_3.json";
type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.query.id) {
    case "1":
      res.status(200).json(branch_1);
      break;
    case "2":
      res.status(200).json(branch_2);
      break;
    case "3":
      res.status(200).json(branch_3);
      break;
  }
}
