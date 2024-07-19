import React from "react";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import { patientFullName, patientRoomNumber, dateToday } from "../../../../libs/helpers";
import InfoTextForPrint from "../../../../components/InfoTextForPrint";
import { sanitaryOptions, accessWasteOptions, generalHistories } from "../../../../libs/appointmentOptions";
import { Controller, useForm } from 'react-hook-form';
import { keyByValue } from "../../../../libs/helpers";
import TextInputField from "../../../../components/inputs/TextInputField";
import { Bed, Restroom } from "../../../../libs/housekeeping";

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
																	patient has
																	these items
																</th>
																<th className="flex justify-center">
																	Details
																	(i.e.
																	)
																</th>
																<th className="w-1 justify-items-center">
																	Issues
																</th>
																<th className="flex justify-center">
																	Remarks
																</th>
															</tr>
														</thead>
														<tbody>
															{Bed?.map(
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
														</tbody>
													</table>
												</div>

											</div>

											
											<h4 className="border-y-2 text-base font-bold p-2 mb-4">
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

											</div>

			<span className="border-b  pb-4 mb-4 "></span>

		
			
		</div>
	);
};

export default HouseKeepingInService;
