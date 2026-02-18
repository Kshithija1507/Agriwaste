import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface AnalysisResult {
    disease: string;
    confidence: string;
    cure: string;
}

const DiseaseDetector = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:5000/api/disease', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(res.data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-green-800">{t('detect_disease')}</h1>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6 text-center">
                    <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50 transition-colors"
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" className="max-h-64 object-contain rounded" />
                        ) : (
                            <>
                                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                <span className="text-gray-600">Click to upload leaf image</span>
                            </>
                        )}
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!image || loading}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors ${!image || loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2 h-5 w-5" />
                            {t('analyzing')}
                        </span>
                    ) : (
                        t('analyze_image')
                    )}
                </button>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}

                {result && (
                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                            Analysis Result
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-green-50 p-4 rounded-lg">
                                <span className="block text-sm text-green-800 font-semibold uppercase tracking-wide">Detected Issue</span>
                                <span className="text-lg font-bold text-gray-900">{result.disease}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="block text-sm text-gray-500 font-semibold uppercase tracking-wide">Confidence</span>
                                    <span className={`text-lg font-bold ${result.confidence.toLowerCase().includes('high') ? 'text-green-600' :
                                            result.confidence.toLowerCase().includes('medium') ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {result.confidence}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <span className="block text-sm text-blue-800 font-semibold uppercase tracking-wide">Suggested Cure / Prevention</span>
                                <p className="text-gray-800 mt-1">{result.cure}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseDetector;
