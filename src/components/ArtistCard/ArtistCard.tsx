import React from 'react'

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
}

const ArtistCard = ({ title, about }: ArtistCardProps) => {
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
          <TextField
            required
            id="standard-required"
            label="Name"
            defaultValue={title}
            variant="standard"
          />
          <Typography variant="body2" sx={{ marginTop: '2rem' }}>
            {about}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Button color="error">Delete</Button>
          <Button variant="outlined">Save</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default ArtistCard
