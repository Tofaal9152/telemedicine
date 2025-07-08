"use client";
import LoadingErrorWrapper from "@/components/ui/LoadingErrorWrapper";
import { useFetchData } from "@/hooks/useFetchData";
import PatientData from "./doctor/PatientData";
import DoctorData from "./patient/DoctorData";
import AllPrescription from "./prescription/AllPrescription";

const AppointmentsPage = ({ appointmentId, isDoctor }: any) => {
  const { data, isPending, error, isError } = useFetchData<any>(
    `/appointments/${appointmentId}`,
    ["appointment", appointmentId]
  );

  return (
    <LoadingErrorWrapper isLoading={isPending} error={error} isError={isError}>
      {isDoctor ? <PatientData data={data} /> : <DoctorData data={data} />}
      <AllPrescription appointmentId={appointmentId} />
    </LoadingErrorWrapper>
  );
};

export default AppointmentsPage;
