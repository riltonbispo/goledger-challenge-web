'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import { Logo } from './style'
import Menu from './Menu'
import { Button, Link } from '@mui/material'

interface Props {
  window?: () => Window
}

const drawerWidth = 240
export const navItems = ['Home', 'Category', 'About', 'Contact']

export default function DrawerAppBar(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
        >
          <Logo src="/goledger.png" alt="" />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: '#4a5568' }} />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`}>
                <Button sx={{ color: '#4a5568' }}>{item}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        component={'nav'}
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Menu />
      </Drawer>
    </Box>
  )
}
