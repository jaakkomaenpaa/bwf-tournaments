import { Match } from '@/types/match'
import { formatTime } from '@/utils/dates'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router'

type InfoFieldProps = {
  match: Match
  isPartOfTeamMatch?: boolean
  minimalistic?: boolean
}

export function InfoField({
  match,
  isPartOfTeamMatch = false,
  minimalistic = false,
}: InfoFieldProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {!match.oopRound && !isPartOfTeamMatch && !minimalistic && (
        <Typography variant='matchInfo' sx={{ color: 'text.primary' }}>
          {formatTime(new Date(match.matchTime))}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {isPartOfTeamMatch ? (
          <Typography variant='matchInfo' sx={{ color: 'text.primary' }}>
            {match.matchTypeValue}
          </Typography>
        ) : (
          <>
            <NavLink
              to={`../draws/${match.drawCode}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant='matchInfo'
                sx={{
                  color: 'white',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {match.drawName}
              </Typography>
            </NavLink>
            <Typography variant='matchInfo' sx={{ color: 'text.secondary' }}>
              {match.roundName}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
