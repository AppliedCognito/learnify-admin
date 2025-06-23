// subModuleHook.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

// Add a new submodule (requires module_id and name)
const useAddSubModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSubModule) =>
      toast.promise(
        apiClient.post('/submodules', newSubModule).then(res => res.data),
        {
          pending: 'Adding submodule...',
          success: 'Submodule added successfully!',
          error: {
            render({ data }) {
              return `Failed to add submodule: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['submodules']);
    },
  });
};

// Update a submodule by ID (only name is required)
const useUpdateSubModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      toast.promise(
        apiClient.put(`/submodules/${id}`, updatedData).then(res => res.data),
        {
          pending: 'Updating submodule...',
          success: 'Submodule updated successfully!',
          error: {
            render({ data }) {
              return `Failed to update submodule: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['submodules']);
    },
  });
};


// Delete a submodule by ID
const useDeleteSubModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        apiClient.delete(`/submodules/${id}`).then(res => res.data),
        {
          pending: 'Deleting submodule...',
          success: 'Submodule deleted successfully!',
          error: {
            render({ data }) {
              return `Failed to delete submodule: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['submodules']);
    },
  });
};

export { useAddSubModule, useUpdateSubModule, useDeleteSubModule };
