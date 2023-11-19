'use client'

import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  SelectChangeEvent,
} from '@mui/material'
import { AlbumType, getAlbuns } from '@/services/albunsApi'
import { SongType } from '@/services/songsApi'
import { ArtistType, getArtists } from '@/services/artistsApi'

interface SongCardProps extends SongType {
  deleteAction: (id: string) => void
  updateAction: (bio: string, id: string) => void
}
const SongCard = ({ ...props }: SongCardProps) => {
  const [allAlbuns, setAllAlbuns] = useState<AlbumType[]>([])
  const [allArtists, setAllArtists] = useState<ArtistType[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<string>(
    props.album ? props.album['@key'] : '', // Check if props.album is defined
  )
  const handleChangeAlbum = (
    event: SelectChangeEvent<typeof selectedAlbum>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedAlbum(value as string)
    console.log(selectedAlbum)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAllAlbuns(await getAlbuns())
        setAllArtists(await getArtists())
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Box
      style={{
        flex: '1 1 30ch',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <FormControl fullWidth sx={{ my: 4 }}>
            <InputLabel id="demo-simple-select-label">Album</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedAlbum}
              label="Album"
              onChange={handleChangeAlbum}
            >
              {allAlbuns.map((album) => (
                <MenuItem value={album['@key']} key={album['@key']}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <List>
            {allArtists.map((artist, index) => (
              <ListItem disablePadding key={index}>
                {props.artists && // Check if props.artists is defined
                  props.artists.some((a) => a['@key'] === artist['@key']) &&
                  artist.name}
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button
            color="error"
            onClick={() => props.deleteAction(props['@key'])}
          >
            Delete
          </Button>
          <Button variant="outlined">Save</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default SongCard
