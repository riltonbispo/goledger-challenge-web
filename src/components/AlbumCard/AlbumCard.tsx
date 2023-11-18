'use client'

import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
} from '@mui/material'
import React, { useState } from 'react'

type AlbumCardProps = {
  title: string
  id: string
  rating: number
  deleteAction: (id: string) => void
  updateAction: (id: string, rating: number) => void
}

const AlbumCard = ({ ...props }: AlbumCardProps) => {
  const [ratingValue, setRatingValue] = useState<number>(props.rating)

  const handleRatingChange = (newValue: number | null) => {
    setRatingValue(newValue || 0)
  }

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
          <Typography component="legend" sx={{ marginBlock: 1 }}>
            Rating
          </Typography>
          <Rating
            name="customized-10"
            max={10}
            value={ratingValue}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button color="error" onClick={() => props.deleteAction(props.id)}>
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={() => props.updateAction(props.id, ratingValue)}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default AlbumCard
