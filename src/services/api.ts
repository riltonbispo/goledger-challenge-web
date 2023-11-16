import axios from 'axios'

export interface ArtistType {
  '@assetType': string
  '@key': string
  '@lastTouchBy': string
  '@lastTx': string
  about: string
  name: string
}

export const getArtists = async () => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/query/search',
      {
        query: {
          selector: {
            '@assetType': 'artist',
          },
        },
      },
    )
    return response.data.result
  } catch (err) {
    console.error('Erro ao buscar artistas:', err)
  }
}
