import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { IconButton, Typography } from "@mui/material"
import MonthUtility from "../lib/MonthUtility"
import { useCalendarStore } from "../lib/stores"

export default function CalendarSelect() {
  const updateCalendar = useCalendarStore((store) => store.update)
  const selectedMonth = useCalendarStore((store) => store.month)
  const selectedYear = useCalendarStore((store) => store.year)

  return (
    <div className="CalendarSelect">
      <IconButton
        aria-label="fingerprint"
        color="primary"
        onClick={() => updateCalendar("previous")}
        className="CalendarSelect-button"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6">
        {MonthUtility.getString(selectedMonth, { capitalized: true })},{" "}
        {selectedYear}
      </Typography>
      <IconButton
        aria-label="fingerprint"
        color="primary"
        onClick={() => updateCalendar("next")}
        className="CalendarSelect-button"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  )
}
