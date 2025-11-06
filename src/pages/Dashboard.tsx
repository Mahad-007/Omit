import { DashboardCard } from "@/components/DashboardCard";
import { Shield, CheckSquare, Sparkles, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const productivityData = [
  { time: "9 AM", hours: 0.5 },
  { time: "10 AM", hours: 1.2 },
  { time: "11 AM", hours: 2.0 },
  { time: "12 PM", hours: 2.5 },
  { time: "1 PM", hours: 2.7 },
  { time: "2 PM", hours: 3.5 },
  { time: "3 PM", hours: 4.2 },
  { time: "4 PM", hours: 4.5 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const totalHours = productivityData[productivityData.length - 1].hours;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Track your productivity and stay motivated</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Focus Time Section - Left Half */}
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Focus Time Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary">{totalHours.toFixed(1)}h</div>
              <p className="text-sm text-muted-foreground">Total productive time today</p>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="time" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">87%</div>
                <div className="text-xs text-muted-foreground">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">6</div>
                <div className="text-xs text-muted-foreground">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">45m</div>
                <div className="text-xs text-muted-foreground">Avg Session</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Dashboard Cards */}
        <div className="space-y-6">
          <DashboardCard
            title="Blocked Sites"
            description="Distractions avoided"
            icon={Shield}
            value="12"
            trend="+3 today"
          >
            <Button
              onClick={() => navigate("/blocker")}
              className="w-full mt-4 bg-primary hover:bg-primary/90"
            >
              Manage Blocklist
            </Button>
          </DashboardCard>

          <DashboardCard
            title="Tasks Completed"
            description="Keep up the momentum!"
            icon={CheckSquare}
            value="8/15"
            trend="53% complete"
          >
            <Button
              onClick={() => navigate("/tasks")}
              variant="outline"
              className="w-full mt-4"
            >
              View Tasks
            </Button>
          </DashboardCard>
        </div>

        <DashboardCard title="Daily Motivation" icon={Sparkles}>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <p className="text-base font-medium mb-2 text-foreground">
              "Success is the sum of small efforts repeated day in and day out."
            </p>
            <p className="text-sm text-muted-foreground">— Robert Collier</p>
          </div>
          <Button
            onClick={() => navigate("/motivation")}
            variant="outline"
            className="w-full mt-4"
          >
            More Motivation
          </Button>
        </DashboardCard>
      </div>
    </div>
  );
}
