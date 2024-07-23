/* eslint-disable react/prop-types */
import React, { useState, useImperativeHandle } from 'react'
import { v4 as uuidv4 } from "uuid";
import Axios from '../../../../libs/axios';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import { useForm } from 'react-hook-form';
import FlatIcon from '../../../../components/FlatIcon';
import PatientServices from '../../../../components/modal/PatientServices';
import BillingApproval from './BillingApproval';
import CollapseDiv from '../../../../components/CollapseDiv';
import { symptoms } from '../../../../libs/appointmentOptions';
import { formatDateMMDDYYYYHHIIA, keyByValue } from '../../../../libs/helpers';
import AppointmentStatus from '../../../../components/AppointmentStatus';
import TabGroup from '../../../../components/TabGroup';
import MenuTitle from '../../../../components/buttons/MenuTitle';
import PatientProfileDetails from '../../../../components/PatientProfileDetails';

import ClaimForm1 from './ClaimForm1';
import ClaimForm2 from './ClaimForm2';
import ClaimForm3 from './ClaimForm3';
import ClaimForm4 from './ClaimForm4';

import PMRF from './PMRF';
const uniq_id = uuidv4();
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
const AppointmentDetailsForBilling = (
	
	{
    appointment: propAppointment,
	ref,
	forBilling = false,
	setOrder,
	hideServices = false,
	mutateAll,
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
	const [patient, setPatient] = useState(null);
	const [showData, setShowData] = useState(null);
	const [key, setKey] = useState(uniq_id);
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


	const cashierApproval = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("_method", "PATCH");

		Axios.post(
			`v1/clinic/send-from-cashier-to-nurse-for-release/${appointment?.id}`,
			formdata
		)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				if (mutateAll) {
					mutateAll();
				}
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient sent to OPD Nurse!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setFull(false);
		setShowData(data);
		setPatient(data?.patient);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};


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
		if (appointment?.status == "pending-for-bhw-release") {
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
    <div className="flex flex-col">
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
						<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Claims Details"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
						>
							<div>
											<TabGroup
												tabClassName={`py-3 bg-slate-100 border-b`}
												contentClassName={
													"max-h-[unset]"
												}
												contents={[
													// {
													// 	title: (
													// 		<MenuTitle src="/profile.png">
													// 			Appointment Data
													// 		</MenuTitle>
													// 	),

													// 	content: (
													// 		<AppointmentData
													// 			appointment={
													// 				showData
													// 			}
													// 			mutateAll={() => {
													// 				mutateAll();
													// 				hide();
													// 			}}
													// 			patient={
													// 				patient
													// 			}
													// 		/>
													// 	),
													// },
													{
														title: (
															<MenuTitle src="/profile.png">
																CSF
															</MenuTitle>
														),

														content: (
															<ClaimForm1
															loading={loading}
															onSave={cashierApproval}
															patient={appointment?.patient}
															appointment={appointment}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																CF-2
															</MenuTitle>
														),

														content: (
															<ClaimForm2
																appointment={showData}
																patient={
																	patient

																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																CF-3
															</MenuTitle>
														),

														content: (
															<ClaimForm3
																appointment={showData}
																patient={
																	patient

																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																CF-4
															</MenuTitle>
														),

														content: (
															<ClaimForm4
																appointment={showData}
																patient={
																	patient

																}
															/>
														),
													},
													{
														title: (
															<MenuTitle src="/profile.png">
																PMRF
															</MenuTitle>
														),

														content: (
															<PMRF
																appointment={showData}
																patient={
																	patient

																}
															/>
														),
													},

													
												]}
											/>
										</div>
						</CollapseDiv>
						{appointment?.post_notes == "Tuberculosis" &&
						appointment.tb_symptoms != null ? (
							<CollapseDiv
								defaultOpen={
									appointment?.post_notes == "Tuberculosis" &&
									appointment.tb_symptoms != null
								}
								withCaret={true}
								title="Patient TB Symtoms"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{appointment?.tb_symptoms != null ? (
									<div className="flex flex-col gap-1 mt-0 pb-2 !shadow-yellow-600 rounded-sm bg-white">
										<ul className="w-1/2">
											{symptoms?.map((symp) => {
												return (
													<li
														className="!text-xs flex justify-between"
														key={`${keyByValue(
															symp.label
														)}`}
													>
														<span>
															{symp.label} -{" "}
														</span>
														<b className="text-center">
															{appointment
																?.tb_symptoms[
																symp.value
															]
																? "YES"
																: "no "}
														</b>
													</li>
												);
											})}
										</ul>
									</div>
								) : (
									""
								)}
							</CollapseDiv>
						) : (
							""
						)}

						{!hideServices ? (
							<CollapseDiv
								defaultOpen={
									(appointment.status == "pending" &&
										appointment?.vital_id != null) ||
									appointment?.status ==
										"pending-for-billing-release"
								}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{/* {forCashier ? (
									<CashierApproval
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
								{forBilling ? (
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
                                   
								)}
							</CollapseDiv>
						) : (
							""
						)}
					</div>
				</>
			) : (
				""
			)}
		</div>
  )
}

export default AppointmentDetailsForBilling
