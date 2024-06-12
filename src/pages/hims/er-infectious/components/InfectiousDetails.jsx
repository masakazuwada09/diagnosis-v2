import { useForm } from "react-hook-form";
import CollapseDiv from "../../../../components/CollapseDiv";
import FlatIcon from "../../../../components/FlatIcon";
import PatientVitals from "../../../../components/PatientVitals";
import {
	generalHistories,
	medicalSurgicalHistories,
	symptoms
} from "../../../../libs/appointmentOptions";
import {
	doctorName,
	doctorSpecialty,
	formatDateMMDDYYYYHHIIA,
	keyByValue,
} from "../../../../libs/helpers";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import TextInputField from "../../../../components/inputs/TextInputField";
import { useEffect, useState } from "react";
import AppointmentStatus from "../../../../components/AppointmentStatus";

/* eslint-disable react/prop-types */
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
					{value} &nbsp;
				</span>
			</div>
		</div>
	);
};
const InfectiousDetails = ({
	showService = true,
	appointment,
	serviceComponent,
	forResult = false,
	customStatus = null,
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
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				if (appointment?.social_history) {
					Object.keys(appointment?.social_history).map((key) => {
						setValue(key, appointment?.social_history[key]);
					});
				}
				// if (appointment?.general_history) {
				// 	Object.keys(appointment?.general_history).map((key) => {
				// 		setValue(key, appointment?.general_history[key]);
				// 	});
				// }

				// if (appointment?.surgical_history) {
				// 	Object.keys(appointment?.surgical_history).map((key) => {
				// 		setValue(key, appointment?.surgical_history[key]);
				// 	});
				// }
				// if (appointment?.environmental_history) {
				// 	Object.keys(appointment?.environmental_history).map(
				// 		(key) => {
				// 			setValue(
				// 				key,
				// 				appointment?.environmental_history[key]
				// 			);
				// 		}
				// 	);
				// }
			}, 1000);
		},
		params: [appointment?.id],
	});

	return (
		<div className="flex flex-col">
			<h4 className="border flex items-center text-base font-bold p-2 mb-0 border-indigo-100 lg:col-span-12">
				<span>Infectious Details</span>
				<span className="ml-auto">
					Status:{" "}
					<b className="uppercase font-normal">
						<AppointmentStatus
							customStatus={customStatus}
							forResult={forResult}
							appointment={appointment}
						/>
					</b>
				</span>
			</h4>
			{appointment?.id ? (
				<>
					<div className="flex flex-col gap-y-4 px-4 border-x border-b rounded-b-xl border-indigo-100 pt-5 pb-4">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 px-4">
							{appointment?.doctor?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="Doctor:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.doctor
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.doctor
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
							{appointment?.referredToDoctor?.name ? (
								<InfoText
									className="lg:col-span-6"
									label="Doctor:"
									value={
										<div className="flex flex-col">
											<span>
												{doctorName(
													appointment?.referredToDoctor
												)}
											</span>
											<span className="text-xs font-light">
												{doctorSpecialty(
													appointment?.referredToDoctor
												)}
											</span>
										</div>
									}
								/>
							) : (
								""
							)}
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
								label="Symptoms:"
								value={appointment?.symptoms}
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
							{/* <InfoText
								className="lg:col-span-12"
								label="Brief Clinical History and Pertinent Physical Examination:"
								value={appointment?.history}
							/> */}
							{/* <InfoText
								className="lg:col-span-12"
								label="Laboratory Findings (Including ECG, X-ray, and other diagnostic procedures):"
								value={appointment?.lab_findings}
							/> */}
						</div>
						

						{/* <CollapseDiv
							defaultOpen={
								appointment?.status == "pending" &&
								appointment?.vital_id == null
							}
							withCaret={true}
							title="Patient Vitals"
							headerClassName="bg-blue-50"
							bodyClassName="p-0"
							>
							<PatientVitals
								showTitle={false}
								appointment={appointment}
								patient={appointment?.patient}
							/>
						</CollapseDiv> */}



						{showService &&
						(appointment?.vital_id ||
							appointment?.has_for_reading?.length) ? (

							<CollapseDiv
								defaultOpen={true}
								withCaret={true}
								title="Services"
								headerClassName="bg-blue-50"
								bodyClassName="p-0"
							>
								{serviceComponent}
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
	);
};

export default InfectiousDetails;
