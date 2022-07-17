import create from "zustand"
import { User } from "../interfaces/user.interface"
import { fetchUser } from "./fetchUser"
import { devtools } from "zustand/middleware"

interface UserStore {
  user?: User
  getUser: (id: string) => Promise<void>
}

export const useUserStore = create<UserStore>(
  devtools((set) => ({
    user: undefined,
    getUser: async (id: string) => {
      const user = (await fetchUser(id)) as User
      set({ user })
    },
  }))
)

interface CalendarStore {
  month: number
  year: number
  update: (action: "next" | "previous") => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  update: (action) => {
    if (action === "next") {
      set((state) => {
        if (state.month === 11)
          return { ...state, month: 0, year: state.year + 1 }
        else return { ...state, month: state.month + 1 }
      })
    } else if (action === "previous") {
      set((state) => {
        if (state.month === 0)
          return { ...state, month: 11, year: state.year - 1 }
        else return { ...state, month: state.month - 1 }
      })
    }
  },
}))
