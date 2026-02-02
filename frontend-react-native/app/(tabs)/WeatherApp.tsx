import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Button, Image } from "react-native";
import { WeatherDto } from "./types/weather.type";

const WeatherApp = () => {
    const apiKey = 'VLPXDXGSELJA8XEY89AVRDMF5';
    const unitGroup = 'metric';
    const contentType = 'json';
    const includeOptions = 'current,days';

    const [data, setData] = useState<[]>();
    const [location, setLocation] = useState('moscow');

    // Функция для получения иконки по условиям погоды
    const getWeatherIcon = (conditions: string) => {
        const condition = conditions.toLowerCase();

        if (condition.includes('clear') || condition.includes('sunny')) {
            return require('./assets/sunny.jpg'); // Ясно
        } else if (condition.includes('partially cloudy')) {
            return require('./assets/partly-cloudy.jpg'); // Переменная облачность
        } else if (condition.includes('cloudy') || condition.includes('overcast')) {
            return require('./assets/cloudy.jpg'); // Облачно
        } else if (condition.includes('rain') || condition.includes('drizzle')) {
            return require('./assets/rain.jpg'); // Дождь
        } else if (condition.includes('snow')) {
            return require('./assets/snow.jpg'); // Снег
        } else if (condition.includes('thunderstorm') || condition.includes('storm')) {
            return require('./assets/thunderstorm.jpg'); // Гроза
        } else if (condition.includes('fog') || condition.includes('mist')) {
            return require('./assets/fog.jpg'); // Туман
        } else {
            return require('./assets/default.png'); // По умолчанию
        }
    };

    // Альтернативный вариант - использование иконок из API
    const getWeatherIconFromAPI = (iconName: string) => {
        // Если в вашем API есть поле icon, можно использовать его
        return `https://weather.visualcrossing.com/img/icon/${iconName}.png`;
    };

    useEffect(() => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unitGroup}&include=${includeOptions}&contentType=${contentType}&key=${apiKey}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Forecast days:', data.days);
                setData(data.days)
            })
            .catch(async errorResponse => {
                if (errorResponse.text) {
                    const errorMessage = await errorResponse.text();
                    console.error('Error message:', errorMessage);
                } else {
                    console.error('Error occurred:', errorResponse);
                }
            });
    }, [location]);

    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                <Button title="Москва" onPress={() => setLocation("moscow")} />
                <Button title="Подольск" onPress={() => setLocation("podolsk")} />
                <Button title="Минск" onPress={() => setLocation("tuliara")} />
            </View>

            <View style={{ display: 'flex', flexDirection: "central", flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
                {data ?
                    data.map((item: WeatherDto, index) => {
                        return (
                            <View key={index} style={{
                                padding: 15,
                                marginVertical: 5,
                                backgroundColor: '#f8f9fa',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#e9ecef',
                            }}>
                                <View>
                                    {/* Картинка погоды */}
                                    <Image
                                        source={getWeatherIcon(item.conditions)}
                                        style={{ width: 50, height: 50, marginRight: 15 }} />

                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                            {new Date(item.datetime).toLocaleDateString('ru-RU')}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: '#666' }}>
                                            {item.conditions}
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007AFF' }}>
                                            {Math.round(item.temp)}°C
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={{ fontSize: 12 }}>Закат: {item.sunset}</Text>
                                    {item.feelslike && (
                                        <Text style={{ fontSize: 12 }}>Ощущается как: {Math.round(item.feelslike)}°C</Text>
                                    )}
                                </View>
                            </View>
                        );
                    })
                    :
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={{ marginTop: 10 }}>Загрузка погоды...</Text>
                    </View>
                }
            </View>
        </View>
    );
}

export default WeatherApp;