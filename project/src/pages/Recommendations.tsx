import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Recommendation {
    plantName: string;
    growthTime: string;
    yield: string;
    wasteUsageRatio: string;
}

const Recommendations = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [formData, setFormData] = useState({ location: '', soilType: '', wasteType: '', sunlight: '' });
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/recommendations', {
                ...formData,
                userId: user ? user._id : null
            });
            setRecommendations(res.data.data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('recommendations')}</h1>
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <label className="block mb-1">{t('location')}</label>
                    <input type="text" className="border p-2 w-full" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                </div>
                <div>
                    <label className="block mb-1">{t('soil_type')}</label>
                    <select className="border p-2 w-full" value={formData.soilType} onChange={e => setFormData({ ...formData, soilType: e.target.value })} required>
                        <option value="">{t('select_soil')}</option>
                        <option value="Clay">Clay</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Loamy">Loamy</option>
                        <option value="Silt">Silt</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">{t('sunlight')}</label>
                    <select className="border p-2 w-full" value={formData.sunlight} onChange={e => setFormData({ ...formData, sunlight: e.target.value })} required>
                        <option value="">{t('select_sunlight')}</option>
                        <option value="Full Sun">Full Sun</option>
                        <option value="Partial Shade">Partial Shade</option>
                        <option value="Shade">Shade</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">{t('waste_type')}</label>
                    <input type="text" className="border p-2 w-full" value={formData.wasteType} onChange={e => setFormData({ ...formData, wasteType: e.target.value })} required />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
                    {loading ? t('analyzing') : t('get_recommendations')}
                </button>
            </form>

            {recommendations && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-bold">{rec.plantName}</h3>
                            <p><strong>{t('growth_time')}:</strong> {rec.growthTime}</p>
                            <p><strong>{t('yield')}:</strong> {rec.yield}</p>
                            <p><strong>{t('waste_ratio')}:</strong> {rec.wasteUsageRatio}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recommendations;
