import { Progress } from '../ui/progress';

export const CourseProgress = () => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Traffic Signs & Signals</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Road Rules</span>
          <span className="text-muted-foreground">60%</span>
        </div>
        <Progress value={60} />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Vehicle Regulations</span>
          <span className="text-muted-foreground">40%</span>
        </div>
        <Progress value={40} />
      </div>
    </div>
  );
};