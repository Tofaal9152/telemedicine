import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react"; // Add this to the top of your file

const ChartSection = ({ stats, role }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Call once to set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const chartData: any =
    role === "STUDENT"
      ? [
          { name: "Courses", value: stats.enrolled_courses, color: "#3b82f6" },
          { name: "Subjects", value: stats.total_subjects, color: "#10b981" },
          { name: "Classes", value: stats.total_classes, color: "#ef4444" },
          { name: "Exams", value: stats.total_exams, color: "#8b5cf6" },
          { name: "Notes", value: stats.total_notes, color: "#f59e0b" },
        ]
      : [
          { name: "Courses", value: stats.total_courses, color: "#10b981" },
          { name: "Subjects", value: stats.total_subjects, color: "#f59e0b" },
          { name: "Students", value: stats.total_students, color: "#3b82f6" },
          { name: "Classes", value: stats.total_classes, color: "#ef4444" },
          { name: "Exams", value: stats.total_exams, color: "#ec4899" },
          { name: "Notes", value: stats.total_notes, color: "#8b5cf6" },
        ];

  const pieData = chartData.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      {/* Bar Chart */}
      <Card className="bg-white dark:bg-gray-950 shadow-xl shadow-violet-500/20 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Summary Statistics
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Key statistics summary
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ChartContainer
            config={{
              bar: {
                label: "Bar Chart",
                color: "#3b82f6",
              },
            }}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry: any, index: any) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="bg-white dark:bg-gray-950 shadow-xl shadow-violet-500/20 hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Category Distribution
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Visual breakdown of key categories
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <ChartContainer
            config={{
              pie: {
                label: "Pie Chart",
                color: "#10b981",
              },
            }}
          >
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={
                  !isMobile
                    ? ({ name, value }: any) => `${name}: ${value}`
                    : undefined
                }
                labelLine={!isMobile}
              >
                {pieData.map((entry: any, index: any) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="mt-4  text-sm text-gray-700 dark:text-gray-300 flex flex-wrap justify-center items-center gap-4 mx-auto w-full">
            {pieData.map((entry: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 ">
                <span style={{ color: entry.color }}>{entry.name}</span>
                <span>{entry.value}</span>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChartSection;
