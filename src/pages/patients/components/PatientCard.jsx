import React from 'react';
import ProgressBar from '../../../hooks/ProgressBar';
import { patientFullName } from '../../../libs/helpers';

const PatientCard = ({ patient, currentStage, stages }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={patient?.avatar || ""}
          alt={patientFullName(patient)}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{patientFullName(patient)}</span>
          <span className="text-sm text-gray-600">{currentStage}</span>
        </div>
      </div>
      <div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-lg mb-4">
        <ProgressBar currentStage={currentStage} stages={stages} />
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        {/* Add additional details or status text here if needed */}
      </div>
    </div>
  );
};

export default PatientCard;
