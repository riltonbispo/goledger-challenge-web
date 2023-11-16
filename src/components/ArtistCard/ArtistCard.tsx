'use client'

import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

type ArtistCardProps = {
  title: string
  about: string
  id: string
  deleteAction: (id: string) => void
  updateAction: (bio: string, id: string) => void
}

const ArtistCard = ({
  title,
  about,
  id,
  deleteAction,
  updateAction,
}: ArtistCardProps) => {
  const [inputBio, setInputBio] = useState('')

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
            {title}
          </Typography>

          <TextField
            label="About"
            id="outlined-multiline-static"
            multiline
            fullWidth
            sx={{ marginTop: '2rem' }}
            defaultValue={about}
            variant="standard"
            onChange={(e) => setInputBio(e.target.value)}
          />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button color="error" onClick={() => deleteAction(id)}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => updateAction(inputBio, id)}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default ArtistCard
