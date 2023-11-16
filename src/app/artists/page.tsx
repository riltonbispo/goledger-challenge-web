import React from 'react'
import ArtistCard from '@/components/ArtistCard'
import { Button, TextField } from '@mui/material'
import { getArtists, ArtistType } from '@/services/api'

const Page = async () => {
  const artists: ArtistType[] = await getArtists()
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
        <TextField id="outlined-basic" label="Artist Name" variant="outlined" />
        <TextField
          id="outlined-multiline-static"
          label="Artist Bio"
          multiline
          rows={3}
        />
        <Button variant="contained" color="success">
          Create
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'stretch',
          marginTop: '4rem',
        }}
      >
        {artists.map((artist) => (
          <React.Fragment key={artist['@key']}>
            <ArtistCard
              title={artist.name}
              about={artist.about}
              id={artist['@key']}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default Page
