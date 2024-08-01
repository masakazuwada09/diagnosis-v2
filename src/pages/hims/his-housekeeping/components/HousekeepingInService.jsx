import React, {useState} from "react";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import { patientFullName, patientRoomNumber, dateToday } from "../../../../libs/helpers";
import InfoTextForPrint from "../../../../components/InfoTextForPrint";
import { sanitaryOptions, accessWasteOptions, generalHistories, medicalSurgicalHistories, environmentalHistories } from "../../../../libs/appointmentOptions";
import { Controller, useForm } from 'react-hook-form';
import { keyByValue } from "../../../../libs/helpers";
import TextInputField from "../../../../components/inputs/TextInputField";
import { Bed, Restroom } from "../../../../libs/housekeeping";
import TextAreaField from "../../../../components/inputs/TextAreaField";
import ReactSelectInputField from "../../../../components/inputs/ReactSelectInputField";

const patient_bed = Bed?.map((data) => data?.name);
/* eslint-disable react/prop-types */
const HouseKeepingInService = ({
	room = "1",
	data,
	openProfileAction,
	labOrdersStr = "",
	patientQueueName = "#1 - John Doe",
	doctor = {
		title: "Dr.",
		name: "Tanya White",
		specialty: "Cardiologists",
	},
	
}) => {
	const isForResultReading = () => {
		return (
			data?.status == "in-service-result-reading" ||
			data?.has_for_reading?.length
		);
	};
	const [hasBed, setHasBed] = useState(0);
	const [loading, setLoading] = useState(false);
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

	const onBedChecked = (name) => {
		console.log("onBedChecked");
		setHasBed(
			getValues(patient_bed).filter((x) => x == true).length
		);
	};
	

	const sendToInfectious = (data) => {
		setLoading(true);
		const formData2 = new FormData();
		console.log("SUBMIT DATA Infectiousss >>>>>>>>>>>>>>>>>>>>>>>>>", data);
			
			
		formData2.append(
			"chest_pain_discomfort_heaviness",
			data?.chest_pain_discomfort_heaviness
		);
		formData2.append("difficulty_breathing", data?.difficulty_breathing);
		formData2.append("seizure_convulsion", data?.seizure_convulsion);
		formData2.append(
			"unconscious_restless_lethargic",
			data?.unconscious_restless_lethargic
		);
		formData2.append(
			"not_oriented_to_time_person_place",
			data?.not_oriented_to_time_person_place
		);
		formData2.append(
			"bluish_discoloration_of_skin_lips",
			data?.bluish_discoloration_of_skin_lips
		);
		formData2.append(
			"act_of_self_harm_suicide",
			data?.act_of_self_harm_suicide
		);
		formData2.append(
			"acute_fracture_dislocation_injuries",
			data?.acute_fracture_dislocation_injuries
		);
		formData2.append("signs_of_abuse", data?.signs_of_abuse);
		formData2.append("severe_abdominal_pain", data?.severe_abdominal_pain);
		formData2.append("persistent_vomiting", data?.persistent_vomiting);
		formData2.append("persistent_diarrhea", data?.persistent_diarrhea);
		formData2.append(
			"unable_to_tolerate_fluids",
			data?.unable_to_tolerate_fluids
		);
		// formData2.append("_method", "PATCH");
	
			Axios.post(`/v1/clinic/appointments`, formData2)
				.then((response) => {
					let data = response.data;
					// console.log(data);
					setTimeout(() => {
						setAppointment(null);
					}, 100);
					setTimeout(() => {
						toast.success("Patient referral success!");
						setLoading(false);
						onSuccess && onSuccess();
					}, 200);
					hide();
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		};
	
	return (
		<div
			className={`flex flex-col border  p-1 rounded-xl ${
				isForResultReading()
					? " bg-orange-50 border-orange-100 "
					: " bg-green-50 border-blue-100 "
			}`}
		>
			{isForResultReading() ? (
				<span className=" text-red-500 text-center italic rounded-xl  text-xs">
					Pending{" "}
					<span className="text-red-500 font-medium ">
						for
						{labOrdersStr.includes(`"type":"imaging"`) &&
						labOrdersStr.includes(`"type":"laboratory-test"`)
							? " IMAGING and LABORATORY "
							: labOrdersStr.includes(`"type":"imaging"`)
							? " IMAGING "
							: " LABORATORY "}
						result reading
					</span>
				</span>
			) : (
				""
			)}
			<div className="grid grid-cols-1 lg:grid-cols-2 divide-x ">
				<div className="flex flex-col justify-center items-center">
                <span className="font-light text-sm text-slate-600 mb-1">
						Patient
					</span>
					<h2
						className={`text-3xl tracking-tight text-center font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-success"
						} -mb-1`}
					>
						{`#${data?.id} - ${patientFullName(data?.patient)}`}
					</h2>
					<span className="font-light text-sm text-slate-600 mb-1 ">
						Room No
					</span>
					
					<h2
						className={`text-3xl font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-success"
						} -mb-1`}
					>
						
						{/* {` ${patientRoomNumber(data?.room?.name)}`} */}
						{data?.room_number}

					</h2>
					
				</div>
                <div className="grid grid-cols-1">

				<div className="m-2 w-full px-5 pt-5 text-md">
						
						<InfoTextForPrint
							contentClassName="text-sm"
							title="Date"
							value={dateToday()}
						/>

						<InfoTextForPrint
							contentClassName="text-sm mt-2"
							title="Room"
							value={data?.room_number}
							
						/>

						<InfoTextForPrint
							contentClassName="text-sm"
							title="Philhealth no."
							value={data?.philhealth}
						/>

						<InfoTextForPrint
							contentClassName="text-sm"
							title="Account No."
							// value={patient?.civil_status}
						/>

						<InfoTextForPrint
							contentClassName="text-sm"
							title="Contact No."
							// value={patient?.civil_status}
						/>

						<InfoTextForPrint
							contentClassName="text-sm"
							title="Ward"
							// value={patient?.civil_status}
						/>
						<InfoTextForPrint
							contentClassName="text-sm"
							title="OR Number"
							value={""}
						/>
						<InfoTextForPrint
							contentClassName="text-sm"
							title="Amount"
							// value={patient?.civil_status}
						/>
						<InfoTextForPrint
							contentClassName="text-sm"
							title="CERTIFIED CORRECT BY"
							// value={user?.name}
						/>
						

					</div>
                        

						
						<div className="mt-8 mr-4 px-5">
							
							
						


						</div>
					</div>
                    <div className="grid grid-cols-2">
						<div className="mt-4 ml-4">
							
						
						
						</div>
						
					</div> 
				<div className="flex flex-col justify-center items-center">
					
				</div>
			</div>
{/* 
			<span className="text-blue-600 text-sm font-bold px-2">
													Access to sanitary toilet
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{sanitaryOptions?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="radio"
																		value={String(
																			data?.label
																		)
																			.toLowerCase()
																			.replace(
																				/\s/g,
																				""
																			)}
																		{...register(
																			"access_to_sanitary_toilet",
																			{}
																		)}
																	/>
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
														}
													)}
												</div>

												<span className="text-blue-600 text-sm font-bold px-2">
													Access to satisfactory waste
													disposal
												</span>

												
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													{accessWasteOptions?.map(
														(data) => {
															return (
																<label
																	className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600"
																	key={`${keyByValue(
																		data?.label
																	)}`}
																>
																	<input
																		type="radio"
																		{...register(
																			"satisfactory_waste_disposal",
																			{}
																		)}
																		value={String(
																			data?.label
																		)
																			.toLowerCase()
																			.replace(
																				/\s/g,
																				""
																			)}
																	/>
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
														}
													)}
												</div>

												<span className="text-blue-600 text-sm font-bold px-2">
													Prolonged exposure to
													biomass fuel for cooking
													(charcoal, firewood,
													sawdust, animal manure, or
													crop residue)
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="no"
															{...register(
																"prolong_exposure_biomass_fuel",
																{}
															)}
														/>
														<span>No</span>
													</label>
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"prolong_exposure_biomass_fuel",
																{}
															)}
														/>
														<span>Yes</span>
													</label>
												</div>
												<span className="text-blue-600 text-sm font-bold px-2">
													Exposure to tobacco or vape
												</span>
												<div className="p-2 gap-4 flex items-center flex-wrap mb-3">
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"exposure_tabacco_vape",
																{}
															)}
														/>
														<span>No</span>
													</label>
													<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
														<input
															type="radio"
															value="yes"
															{...register(
																"exposure_tabacco_vape",
																{}
															)}
														/>
														<span>
															Yes, by whom?
														</span>
														<TextInputField
															placeholder="by whom?"
															{...register(
																"exposure_tabacco_vape_details",
																{}
															)}
														/>
													</label>
												</div> */}

											

							<h4 className="border-y-2 text-base font-bold p-2 mb-4">
													Patient's Bed
												</h4>
											

											<div className="lg:col-span-12">
												
												<div className="table table-bordered w-full">
													<table className="bordered">
														<thead>
															<tr>
																<th className="w-1/5">
																	Click if
																	Bed has
																	issues
																</th>
																<th className="flex justify-center">
																	Issue Details
																	(i.e.
																	)
																</th>
															</tr>
														</thead>
														<tbody>
												


														{/* {Bed?.map(
															(data, index) => {
																if (index)
																	return (
																		<tr
																			key={`${keyByValue(
																				data?.label
																			)}`}
																			onClick={() => {
																				setTimeout(
																					() => {
																						onBedChecked(
																							data?.name
																						);
																					},
																					50
																				);
																			}}
																		>
																			<td className="!py-0 align-middle">
																				<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																					<input
																						type="checkbox"
																						{...register(
																							data?.name,
																							{}
																						)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																			</td>
																			<td className="p-1">
																				<TextInputField
																					inputClassName="bg-white"
																					placeholder={`${data?.label} details...`}
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`,
																						{}
																					)}
																				/>
																			</td>
																			<td className="!py-0 align-middle">
																				<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																					<input
																						type="checkbox"
																						{...register(
																							data?.name,
																							{}
																						)}
																					/>
																					<span>
																						
																					</span>
																				</label>
																			</td>
																			<td className="p-1">
																				<TextInputField
																					inputClassName="bg-white"
																					placeholder={`${data?.label} details...`}
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`,
																						{}
																					)}
																				/>
																			</td>
																		</tr>
																	);
																}
															)}
 														*/}




												{Bed?.map(
													(data, index) => {
														if (index % 0 != 0)
															return (
																<tr
																			key={`${keyByValue(
																				data?.label
																			)}`}
																			
																		>

																	<td className="!py-0 align-middle">
																				<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600" 
																				onClick={() => {
																					setTimeout(
																						() => {
																							onBedChecked(
																								data?.name
																							);
																						},
																						50
																					);
																				}}
																				>
																					<input
																						type="checkbox"
																						{...register(
																							data?.name,
																							{}
																						)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																			</td>

																			<td className="p-1">
																				<TextInputField
																					inputClassName="bg-white"
																					placeholder={`${data?.label} details...`}
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`,
																						{}
																					)}
																				/>
																			</td>
																			
																			
																	
																
																</tr>
															);
													}
												)}
														</tbody>
													</table>
												</div>

											</div>
									{/* {hasBed > 4 ? (
										<div className="lg:col-span-12">
											<h4 className="border-y-2 text-base font-bold p-2 mb-4 lg:col-span-12">
												Has Issues
											</h4>
											<Controller
												name="health_unit_id"
												control={control}
												rules={{
													required: {
														value: true,
														message:
															"This field is required",
													},
												}}
												render={({
													field: {
														onChange,
														onBlur,
														value,
														name,
														ref,
													},
													fieldState: {
														invalid,
														isTouched,
														isDirty,
														error,
													},
													}) => (
													<ReactSelectInputField
														isClearable={false}
														label="SELECT RHU"
														inputClassName=" "
														ref={ref}
														value={value}
														onChange={onChange}
														onChangeGetData={(
															data
														) => {
															if (
																data?.healthUnit
															) {
																setSelectedHU(
																	data?.healthUnit
																);
															}
														}}
														onBlur={onBlur} // notify when input is touched
														error={error?.message}
														placeholder={`Select Health Unit`}
														options={HUList?.map(
															(unit) => ({
																label: unit?.name,
																value: unit?.id,
																healthUnit:
																	unit,
															})
														)}
													/>
												)}
											/>
										</div>
									) : (
										<>
											""
				
										</>
									)} */}

											
											{/* <h4 className="border-y-2 text-base font-bold p-2 mb-4">
													Rest Room
												</h4>
											

											<div className="lg:col-span-12">
												
												<div className="table table-bordered w-full">
													<table className="bordered">
														<thead>
															<tr>
																<th className="w-1/2">
																	Click if
																	Rest Rooms are cleaned
																</th>
																<th className="flex justify-center">
																	Remarks
																</th>
																
															</tr>
														</thead>
														<tbody>
															{Restroom?.map(
																(data) => {
																	return (
																		<tr
																			key={`${keyByValue(
																				data?.label
																			)}`}
																		>
																			<td className="!py-0 align-middle">
																				<label className=" mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																					<input
																						type="checkbox"
																						{...register(
																							data?.name,
																							{}
																						)}
																					/>
																					<span>
																						{
																							data?.label
																						}
																					</span>
																				</label>
																			</td>
																			<td className="p-1">
																				<TextInputField
																					inputClassName="bg-white"
																					placeholder={`${data?.label} details...`}
																					disabled={
																						!watch(
																							data?.name
																						)
																					}
																					{...register(
																						`${data?.name}_details`,
																						{}
																					)}
																				/>
																			</td>
																			
																			
																		</tr>
																	);
																}
															)}
														</tbody>
													</table>
												</div>

											</div> */}
								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									{hasBed ? (
										<ActionBtn
											type="secondary"
											size="xl"
											loading={loading}
											className=" !rounded-[30px] ml-4 gap-4 px-6"
											// onClick={handleSubmit(sendToInfectious)}
										>
											<FlatIcon icon="rr-paper-plane" />
											Has Issues
										</ActionBtn>
									) : (
										<ActionBtn
											type="success"
											size="xl"
											loading={loading}
											className="ml-4"
											// onClick={handleSubmit(submit)}
										>
											Approved for Cashier
										</ActionBtn>
									)}
								</div>

			<span className="border-b  pb-4 mb-4 "></span>

		
			
		</div>
	);
};

export default HouseKeepingInService;
