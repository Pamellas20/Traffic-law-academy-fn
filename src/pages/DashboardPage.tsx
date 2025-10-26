import { Card } from '../components/ui/card';

import { CourseProgress } from '@/components/dashboard/course-progress';
import { TestResults } from '@/components/dashboard/test-results';
import { PerformanceChart } from '@/components/dashboard/performance-chart';

export const DashboardPage = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col gap-6">
                {/* Overview Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="p-6 bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-2">Current Course</h3>
                        <CourseProgress />
                    </Card>

                    <Card className="p-6 bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-2">Latest Test Score</h3>
                        <TestResults />
                    </Card>

                    <Card className="p-6 bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-2">Study Time</h3>
                        <div className="text-3xl font-bold text-primary">12.5 hrs</div>
                        <p className="text-muted-foreground">This week</p>
                    </Card>
                </div>

                {/* Performance Chart */}
                <Card className="p-6 bg-card border border-border">
                    <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                    <PerformanceChart />
                </Card>

                {/* Recent Activity */}
                <Card className="p-6 bg-card border border-border">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {/* Activity items will go here */}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;