import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DoctorPrescriptionForm from "./DoctorPrescriptionForm";
const DoctorPrescriptionContent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Prescription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prescription</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the prescription details below. Ensure all information is
          accurate before saving.
        </DialogDescription>
        <DoctorPrescriptionForm />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorPrescriptionContent;
