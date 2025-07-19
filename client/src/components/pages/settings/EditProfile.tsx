"use client";
import { useUpdateProfile } from "@/actions/profile/EditProfileAction";
import { SmartForm, SmartFormField } from "@/components/smart-form";
import GetProfileData from "@/hooks/GetProfileData";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.string().regex(/^\d+$/, "Age must be a number"),
  gender: z.enum(["male", "female"]),
  role: z.enum(["PATIENT", "DOCTOR"]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfile = ({ role }: { role: any }) => {
  const { query, queryKey, fetcherUrl } = GetProfileData({ role });

  const mutation = useUpdateProfile({ fetcherUrl, queryKey });

  const handleSubmit = async (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  if (query.isLoading) return <div>Loading...</div>;

  const defaultValues: ProfileFormData = {
    name: query.data.name || "",
    email: query.data.email || "",
    age: query.data.age || "",
    gender: query.data.gender === "male" ? "male" : "female",
    role: query.data.role || "PATIENT",
  };

  return (
    <div>
      <SmartForm
        key={JSON.stringify(defaultValues)}
        schema={profileSchema}
        mutationFn={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full container mx-auto text-white space-y-6"
        defaultValues={defaultValues}
        submitText={mutation.isPending ? "Updating..." : "Update Profile"}
        onSuccess={(data) => console.log("Success:", data)}
        onError={(error) => console.error("Error:", error)}
      >
        {(form) => (
          <div className="space-y-4">
            <SmartFormField
              form={form}
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />
            <SmartFormField
              form={form}
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <SmartFormField
              form={form}
              name="age"
              type="text"
              label="Age"
              placeholder="Enter your age"
            />
            <SmartFormField
              form={form}
              name="gender"
              type="select"
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
            <SmartFormField
              form={form}
              name="role"
              type="select"
              label="Role"
              options={[
                { value: "PATIENT", label: "Patient" },
                { value: "DOCTOR", label: "Doctor" },
              ]}
              disabled
            />
          </div>
        )}
      </SmartForm>
    </div>
  );
};
export default EditProfile;
