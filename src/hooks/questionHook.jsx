import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

// Add a new question
const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newQuestion) => {
      const response = await apiClient.post('/questions', newQuestion);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

// Update a question by ID
const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await apiClient.put(`/questions/${id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

// Delete a question by ID
const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`/questions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

export { useAddQuestion, useUpdateQuestion, useDeleteQuestion };
