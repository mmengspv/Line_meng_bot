import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

export async function airQuality({ latitude, longitude }) {
  const resp = (await axios.get(
    `http://api.airvisual.com/v2/nearest_city`,
    {
      params: {
      lat: latitude,
      lon: longitude,
      key: process.env.AIRVISUAL_API_KEY
      }
    })).data
    return resp
}

