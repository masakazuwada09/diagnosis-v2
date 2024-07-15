import React, { useRef, useState } from 'react'
import ReferToSPHModal from '../../../../components/modal/ReferToSPHModal';
import InServiceER from '../../his-er/InServiceER';
import AppointmentDetailsForNurse from '../../../appointments/components/AppointmentDetailsForNurse';
import PatientInfo from '../../../patients/components/PatientInfo';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { Fade } from 'react-reveal';
import { patientFullName } from '../../../../libs/helpers';
import InQueueRegular from '../../../patient-queue/components/InQueueRegular';
import InQueueForRelease from '../../../patient-queue/components/InQueueForRelease';
import AppLayout from '../../../../components/container/AppLayout';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import useDoctorQueue from '../../../../hooks/useDoctorQueue';
import { useAuth } from '../../../../hooks/useAuth';
import useERQueue from '../../../../hooks/useERQueue';
import OPDAppointmentDetails from './OPDAppointmentDetails';
import AddPrescription from '../../../doctor-patient-referrals/components/AddPrescription';
import AppointmentStatus from '../../../../components/AppointmentStatus';
import { formatDateMMDDYYYYHHIIA } from '../../../../libs/helpers';
import FlatIcon from '../../../../components/FlatIcon';

const Status = ({ appointment }) => {
	const renderStatus = () => {
		if (appointment?.has_for_reading?.length > 0) {
			return (
				<span className="text-orange-500">
					Pending for Result Reading
				</span>
			);
		}
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
		if (
			appointment?.status == "pending-doctor-confirmation" &&
			appointment?.vital_id != null &&
			appointment?.referred_to != null
		) {
			return (
				<span className="text-orange-600">
					Pending for doctor&apos;s confirmation
				</span>
			);
		}
		if (
			appointment?.status == "pending-for-pharmacy-release" &&
			appointment?.prescribed_by == null
		) {
			return (
				<span className="text-orange-600">For Doctor Prescription</span>
			);
		}
		if (
			appointment?.status == "pending-for-pharmacy-release" &&
			appointment?.prescribed_by != null
		) {
			return (
				<span className="text-orange-600">For Medicine release</span>
			);
		}
		if (appointment?.status == "in-service-consultation") {
			return (
				<span className="text-orange-600">
					CONSULTATION WITH DOCTOR
				</span>
			);
		}
		if (appointment?.status == "in-service-surgery") {
			return (
				<span className="text-orange-600">
					For Surgery
				</span>
			);
		}
		return (
			<span className="text-red-600 uppercase">
				{String(appointment?.status).replaceAll("-", " ")}
			</span>
		);
	};
	return renderStatus();
};

const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value}
				</span>
			</div>
		</div>
	);
};

const OPDQueueOld = () => {
	const { user } = useAuth();
	const [diagnosis, setDiagnosis] = useState(null);
	const [loading, setLoading] = useState(false);
	const [procedure, setProcedure] = useState(null);
	const [items, setItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useDoctorQueue();
	const {
		pending,
		pendingForRelease,
		mutatePendingForRelease,
		mutatePendingPatient,
		mutateNowServingPatient,
	} = useERQueue();
	const referToSphModalRef = useRef(null);
	const [appointment, setAppointment] = useState(null);
	useNoBugUseEffect({
		functions: () => {},
	});

	const isDoctor = () => {
		return user?.type == "his-doctor" || user?.type == "HIS-DOCTOR";
	};

	const sortPendingList = (list) => {
		// Sort by priority: pending vitals first, then by id descending
		return (list || []).sort((a, b) => {
			if (a.status === "pending" && a.vital_id === null) return -1;
			if (b.status === "pending" && b.vital_id === null) return 1;
			return b.id - a.id;
		});
	};

	const listPending = () => {
		const pendingList = isDoctor() ? doctorsPending?.data : pending?.data;
		return sortPendingList(pendingList);
	};

	const sortedPendingForRelease = () => {
		return sortPendingList(pendingForRelease?.data);
	};

	const mutateAll = () => {
		mutatePending();
		mutatePendingForResultReading();
		mutateNowServing();
		mutatePendingForRelease();
		//mutatePendingPatient();
		//mutateNowServingPatient();
	};

	const prescribeItems = () => {
		setLoading(true);
		const formData = new FormData();
		if (appointment?.bhs_id > 0) {
			formData.append("type", "bhs");
		}
		if (appointment?.rhu_id > 0) {
			formData.append("type", "rhu");
		}
		formData.append("appointment_id", appointment?.id);
		formData.append("_method", "PATCH");
		if (diagnosis) formData.append("diagnosis_code", diagnosis);
		if (procedure) formData.append("procedure_code", procedure);
		selectedItems.map((data) => {
			console.log("selectedItemsselectedItems", data);
			formData.append("inventory_id[]", data?.item?.inventory?.id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.notes || " ");
		});
		// return;
		Axios.post(`/v1/clinic/tb-prescribe/${appointment?.id}`, formData)
			.then((res) => {
				// addToList(data);
				setTimeout(() => {
					setLoading(false);
					toast.success("Prescription added successfully!");
					mutateAll();
				}, 400);
			})
			.finally(() => {
				setLoading(false);
			});
		console.log("SUBMIT PRESCRIPTION");
	};

	return (
		<AppLayout>
			<div className="p-4 h-full overflow-auto">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for service
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{listPending()?.map((queue, index) => (
								<InQueueRegular
									referAction={() => {
										referToSphModalRef.current.show(queue);
									}}
									onClick={() => {
										if (queue.status != "pending-doctor-consultation") {
											setAppointment(queue);
											
										} if (queue.status != "pending-surgery") {
											setAppointment(queue);
										}
										
										else {
											setAppointment(null);
										}
									}}
									selected={queue?.id == appointment?.id}
									key={`iq2-${queue.id}`}
									number={`${queue.id}`}
									patientName={patientFullName(queue?.patient)}
								>
									<div className="w-full flex flex-col pl-16">
										<div className="flex items-center text-slate-700 gap-2 mb-2">
											<span className="text-sm">Status:</span>
											<span className="font-bold text-sm">
												<Status appointment={queue} />
											</span>
										</div>
									</div>
								</InQueueRegular>
							))}
							{sortedPendingForRelease()?.map((queue, index) => (
								<InQueueForRelease
									selected={queue?.id == appointment?.id}
									onClick={() => {
										setAppointment(queue);
									}}
									key={`iqr-${queue.id}`}
									number={`${queue.id}`}
									patientName={patientFullName(queue?.patient)}
								>
									<div className="w-full flex flex-col pl-16">
										<div className="flex items-center text-slate-700 gap-2 mb-2">
											<span className="text-sm">Status:</span>
											<span className="font-bold text-sm text-red-600">
												{"PENDING FOR RELEASE"}
											</span>
										</div>
									</div>
								</InQueueForRelease>
							))}
							
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center">
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<span className="mb-3 noto-sans-thin text-slate-500 text-sm font-light">
							&nbsp;
						</span>
						<div>
							{appointment?.patient ? (
								<Fade key={`order-${appointment?.id}`}>
									<div>
										<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
											<span>Patient Information</span>
											<ActionBtn
												className="ml-auto"
												type="danger"
												onClick={() => {
													setAppointment(null);
												}}
											>
												Close
											</ActionBtn>
										</h4>

										<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-4">
											<PatientInfo patient={appointment?.patient} />
										</div>
										<div className="pb-4">

										<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
											<span>Appointment Information</span>
											<span className="ml-auto">
												Status:{" "}
												<b className="uppercase font-normal">
													<AppointmentStatus appointment={appointment} />
												</b>
											</span>
										</h4>
			{appointment?.id ? (
				<>
					<div className="flex flex-col gap-y-4 px-4 border-x border-b rounded-b-xl border-indigo-100 pt-5 pb-4">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4">
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
								label="Reason for appointment:"
								value={appointment?.reason}
							/>
							<InfoText
								className="lg:col-span-6"
								label="Mode of consultation:"
								valueClassName=" !uppercase"
								value={appointment?.mode_of_consultation}
							/>
							<InfoText
								className="lg:col-span-6"
								label="PHIC ID:"
								value={appointment?.phic_no}
							/>
							<InfoText
								className="lg:col-span-12"
								label="Brief Clinical History and Pertinent Physical Examination:"
								value={appointment?.history}
							/>
							<InfoText
								className="lg:col-span-12"
								label="Laboratory Findings (Including ECG, X-ray, and other diagnostic procedures):"
								value={appointment?.lab_findings}
							/>

							</div>
							</div>
							</>
							) : (
								""
							)}
						
					

								<AddPrescription
									diagnosis={diagnosis}
									setDiagnosis={setDiagnosis}
									procedure={procedure}
									setProcedure={setProcedure}
									items={items}
									setItems={setItems}
									selectedItems={selectedItems}
									setSelectedItems={setSelectedItems}
									prescribeItems={prescribeItems}
									loading={loading}
								/>

								
										</div>
									</div>
								</Fade>
							) : (
								""
							)}
						</div>
						{appointment?.id ? (
							""
						) : (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
								{doctorsNowServing?.data?.map((data) => (
									<InServiceER
										key={`PQInServiceItem-${data?.id}`}
										data={data}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<ReferToSPHModal ref={referToSphModalRef} />
		</AppLayout>
	);
};

export default OPDQueueOld;
