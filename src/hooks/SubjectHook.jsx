// SubjectHook.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-toastify';

// Add a new subject (requires paper_id and name)
const useAddSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSubject) =>
      toast.promise(
        apiClient.post('/subjects', newSubject).then(res => res.data),
        {
          pending: 'Adding subject...',
          success: 'Subject added successfully!',
          error: {
            render({ data }) {
              return `Failed to add subject: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });
};

// Update a subject by ID (only name is required)
// subjectHook.jsx
const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }) =>
      toast.promise(
        apiClient.put(`/subjects/${id}`, updatedData).then(res => res.data),
        {
          pending: 'Updating subject...',
          success: 'Subject updated successfully!',
          error: {
            render({ data }) {
              return `Failed to update subject: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });
};


// Delete a subject by ID
const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      toast.promise(
        apiClient.delete(`/subjects/${id}`).then(res => res.data),
        {
          pending: 'Deleting subject...',
          success: 'Subject deleted successfully!',
          error: {
            render({ data }) {
              return `Failed to delete subject: ${data?.response?.data?.message || data.message}`;
            },
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });
};

export { useAddSubject, useUpdateSubject, useDeleteSubject };

