import { defineEventHandler, getRouterParam } from 'h3'
import { memecoins, Memecoin } from "../data";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const coin = memecoins.find((m) => m.id === id)

  if (!coin) {
    return { statusCode: 404, message: 'Memecoin non trouvé' }
  }

  return coin
})