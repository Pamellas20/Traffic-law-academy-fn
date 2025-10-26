import { Progress } from '../ui/progress';
import { useGetUserCoursesQuery } from '@/store/api/coursesApiSlice';
import { Skeleton } from '../ui/skeleton';

export const CourseProgress = () => {
  const { data: courses, isLoading } = useGetUserCoursesQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No courses enrolled yet.</p>
        <p className="text-sm text-muted-foreground mt-1">Start your learning journey today!</p>
      </div>
    );
  }

  // Mock progress data - in real app this would come from course enrollment/progress API
  const progressData = [
    { title: "Traffic Signs & Signals", progress: 75 },
    { title: "Road Rules", progress: 60 },
    { title: "Vehicle Regulations", progress: 40 },
  ];

  return (
    <div className="space-y-4">
      {progressData.map((course, index) => (
        <div key={index}>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-sm">{course.title}</span>
            <span className="text-muted-foreground text-sm">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      ))}
    </div>
  );
};