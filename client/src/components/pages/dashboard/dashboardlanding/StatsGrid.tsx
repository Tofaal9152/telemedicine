import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  School,
  Users,
} from "lucide-react";

const StatsGrid = ({ stats, role }: any) => {
  const studentStats = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      label: "Enrolled Courses",
      value: stats.enrolled_courses,
      color: "bg-blue-500",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: "Total Subjects",
      value: stats.total_subjects,
      color: "bg-green-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      label: "Total Notes",
      value: stats.total_notes,
      color: "bg-yellow-500",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      label: "Total Classes",
      value: stats.total_classes,
      color: "bg-red-500",
    },
    {
      icon: <School className="h-6 w-6" />,
      label: "Total Exams",
      value: stats.total_exams,
      color: "bg-purple-500",
    },
  ];

  const adminStats = [
    {
      icon: <Users className="h-6 w-6" />,
      label: "Total Students",
      value: stats.total_students,
      color: "bg-blue-500",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      label: "Total Courses",
      value: stats.total_courses,
      color: "bg-green-500",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: "Total Subjects",
      value: stats.total_subjects,
      color: "bg-yellow-500",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      label: "Total Classes",
      value: stats.total_classes,
      color: "bg-red-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      label: "Total Notes",
      value: stats.total_notes,
      color: "bg-purple-500",
    },
    {
      icon: <School className="h-6 w-6" />,
      label: "Total Exams",
      value: stats.total_exams,
      color: "bg-pink-500",
    },
  ];

  const cards = role === "STUDENT" ? studentStats : adminStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          className="dark:bg-gray-950 bg-white transition-shadow shadow-xl shadow-violet-500/20 hover:shadow-2xl"
        >
          <CardContent className="flex flex-col justify-center items-center space-y-3">
            <div className={`${card?.color} p-3 rounded-full text-white`}>
              {card?.icon}
            </div>

            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {card?.label} ( {card?.value?.toLocaleString() || 0})
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
