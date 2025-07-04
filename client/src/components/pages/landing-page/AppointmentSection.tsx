"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/ui/LoadingButton";
import {
  Calendar,
  User,
  Award,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AppointmentSection = ({ role }: { role?: string }) => {
  const appointmentDataDoctor =
    role === "DOCTOR"
      ? [
          {
            id: 1,
            name: "John Doe",
            specialty: "Dermatologist",
            bio: "Experienced in skin conditions and cosmetic procedures",
            experience: "10 years of experience",
            isApproved: true,
            nextAppointment: "Today, 2:00 PM",
            patientCount: 45,
          },
          {
            id: 2,
            name: "Jane Smith",
            specialty: "Cardiologist",
            bio: "Expert in heart diseases and cardiovascular surgery",
            experience: "8 years of experience",
            isApproved: true,
            nextAppointment: "Tomorrow, 10:30 AM",
            patientCount: 32,
          },
          {
            id: 3,
            name: "Alice Johnson",
            specialty: "Neurologist",
            bio: "Specializes in brain disorders and neurological conditions",
            experience: "12 years of experience",
            isApproved: false,
            nextAppointment: "Pending approval",
            patientCount: 0,
          },
        ]
      : [
          {
            id: 1,
            doctorName: "Dr. Sarah Wilson",
            specialty: "General Medicine",
            date: "Dec 15, 2024",
            time: "2:00 PM",
            status: "Confirmed",
            type: "Regular Checkup",
          },
          {
            id: 2,
            doctorName: "Dr. Michael Brown",
            specialty: "Cardiology",
            date: "Dec 18, 2024",
            time: "10:30 AM",
            status: "Pending",
            type: "Follow-up",
          },
          {
            id: 3,
            doctorName: "Dr. Emily Davis",
            specialty: "Dermatology",
            date: "Dec 22, 2024",
            time: "3:15 PM",
            status: "Confirmed",
            type: "Consultation",
          },
        ];

  return (
    <div className="space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          {role === "DOCTOR" ? "Your Patients" : "Your Appointments"}
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentDataDoctor.map((item, index) => (
          <div
            key={item.id}
            className="animate-card-appear"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {role === "DOCTOR" ? (
              <DoctorCard data={item} />
            ) : (
              <PatientCard data={item} />
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-card-appear {
          animation: card-appear 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

const DoctorCard = ({ data }: { data: any }) => (
  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300  hover:shadow-2xl group">
    <CardHeader className="space-y-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-300" />
          {data.name}
        </CardTitle>
        {data.isApproved ? (
          <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
        ) : (
          <XCircle className="w-6 h-6 text-red-400" />
        )}
      </div>
      <CardDescription className="text-blue-100 flex items-center gap-2">
        <Award className="w-4 h-4" />
        {data.specialty}
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <p className="text-sm text-blue-100 leading-relaxed">{data.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-emerald-300" />
          <p className="text-xs text-blue-200">Experience</p>
          <p className="text-sm font-semibold">{data.experience}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <User className="w-4 h-4 mx-auto mb-1 text-blue-300" />
          <p className="text-xs text-blue-200">Patients</p>
          <p className="text-sm font-semibold">{data.patientCount}</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 border border-blue-400/30">
        <p className="text-xs text-blue-200 mb-1">Next Appointment</p>
        <p className="font-semibold">{data.nextAppointment}</p>
      </div>
    </CardContent>

    <CardFooter>
      <LoadingButton className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transform group-hover:scale-105 transition-all duration-200">
        View Schedule
      </LoadingButton>
    </CardFooter>
  </Card>
);

const PatientCard = ({ data }: { data: any }) => (
  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
    <CardHeader>
      <CardTitle className="text-xl font-bold flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-300" />
        {data.type}
      </CardTitle>
      <CardDescription className="text-blue-100">
        with {data.doctorName}
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-emerald-300" />
          <span className="text-sm font-medium">{data.specialty}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <Calendar className="w-4 h-4 mx-auto mb-1 text-blue-300" />
          <p className="text-xs text-blue-200">Date</p>
          <p className="text-sm font-semibold">{data.date}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-emerald-300" />
          <p className="text-xs text-blue-200">Time</p>
          <p className="text-sm font-semibold">{data.time}</p>
        </div>
      </div>

      <div
        className={`rounded-lg p-3 border ${
          data.status === "Confirmed"
            ? "bg-green-500/20 border-green-400/30"
            : "bg-yellow-500/20 border-yellow-400/30"
        }`}
      >
        <p className="text-xs text-blue-200 mb-1">Status</p>
        <p className="font-semibold flex items-center gap-2">
          {data.status === "Confirmed" ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-400" />
          )}
          {data.status}
        </p>
      </div>
    </CardContent>

    <CardFooter>
      <LoadingButton className="w-full bg-gradient-to-r from-blue-500 to-emerald-900 hover:from-blue-600 hover:to-emerald-600 transform group-hover:scale-105 transition-all duration-200">
        View Details
      </LoadingButton>
    </CardFooter>
  </Card>
);

export default AppointmentSection;
