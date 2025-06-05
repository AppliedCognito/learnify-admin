import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

// Add a new paper
const useAddPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPaper) => {
      const response = await apiClient.post('/papers', newPaper);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

// Update a paper by ID
const useUpdatePaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await apiClient.put(`/papers/${id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

// Delete a paper by ID
const useDeletePaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`/papers/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

export { useAddPaper, useUpdatePaper, useDeletePaper };