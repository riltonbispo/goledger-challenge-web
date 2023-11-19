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

export const getUnicArtist = async (id: string) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/query/readAsset',
      {
        key: {
          '@assetType': 'song',
          '@key': id,
        },
      },
    )
    return response
  } catch (err) {
    console.log(`Não foi possive achar: ${id}`)
  }
}

export const createArtist = async (name: string, about: string) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/createAsset',
      {
        asset: [
          {
            '@assetType': 'artist',
            name,
            about,
          },
        ],
      },
    )
    return response
  } catch (err) {
    console.error('Erro ao criar artistas:', err)
  }
}

export const deleteArtist = async (id: string) => {
  try {
    const response = await axios.post(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/deleteAsset',
      {
        key: {
          '@assetType': 'artist',
          '@key': id,
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel deletar esse artista')
  }
}

export const updateArtist = async (bio: string, id: string) => {
  try {
    const response = await axios.put(
      'http://ec2-54-87-223-191.compute-1.amazonaws.com/api/invoke/updateAsset',
      {
        update: {
          '@assetType': 'artist',
          '@key': id,
          about: bio,
        },
      },
    )
    return response
  } catch (err) {
    alert('Não é possivel editar esse artista')
  }
}
