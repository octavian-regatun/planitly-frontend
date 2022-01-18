import axios from "axios";
import ApiResponse from "../interfaces/apiResponse.interface";
import { Location } from "../interfaces/location.interface";
import { BACKEND_URL } from "./constants";

export default class LocationsApi {
  static async create(location: Location): Promise<Location | undefined> {
    try {
      const { data: response } = await axios.post<ApiResponse<Location>>(
        `${BACKEND_URL}/locations`,
        location
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
