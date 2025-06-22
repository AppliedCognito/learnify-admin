import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

// Add a new question
const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newQuestion) =>
      toast.promise(
        apiClient.post('/questions', newQuestion).then(res => res.data),
        {
          pending: 'Adding question...',
          success: 'Question added successfully!',
          error: {
            render({ data }) {
              return `Failed to add question: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

// Update a question by ID
const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      toast.promise(
        apiClient.put(`/questions/${id}`, updatedData).then(res => res.data),
        {
          pending: 'Updating question...',
          success: 'Question updated successfully!',
          error: {
            render({ data }) {
              return `Failed to update question: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

// Delete a question by ID
const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        apiClient.delete(`/questions/${id}`).then(res => res.data),
        {
          pending: 'Deleting question...',
          success: 'Question deleted successfully!',
          error: {
            render({ data }) {
              return `Failed to delete question: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['questions']);
    },
  });
};

export { useAddQuestion, useUpdateQuestion, useDeleteQuestion };
