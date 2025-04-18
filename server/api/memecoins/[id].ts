import { memecoins } from '../../data'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') 
  const coin = memecoins.find((c) => c.id === id)

  if (!coin) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Memecoin not found',
    })
  }

  return coin
})
