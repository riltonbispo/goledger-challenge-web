'use client'

import AlbumCard from '@/components/AlbumCard'
import {
  AlbumType,
  createAlbum,
  deleteAlbum,
  getAlbuns,
  updateAlbum,
} from '@/services/albunsApi'
import { ArtistType, getArtists } from '@/services/artistsApi'
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Rating,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [allArtists, setAllArtists] = useState<ArtistType[]>([])
  const [selectArtist, setSelectArtist] = useState('')
  const [albuns, setAlbuns] = useState<AlbumType[]>([])
  const [inputTitle, setInputTitle] = useState('')
  const [ratingValue, setRatingValue] = useState<number>(0)

  const handleRatingChange = (newValue: number | null) => {
    setRatingValue(newValue || 0)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectArtist(event.target.value as string)
  }

  const handleCreateAlbum = async () => {
    try {
      if (selectArtist) {
        const artist = allArtists.find((artist) => artist.name === selectArtist)
        if (artist) {
          await createAlbum(artist['@key'], ratingValue, inputTitle)
          const updatedAlbuns = await getAlbuns()
          setAlbuns(updatedAlbuns)
          setInputTitle('')
          setRatingValue(0)
          setSelectArtist('')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteAlbum = async (id: string) => {
    try {
      await deleteAlbum(id)
      const updatedAlbuns = await getAlbuns()
      setAlbuns(updatedAlbuns)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateAlbum = async (id: string, rating: number) => {
    try {
      await updateAlbum(id, rating)
      const updatedAlbuns = await getAlbuns()
      setAlbuns(updatedAlbuns)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllArtists(await getArtists())
        const albumData: AlbumType[] = await getAlbuns()
        setAlbuns(albumData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

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
          Create a album
        </Typography>

        <TextField
          id="outlined-basic"
          label="Album Name"
          variant="outlined"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Artist</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectArtist}
            label="Artist"
            onChange={handleChange}
          >
            {allArtists.map((artist) => (
              <MenuItem value={artist.name} key={artist['@key']}>
                {artist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ marginInline: 'auto' }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="customized-10"
            max={10}
            value={ratingValue}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
        </div>
        <Button variant="contained" color="success" onClick={handleCreateAlbum}>
          Create
        </Button>
      </div>

      <Typography variant="h5" component="h5" sx={{ marginBlock: '3rem' }}>
        All Albuns
      </Typography>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'stretch',
        }}
      >
        {albuns.map((album) => (
          <React.Fragment key={album['@key']}>
            <AlbumCard
              title={album.title}
              id={album['@key']}
              rating={album.rating}
              deleteAction={handleDeleteAlbum}
              updateAction={handleUpdateAlbum}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Page
