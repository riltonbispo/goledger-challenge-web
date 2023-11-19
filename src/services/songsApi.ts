import axios from 'axios'
import { ArtistType } from './artistsApi'

export type SongArtist = {
  '@assetType': string
  '@key': string
}

export type SongAlbum = {
  '@assetType': string
  '@key': string
}

export interface SongType {
  '@assetType': string
  '@key': string
  '@lastTouchBy': string
  '@lastTx': string
  album: SongAlbum
  artists: SongArtist[]
  explicit: boolean
  title: string
}

export const getSongs = async () => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/query/search',
      {
        query: {
          selector: {
            '@assetType': 'song',
          },
        },
      },
    )
    return response.data.result
  } catch (err) {
    console.log('Erro ao buscar songs:', err)
  }
}

export const createSong = async (
  title: string,
  artists: ArtistType[],
  album: string,
  explicit: boolean,
) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/createAsset',
      {
        asset: [
          {
            '@assetType': 'song',
            title,
            artists: artists.map((artist) => ({
              '@assetType': 'artist',
              '@key': artist['@key'],
            })),
            album: {
              '@assetType': 'album',
              '@key': album,
            },
            explicit,
          },
        ],
      },
    )
    return response
  } catch (err) {
    console.log('Não foi possivel criar song: ', err)
  }
}

export const deleteSong = async (id: string) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/deleteAsset',
      {
        key: {
          '@assetType': 'song',
          '@key': id,
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel deletar esse artista')
  }
}

export const updateSong = async (id: string, album: string) => {
  try {
    const response = await axios.put(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/updateAsset',
      {
        update: {
          '@assetType': 'song',
          '@key': id,
          album: {
            '@assetType': 'album',
            '@key': album,
          },
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel editar esse artista')
  }
}
