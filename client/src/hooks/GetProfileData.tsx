import { useFetchData } from "./useFetchData";

const GetProfileData = ({ role }: { role: string }) => {
  const endPoint = role === "PATIENT" ? "/patient/profile" : "/doctor/profile";

  const fetchProfileData = useFetchData<any>(endPoint, "profile");
  return fetchProfileData;
};

export default GetProfileData;
