import  { React, useRef, useState, forwardRef, useImperativeHandle, } from 'react'
import { Controller, useForm } from "react-hook-form";
import ReferToSPHModal from '../../../../components/modal/ReferToSPHModal';
import InServiceER from '../../../hims/his-er/InServiceER';
import AppointmentDetailsForNurse from '../../../appointments/components/AppointmentDetailsForNurse';
import PatientInfo from '../../../patients/components/PatientInfo';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { Fade } from 'react-reveal';
import { patientFullName, formatDateTime, patientRoomNumber } from '../../../../libs/helpers';
import InQueueRegular from '../../../hims/his-opd/components/InQueueRegular';
import InQueueForRelease from '../../../patient-queue/components/InQueueForRelease';
import AppLayout from '../../../../components/container/AppLayout';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import useDoctorQueue from '../../../../hooks/useDoctorQueue';
import { useAuth } from '../../../../hooks/useAuth';
import useOPDQueue from '../../../../hooks/useOPDQueue';
import OPDAppointmentDetails from '../../../hims/his-opd/components/OPDAppointmentDetails';
import NurseAppointmentDetails from './NurseAppointmentDetails';
import FlatIcon from '../../../../components/FlatIcon';
import PendingOrdersModal from '../../../../components/PendingOrdersModal';






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

const NurseQueue = (props, ref) => {
	const { user } = useAuth();
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useDoctorQueue();
	
	const patientProfileRef = useRef(null);
	const acceptPatientRef = useRef(null);
	
	const { pending, nowServing } = useOPDQueue();
	// useImperativeHandle(ref, () => ({
	// 	show: show,
	// 	hide: hide,
	// }));
	// const show = (data) => {
	// 	setFull(false);
	// 	setShowData(data);
	// 	setPatient(data?.patient);
	// 	setModalOpen(true);
	// };
	// const hide = () => {
	// 	setModalOpen(false);
	// };
	const {
		
		pendingForRelease,
		mutatePendingForRelease,
		mutatePendingPatient,
		mutateNowServingPatient,
	} = useOPDQueue();
	
	const referToSphModalRef = useRef(null);
	const [appointment, setAppointment] = useState(null);

	const [showData, setShowData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingDone, setLoadingDone] = useState(false);
	const pendingOrdersRef = useRef(null);
	
	useNoBugUseEffect({
		functions: () => {},
	});

	const isDoctor = () => {
		return user?.type == "his-md" || user?.type == "HIS-MD";
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

	const sendPatientToLab = () => {
		setLoading(true);
		Axios.post(
			`/v1/doctor/laboratory-order/send-patient-to-laboratory/${showData?.id}`,
			{
				_method: "PATCH",
			}
		).then((res) => {
			if (res?.data?.pending_lab_orders?.length == 0) {
				toast.error("Error! NO PENDING LABORATORY ORDER.");
			} else {
				toast.success(
					"Success! Patient sent to Laboratory for test(s)."
				);
				setLoading(false);
				mutateAll();
				hide();
			}
		});
	};

	return (
		<AppLayout>
			<div className="p-4 h-full ">
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
									date={formatDateTime(
									new Date(queue?.created_at)
									)}
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
									date={formatDateTime(
									new Date(queue?.created_at)
									)}
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
											<span className={`font-bold text-sm text-orange-600 ${
				selected
					? "!bg-green-50 !border-green-800 text-green-600 shadow-green-500 "
					: ""
			}`}>
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
										<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12 ">
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
										<div className="flex flex-col lg:flex-row gap-2 border-indigo-100 p-4 bg-slate-100">
									
											<PatientInfo 
											mutateAll={mutateAll}
											patient={appointment?.patient} 
											appointment={appointment}
											/>
											
											<div className="flex items-center justify-end  w-1/2 flex-wrap gap-3 ml-auto ">
												{showData?.status ==
												"pending" ? (
													<>
														""
													</>
												) : (
													<ActionBtn
															type="secondary"
															loading={loading}
															size="lg"
															patient={appointment?.patient}
															appointment={appointment}
															onClick={() => {
																if (
																	pendingOrdersRef
																) {
																	console.log(
																		"pendingOrdersRef",
																		pendingOrdersRef
																	);
																	pendingOrdersRef?.current.show(
																		{
																			data: showData,
																			fn: sendPatientToLab,
																		}
																	);
																	hide();
																}
															}}
															className="px-4"
														>
															<FlatIcon
																className="text-3xl mr-1	rotate-icon"
																icon="rr-right"
															/>
															<div className="flex flex-col text-left">
																<span className="font-bold -mb-1">
																	Send Order
																</span>
																<span className="text-[10px] font-light">
																	laboratory/imaging
																</span>
															</div>
														</ActionBtn>
												)}

												
														

												<ActionBtn
												loading={loadingDone}
												type="teal"
												size="lg"
												onClick={() => {
													markAsDone();
												}}
												className="px-4"
												>
												<FlatIcon
													className="text-3xl mr-1 rotate-icon"  // Add a specific class for rotation
													icon="fi fi-rr-shield-check"
												/>
												<div className="flex flex-col text-left">
													<span className="font-bold -mb-1">
													Consultation
													Done
													</span>
													<span className="text-[10px] font-light">
													Patient is
													free to go
													</span>
												</div>
												</ActionBtn>
											</div>	
											

										</div>
										<div className="pb-4">
											
										
											
											

							<div className="grid grid-cols-1 lg:grid-cols-1 gap-4 shadow-lg px-12 ">

								<NurseAppointmentDetails
								appointment={appointment}
								mutateAll={mutateAll}
								setOrder={(data) => {
									if (data == null) {
										// mutateAll();
									}
									setAppointment(data);
								}}
								openProfileAction={() => {
									patientProfileRef.current.show(
										data
									);
								}}
							/>

							
							
						</div>
						
						
											
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
			<PendingOrdersModal ref={pendingOrdersRef} />
		</AppLayout>
	);
};

export default NurseQueue;
