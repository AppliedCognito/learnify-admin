import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

// Add a new paper
const useAddPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPaper) =>
      toast.promise(
        apiClient.post('/papers', newPaper).then(res => res.data),
        {
          pending: 'Adding paper...',
          success: 'Paper added successfully!',
          error: {
            render({ data }) {
              return `Failed to add paper: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

// Update a paper by ID
const useUpdatePaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      toast.promise(
        apiClient.put(`/papers/${id}`, updatedData).then(res => res.data),
        {
          pending: 'Updating paper...',
          success: 'Paper updated successfully!',
          error: {
            render({ data }) {
              return `Failed to update paper: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

// Delete a paper by ID
const useDeletePaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        apiClient.delete(`/papers/${id}`).then(res => res.data),
        {
          pending: 'Deleting paper...',
          success: 'Paper deleted successfully!',
          error: {
            render({ data }) {
              return `Failed to delete paper: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['papers']);
    },
  });
};

export { useAddPaper, useUpdatePaper, useDeletePaper };
