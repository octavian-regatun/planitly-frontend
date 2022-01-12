import axios from "axios";
import { Location } from "../interfaces/location.interface";
import { BACKEND_URL } from "./constants";

export async function createLocation(
  location: Location
): Promise<Location | undefined> {
  try {
    const { data } = await axios.post<Location>(
      `${BACKEND_URL}/locations`,
      location
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
