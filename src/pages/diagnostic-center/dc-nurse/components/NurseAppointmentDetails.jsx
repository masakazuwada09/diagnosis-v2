import  { React, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import CollapseDiv from "../../../../components/CollapseDiv";
import FlatIcon from "../../../../components/FlatIcon";
import PatientVitals from "../../../../components/PatientVitals";

import { formatDateMMDDYYYYHHIIA, keyByValue, doctorName, formatDateTime, dateMMDDYYYY } from "../../../../libs/helpers";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import { v4 as uuidv4 } from "uuid";
import Axios from "../../../../libs/axios";
import CashierApproval from "../../../appointments/components/CashierApproval";
import NurseServices from './NurseServices';
import LaboratoryOrders from './LaboratoryOrders';
import TabGroup from '../../../../components/TabGroup';
import MenuTitle from '../../../../components/buttons/MenuTitle';
import PatientProfileDetails from '../../../../components/PatientProfileDetails';
import PatientPrescriptions from './PatientPrescriptions';
import PatientVitalCharts from '../../../../components/PatientVitalCharts';
import PatientCSROrder from '../../../department/his-nurse/components/PatientCSROrder';
import PatientPharmacyOrder from '../../../department/his-nurse/components/PatientPharmacyOrder';
import MedicalCertificate from './Forms/MedicalCertificate';
import Prescription from './Forms/Prescription';
import ImagingReceipt from '../../dc-imaging/components/ImagingReceipt';
import LaboratoryReceipt from '../../dc-cashier/components/LaboratoryReceipt';
import PrescriptionReceipt from './PrescriptionReceipt';
import TabGroupHorizontal from '../../../../components/TabGroupHorizontal';

const uniq_id = uuidv4();
/* eslint-disable react/prop-types */
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-row gap-2 items-center ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize ">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center gap-2">
				
				<span
					className={`capitalize gap-1 text-slate-900 font-mono flex text-base  ${valueClassName} `}
				>
					{value}
				</span>
			</div>
		</div>
	);
};

const NurseAppointmentDetails = ({
	appointment: propAppointment,
	forCashier = false,
	forBilling = false,
	forHousekeeping = false,
	setOrder,
	hideServices = false,
	mutateAll,
	data,
}) => {
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	const [appointment, setAppointment] = useState(propAppointment);
	const [loading, setLoading] = useState(false);
	const imagingReceiptRef = useRef(null);
	const laboratoryReceiptRef = useRef(null);
	const [key, setKey] = useState(uniq_id);
	const [patient, setPatient] = useState(null);
	const [showData, setShowData] = useState(null);
	const pendingOrdersRef = useRef(null);
	const patientProfileRef = useRef(null);
	const printMedicalCertificate = useRef(null);
	const printPrescription = useRef(null);
	const printPrescriptionRef = useRef(null);
	const show = (data) => {
		setFull(false);
		setShowData(data);
		setPatient(data?.patient);
		setModalOpen(true);
	};
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				if (appointment?.social_history) {
					Object.keys(appointment?.social_history).map((key) => {
						console.log(
							"appointment?.social_history[key]",
							key,
							appointment?.social_history[key]
						);
						setValue(key, appointment?.social_history[key]);
					});
				}
			}, 1500);
		},
		params: [appointment?.id, key],
	});
	const appointmentStatus = () => {
		if (appointment?.status == "pending" && appointment?.vital_id == null) {
			return (
				<span className="text-orange-500">
					Pending for patient vitals {appointment?.vital_id}
				</span>
			);
		}
		if (appointment?.status == "pending" && appointment?.vital_id != null) {
			return <span className="text-orange-600">Pending for service</span>;
		}
		if (appointment?.status == "pending-for-his-release") {
			return <span className="text-red-600">Pending for release</span>;
		}
		return (
			<span className="text-red-600 uppercase">
				{String(appointment?.status).replaceAll("-", " ")}
			</span>
		);
	};
	const refreshData = () => {
		Axios.get(`v1/clinic/get-appointment/${appointment?.id}`).then(
			(res) => {
				setAppointment(res.data.data);
				setKey(uuidv4());
			}
		);
	};


	return (
		<div className="flex flex-col mt-4 overflow-auto">
			
							<TabGroupHorizontal
								tabClassName={`py-1 shadow-lg `}
								contentClassName={
									"h-[670px] "
											} contents={[
											{
									title: (
											<MenuTitle src="/public/medical-report.png">
														Diagnosis Data
															</MenuTitle>
											),

							content: (
								<div className="flex flex-col gap-y-4 px-4 border-x border-b rounded-b-xl border-indigo-100  pb-4 ">
									<div className='flex flex-row justify-end gap-2 '>
										
									{/* <ActionBtn
										className="relative text-gray-700 flex items-center cursor-pointer rounded-lg gap-2 w-[200px] "
										onClick={() => printMedicalCertificate.current.show({...data, appointment})}
										type="foreground-dark"
										
									>
										<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-ping"></span>
										<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-pulse"></span>
										<span className="absolute top-0 right-0 rounded-xl h-full w-full border border-red-500 animate-pulse"></span>
										
									<FlatIcon icon="rs-document" />
									Certificate Available					
									</ActionBtn> */}


									
									
									</div>
									
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4  ">

			
							<InfoText
								className="lg:col-span-6"
								label="Initial Diagnosis:"
								value={appointment?.post_notes}
							/>
							
							<InfoText
								className="lg:col-span-6"
								label="Date:"
								value={formatDateMMDDYYYYHHIIA(
									new Date(appointment?.created_at)
								)}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Chief complaint:"
								value={appointment?.pre_notes}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Doctor:"
								valueClassName=" !uppercase"
								value={doctorName(data?.referredToDoctor)}
							/>
							{/* <InfoText
								className="lg:col-span-6"
								label="Reason for appointment:"
								value={appointment?.reason}
							/> */}
							<InfoText
								className="lg:col-span-6"
								label="Doctor:"
								valueClassName=" !uppercase"
								value={appointment?.mode_of_consultation}
							/>
							
							
							
							{/* <InfoText
								className="lg:col-span-12"
								label="Laboratory Findings (Including ECG, X-ray, and other diagnostic procedures):"
								value={appointment?.lab_findings}
							/> */}
							
						</div>





						<CollapseDiv
							defaultOpen={
								appointment.status == "pending" &&
								appointment?.vital_id == null
							}
							withCaret={true}
							title="Patient Vitals"
							headerClassName=""
							bodyClassName="p-0"
							
						>
							<PatientVitals
								
								showTitle={false}
								appointment={appointment}
								patient={appointment?.patient}
								mutateAll={mutateAll}
								onSuccess={() => {
									refreshData();
								}}
							/>
						</CollapseDiv>

						{/* <CollapseDiv
							defaultOpen={
								appointment.status == "pending" &&
								appointment?.vital_id == null
							}
							withCaret={true}
							title="Laboratory"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
							<LaboratoryOrders
								patient={
								patient
								}
								laboratory_test_type={
								2
								}
								appointment={
								showData
								}
								allowCreate={
								true
								}
								/>
								
						</CollapseDiv> */}


						{!hideServices ? (
                            
							<CollapseDiv
								defaultOpen={
									(appointment.status == "pending" &&
										appointment?.vital_id != null) ||
									appointment?.status ==
										"pending"
								}

								withCaret={true}
								title="Services"
								headerClassName=""
								bodyClassName="p-0 "
							>

								{forCashier ? (
									<CashierApproval
										setAppointment={setOrder}
										showTitle={false}
										appointment={appointment}
										patient={appointment?.patient}
										mutateAll={mutateAll}
									/>
								) : (
									<NurseServices
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
									/>
								)}
								{/* {forBilling ? (
									<BillingApproval
										setAppointment={setOrder}
										showTitle={false}
										appointment={appointment}
										patient={appointment?.patient}
										mutateAll={mutateAll}
									/>
								) : (
									<PatientServices
										setAppointment={setOrder}
										showTitle={false}
										mutateAll={mutateAll}
										appointment={appointment}
										patient={appointment?.patient}
									/>
								)} */}
							</CollapseDiv>
						) : (
							""
						)}
												</div>
														),
													},
													{
														title: (
															<MenuTitle src="/walk-in-plus.png">
																Profile
															</MenuTitle>
														),

														content: (
															<PatientProfileDetails
																
																patient={appointment?.patient}
																openProfileAction={() => {
																	patientProfileRef.current.show(
																		data
																	);
																}}
															/>
														),
													},

													
													{
														title: (
															<MenuTitle src="/vitals/vitals.png">
																Vital Charts
															</MenuTitle>
														),

														content: (
															<PatientVitalCharts
															patient={appointment?.patient}
															/>
														),
													},
													// {
													// 	title: (
													// 		<MenuTitle src="/healthcare.png">
													// 			Releasing
													// 		</MenuTitle>
													// 	),
													// 	content: (
													// 		<RhuReleasing
													// 			patient={patient}
													// 			setPatient={setPatient}
													// 		/>
													// 	),
													// },

													{
														title: (
															<MenuTitle src="/public/laboratory.png">
																Laboratory
																{JSON.stringify(
																	showData?.lab_orders ||
																		{}
																).includes(
																	`"type":"laboratory-test"`
																) ? (
																	<>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-ping"></span>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-"></span>
																		<span className="absolute top-0 rounded-xl left-0 h-full w-full border border-red-500 animate-pulse"></span>
																	</>
																) : (
																	""
																)}
															</MenuTitle>
														),
														content: (
															<>
															<LaboratoryOrders
																patient={appointment?.patient}
																laboratory_test_type={
																	2
																}
																appointment={
																	appointment}
																allowCreate={
																	true
																}
															/>
															<LaboratoryReceipt
																
																patient={appointment?.patient} 
																onSuccess={() => {
																	reloadData();
																}}
																ref={laboratoryReceiptRef}
															/>
															</>
															
														),
													},
													{
														title: (
															<MenuTitle src="/vitals/laboratory.png">
																Imaging
																{JSON.stringify(
																	showData?.lab_orders ||
																		{}
																).includes(
																	`"type":"imaging"`
																) ? (
																	<>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-ping"></span>
																		<span className="text-white bg-red-600 absolute top-1 right-1 rounded-full w-3 h-3 flex items-center justify-center animate-"></span>
																		<span className="absolute top-0 rounded-xl left-0 h-full w-full border border-red-500 animate-pulse"></span>
																	</>
																) : (
																	""
																)}
															</MenuTitle>
														),
														content: (
															<>
															<LaboratoryOrders
																appointment={
																	showData
																}
																laboratory_test_type={
																	1
																}
																patient={appointment?.patient}
																allowCreate={
																	true
																}
															/>
															<ImagingReceipt
																		patient={appointment?.patient} 
																		appointment={appointment?.id}
																		onSuccess={() => {
																			reloadData();
																		}}
																		ref={imagingReceiptRef}
															/>
															</>
															
															
														),
													},

													{
														title: (
															<MenuTitle src="/healthcare.png">
																Prescriptions
															</MenuTitle>
														),
														content: (
															<>
															<PatientPrescriptions
															patient={appointment?.patient}
															/>
															<Prescription
																patient={appointment?.patient} 
																date={dateMMDDYYYY(
																	new Date(appointment?.created_at)
																	)}
																appointment={appointment?.id}
																onSuccess={() => {
																	onUploadLabResultSuccess();
																	reloadData();
																}}
																ref={printPrescriptionRef}
															/>

			
															</>
															
															
														),
													},
													{
														title: (
															<MenuTitle src="/vitals/prescription.png">
																CSR
															</MenuTitle>
														),
														content: <PatientCSROrder patient={appointment?.patient}/>,
													},
													{
														title: (
															<MenuTitle src="/vitals/prescription.png">
																Pharmacy
															</MenuTitle>
														),
														content: <PatientPharmacyOrder patient={appointment?.patient}/>,
													}
													// {
													// 	title: (
													// 		<MenuTitle src="/landing-page.png">
													// 			Imaging
													// 		</MenuTitle>
													// 	),
													// 	// content: <CisPatientImaging />,
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/prescription.png">
													// 			Prescription
													// 		</MenuTitle>
													// 	),
													// 	// content: ({ setSelectedIndex }) => (
													// 	// 	<div className="px-3 pt-2">
													// 	// 		<PrescriptionMainTab
													// 	// 			patient={patient}
													// 	// 		/>
													// 	// 	</div>
													// 	// ),
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/notes.png">
													// 			Notes
													// 		</MenuTitle>
													// 	),
													// 	// content: <CisNotes patient={patient} />,
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/treatment.png">
													// 			Treatment Plan
													// 		</MenuTitle>
													// 	),
													// 	// content: (
													// 	// 	<CisTreatmentPlan
													// 	// 		patient={patient}
													// 	// 	/>
													// 	// ),
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/certification.png">
													// 			Med Cert
													// 		</MenuTitle>
													// 	),
													// 	// content: (
													// 	// 	<MedicalCertificateList
													// 	// 		patient={patient}
													// 	// 	/>
													// 	// ),
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/form.png">
													// 			Profile form
													// 		</MenuTitle>
													// 	),
													// 	// content: (
													// 	// 	<CisPatientsForm
													// 	// 		patient={patient}
													// 	// 	/>
													// 	// ),
													// },
													// {
													// 	title: (
													// 		<MenuTitle src="/vitals/consulting.png">
													// 			Consultations
													// 		</MenuTitle>
													// 	),
													// 	content: ({ setSelectedIndex }) => (
													// 		<div className="px-3 pt-2">
													// 			{/* <ProfileConsultations
													// 				setSelectedIndex={
													// 					setSelectedIndex
													// 				}
													// 				patient={patient}
													// 			/> */}
													// 		</div>
													// 	),
													// },
												]}
											/>
			
			
			
			

		</div>
		
	);
};

export default NurseAppointmentDetails;
