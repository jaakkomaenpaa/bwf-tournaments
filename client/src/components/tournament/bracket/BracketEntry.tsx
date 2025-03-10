import { Player, Team } from '@/types/match'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Cell } from './Cell'
import { ScoreCell } from './ScoreCell'
import { useBracket } from '@/hooks/tournament/useBracket'

type BracketEntryProps = {
  team: Team
  drawIndex: number
  round: number
  side?: 'home' | 'away'
  isLastRound?: boolean
  seed?: string
  isLive?: boolean
}

export function BracketEntry({
  team,
  drawIndex,
  round,
  side,
  isLastRound = false,
  seed,
}: BracketEntryProps) {
  const { cellHeight } = useBracket()

  if (team.teamName?.toLowerCase() === 'bye')
    return <ByeEntry drawIndex={drawIndex} isLastRound={isLastRound} side={side} />

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: cellHeight - 1,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.secondary',
        }}
      >
        {team.players.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {round === 1 && (
              <Typography variant='body2' sx={{ color: 'text.secondary', width: 20 }}>
                {drawIndex}
              </Typography>
            )}
            <TeamItem team={team} seed={seed} />
          </Box>
        )}
        {team.players.map((player: Player, index: number) => (
          <Box
            key={player.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {round === 1 && (
              <Typography variant='body2' sx={{ color: 'text.secondary', width: 20 }}>
                {index === team.players.length - 1 ? drawIndex : undefined}
              </Typography>
            )}
            <PlayerItem player={player} seed={index === 0 ? seed : undefined} />
          </Box>
        ))}
      </Box>

      {team.prevScore ? (
        <ScoreCell
          score={team.prevScore}
          scoreStatusValue={
            team.prevScoreStatus !== 0 ? team.prevScoreStatusValue : null
          }
          side={side}
          prevSide={team.prevMatchSide}
          isLastRound={isLastRound}
          isLive={team.matchIsLive}
        />
      ) : (
        <Cell borderRight={side === 'home'} />
      )}
    </Box>
  )
}

type TeamItemProps = {
  team: Team
  seed?: string
}

function TeamItem({ team, seed }: TeamItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        paddingRight: 1,
        paddingLeft: 1,
      }}
    >
      {team.countryFlagUrl && (
        <img
          src={team.countryFlagUrl}
          alt={team.teamName}
          style={{ height: 16, verticalAlign: 'middle', alignSelf: 'center' }}
        />
      )}

      <Typography
        variant='body2'
        sx={{
          color: !team.countryCode ? 'text.secondary' : 'text.primary',
          textWrap: 'nowrap',
        }}
      >
        {team.teamName} {seed && `[${seed}]`}
      </Typography>
    </Box>
  )
}

type PlayerItemProps = {
  player: Player
  seed?: string
}

function PlayerItem({ player, seed }: PlayerItemProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        paddingRight: 2,
        paddingLeft: 1,
        [theme.breakpoints.down('sm')]: {
          paddingRight: 1,
          gap: '4px',
        },
      }}
    >
      <img
        src={player.countryFlagUrl}
        alt={player.lastName}
        style={{
          height: !isMobile ? 18 : 10,
          verticalAlign: 'middle',
          alignSelf: 'center',
        }}
      />
      <Typography
        variant='bracketEntryText'
        sx={{
          color: 'text.primary',
          textWrap: 'nowrap',
        }}
      >
        {getPlayerNameDisplay(player, seed)}
      </Typography>
    </Box>
  )
}

type ByeEntryProps = {
  drawIndex: number
  side?: 'home' | 'away'
  isLastRound?: boolean
}

function ByeEntry({ drawIndex, side, isLastRound }: ByeEntryProps) {
  const { cellHeight } = useBracket()

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: cellHeight - 1,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.secondary',
        }}
      >
        <Typography
          variant='bracketEntryText'
          sx={{ color: 'text.secondary', width: 20, marginBottom: '1px' }}
        >
          {drawIndex}
        </Typography>
        <Typography
          variant='bracketEntryText'
          sx={{ color: 'text.secondary', marginLeft: 4, marginBottom: '1px' }}
        >
          Bye
        </Typography>
      </Box>
      <Cell borderRight={side === 'home'} />
    </Box>
  )
}

const getPlayerNameDisplay = (player: Player, seed?: string) => {
  const name = player.nameDisplay

  if (seed && player.status) {
    return `${name} [${seed}, ${player.status}]`
  } else if (seed) {
    return `${name} [${seed}]`
  } else if (player.status) {
    return `${name} [${player.status}]`
  }

  return name
}
