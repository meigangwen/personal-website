'use client'

import theme from '@/theme/theme'
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material'
import Header from '@/components/Header'
//import AppCanvas from '@/components/AppCanvas'
//import ShapeToolBox from '@/components/box/ShapeToolBox'

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ mt: 2 }}>
                <Header />
                <Box sx={{ position: 'relative' }}></Box>
            </Container>
        </ThemeProvider>
    )
}
