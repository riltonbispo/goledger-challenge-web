'use client'

import React, { useEffect, useState } from 'react'
import ArtistCard from '@/components/ArtistCard'
import { Button, TextField, Typography } from '@mui/material'
import {
  getArtists,
  ArtistType,
  createArtist,
  deleteArtist,
  updateArtist,
} from '@/services/artistsApi'

const Page = () => {
  const [artists, setArtists] = useState<ArtistType[]>([])
  const [inputName, setInputName] = useState('')
  const [inputBio, setInputBio] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ArtistType[] = await getArtists()
        setArtists(data)
      } catch (error) {
        console.error('Error fetching artists:', error)
      }
    }

    fetchData()
  }, [])

  const handleCreateArtist = async () => {
    try {
      await createArtist(inputName, inputBio)
      const updatedArtists: ArtistType[] = await getArtists()
      setArtists(updatedArtists)
    } catch (error) {
      console.error('Error creating artist:', error)
    }
  }

  const handleDeleteArtist = async (id: string) => {
    try {
      await deleteArtist(id)
      const updatedArtists: ArtistType[] = await getArtists()
      setArtists(updatedArtists)
    } catch (error) {
      console.error('Error deleting artist:', error)
    }
  }

  const handleUpdateArtist = async (bio: string, id: string) => {
    try {
      await updateArtist(bio, id)
      const updatedArtists: ArtistType[] = await getArtists()
      setArtists(updatedArtists)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          maxWidth: '500px',
          gap: '2rem',
        }}
      >
        <Typography variant="h6" component="h6">
          Create a artist
        </Typography>

        <TextField
          id="outlined-basic"
          label="Artist Name"
          variant="outlined"
          onChange={(e) => setInputName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Artist Bio"
          multiline
          rows={3}
          onChange={(e) => setInputBio(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateArtist}
        >
          Create
        </Button>
      </div>

      <Typography variant="h5" component="h5" sx={{ marginBlock: '3rem' }}>
        All Artists
      </Typography>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'stretch',
        }}
      >
        {artists.map((artist) => (
          <React.Fragment key={artist['@key']}>
            <ArtistCard
              title={artist.name}
              about={artist.about}
              id={artist['@key']}
              deleteAction={handleDeleteArtist}
              updateAction={handleUpdateArtist}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Page
