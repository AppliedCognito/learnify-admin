import apiClient from '@/lib/apiClient';

const getPapers = async () => {
    const response = await apiClient.get('/papers');
    return response.data;
};

export { getPapers };