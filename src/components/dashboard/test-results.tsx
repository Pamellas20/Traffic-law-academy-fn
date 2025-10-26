
import { useGetUserTestResultsQuery } from '@/store/api/testsApiSlice';
import { useAppSelector } from '@/store/hooks';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TestResults = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { data: testResults, isLoading } = useGetUserTestResultsQuery(user?.id || '');

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-8 w-16 mb-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="text-right">
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <div className="pt-4 border-t">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!testResults || testResults.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No test results yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Take your first test to see results here!</p>
            </div>
        );
    }

    const latestResult = testResults[0];
    const previousResult = testResults[1];
    const improvement = previousResult ? latestResult.score - previousResult.score : 0;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-primary">{latestResult.score}%</div>
                        <Badge variant={latestResult.passed ? "default" : "destructive"}>
                            {latestResult.passed ? "Passed" : "Failed"}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">Latest Test Score</p>
                </div>
                {previousResult && (
                    <div className="text-right">
                        <div className="text-sm font-medium">Previous: {previousResult.score}%</div>
                        <div className={`text-sm flex items-center gap-1 ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {improvement >= 0 ? (
                                <TrendingUp className="w-3 h-3" />
                            ) : (
                                <TrendingDown className="w-3 h-3" />
                            )}
                            {improvement >= 0 ? '+' : ''}{improvement}% Change
                        </div>
                    </div>
                )}
            </div>
            <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Recent Test History</div>
                <div className="space-y-2">
                    {testResults.slice(0, 3).map((result) => (
                        <div key={result.id} className="flex justify-between items-center text-sm">
                            <span className="truncate">Test #{result.testId.slice(-6)}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{result.score}%</span>
                                <Badge 
                                    variant={result.passed ? "secondary" : "outline"} 
                                    className="text-xs"
                                >
                                    {result.passed ? "Pass" : "Fail"}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};