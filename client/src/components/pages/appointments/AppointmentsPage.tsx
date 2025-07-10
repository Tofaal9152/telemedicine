"use client";
import LoadingErrorWrapper from "@/components/ui/LoadingErrorWrapper";
import { useFetchData } from "@/hooks/useFetchData";
import DoctorData from "./doctor/PatientData";
import PatientData from "./patient/DoctorData";
import Prescription from "./prescription/Prescription";

const AppointmentsPage = ({
  appointmentId,
  isDoctor,
  session,
}: {
  appointmentId: string;
  isDoctor: boolean;
  session: any;
}) => {
  const { data, isPending, error, isError } = useFetchData<any>(
    `/appointments/${appointmentId}`,
    ["appointment", appointmentId]
  );

  return (
    <LoadingErrorWrapper isLoading={isPending} error={error} isError={isError}>
      {isDoctor ? (
        <DoctorData data={data} appointmentId={appointmentId} />
      ) : (
        <PatientData data={data} />
      )}
      <Prescription appointmentId={appointmentId} session={session} />
    </LoadingErrorWrapper>
  );
};

export default AppointmentsPage;
