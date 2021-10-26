import axios from "axios";
import ApiURL from "../../global/apiURL";

export default async function GetUsers () {
  try {
    const response = await axios(`${ApiURL}/users`)
    const data = await response.data
    return data
  } catch (e) {
    console.error(e)
  }
}