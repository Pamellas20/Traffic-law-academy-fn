import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  TrendingUp, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';
import { useGetAdminDashboardStatsQuery } from '@/store/api/rolesApiSlice';
import { useGetUsersQuery } from '@/store/api/usersApiSlice';
import { useGetCoursesQuery } from '@/store/api/coursesApiSlice';
import { useGetTestsQuery } from '@/store/api/testsApiSlice';

export const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useGetAdminDashboardStatsQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
  const { data: tests, isLoading: testsLoading } = useGetTestsQuery();

  const isLoading = statsLoading || usersLoading || coursesLoading || testsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage users, courses, and system overview</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold">{stats?.totalUsers || users?.length || 0}</p>
                <p className="text-blue-100 text-xs mt-1">
                  +{stats?.activeUsers || 0} active today
                </p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">{stats?.totalCourses || courses?.length || 0}</p>
                <p className="text-green-100 text-xs mt-1">
                  {courses?.filter(c => c.status === 'active').length || 0} active
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Tests</p>
                <p className="text-3xl font-bold">{stats?.totalTests || tests?.length || 0}</p>
                <p className="text-purple-100 text-xs mt-1">
                  {tests?.filter(t => t.status === 'active').length || 0} active
                </p>
              </div>
              <ClipboardList className="w-10 h-10 text-purple-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">System Health</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-500 text-white">Optimal</Badge>
                </div>
                <p className="text-orange-100 text-xs mt-1">
                  All services running
                </p>
              </div>
              <Activity className="w-10 h-10 text-orange-200" />
            </div>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Management */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Management</h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {users?.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'supervisor' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Course Management */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Course Management</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </div>
            <div className="space-y-4">
              {courses?.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {course.level} • {course.duration}h
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Analytics */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">System Analytics</h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-muted-foreground">User Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-muted-foreground">System Uptime</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Activity className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-muted-foreground">Monthly Active Users</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};