import axios from "axios"
import { BACKEND_URL } from "../constants"

export async function fetchCalendar(month: number, year: number) {
  const { data: calendar } = await axios.get<string[][]>(
    `${BACKEND_URL}/calendar/month/${month + 1}/year/${year}`
  )

  const newCalendar: Date[][] = []
  let newWeek: Date[] = []

  for (const week of calendar) {
    for (const day of week) {
      newWeek.push(new Date(day))
    }
    newCalendar.push(newWeek)
    newWeek = new Array()
  }

  return newCalendar
}
