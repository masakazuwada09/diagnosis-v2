/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInputField from "../../../components/inputs/TextInputField";
import { useAuth } from "../../../hooks/useAuth";
import { viral_infectious } from "../../../libs/appointmentOptions";
import CollapseDiv from "../../../components/CollapseDiv";
import useDataTable from "../../../hooks/useDataTable";
import { formatDateMMDDYYYYHHIIA, keyByValue } from "../../../libs/helpers";
import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";
import ContentTitle from "../../../components/buttons/ContentTitle";
import Pagination from "../../../components/table/Pagination";
import Table from "../../../components/table/Table";
import CreatePrescriptionModal from "../../../components/patient-modules/modals/CreatePrescriptionModal";
import SelectItemModal from "../../../components/modal/SelectItemModal";
import PatientVitals from "../../../components/PatientVitals";
import ReactSelectInputField from "../../../components/inputs/ReactSelectInputField";




const SurgeryAssessment = (appointment, props, ref) => {
	const { patient, allowCreate } = props;
	const { user } = useAuth();
    const {
		register,
		setValue,
		handleSubmit,
		reset,
		trigger,
		control,
		watch,
		formState: { errors },
	} = useForm();
	const {
        
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
	} = useDataTable({
		url: `/v1/clinic/patient-prescription/${patient?.id}`,
	});
	const createPrescriptionRef = useRef(null);
	const selecItemRef = useRef(null);

	return (
		<div className="w-full px-8">
			{/* <ContentTitle title="Patient Prescriptions">
				{user?.type == "RHU-DOCTOR" ? (
					<ActionBtn
						className="px-4 rounded-xl"
						size="sm"
						type="success"
						onClick={() => {
							createPrescriptionRef.current.show(patient);
							// setUpdate(true);
						}}
					>
						<FlatIcon icon="rr-edit" className="mr-1" />
						Create prescription
					</ActionBtn>
				) : (
					""
				)}
			</ContentTitle> */}
			

			<CollapseDiv
							defaultOpen={true}
							withCaret={true}
							title="Personal / Social history"
							headerClassName="bg-gray-200"
							bodyClassName="p-0"
							
							>
          
			<div className=" bg-gray-100 px-25 ">
							

									<div className="table  mb-2">
										<table>
											<tbody>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Diet, feeding, nutrition
														(in most days of the
														week)
												</tr>
												<tr>
													<td>
														Intake of high sugar
														(chocolates, pastries,
														cakes, softdrinks, etc):
													</td>
													<td className="">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="no"
																{...register(
																	"intake_high_sugar",
																	{}
																)}
															/>
															<span>
																No, patient
																follows balanced
																diet
															</span>
														</label>
													</td>
													<td className="">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="yes"
																{...register(
																	"intake_high_sugar",
																	{}
																)}
															/>
															<span>Yes</span>
														</label>
													</td>
												</tr>

												
												<tr>
													<td>
														Deworming every 6 months
														(only until age 12)
													</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"deworming_6months",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"deworming_6months",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	inputClassName="bg-white"
																	disabled={
																		watch(
																			"deworming_6months"
																		) !=
																		"yes"
																	}
																	placeholder="Specify..."
																	{...register(
																		"deworming_6months_details",
																		{}
																	)}
																/>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4 ">
										<table>
											<tbody>
												<tr>
													
													<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Oral Health
												</tr>
												</tr>

												<tr>
													<td>
														Use of flouride
														toothpaste
													</td>
													<td>
														<div className="flex items-center gap-10">
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"flouride_toothpaste",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="yes"
																	{...register(
																		"flouride_toothpaste",
																		{}
																	)}
																/>
																<span>Yes</span>
															</label>
															<TextInputField
																disabled={
																	watch(
																		"flouride_toothpaste"
																	) != "yes"
																}
																labelClassName="!mb-0 whitespace-nowrap"
																className="flex flex-row items-center gap-2"
																type="date"
																label="Last dental check-up:"
																inputClassName="bg-white"
															/>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4">
										<table>
											<tbody>
												<tr>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Physical Activity
												</tr>
												</tr>
												<tr>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="Sedentary"
																{...register(
																	"physical_activity",
																	{}
																)}
															/>
															<span>
																Sedentary
															</span>
														</label>
													</td>
												</tr>
												<tr>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="With supervised moderate"
																{...register(
																	"physical_activity",
																	{}
																)}
															/>
															<span>
																With supervised
																moderate to
																vigorous
																physical
																activites (brisk
																walk, jogging,
																running,
																bicycling, etc.)
																for at least 1
																hour/day
															</span>
														</label>
													</td>
												</tr>
												<tr>
													<td>
														<div className="flex flex-col">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="With vigorous-intensity"
																	{...register(
																		"physical_activity",
																		{}
																	)}
																/>
																<span>
																	With
																	vigorous-intensity
																	activities,
																	including
																	those which
																	strengthen
																	the muscle
																	and bones,
																	at least 3х
																	/ week
																</span>
															</label>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4">
										<table>
											<tbody>
												<tr>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Daily Screen Time
												</tr>
												</tr>
												<tr>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="no screen time"
																{...register(
																	"daily_screen_time",
																	{}
																)}
															/>
															<span>
																No screen time
															</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="less 1 hour"
																{...register(
																	"daily_screen_time",
																	{}
																)}
															/>
															<span>
																{`< 1 hour sedentary screen time`}
															</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="more 1 hour"
																{...register(
																	"daily_screen_time",
																	{}
																)}
															/>
															<span>
																{`> 1 hour sedentary screen time`}
															</span>
														</label>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4">
										<table>
											<tbody>
												<tr>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Violence and Injuries
												</tr>
												</tr>
												<tr>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="none"
																{...register(
																	"violence_injuries",
																	{}
																)}
															/>
															<span>None</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="electrocution"
																{...register(
																	"violence_injuries",
																	{}
																)}
															/>
															<span>
																Electrocution
															</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="falls"
																{...register(
																	"violence_injuries",
																	{}
																)}
															/>
															<span>Falls</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="mauling"
																{...register(
																	"violence_injuries",
																	{}
																)}
															/>
															<span>Mauling</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="others"
																{...register(
																	"violence_injuries",
																	{}
																)}
															/>
															<span>Others</span>
															<TextInputField
																disabled={
																	watch(
																		"violence_injuries"
																	) !=
																	"others"
																}
																inputClassName="bg-white"
																placeholder="Others..."
																{...register(
																	"violence_injuries_details",
																	{}
																)}
															/>
														</label>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4">
										<table>
											<tbody>
												<tr>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Bullying and Harrasment
												</tr>
												</tr>
												<tr>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="none"
																{...register(
																	"bully_harassment",
																	{}
																)}
															/>
															<span>None</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="at home"
																{...register(
																	"bully_harassment",
																	{}
																)}
															/>
															<span>At home</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="in school"
																{...register(
																	"bully_harassment",
																	{}
																)}
															/>
															<span>
																In school
															</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="online"
																{...register(
																	"bully_harassment",
																	{}
																)}
															/>
															<span>Online</span>
														</label>
													</td>
													<td>
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="others"
																{...register(
																	"bully_harassment",
																	{}
																)}
															/>
															<span>Others</span>
															<TextInputField
																disabled={
																	watch(
																		"bully_harassment"
																	) !=
																	"others"
																}
																inputClassName="bg-white"
																placeholder="Others..."
																{...register(
																	"bully_harassment_details",
																	{}
																)}
															/>
														</label>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								</CollapseDiv>



							
								
							


							
							<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Medications"
							headerClassName="bg-gray-200"
							bodyClassName="p-0"
							>
								<div className=" bg-gray-100 px-2 ">
								

									<div className="table  mb-2">
										<table>
											
												<tbody>

												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Information:
												</tr>	


												<tr>
													<td>Allergic to any medications</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"allergic_to_medication",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"allergic_to_medication",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	{...register(
																		"allergic_to_medication_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"allergic_to_medication"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
															</div>
														</div>
													</td>
												</tr>



												
												<tr>
													<td>Bad reaction to any medications</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"bad_reaction_medication",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"bad_reaction_medication",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	{...register(
																		"bad_reaction_medication_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"bad_reaction_medication"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
															</div>
														</div>
													</td>
												</tr>

												


												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												History:
												</tr>	


												<tr>
													<td>
													Currently take any prescription medications

													</td>
													<td className="">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="no"
																{...register(
																	"prescription_medications",
																	{}
																)}
															/>
															<span>
																No, 
															</span>
														</label>
													</td>
													<td className="flex items-center gap-2">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="yes"
																{...register(
																	"prescription_medications",
																	{}
																)}
															/>
															<span>Yes</span>
														</label>
														<TextInputField
																	{...register(
																		"prescription_medications_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"prescription_medications"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>

														<TextInputField
																disabled={
																	watch(
																		"prescription_medications"
																	) != "yes"
																}
																labelClassName="!mb-0 whitespace-nowrap"
																className="flex flex-row items-center gap-2"
																type="date"
																label="Last prescribed medications:"
																inputClassName="bg-white"
															/>
													</td>
												</tr>



												



												
												<tr>
													<td>
														Deworming every 6 months
														(only until age 12)
													</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"deworming_6months",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"deworming_6months",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	inputClassName="bg-white"
																	disabled={
																		watch(
																			"deworming_6months"
																		) !=
																		"yes"
																	}
																	placeholder="Specify..."
																	{...register(
																		"deworming_6months_details",
																		{}
																	)}
																/>
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4 ">
										<table>
											<tbody>
												<tr>
													
													<tr className="w-full text-sm font-bold mb-4 text-blue-700 ">
												Over the Counter Medications
												</tr>
												</tr>

												
												<tr>
													<td>Takes supplements</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"take_supplements",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"take_supplements",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	{...register(
																		"take_supplements_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"take_supplements"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
																<TextInputField
																disabled={
																	watch(
																		"take_supplements"
																	) != "yes"
																}
																labelClassName="!mb-0 whitespace-nowrap"
																className="flex flex-row items-center gap-2"
																type="date"
																label="Last take supplement:"
																inputClassName="bg-white"
															/>


															</div>
														</div>
													</td>
												</tr>





												
												<tr>
													<td>Takes Vitamins</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"take_vitamins",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<div className="flex items-center gap-2">
																<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																	<input
																		type="radio"
																		className="pointer-events-none"
																		value="yes"
																		{...register(
																			"take_vitamins",
																			{}
																		)}
																	/>
																	<span>
																		Yes
																	</span>
																</label>
																<TextInputField
																	{...register(
																		"take_vitamins_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"take_vitamins"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
																<TextInputField
																disabled={
																	watch(
																		"take_vitamins"
																	) != "yes"
																}
																labelClassName="!mb-0 whitespace-nowrap"
																className="flex flex-row items-center gap-2"
																type="date"
																label="Last take vitamins:"
																inputClassName="bg-white"
															/>
															</div>
														</div>
													</td>
												</tr>



												<tr>
													<td>Others</td>
													<td colSpan={2}>
														<div className="flex items-center gap-10">
															
															<div className="flex items-center gap-2">
																
														
																
															</div>
														</div>
													</td>
												</tr>








												
											</tbody>
										</table>
									</div>

									

									

									

									
								</div>
								</CollapseDiv>











								<CollapseDiv
							defaultOpen={false}
							withCaret={true}
							title="Chronic Conditions"
							headerClassName="bg-gray-200"
							bodyClassName="p-0"
							>
								<div className=" bg-gray-100 px-2 ">
									<div className="table  mb-2">
										<table>
											<tbody>
												<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												General
												</tr>
												<tr>
													<td>
													Diagnosed with any chronic medical conditions
													</td>
													<td className="">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="no"
																{...register(
																	"chronic_conditions",
																	{}
																)}
															/>
															<span>
																No
															</span>
														</label>
													</td>
													<td className="flex items-center gap-2">
														<label className="mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
															<input
																type="radio"
																className="pointer-events-none"
																value="yes"
																{...register(
																	"chronic_conditions",
																	{}
																)}
															/>
															<span>Yes</span>
														</label>


														<Controller
															name="disease"
															control={control}
															rules={{
																	required: {
																	value: true,
																	message:
																		"This field is required",
																},
															}}
															// {...register(
															// 	"chronic_conditions_details",
															// 	{}
															// )}
															// disabled={
															// 	watch(
															// 		"chronic_conditions"
															// 	) !=
															// 	"yes"
															// }
															
															
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
																	
																	labelClassName="font-bold"
																	isClearable={
																		false
																	}
																	label={
																		<>
																			<span className="text-danger ml-1">
																				*
																			</span>
																		</>
																	}
																	inputClassName=""
																	ref={ref}
																	value={
																		value
																	}
																	onChange={(
																		val
																	) => {
																		console.log(
																			"onChangeonChange",
																			val
																		);
																		setSelected(
																			String(
																				val
																			).toLowerCase()
																		);
																		if (
																			onChange
																		) {
																			onChange(
																				val
																			);
																		}
																	}}
																	onBlur={
																		onBlur
																	} // notify when input is touched
																	error={
																		error?.message
																	}
																	placeholder="Chronic Condition"
																	options={[
																		{
																			label: "Heart disease",
																			value: "Heart_disease",
																		},
																		{
																			label: "High blood pressure",
																			value: "High_blood_pressure",
																		},
																		{
																			label: "Diabetes",
																			value: "diabetes",
																		},
																		{
																			label: "Lung disease",
																			value: "Lung_disease",
																		},
																		{
																			label: "Kidney disease",
																			value: "Kidney_disease",
																		},
																		{
																			label: "Liver disease",
																			value: "Liver_disease",
																		},
																		{
																			label: "Blood clotting disorders",
																			value: "Blood_clotting_disorders",
																		},
																		{
																			label: "Autoimmune diseases",
																			value: "Autoimmune_diseases",
																		},
																		{
																			label: "Neurological disorders",
																			value: "Neurological_disorders",
																		},

																		{
																			label: "Mental health condition",
																			value: "Mental_health_condition",
																		},
																		{
																			label: "Others",
																			value: "Others",
																		},
																		
																	]}
																/>
															)}

															
														/>



														<TextInputField
																	{...register(
																		"chronic_conditions_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"chronic_conditions"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
													</td>
												</tr>
												

												
													
											</tbody>
										</table>
									</div>

									<div className="table table-bordered mb-4 ">
										<table>
											<tbody>
												<tr>
													
													<tr className="w-full text-sm font-bold mb-4 text-blue-600 ">
												Management
												</tr>
												</tr>

												<tr>
													<td>
													Currently being treated for any of these conditions
													</td>
													<td>
														<div className="flex items-center gap-10">
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"chronic_treatment",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="yes"
																	{...register(
																		"chronic_treatment",
																		{}
																	)}
																/>
																<span>Yes</span>
															</label>
															<TextInputField
																	{...register(
																		"chronic_treatment_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"chronic_treatment"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
														</div>
													</td>
												</tr>



												<tr>
													<td>
													Chronic conditions currently well-controlled
													</td>
													<td>
														<div className="flex items-center gap-10">
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"chronic_controlled",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="yes"
																	{...register(
																		"chronic_controlled",
																		{}
																	)}
																/>
																<span>Yes</span>
															</label>
															<TextInputField
																	{...register(
																		"chronic_controlled_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"chronic_controlled"
																		) !=
																		"no"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify why..."
																/>
														</div>
													</td>
												</tr>




												<tr>
													<td>
													Have any of chronic conditions ever caused complications during a previous surgery or procedure
													</td>
													<td>
														<div className="flex items-center gap-10">
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="no"
																	{...register(
																		"chronic_complications",
																		{}
																	)}
																/>
																<span>No</span>
															</label>
															<label className="cursor-pointer mb-0 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
																<input
																	type="radio"
																	className="pointer-events-none"
																	value="yes"
																	{...register(
																		"chronic_complications",
																		{}
																	)}
																/>
																<span>Yes</span>
															</label>
															<TextInputField
																	{...register(
																		"chronic_complications_details",
																		{}
																	)}
																	disabled={
																		watch(
																			"chronic_complications"
																		) !=
																		"yes"
																	}
																	inputClassName="bg-white"
																	placeholder="Specify..."
																/>
														</div>
													</td>
												</tr>



											</tbody>
										</table>
									</div>
								</div>
							</CollapseDiv>





							
					

		</div>
	);
};

export default SurgeryAssessment;
