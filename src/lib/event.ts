import axios from "axios";
import Event from "../interfaces/event.interface";
import { BACKEND_URL } from "./constants";

export async function createEvent(event: Event): Promise<Event | undefined> {
  try {
    const { data } = await axios.post<Event>(`${BACKEND_URL}/events`, event);

    return data;
  } catch (e) {
    console.log(e);
  }
}
