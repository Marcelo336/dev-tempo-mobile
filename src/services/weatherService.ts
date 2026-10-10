import { WeatherData } from '@/types/weather'
import axios, { AxiosResponse, AxiosInstance } from 'axios'

export type WeatherResult =
  {success: true; data: WeatherData} | {success: false; error: string}

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,    
    lang: 'pt-br',
    units: 'metric'
  },
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getCurrentWeather = async(cityName: string): Promise<WeatherResult>=> {

  try {

    const trimmedCity = cityName.trim()
      if(!trimmedCity){
        return {
          success: false,
          error: 'Cidade não informada'
        }
      }

      const response = await api.get<WeatherData>('/weather', {
        params: {
         q: trimmedCity
        }
      })

      return {
        success: true,
        data: response.data
      }

  } catch(err) {
    return {
        success: false,
        error: 'Erro ao buscar clima'
    }

  }
}