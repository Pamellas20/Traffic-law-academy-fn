import { apiSlice } from './apiSlice';

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  duration: number;
  level: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: string;
}

export interface EnrollCourseRequest {
  courseId: string;
}

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => '/courses',
      providesTags: ['Course'],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
    createCourse: builder.mutation<Course, CreateCourseRequest>({
      query: (courseData) => ({
        url: '/courses',
        method: 'POST',
        body: courseData,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<Course, UpdateCourseRequest>({
      query: ({ id, ...courseData }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: courseData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Course', id }],
    }),
    deleteCourse: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    enrollCourse: builder.mutation<{ message: string }, EnrollCourseRequest>({
      query: (data) => ({
        url: '/courses/enroll',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course', 'User'],
    }),
    getUserCourses: builder.query<Course[], void>({
      query: () => '/courses/user',
      providesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useEnrollCourseMutation,
  useGetUserCoursesQuery,
} = coursesApiSlice;