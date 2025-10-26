import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    BookOpen,
    Clock,
    Trophy,
    Target,
    PlayCircle,
    CheckCircle,
    TrendingUp,
    Calendar,
    Award,
    Users,
    BarChart3
} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
    instructor: string;
}

interface TestResult {
    id: string;
    testName: string;
    score: number;
    maxScore: number;
    date: string;
    status: 'passed' | 'failed' | 'pending';
    category: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
    category: string;
}

export const UserDashboard = () => {
    // Mock data for a normal user
    const userStats = {
        coursesEnrolled: 5,
        coursesCompleted: 2,
        totalStudyTime: 24,
        averageScore: 87,
        currentStreak: 7,
        rank: 'Bronze',
        nextRank: 'Silver',
        pointsToNextRank: 150,
        totalPoints: 850
    };

    const enrolledCourses: Course[] = [
        {
            id: '1',
            title: 'Traffic Signs and Signals',
            progress: 85,
            totalLessons: 12,
            completedLessons: 10,
            category: 'Basic Rules',
            difficulty: 'Beginner',
            estimatedTime: '2h remaining',
            instructor: 'Sarah Johnson'
        },
        {
            id: '2',
            title: 'Defensive Driving Techniques',
            progress: 60,
            totalLessons: 15,
            completedLessons: 9,
            category: 'Advanced Skills',
            difficulty: 'Intermediate',
            estimatedTime: '4h remaining',
            instructor: 'Mike Davis'
        },
        {
            id: '3',
            title: 'Highway Driving Rules',
            progress: 30,
            totalLessons: 10,
            completedLessons: 3,
            category: 'Highway Safety',
            difficulty: 'Intermediate',
            estimatedTime: '6h remaining',
            instructor: 'Lisa Chen'
        }
    ];

    const recentTests: TestResult[] = [
        {
            id: '1',
            testName: 'Traffic Signs Quiz',
            score: 92,
            maxScore: 100,
            date: '2025-10-24',
            status: 'passed',
            category: 'Signs & Signals'
        },
        {
            id: '2',
            testName: 'Basic Rules Test',
            score: 78,
            maxScore: 100,
            date: '2025-10-22',
            status: 'passed',
            category: 'Basic Rules'
        },
        {
            id: '3',
            testName: 'Highway Safety Assessment',
            score: 65,
            maxScore: 100,
            date: '2025-10-20',
            status: 'failed',
            category: 'Highway Safety'
        }
    ];

    const achievements: Achievement[] = [
        {
            id: '1',
            title: 'First Steps',
            description: 'Complete your first lesson',
            icon: '🎯',
            earnedDate: '2025-10-15',
            category: 'Getting Started'
        },
        {
            id: '2',
            title: 'Quiz Master',
            description: 'Score 90%+ on 3 quizzes',
            icon: '🧠',
            earnedDate: '2025-10-20',
            category: 'Academic Excellence'
        },
        {
            id: '3',
            title: 'Study Streak',
            description: 'Study for 7 consecutive days',
            icon: '🔥',
            earnedDate: '2025-10-24',
            category: 'Consistency'
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'passed': return 'text-green-600 dark:text-green-400';
            case 'failed': return 'text-red-600 dark:text-red-400';
            case 'pending': return 'text-yellow-600 dark:text-yellow-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
                        <p className="text-lime-100">Continue your traffic law learning journey</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">{userStats.currentStreak}</div>
                        <div className="text-sm text-lime-100">Day Streak</div>
                    </div>
                </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userStats.coursesEnrolled}</div>
                        <p className="text-xs text-muted-foreground">
                            {userStats.coursesCompleted} completed
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userStats.totalStudyTime}h</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userStats.averageScore}%</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            +5% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userStats.rank}</div>
                        <p className="text-xs text-muted-foreground">
                            {userStats.pointsToNextRank} pts to {userStats.nextRank}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Current Courses */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        My Courses
                    </CardTitle>
                    <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {enrolledCourses.map((course) => (
                            <div key={course.id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Instructor: {course.instructor}
                                        </p>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                                                {course.difficulty}
                                            </Badge>
                                            <Badge variant="outline">{course.category}</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                <Clock className="inline h-3 w-3 mr-1" />
                                                {course.estimatedTime}
                                            </span>
                                        </div>
                                    </div>
                                    <Button size="sm" className="ml-4">
                                        <PlayCircle className="h-4 w-4 mr-1" />
                                        Continue
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                    </div>
                                    <Progress value={course.progress} className="h-2" />
                                    <div className="text-right text-sm text-muted-foreground">
                                        {course.progress}% complete
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Test Results */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Recent Test Results
                        </CardTitle>
                        <CardDescription>Your latest quiz and test performances</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentTests.map((test) => (
                                <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex-1">
                                        <h4 className="font-medium">{test.testName}</h4>
                                        <p className="text-sm text-muted-foreground">{test.category}</p>
                                        <p className="text-xs text-muted-foreground">
                                            <Calendar className="inline h-3 w-3 mr-1" />
                                            {new Date(test.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${getStatusColor(test.status)}`}>
                                            {test.score}/{test.maxScore}
                                        </div>
                                        <div className="text-sm">
                                            {test.status === 'passed' && <CheckCircle className="inline h-3 w-3 mr-1 text-green-500" />}
                                            {test.status === 'failed' && <span className="text-red-500">✗</span>}
                                            <span className={`capitalize ${getStatusColor(test.status)}`}>
                                                {test.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Recent Achievements
                        </CardTitle>
                        <CardDescription>Your learning milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {achievements.map((achievement) => (
                                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <div className="text-2xl">{achievement.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{achievement.title}</h4>
                                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Badge variant="outline">{achievement.category}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to help you learn faster</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            <span>Browse Courses</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Target className="h-6 w-6" />
                            <span>Take a Quiz</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Users className="h-6 w-6" />
                            <span>Study Groups</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};