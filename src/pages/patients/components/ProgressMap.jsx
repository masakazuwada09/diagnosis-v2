import React from 'react';
import PatientCard from './PatientCard';  // Ensure correct import path

const ProgressMap = ({ patients }) => {
  // Define stages for the progress bar
  const stages = [
    { name: 'Nurse', color: 'bg-blue-500', status: '10%' },
    { name: 'Cashier', color: 'bg-green-500', status: '25%' },
    { name: 'Laboratory', color: 'bg-yellow-500', status: '50%' },
    { name: 'Doctor', color: 'bg-red-500', status: '75%' },
    { name: 'Pharmacy', color: 'bg-purple-500', status: '90%' },
    { name: 'Nurse', color: 'bg-blue-500', status: 'Finalizing' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {patients.map((patient) => {
        // Determine the patient's current stage. This should be part of your patient data.
        const currentStage = patient.currentStage;  // Ensure this is part of the patient data
        return (
          <PatientCard
            key={patient.id}  // Ensure unique key
            patient={patient}
            currentStage={currentStage}
            stages={stages}
          />
        );
      })}
    </div>
  );
};

export default ProgressMap;
