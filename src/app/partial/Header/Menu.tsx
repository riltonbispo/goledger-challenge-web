import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React from 'react'
import { navItems } from './Header'

const Menu = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              component="a"
              href={`#${item.toLowerCase()}`}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Menu
