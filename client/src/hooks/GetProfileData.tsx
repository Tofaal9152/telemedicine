import { useFetchData } from "./useFetchData";

const GetProfileData = ({ role }: { role: string }) => {
  console.log("role in",role)
  const endPoint = role === "PATIENT" ? "/patient/profile" : "/doctor/profile";
console.log(`Fetching profile data from endpoint: ${endPoint}`);
  const fetchProfileData = useFetchData<any>(endPoint, "profile");
  return fetchProfileData;
};

export default GetProfileData;
