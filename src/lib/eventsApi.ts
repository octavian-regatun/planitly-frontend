import axios, { AxiosResponse } from "axios"
import ApiResponse from "../interfaces/apiResponse.interface"
import Event from "../interfaces/event.interface"
import { BACKEND_URL } from "./constants"

export default class EventsApi {
  static async create(
    event: Event
  ): Promise<AxiosResponse<ApiResponse<Event>> | undefined> {
    try {
      const response = await axios.post<ApiResponse<Event>>(
        `${BACKEND_URL}/events`,
        event
      )

      return response
    } catch (e) {
      console.log(e)
    }
  }
}
