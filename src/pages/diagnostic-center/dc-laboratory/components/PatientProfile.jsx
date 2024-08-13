/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import FlatIcon from "../../../../components/FlatIcon";
import Img from "../../../../components/Img";
import PatientAppointments from "../../../../components/PatientAppointments";
import PatientPrescriptions from "../../../../components/PatientPrescriptions";
import PatientProfileDetails from "../../../../components/PatientProfileDetails";
import PatientVitals from "../../../../components/PatientVitals";
import TabGroup from "../../../../components/TabGroup";
import MenuTitle from "../../../../components/buttons/MenuTitle";
import { calculateAge, formatDate, patientFullName } from "../../../../libs/helpers";
import CreateAppointmentsModal from "../../../patients/components/CreateAppointmentsModal";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import PrivacyPolicyModal from "../../../../components/modal/PrivacyPolicyModal";
import PatientVitalCharts from "../../../../components/PatientVitalCharts";
import { useAuth } from "../../../../hooks/useAuth";
import AppointmentChoiceModal from "../../../patients/components/AppointmentChoiceModal";
import NewAppointmentModal from "../../../../components/modal/NewAppointmentModal";
import PatientChartsAnesthesia from "../../../department/his-anesthesia/components/PatientChartsAnesthesia";
import LaboratoryResult from "../../../department/his-anesthesia/components/LaboratoryResult";
import ImagingResult from "../../../department/his-anesthesia/components/ImagingResult";
import AddPatientOperation from "../../../department/his-anesthesia/components/modal/AddPatientOperation";
import ProcedureChoiceModal from "../../../department/his-anesthesia/components/modal/ProcedureChoiceModal";
import AddPatientForDeliveryModal from "../../../department/his-anesthesia/components/modal/AddPatientForDeliveryModal";
import PatientCSROrder from "../../../department/his-nurse/components/PatientCSROrder";
import PatientPharmacyOrder from "../../../department/his-nurse/components/PatientPharmacyOrder";
import CreateEmergencyCareModal from "../../../hims/his-er/modal/CreateEmergencyCareModal";
import CreateTriageModal from "../../../hims/his-opd/modal/CreateTriageModal";

// import ReferToRHUModal from "./components/ReferToRHUModal";

const PatientProfile = (props) => {
	const { patient, appointment } = props;
	const { checkUserType } = useAuth();
	const createAppointmentRef = useRef(null);
	const privacyRef = useRef(null);
	const referToRHURef = useRef(null);
	const appointmentChoiceRef = useRef(null);
	const ERCareChoiceRef = useRef(null);
	const CreateTriageRef = useRef(null);
	const bookTeleMedicineRef = useRef(null);
	const operationProcedureRef = useRef(null);
	const operationDeliveryRef = useRef(null);
	const procedureChoiceRef = useRef(null);
	const [patientSelfie, setPatientSelfie] = useState(null);

	return (
		<div className="flex flex-col">



<div className="flex flex-col lg:flex-row gap-4 items-center px-5 pt-4 pb-4 border-b justify-between  bg-slate-50 ">
  

  <div className="flex flex-row col-span-1 items-center">
  <div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
    <Img
      type="user"
      name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
      src={patient?.avatar || ""}
      className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full "
      alt=""
      id="user-image-sample"
      key={`key-${patient?.id}-${patient?.avatar}`}
    />
  </div>
  <div className="flex flex-col ml-3">
  <h6
      className={`text-left text-2xl mb-1 font-semibold flex items-center ${
        String(patient?.gender).toLowerCase() == "male"
          ? "text-blue-800"
          : "text-pink-800"
      } mb-0`}
    >
      {patientFullName(patient)}
    </h6>
    <div className="flex gap-6 mb-2">
      <div className="flex items-center gap-2 text-base">
        <FlatIcon icon="rr-calendar-clock" className="text-base" />
        <span>{calculateAge(patient?.birthday)} yrs. old</span>
      </div>
      <div className="flex items-center gap-2 text-base">
        <FlatIcon icon="rr-calendar" className="text-base" />
        <span>{formatDate(patient?.birthday)}</span>
      </div>
    </div>
    <div className="flex gap-4 mb-2">
      <div className="flex items-center gap-2 text-base">
        <FlatIcon icon="rr-venus-mars" className="text-base" />
        {String(patient?.gender).toLowerCase() == "male" ? (
          <span className="text-blue-700">Male</span>
        ) : (
          <span className="text-pink-700">Female </span>
        )}
      </div>
    </div>
  </div>
    
  </div>

  <div className="">
   
    <div className="">
      <div className="capitalize flex flex-wrap font-bold text-sm text-gray-900 ">
        
      </div>
    </div>
  </div>

  <div className="flex  items-center">
    <div className="flex flex-col items-center ">
		
	<div className="">
      <img
        src="/vitals/philhealthlogo.png"
        className="w-8 h-8 object-contain "
      />
    </div>

	<div className="capitalize font-bold text-sm text-gray-900 ">
        <div>
          PHILHEALTH IDENTIFICATION NUMBER (PIN)
          
        </div>
		
	</div>
	<span >{patient?.philhealth}</span>

  
      <div className="flex items-center gap-2 text-base">
        {checkUserType("ER") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-12 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              ERCareChoiceRef.current.show({ patient: patient });
            }}
          >
            <FlatIcon icon="bs-add" />
            EMERGENCY APPOINTMENT
          </ActionBtn>
        )}
        {checkUserType("DC-NURSE") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-12 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              ERCareChoiceRef.current.show({ patient: patient });
            }}
          >
            <FlatIcon icon="bs-add" />
            EMERGENCY APPOINTMENT
          </ActionBtn>
        )}

        {checkUserType("OPD-NURSE") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-12 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              CreateTriageRef.current.show({ patient: patient });
            }}
          >
            <FlatIcon icon="bs-add" />
            EMERGENCY APPOINTMENT
          </ActionBtn>
        )}
        
        {checkUserType("FRONTDESK") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              procedureChoiceRef.current.show();
            }}
          >
            <FlatIcon icon="bs-add-folder" />
            Create Operation
          </ActionBtn>
        )}
        {checkUserType("SURGEON") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              procedureChoiceRef.current.show();
            }}
          >
            <FlatIcon icon="bs-add-folder" />
            Create Operation
          </ActionBtn>
        )}
        {checkUserType("PACU-NURSE") && (
          <ActionBtn
            type="secondary"
            className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
            onClick={() => {
              procedureChoiceRef.current.show();
            }}
          >
            <FlatIcon icon="bs-add-folder" />
            Create Operation
          </ActionBtn>
        )}
      </div>
    </div>
  </div>
</div>
			
		
	<div>


				
			</div>
			<CreateAppointmentsModal
				referToRHURef={referToRHURef}
				ref={createAppointmentRef}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>

			<AddPatientOperation
				patient={patient}
				ref={operationProcedureRef}	
				// onSuccess={() => {
				// 	reloadData();
				// }}
			/>
			<AddPatientForDeliveryModal
				patient={patient}
				ref={operationDeliveryRef}	
				// onSuccess={() => {
				// 	reloadData();
				// }}
			/>

			<ProcedureChoiceModal 
			ref={procedureChoiceRef}
			onClickSurgery={() => {
				operationProcedureRef.current.show({
				patient,
				appointment,
			});
			}}
			onClickDelivery={() => {
				operationDeliveryRef.current.show({
				patient,
				appointment,
			});
			}}
				
			/>
			{/* <AddEmergencyCareModal ref={ERCareChoiceRef}/>  */}
			<CreateEmergencyCareModal ref={ERCareChoiceRef}/>
			<CreateTriageModal ref={CreateTriageRef}/> 

			<PrivacyPolicyModal
				ref={privacyRef}
				onSuccess={(data) => {
					createAppointmentRef.current.show({ patient });
				}}
				patientSelfie={patientSelfie}
				setPatientSelfie={setPatientSelfie}
			/>
			<AppointmentChoiceModal
				ref={appointmentChoiceRef}
				onClickConsult={() => {
					privacyRef.current.show({ patient: patient });
				}}
				onClickAhef={() => {}}
				onClickTelemedicine={() => {
					bookTeleMedicineRef.current.show();
				}}
			/>
			<NewAppointmentModal
				ref={bookTeleMedicineRef}
				onClickConsult={() => {
					privacyRef.current.show({ patient: patient });
				}}
				onClickAhef={() => {}}
				onClickTelemedicine={() => {
					bookTeleMedicineRef.current.show();
				}}
			/>
			{/* <ReferToRHUModal 
				ref={referToRHURef}
				// onSuccess={onSuccess}
				patientSelfie={patientSelfie}
				patient={patient}
			/> */}
		</div>
	);
};

export default PatientProfile;
