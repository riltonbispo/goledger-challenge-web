'use client'

import SongCard from '@/components/SongCard'
import { AlbumType, getAlbuns } from '@/services/albunsApi'
import { ArtistType, getArtists } from '@/services/artistsApi'
import {
  SongType,
  createSong,
  deleteSong,
  getSongs,
  updateSong,
} from '@/services/songsApi'
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

import React, { useEffect, useState } from 'react'

const Page = () => {
  const [inputTitle, setInputTitle] = useState('')
  const [selectedArtists, setSelectedArtists] = useState<ArtistType[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [allArtists, setAllArtists] = useState<ArtistType[]>([])
  const [explicit, setExplicit] = useState(false)
  const [allAlbuns, setAllAlbuns] = useState<AlbumType[]>([])
  const [allSongs, setAllSongs] = useState<SongType[]>([])

  const handleChangeArtists = (
    event: SelectChangeEvent<typeof selectedArtists>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedArtists(value as ArtistType[])
  }

  const handleChangeAlbum = (
    event: SelectChangeEvent<typeof selectedAlbum>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedAlbum(value as string)
  }

  const handleChangeExplicit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked
    setExplicit(newCheckedState)
  }

  const handleDeleteSong = async (id: string) => {
    try {
      await deleteSong(id)
      const updatedSongs = await getAlbuns()
      setAllSongs(updatedSongs)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateSong = async (id: string, album: string) => {
    try {
      await updateSong(id, album)
      const updatedSongs = await getAlbuns()
      setAllSongs(updatedSongs)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateSong = async () => {
    try {
      if (selectedAlbum) {
        const selectedArtistsObjects: ArtistType[] = allArtists.filter(
          (artist) =>
            selectedArtists.includes(artist.name as unknown as ArtistType),
        )
        const selectedAlbumObject = allAlbuns.find(
          (album) => album.title === selectedAlbum,
        )

        if (selectedAlbumObject) {
          await createSong(
            inputTitle,
            selectedArtistsObjects,
            selectedAlbumObject['@key'],
            explicit,
          )
          const updateSongs = await getSongs()
          setAllSongs(updateSongs)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllArtists(await getArtists())
        setAllAlbuns(await getAlbuns())
        setAllSongs(await getSongs())
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
          Create a song
        </Typography>

        <TextField
          id="outlined-basic"
          label="Song Name"
          variant="outlined"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Album</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAlbum}
            label="Artist"
            onChange={handleChangeAlbum}
          >
            {allAlbuns.map((album) => (
              <MenuItem value={album.title} key={album['@key']}>
                {album.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-multiple-name-label">Artists</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedArtists}
            onChange={handleChangeArtists}
            input={<OutlinedInput label="Name" />}
          >
            {allArtists.map((artist) => (
              <MenuItem key={artist['@key']} value={artist.name}>
                {artist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox defaultChecked onChange={handleChangeExplicit} />}
          label="Explicit"
        />

        <Button variant="contained" color="success" onClick={handleCreateSong}>
          Create
        </Button>
      </div>

      <Typography variant="h5" component="h5" sx={{ marginBlock: '3rem' }}>
        All Songs
      </Typography>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'stretch',
        }}
      >
        {allSongs.map((song) => (
          <React.Fragment key={song['@key']}>
            <SongCard
              {...song}
              deleteAction={handleDeleteSong}
              updateAction={handleUpdateSong}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Page
