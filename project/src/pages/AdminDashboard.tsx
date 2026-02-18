import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t } = useTranslation();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('admin')}</h1>
            <p>Admin features pending implementation.</p>
        </div>
    );
};

export default AdminDashboard;
