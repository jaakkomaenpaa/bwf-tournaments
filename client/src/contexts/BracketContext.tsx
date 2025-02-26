import { createContext, useEffect, useState, ReactNode } from 'react'
import { useTournament } from '@/hooks/tournament/useTournament'
import { BracketData, Draw, StandingsEntry } from '@/types/draw'
import tournamentService from '@/services/tournament'
import { useParams } from 'react-router'

const SINGLES_CELL_HEIGHT = 24
const DOUBLES_CELL_HEIGHT = 48

type BracketContextType = {
  draws: Draw[]
  bracket: BracketData | null
  standings: StandingsEntry[] | null
  cellHeight: number
  drawsLoading: boolean
  bracketLoading: boolean
}

const defaultContextValue: BracketContextType = {
  draws: [],
  bracket: null,
  standings: null,
  cellHeight: SINGLES_CELL_HEIGHT,
  drawsLoading: true,
  bracketLoading: true,
}

export const BracketContext = createContext<BracketContextType>(defaultContextValue)

export const BracketProvider = ({ children }: { children: ReactNode }) => {
  const { tournament } = useTournament()
  const { drawId } = useParams()

  const [draws, setDraws] = useState<Draw[]>([])
  const [bracket, setBracket] = useState<BracketData | null>(null)
  const [standings, setStandings] = useState<StandingsEntry[] | null>(null)
  const [drawsLoading, setDrawsLoading] = useState<boolean>(true)
  const [bracketLoading, setBracketLoading] = useState<boolean>(true)
  const [cellHeight, setCellHeight] = useState<number>(SINGLES_CELL_HEIGHT)

  // Fetch draws
  useEffect(() => {
    if (!tournament) return

    const fetchDraws = async () => {
      setDrawsLoading(true)
      try {
        const drawRes = await tournamentService.getDraws(tournament.id)
        setDraws(drawRes)
      } finally {
        setDrawsLoading(false)
      }
    }

    fetchDraws()
  }, [tournament])

  // Fetch bracket
  useEffect(() => {
    if (!drawId || !tournament) return

    const fetchBracket = async () => {
      setBracketLoading(true)
      try {
        const bracketRes = await tournamentService.getBracket(tournament.id, drawId)

        if (bracketRes.bracket) {
          const isSingles =
            bracketRes.bracket.rounds[0][0].match.team1.players.length <= 1
          setCellHeight(isSingles ? SINGLES_CELL_HEIGHT : DOUBLES_CELL_HEIGHT)
          setBracket(bracketRes.bracket)
        } else {
          setBracket(null)
        }

        if (bracketRes.standings) {
          setStandings(bracketRes.standings)
        } else {
          setStandings(null)
        }
      } finally {
        setBracketLoading(false)
      }
    }

    fetchBracket()
  }, [tournament, drawId])

  return (
    <BracketContext.Provider
      value={{ draws, bracket, standings, cellHeight, drawsLoading, bracketLoading }}
    >
      {children}
    </BracketContext.Provider>
  )
}
