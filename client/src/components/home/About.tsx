import { Box, styled, Typography } from '@mui/material'

const List = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
}))

export function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        gap: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h5' sx={{ color: 'text.primary' }}>
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          textAlign: 'left',
          maxWidth: 400,
          color: 'text.primary',
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant='body1'>
          A website to view scores from official BWF tournaments.
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Note that this site is not affiliated with BWF in any way.
        </Typography>

        <Typography variant='body1'>Current features:</Typography>
        <List>
          <Typography variant='body1'>
            ✅ Tournament info, results, and brackets
          </Typography>
          <Typography variant='body1'>✅ Official rankings</Typography>
        </List>
        <Typography variant='body1'>Upcoming features:</Typography>
        <List>
          <Typography variant='body1'>
            ⏳ Player profiles and match history
          </Typography>
        </List>
      </Box>
    </Box>
  )
}
