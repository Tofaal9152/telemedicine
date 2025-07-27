import DeleteButton from "@/lib/DeleteButton";
import ToggleActivateButton from "./ToggleActivateButton";

const DoctorItem = ({ item }: any) => {
  console.log(item);
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 space-y-6 transition-all">
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ID: {item.id}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Email:</span> {item.email}
        </div>
        <div>
          <span className="font-semibold">Age:</span> {item.age}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {item.gender}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {item.role}
        </div>
        <div>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Doctor Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">BMDC Reg No:</span>{" "}
            <span className="text-red-500 font-bold underline underline-offset-2 pl-1">{item.doctor?.registrationNumber}</span>
          </div>
          <div>
            <span className="font-semibold">Specialty:</span>{" "}
            {item.doctor?.specialty}
          </div>
          <div>
            <span className="font-semibold">Visit Fee:</span>{" "}
            {item.doctor?.visitFee}
          </div>
          <div>
            <span className="font-semibold">Experience:</span>{" "}
            {item.doctor?.experience}
          </div>
          <div className="md:col-span-2">
            <span className="font-semibold">Bio:</span> {item.doctor?.bio}
          </div>
          <div>
            <span className="font-semibold">Approval Status:</span>{" "}
            <span
              className={
                item.doctor?.isApproved ? "text-green-500" : "text-red-500"
              }
            >
              {item.doctor?.isApproved ? "Approved" : "Not Approved"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* <EditAgent agentId={item.id} /> */}
        <ToggleActivateButton
          resourceUrl={`/admin/doctor/${item.id}/approval`}
          queryKey="admin-all-doctors"
          isActive={item?.doctor?.isApproved}
        />
        <DeleteButton
          resourceUrl={`/admin/doctor/${item.id}`}
          queryKey="admin-all-doctors"
          confirmMessage={`Sure you want to delete doctor ${item.name}?`}
        />
      </div>
    </div>
  );
};

export default DoctorItem;
