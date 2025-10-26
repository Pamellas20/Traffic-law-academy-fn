
export const TestResults = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-3xl font-bold text-primary">85%</div>
                    <p className="text-muted-foreground">Latest Test Score</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-medium">Previous: 78%</div>
                    <div className="text-sm text-primary">+7% Improvement</div>
                </div>
            </div>
            <div className="pt-4 border-t">
                <div className="text-sm font-medium">Test History</div>
                <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Traffic Signs Test</span>
                        <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Road Rules Quiz</span>
                        <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Safety Regulations</span>
                        <span className="font-medium">92%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};