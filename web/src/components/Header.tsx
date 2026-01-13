'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import MenuIcon from '@mui/icons-material/Menu'
//import Typography from '@mui/material/Typography'
//import ToolButton from '@/components/button/ToolButton'

//import BrushIcon from '@mui/icons-material/Brush'
//import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
//import CategoryIcon from '@mui/icons-material/Category'
type NavItem = {
    label: string
    href: string
}

const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Resume', href: '/resume' },
    { label: 'Portfolio', href: '/portfolio' },
]

function isActivePath(pathname: string, href: string) {
    // Exact match OR nested routes like /projects/xyz
    return (
        pathname === href ||
        (href !== '/' && pathname.startsWith(href + '/'))
    )
}

/*
export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ gap: 2 }}>Mei Gangwen</Toolbar>
        </AppBar>
    )
}*/

export default function HeaderBar() {
    const pathname = usePathname() || '/'
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
        null,
    )
    const open = Boolean(anchorEl)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => setAnchorEl(null)

    return (
        <AppBar position="sticky" elevation={1}>
            <Toolbar sx={{ gap: 2 }}>
                {/* Brand / Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    href="/"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 600,
                        mr: 1,
                    }}
                >
                    MEI GANGWEN
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {/* Desktop nav */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {NAV_ITEMS.map((item) => {
                            const active = isActivePath(
                                pathname,
                                item.href,
                            )
                            return (
                                <Button
                                    key={item.href}
                                    component={Link}
                                    href={item.href}
                                    color="inherit"
                                    // Highlight logic:
                                    variant={active ? 'outlined' : 'text'}
                                    sx={{
                                        borderColor: active
                                            ? 'rgba(255,255,255,0.75)'
                                            : 'transparent',
                                        fontWeight: active ? 700 : 500,
                                    }}
                                >
                                    {item.label}
                                </Button>
                            )
                        })}
                    </Box>
                )}

                {/* Mobile nav */}
                {isMobile && (
                    <>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={handleOpenMenu}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {NAV_ITEMS.map((item) => {
                                const active = isActivePath(
                                    pathname,
                                    item.href,
                                )
                                return (
                                    <MenuItem
                                        key={item.href}
                                        component={Link}
                                        href={item.href}
                                        onClick={handleCloseMenu}
                                        selected={active}
                                    >
                                        {item.label}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}
