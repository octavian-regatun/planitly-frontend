import { Popover } from "@mui/material"
import { useState } from "react"
import { useQuery } from "react-query"
import CalendarUtility from "../lib/CalendarUtility"
import DayUtility from "../lib/DayUtility"
import { fetchCalendar } from "../lib/fetch/fetchCalendar"
import { useCalendarStore } from "../lib/stores"
import CreateEvent from "./CreateEvent"

export default function Calendar() {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(
    null
  )

  const selectedMonth = useCalendarStore((store) => store.month)
  const selectedYear = useCalendarStore((store) => store.year)

  const { data: calendar } = useQuery(
    ["calendar", selectedMonth, selectedYear],
    () => fetchCalendar(selectedMonth, selectedYear)
  )

  const handleClickOnDay = (event: any) => {
    if (event.currentTarget.getAttribute("is_current_month") === "true") {
      setPopoverAnchor(event.currentTarget)
    }
  }

  const handlePopoverClose = () => {
    setPopoverAnchor(null)
  }

  return (
    <>
      <div className="Calendar">
        <div className="Calendar-daysOfTheWeek">
          {DayUtility.daysOfTheWeek.map((day) => {
            return (
              <div
                className="Calendar-dayOfTheWeek"
                key={`dayOfTheWeek-${day}`}
              >
                {day.substring(0, 3).toUpperCase()}
              </div>
            )
          })}
        </div>
        {calendar?.map((week, index) => (
          <div className="Calendar-week" key={`week-${index + 1}`}>
            {week.map((day) => {
              return (
                <div
                  className="Calendar-day"
                  key={`day-${day.getTime()}`}
                  is_current_month={CalendarUtility.doesDateBelongToMonth(
                    day,
                    selectedMonth
                  )}
                  onClick={handleClickOnDay}
                  role="button"
                >
                  {day.getDate()}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <Popover
        open={!!popoverAnchor}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <CreateEvent />
      </Popover>
    </>
  )
}
