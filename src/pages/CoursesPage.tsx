import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, Clock, CheckCircle } from "lucide-react"

interface Course {
    id: string
    title: string
    description: string
    duration: string
    lessons: number
    progress: number
    image: string
}

const courses: Course[] = [
    {
        id: "1",
        title: "Traffic Signs and Signals",
        description: "Learn about road signs, traffic signals, and their meanings for safe driving.",
        duration: "2 hours",
        lessons: 8,
        progress: 75,
        image: "/traffic_sign.png"
    },
    {
        id: "2",
        title: "Road Rules and Regulations",
        description: "Understanding traffic laws, right of way, and general road regulations.",
        duration: "3 hours",
        lessons: 12,
        progress: 45,
        image: "/road_rules.png"
    },
    {
        id: "3",
        title: "Safe Driving Practices",
        description: "Essential techniques for defensive driving and accident prevention.",
        duration: "2.5 hours",
        lessons: 10,
        progress: 10,
        image: "/safe_driving.png"
    }
]

export const CoursesPage = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col gap-6">
                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-foreground">Your Courses</h1>
                    <p className="text-muted-foreground">Continue learning and track your progress</p>
                </div>

                {/* Course Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="overflow-hidden border border-border bg-card">
                            {/* Course Image */}
                            <div className="aspect-video relative bg-muted">
                                {/* Placeholder for course image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Course Info */}
                                <h3 className="text-xl font-semibold mb-2 text-foreground">{course.title}</h3>
                                <p className="text-muted-foreground mb-4">{course.description}</p>

                                {/* Course Meta */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <BookOpen className="h-4 w-4" />
                                        <span className="text-sm">{course.lessons} Lessons</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {course.progress > 0 && (
                                    <div className="mb-4">
                                        <div className="h-2 w-full bg-secondary rounded-full">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-300"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {course.progress}% Complete
                                        </p>
                                    </div>
                                )}

                                {/* Action Button */}
                                <Button className="w-full gap-2">
                                    {course.progress === 0 ? (
                                        <>
                                            <Play className="h-4 w-4" />
                                            Start Course
                                        </>
                                    ) : course.progress === 100 ? (
                                        <>
                                            <CheckCircle className="h-4 w-4" />
                                            Review Course
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4" />
                                            Continue Learning
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoursesPage