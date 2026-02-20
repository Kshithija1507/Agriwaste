import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface WeatherData {
    name: string;
    main: { temp: number };
    weather: { icon: string; description: string }[];
    advise: string;
}

const WeatherAdvisory = () => {
    const { t } = useTranslation();
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) return;
        try {
            // Using a try-catch block here is essential because network requests can fail for many reasons:
            // 1. The local backend server (localhost:5000) might be down or unreachable.
            // 2. The user might have lost their internet connection.
            // 3. The backend might throw a 500 error if it fails to fetch from OpenWeather API.
            // If we don't catch these errors, it could result in uncaught promise rejections, 
            // potentially breaking the React component lifecycle or rendering a blank screen (white screen of death).
            const res = await axios.get(`http://localhost:5000/api/weather/${location}`);
            setWeather(res.data);
        } catch (err) {
            // Catching the error ensures the UI stays intact and functional, allowing the user to try again.
            // In a production app, we would typically set an error state here (e.g., setError('Failed to fetch data')) 
            // to show a friendly failure message in the UI instead of just logging to the console.
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('weather')}</h1>
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder={t('enter_location')}
                    className="border p-2 rounded w-full md:w-1/3"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{t('search')}</button>
            </form>

            {weather && (
                <div className="bg-blue-50 p-6 rounded shadow max-w-md">
                    <h2 className="text-2xl font-bold">{weather.name}</h2>
                    <div className="flex items-center my-4">
                        <span className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</span>
                        {weather.weather[0].icon && (
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
                        )}
                    </div>
                    <p className="capitalize text-lg">{weather.weather[0].description}</p>
                    <div className="mt-4 border-t pt-2">
                        <p><strong>{t('advisory')}</strong></p>
                        <p className="text-red-600 font-semibold">{weather.advise}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherAdvisory;
