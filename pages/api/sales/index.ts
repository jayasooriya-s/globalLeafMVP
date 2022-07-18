import type { NextApiRequest, NextApiResponse } from "next";
import branch_1 from "../../../assets/branch_1.json";
import branch_2 from "../../../assets/branch_2.json";
import branch_3 from "../../../assets/branch_3.json";
type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([branch_1, branch_2, branch_3]);
}
