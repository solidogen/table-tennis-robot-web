import type { NextApiRequest, NextApiResponse } from 'next'
import { SetDiodeStatusRequest } from "../../../../model/SetDiodeStatusRequest"
import { allowMethod } from "../../ApiRouteUtils"
import { InMemoryState } from "../../InMemoryState"

export default async function setDiodeState(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  if (!allowMethod("POST", req, res)) {
    return
  }
  const setDiodeRequest: SetDiodeStatusRequest = req.body

  InMemoryState.setDiodeStateLocal(setDiodeRequest.isChecked)
  res.status(200).json(InMemoryState.getDiodeStateLocal())
}
