"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  MessageCircle,
  User,
  Users,
  Video,
} from "lucide-react";
import DoctorPrescriptionContent from "../prescription/DoctorPrescriptionContent";
const PatientData = ({
  data,
  appointmentId,
}: {
  data: any;
  appointmentId: string;
}) => {
  const patient = data?.patient?.user;

  if (!patient) return <div>No patient info available.</div>;

  return (
    <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-white border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in">
            Patient Details
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-expand" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            icon={<User className="w-5 h-5" />}
            label="Name"
            value={patient.name}
          />
          <InfoCard
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value={patient.email}
          />
          <InfoCard
            icon={<Users className="w-5 h-5" />}
            label="Age"
            value={patient.age}
          />
          <InfoCard
            icon={<User className="w-5 h-5" />}
            label="Gender"
            value={patient.gender}
          />
          <InfoCard
            icon={<Calendar className="w-5 h-5" />}
            label="Appointment Date"
            value={new Date(data.createdAt).toLocaleString()}
            className="md:col-span-2"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition duration-300">
          <MessageCircle className="w-5 h-5" />
          Message
        </Button>
        <Button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition duration-300">
          <Video className="w-5 h-5" />
          Video Call
        </Button>
        {/*  */}

        <DoctorPrescriptionContent data={data} appointmentId={appointmentId} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-expand {
          animation: expand 1s ease-out 0.5s both;
        }
      `}</style>
    </section>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
  className = "",
}: {
  icon?: React.ReactNode;
  label: string;
  value: any;
  className?: string;
}) => (
  <div
    className={`bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-200 hover:scale-105 ${className}`}
  >
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-sm font-medium text-blue-200">{label}</span>
    </div>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

export default PatientData;
