import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Trophy, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Test {
    id: number
    title: string
    description: string
    duration: string
    questions: number
    difficulty: "Easy" | "Medium" | "Hard"
    status: "available" | "completed" | "locked"
    score?: number
    passingScore: number
}

const tests: Test[] = [
    {
        id: 1,
        title: "Traffic Signs Basic Test",
        description: "Test your knowledge of common traffic signs and their meanings.",
        duration: "30 min",
        questions: 25,
        difficulty: "Easy",
        status: "completed",
        score: 85,
        passingScore: 70
    },
    {
        id: 2,
        title: "Road Rules Assessment",
        description: "Comprehensive test on traffic rules and regulations.",
        duration: "45 min",
        questions: 40,
        difficulty: "Medium",
        status: "available",
        passingScore: 75
    },
    {
        id: 3,
        title: "Advanced Driving Scenarios",
        description: "Complex scenarios and decision-making situations.",
        duration: "60 min",
        questions: 35,
        difficulty: "Hard",
        status: "locked",
        passingScore: 80
    }
]

const DifficultyBadge = ({ difficulty }: { difficulty: Test["difficulty"] }) => {
    const colors = {
        Easy: "text-green-500 bg-green-500/10 hover:bg-green-500/20",
        Medium: "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20",
        Hard: "text-red-500 bg-red-500/10 hover:bg-red-500/20"
    }

    return (
        <Badge variant="outline" className={`${colors[difficulty]} border-0`}>
            {difficulty}
        </Badge>
    )
}

export const TestsPage = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Practice Tests</h1>
                    <p className="text-muted-foreground">
                        Test your knowledge of traffic laws and regulations
                    </p>
                </div>
            </div>

            <Tabs defaultValue="available" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="available">Available Tests</TabsTrigger>
                    <TabsTrigger value="completed">Completed Tests</TabsTrigger>
                </TabsList>

                <TabsContent value="available">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tests
                            .filter((test) => test.status === "available")
                            .map((test) => (
                                <Card key={test.id} className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {test.description}
                                                </p>
                                            </div>
                                            <DifficultyBadge difficulty={test.difficulty} />
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {test.duration}
                                            </div>
                                            <div>{test.questions} questions</div>
                                            <div>Passing: {test.passingScore}%</div>
                                        </div>

                                        <Button className="w-full">Start Test</Button>
                                    </div>
                                </Card>
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="completed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tests
                            .filter((test) => test.status === "completed")
                            .map((test) => (
                                <Card key={test.id} className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {test.description}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <DifficultyBadge difficulty={test.difficulty} />
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        test.score! >= test.passingScore
                                                            ? "bg-primary/10 text-primary border-0"
                                                            : "bg-destructive/10 text-destructive border-0"
                                                    }
                                                >
                                                    {test.score! >= test.passingScore ? (
                                                        <Trophy className="h-3 w-3 mr-1" />
                                                    ) : (
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                    )}
                                                    {test.score}%
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {test.duration}
                                            </div>
                                            <div>{test.questions} questions</div>
                                            <div>Passing: {test.passingScore}%</div>
                                        </div>

                                        <Button variant="outline" className="w-full">
                                            Review Test
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TestsPage