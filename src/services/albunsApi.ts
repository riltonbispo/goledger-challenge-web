import axios from 'axios'
import { ArtistType } from './artistsApi'

export interface AlbumType {
  '@assetType': string
  '@key': string
  '@lastTouchBy': string
  '@lastTx': string
  artist: ArtistType
  rating: number
  releaseDate: string
  title: string
}

export const getAlbuns = async () => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/query/search',
      {
        query: {
          selector: {
            '@assetType': 'album',
          },
        },
      },
    )
    return response.data.result
  } catch (err) {
    console.error('Erro ao buscar albuns:', err)
  }
}

export const createAlbum = async (
  artistKey: string,
  rating: number,
  title: string,
) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/createAsset',
      {
        asset: [
          {
            '@assetType': 'album',
            artist: {
              '@assetType': 'artist',
              '@key': artistKey,
            },
            rating,
            releaseDate: '2023-11-14T13:51:00Z',
            title,
          },
        ],
      },
    )
    return response
  } catch (err) {
    console.error('Erro ao criar album:', err)
  }
}

export const deleteAlbum = async (id: string) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/deleteAsset',
      {
        key: {
          '@assetType': 'album',
          '@key': id,
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel deletar esse album')
  }
}

export const updateAlbum = async (id: string, rating: number) => {
  try {
    const response = await axios.put(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/updateAsset',
      {
        update: {
          '@assetType': 'album',
          '@key': id,
          rating,
          releaseDate: '2023-11-14T13:51:00Z',
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel editar esse album')
  }
}
