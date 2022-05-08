import type { NextApiRequest, NextApiResponse } from 'next'
import { allowMethod } from "../ApiRouteUtils"
import { InMemoryState } from './../InMemoryState'

export default async function getDiodeState(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  if (!allowMethod("GET", req, res)) {
    return
  }
  res.status(200).json(InMemoryState.getDiodeStateLocal())
}
