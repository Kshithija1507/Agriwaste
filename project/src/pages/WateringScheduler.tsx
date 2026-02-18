import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const WateringScheduler = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [schedules, setSchedules] = useState([]);

    const fetchSchedules = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/watering/${user._id}`);
            setSchedules(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (user) {
            fetchSchedules();
        }
    }, [user]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('watering')}</h1>
            <p>Manage your plant watering schedules here.</p>
            {/* List schedules here */}
            {schedules.length === 0 ? (
                <div className="mt-4">
                    <p className="text-gray-500">No schedules set.</p>
                </div>
            ) : (
                <div className="mt-4 grid gap-4">
                    {schedules.map((schedule: any) => (
                        <div key={schedule._id} className="border p-4 rounded">
                            <h3 className="font-bold">{schedule.plantName}</h3>
                            <p>Next Water: {new Date(schedule.nextWatering).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WateringScheduler;
