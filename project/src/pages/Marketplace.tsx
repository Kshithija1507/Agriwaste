import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Product {
    _id: string;
    image: string;
    name: string;
    description: string;
    price: number;
}

const Marketplace = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/marketplace');
                setProducts(res.data);
            } catch (err) { console.error(err); }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('marketplace')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="border p-4 rounded shadow bg-white">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-600 truncate">{product.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold">${product.price}</span>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                {t('add_to_cart')}
                            </button>
                        </div>
                    </div>
                ))}
                {products.length === 0 && <p>{t('no_products')}</p>}
            </div>
        </div>
    );
};

export default Marketplace;
