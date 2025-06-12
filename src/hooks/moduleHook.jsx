// moduleHook.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

// Add a new module (requires subject_id and name)
const useAddModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newModule) =>
      toast.promise(
        apiClient.post('/modules', newModule).then(res => res.data),
        {
          pending: 'Adding module...',
          success: 'Module added successfully!',
          error: {
            render({ data }) {
              return `Failed to add module: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['modules']);
    },
  });
};

// Update a module by ID (only name is required)
const useUpdateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }) =>
      toast.promise(
        apiClient.put(`/modules/${id}`, { name }).then(res => res.data),
        {
          pending: 'Updating module...',
          success: 'Module updated successfully!',
          error: {
            render({ data }) {
              return `Failed to update module: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['modules']);
    },
  });
};

// Delete a module by ID
const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        apiClient.delete(`/modules/${id}`).then(res => res.data),
        {
          pending: 'Deleting module...',
          success: 'Module deleted successfully!',
          error: {
            render({ data }) {
              return `Failed to delete module: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['modules']);
    },
  });
};

export { useAddModule, useUpdateModule, useDeleteModule };
