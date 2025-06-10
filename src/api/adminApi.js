import apiClient from '@/lib/apiClient';

const getPapers = async () => {
    const response = await apiClient.get('/papers');
    return response.data;
};

const getSubjects = async () => {
    const response = await apiClient.get(`/subjects`);
    return response.data;
};

const getQuestions = async () => {
    const response = await apiClient.get('/questions');
    return response.data;
};

export { 
    getPapers,
    getQuestions,
    getSubjects
};