"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const DoctorPrescriptionForm = () => {
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };

  return (
    <form className="space-y-6">
      <Textarea
        placeholder="Symptoms..."
        className="w-full p-4 rounded-lg border"
      />
      <Textarea
        placeholder="Diagnosis..."
        className="w-full p-4 rounded-lg border"
      />

      {/* Dynamic Medication List */}
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div key={index} className="grid grid-cols-4 gap-2">
            <Input
              placeholder="Name"
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Dosage"
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Frequency"
              className="col-span-1 border p-2 rounded"
            />
            <Input
              placeholder="Duration"
              className="col-span-1 border p-2 rounded"
            />
          </div>
        ))}
        <Button type="button" onClick={addMedication}>
          + Add Medicine
        </Button>
      </div>

      <Textarea
        placeholder="Advice/Notes..."
        className="w-full p-4 rounded-lg border"
      />
      <Button type="submit" variant="outline">
        Save Prescription
      </Button>
    </form>
  );
};

export default DoctorPrescriptionForm;
