import { WeatherData } from '@/types/weather'
import { Text, View } from 'react-native'



interface WeatherProps {
  weather: WeatherData
}

export default function WeatherCard({ weather }: WeatherProps) {

  return (
    <View>
      <Text>{weather.name}</Text>
      {weather.weather[0].icon}
    </View>
  )
}