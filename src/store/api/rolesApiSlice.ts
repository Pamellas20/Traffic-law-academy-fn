import { apiSlice } from './apiSlice';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface AssignRoleRequest {
  userId: string;
  roleId: string;
}

export const rolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    getRole: builder.query<Role, string>({
      query: (id) => `/roles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Role', id }],
    }),
    getRolePermissions: builder.query<Permission[], string>({
      query: (roleId) => `/roles/${roleId}/permissions`,
      providesTags: ['Role'],
    }),
    assignRole: builder.mutation<{ message: string }, AssignRoleRequest>({
      query: (data) => ({
        url: '/roles/assign',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User', 'Role'],
    }),
    getAdminDashboardStats: builder.query<{
      totalUsers: number;
      totalCourses: number;
      totalTests: number;
      activeUsers: number;
      recentUsers: any[];
      systemHealth: any;
    }, void>({
      query: () => '/roles/admin/dashboard/stats',
      providesTags: ['Role'],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useGetRolePermissionsQuery,
  useAssignRoleMutation,
  useGetAdminDashboardStatsQuery,
} = rolesApiSlice;