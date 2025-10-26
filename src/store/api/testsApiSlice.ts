import { apiSlice } from './apiSlice';

export interface Test {
  id: string;
  title: string;
  description: string;
  courseId: string;
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
  answers: UserAnswer[];
  completedAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface CreateTestRequest {
  title: string;
  description: string;
  courseId: string;
  questions: Omit<Question, 'id'>[];
  timeLimit: number;
  passingScore: number;
}

export interface SubmitTestRequest {
  testId: string;
  answers: { questionId: string; selectedAnswer: number }[];
  timeSpent: number;
}

export const testsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<Test[], void>({
      query: () => '/tests',
      providesTags: ['Test'],
    }),
    getTest: builder.query<Test, string>({
      query: (id) => `/tests/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Test', id }],
    }),
    createTest: builder.mutation<Test, CreateTestRequest>({
      query: (testData) => ({
        url: '/tests',
        method: 'POST',
        body: testData,
      }),
      invalidatesTags: ['Test'],
    }),
    updateTest: builder.mutation<Test, { id: string } & Partial<CreateTestRequest>>({
      query: ({ id, ...testData }) => ({
        url: `/tests/${id}`,
        method: 'PATCH',
        body: testData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Test', id }],
    }),
    deleteTest: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/tests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Test'],
    }),
    submitTest: builder.mutation<TestResult, SubmitTestRequest>({
      query: (submission) => ({
        url: '/tests/submit',
        method: 'POST',
        body: submission,
      }),
      invalidatesTags: ['TestResult'],
    }),
    getTestResults: builder.query<TestResult[], void>({
      query: () => '/tests/results',
      providesTags: ['TestResult'],
    }),
    getTestResult: builder.query<TestResult, string>({
      query: (id) => `/tests/results/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'TestResult', id }],
    }),
    getUserTestResults: builder.query<TestResult[], string>({
      query: (userId) => `/tests/results/user/${userId}`,
      providesTags: ['TestResult'],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useSubmitTestMutation,
  useGetTestResultsQuery,
  useGetTestResultQuery,
  useGetUserTestResultsQuery,
} = testsApiSlice;