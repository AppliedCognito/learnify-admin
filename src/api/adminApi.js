import apiClient from '@/lib/apiClient';

const getPapers = async () => {
    const response = await apiClient.get('/papers');
    return response.data;
};

const getSubjects = async (paper_id) => {
    const response = await apiClient.get(`/subjects`, {
        params: { paper_id }
    });
    return response.data;
};

const getQuestions = async () => {
    const response = await apiClient.get('/questions');
    return response.data;
};

const getQuestionById = async (id) => {
  try {
    const response = await apiClient.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch question by ID:', error);
    throw error;
  }
};


const getModules = async (subject_id) => {
    const response = await apiClient.get(`/modules`, {
        params: { subject_id }
    });
    return response.data;
};



const getsSubModule = async (module_id) => {
    const response = await apiClient.get('/submodules', {
        params: { module_id }
    });
    return response.data;
};


export { 
    getPapers,
    getQuestions,
    getSubjects,
    getModules,
    getsSubModule,
    getQuestionById
};