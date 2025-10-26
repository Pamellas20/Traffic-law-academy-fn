import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  TrendingUp,
  Eye,
  Edit,
  UserPlus,
  BarChart3,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useGetUsersQuery } from '@/store/api/usersApiSlice';
import { useGetCoursesQuery } from '@/store/api/coursesApiSlice';
import { useGetTestsQuery } from '@/store/api/testsApiSlice';

export const SupervisorDashboard = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
  const { data: tests, isLoading: testsLoading } = useGetTestsQuery();

  const isLoading = usersLoading || coursesLoading || testsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const normalUsers = users?.filter(user => user.role === 'normal') || [];
  const activeCourses = courses?.filter(course => course.status === 'active') || [];
  const activeTests = tests?.filter(test => test.status === 'active') || [];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Supervisor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor users and oversee course management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Managed Users</p>
                <p className="text-3xl font-bold">{normalUsers.length}</p>
                <p className="text-blue-100 text-xs mt-1">
                  {normalUsers.filter(u => u.status === 'active').length} active
                </p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-bold">{activeCourses.length}</p>
                <p className="text-green-100 text-xs mt-1">
                  {courses?.length || 0} total courses
                </p>
              </div>
              <BookOpen className="w-10 h-10 text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Active Tests</p>
                <p className="text-3xl font-bold">{activeTests.length}</p>
                <p className="text-purple-100 text-xs mt-1">
                  {tests?.length || 0} total tests
                </p>
              </div>
              <ClipboardList className="w-10 h-10 text-purple-200" />
            </div>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Oversight */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Oversight</h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {normalUsers.slice(0, 5).map((user) => (
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
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
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
              <h3 className="text-lg font-semibold">Course Oversight</h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Manage
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
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Full Report
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">87%</p>
              <p className="text-sm text-muted-foreground">Average Completion Rate</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">Average Test Score</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Tests Completed This Month</p>
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent User Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">John Doe completed "Basic Traffic Rules"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Jane Smith scored 95% on "Road Signs Test"</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">Mike Johnson enrolled in "Advanced Driving"</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};