// src/app/details.tsx
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

// Importa os estilos e cores
import { colors } from '@/styles/colors';
import { detailsStyles } from '@/styles/details.styles';

// Importa o componente WeatherCard e o serviço de API
import WeatherCard from '@/components/WeatherCard';
// ALTERADO AQUI: Importa getCurrentWeather em vez de fetchWeatherByCity
import { getCurrentWeather } from '@/services/weatherService';
import { WeatherData } from '@/types/weather'; // Certifique-se de que WeatherData está definida em src/types/weather.ts

export default function Details() {
  const { cityName } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getWeatherData = useCallback(async () => {
    if (!cityName || typeof cityName !== 'string') {
      setError('Nome da cidade não fornecido. Por favor, retorne e tente novamente.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null); // Limpa qualquer erro anterior
    setWeatherData(null); // Limpa dados anteriores

    try {
      // ALTERADO AQUI: Chamando getCurrentWeather
      const result = await getCurrentWeather(cityName); 

      // ALTERADO AQUI: Lógica para tratar o WeatherResult (success ou error)
      if (result.success) {
        console.log(result.data); // result.data é válido quando success é true
        setWeatherData(result.data);
      } else {
        // Se a função de serviço retornou um erro (ex: cidade não informada, erro interno da API)
        setError(result.error);
      }
    } catch (err: any) {
      // Este catch é para erros inesperados que *não foram* encapsulados pelo WeatherResult,
      // como problemas de rede antes de obter uma resposta do servidor.
      if (err.message === 'Network Error') {
        setError('Erro de rede. Verifique sua conexão com a internet.');
      } else {
        // Para quaisquer outros erros inesperados que o serviço não tratou e jogou.
        setError(err.message || 'Ocorreu um erro inesperado ao buscar os dados do clima.');
      }
      console.error('Erro ao buscar clima:', err);
    } finally {
      setLoading(false);
    }
  }, [cityName]); // Dependência para garantir que a função seja recriada se cityName mudar

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]); // Chama a função quando o componente é montado ou getWeatherData muda

  return (
    <SafeAreaView style={detailsStyles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} /> {/* Oculta o cabeçalho padrão da stack */}

      <View style={detailsStyles.container}>
        <TouchableOpacity onPress={() => router.back()} style={detailsStyles.backButton}>
          <Text style={detailsStyles.backButtonText}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <View style={detailsStyles.header}>
          <Text style={detailsStyles.title}>Clima Atual</Text>
          <Text style={detailsStyles.subtitle}>Buscando: {cityName}</Text>
        </View>

        {loading && (
          <View style={detailsStyles.loadingContainer}>
            <ActivityIndicator size='large' color={colors.primary} />
            <Text style={detailsStyles.loadingText}>Carregando...</Text>
          </View>
        )}

        {/* Exibe o erro SOMENTE se não estiver carregando e houver um erro */}
        {!loading && error && (
          <View style={detailsStyles.errorContainer}>
            <Text style={detailsStyles.errorText}>{error}</Text>
            <TouchableOpacity onPress={getWeatherData} style={detailsStyles.retryButton}>
              <Text style={detailsStyles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Exibe o WeatherCard SOMENTE se não estiver carregando, não houver erro e houver dados */}
        {!loading && !error && weatherData && (
          <WeatherCard weather={weatherData} />
        )}
      </View>
    </SafeAreaView>
  );
}