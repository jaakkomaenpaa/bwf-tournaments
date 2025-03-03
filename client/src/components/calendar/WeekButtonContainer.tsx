import { Box, useTheme } from '@mui/material'
import { SecondaryButton } from '../buttons/SecondaryButton'

type WeekButtonContainerProps = {
  handleWeekChange: (offset: number) => void
  activeTab?: number
}

export function WeekButtonContainer({
  handleWeekChange,
  activeTab = -1,
}: WeekButtonContainerProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
        },
      }}
    >
      <SecondaryButton
        label='Previous week'
        isActive={activeTab === 0}
        onClick={() => handleWeekChange(-1)}
      />

      <SecondaryButton
        label='This week'
        isActive={activeTab === 1}
        onClick={() => handleWeekChange(0)}
      />

      <SecondaryButton
        label='Next week'
        isActive={activeTab === 2}
        onClick={() => handleWeekChange(1)}
      />
    </Box>
  )
}
