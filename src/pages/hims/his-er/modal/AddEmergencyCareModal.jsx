import React, { Fragment, forwardRef, useImperativeHandle, useState } from 'react'
import Axios from '../../../../libs/axios';
import { toast } from 'react-toastify';
import { dateYYYYMMDD, doctorName, doctorSpecialty } from '../../../../libs/helpers';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import useClinic from '../../../../hooks/useClinic';
import { Controller, useForm } from 'react-hook-form';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import ReactSelectInputField from '../../../../components/inputs/ReactSelectInputField';
import TextInputField from '../../../../components/inputs/TextInputField';
import { Dialog, Transition } from '@headlessui/react';

const AddEmergencyCareModal = (props, ref) => {
	const { patient, onSuccess } = props;
	const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		trigger,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { getDoctors, getDoctorsByHealthUnit, getTimeSlots } = useClinic();
	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [doctor, setDoctor] = useState(null);
	const [doctors, setDoctors] = useState([]);
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
	console.log("doctor----------------->", doctors)
	useNoBugUseEffect({
		functions: () => {
			if (watch("health_unit_id")) {
				setDoctors([]);
				getDoctorsByHealthUnit(watch("health_unit_id")).then((res) => {
					console.log("getDoctorsByHealthUnit", res.data);
					setDoctors(res.data);
				});
			}
		},
		params: [watch("health_unit_id")],
	});
		const show = (data, appointmentData) => {

		console.log(
			"patient appointmentData xx",
			appointmentData?.id,
			patient?.id,
			appointmentData
		);
		console.log("/v1/anesthesia/operation-procedure/list");
		setShowData(data);
		setTimeout(() => {
			if (appointmentData?.id) {
				setValue("appointment_id", appointmentData?.id);
			}
			setValue("operation_date", dateYYYYMMDD());
		}, 200);
		getDoctors().then((res) => {
			setDoctors(res.data.data);
		});
	setModalOpen(true);
};
	const hide = () => {
		setModalOpen(false);
		// reset({
		// 	procedure: "",
		// 	operation_data: "",
		// 	patient_id: "",
		// 	appointment_id: "",
		// });
	};
	const submit = (data) => {
		let formData = new FormData();
		// formData.append("_method", "PATCH");
		formData.append("operation_date", data?.operation_date);
		formData.append("operation_time", data?.operation_time);
		formData.append("procedure", data?.procedure);
		formData.append("doctor_id", data?.doctor_id);
		formData.append("operation_status", data?.operation_status);
		formData.append("patient_id", patient?.id);

		formData.append("appointment_id", data?.appointment_id);

		Axios.post(`v1/anesthesia/operation-procedure/store`, formData).then((res) => {
			setTimeout(() => {
				toast.success("Operation Procedure created successfully!");
				if (onSuccess) onSuccess();
			}, 200);
			reset();
			// toast.success("Operation Procedure created successfully!");
			// onSuccess();
			hide();

			console.log("patientidpatientidpatientidpatientidpatientidpatientid", patient)
		});
	};
	const noHide = () => {};
  return (
	<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Emergency Room Form
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to create Emergency Appointment
									</span>
									{/* <ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn> */}
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
									<h4 className="border-t-2 text-base font-bold p-2 mb-0 lg:col-span-12">
										CASE
									</h4>
									</div>
									<div className="flex flex-col-1 gap-2">
									<TextInputField
										label="Date"
										type="date"
										error={errors?.operation_date?.message}
										placeholder="Enter order date"
										{...register("operation_date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									
									
									</div>
									<div className="flex flex-col-1 gap-2">
											<TextInputField
                                        type="time"
										label="Time"
										placeholder="Enter time of procedure"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<TextInputField
										label="Diagnosis"
										placeholder="Enter Diagnosis"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 ">
									<h4 className="border-t-2 text-base font-bold p-2 mb-0 lg:col-span-12">
										Current Vital Signs
									</h4>
									</div>
									<div className="flex flex-col-3 gap-3">
										<TextInputField
										label="Body Temperature:"
										placeholder="°C"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									
									<div className="flex flex-col-2 gap-3">
										<TextInputField
										label="Blood Pressure (SYSTOLIC)"
										placeholder="SYSTOLIC"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Blood Pressure (DIASTOLIC)"
										placeholder="DIASTOLIC"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="BP Measurement"
										placeholder="BP Measurement"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-2 gap-2">
										<TextInputField
										label="Pulse Rate:"
										placeholder="Enter Pulse Rate"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Respiratory Rate:"
										placeholder="Enter Respiratory Rate"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-3 gap-2">
										<TextInputField
										label="Patient height in cm:"
										placeholder="Enter Patient height in CM"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Patient weight in KG:"
										placeholder="Enter Patient weight in KG"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="BMI"
										placeholder="Enter BMI"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-2 gap-2">
										<TextInputField
										label="Height for Age:"
										placeholder="Enter Height for Age"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Weight for Age:"
										placeholder="Enter Weight for Age"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-3 gap-2">
										<TextInputField
										label="Blood Type:"
										placeholder="Enter Blood Type"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Oxygen saturation:"
										placeholder="Enter Oxygen saturation"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Heart Rate:"
										placeholder="Enter Heart Rate"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-3 gap-2">
										<TextInputField
										label="Regular Rhythm:"
										placeholder="Enter Regular Rhythm"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
									<div className="flex flex-col-2 gap-2">
										
									<Controller
										name="operation_status"
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
												label={
													<>
														Covid 19
														{/* <span className="text-danger ml-1">
															*
														</span> */}
													</>
												}
												inputClassName=" "
												ref={ref}
												value={value}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select Status"
												options={[
													{
														label: "Positive",
														value: "Positive",
													},
													{
														label: "Negative",
														value: "Negative",
													},
                                                    // {
													// 	label: "Done",
													// 	value: "DONE",
													// },
												]}
											/>
										)}
									/>
									<Controller
										name="operation_status"
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
												label={
													<>
														Tuberculosis
														{/* <span className="text-danger ml-1">
															*
														</span> */}
													</>
												}
												inputClassName=" "
												ref={ref}
												value={value}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select Status"
												options={[
													{
														label: "Positive",
														value: "Positive",
													},
													{
														label: "Negative",
														value: "Negative",
													},
													// {
													// 	label: "RESU",
													// 	value: "RESU",
													// },
                                                    // {
													// 	label: "Done",
													// 	value: "DONE",
													// },
												]}
											/>
										)}
									/>
									</div>
									<div className="flex flex-col-3 gap-2">
										<TextInputField
										label="Glucose:"
										placeholder="Enter Glucose"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Cholesterol:"
										placeholder="Enter Cholesterol"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<TextInputField
										label="Uric Acid:"
										placeholder="Enter Uric Acid"
										{...register("operation_time", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									</div>
										<div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
									<h4 className="border-t-2 text-base font-bold p-2 mb-0 lg:col-span-12">
										MEDICAL DOCTOR
									</h4>
									</div>
									<Controller
											name="doctor_id"
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
													isClearable={true}
													label={
														<>
															Assign To Medical Doctor
															<span className="text-danger ml-1">
																*
															</span>
														</>
													}
													inputClassName=" "
													ref={ref}
													value={value}
													onChange={onChange}
													onChangeGetData={(data) => {
														trigger("date");
														setDoctor(data?.doctor);
													}} // send value to hook form
													onBlur={onBlur} // notify when input is touched
													error={error?.message}
													placeholder="Select Surgeon"
													options={doctors?.map(
														(doctor) => ({
															label: `${doctorName(
																doctor
															)}`,
															value: doctor?.id,
															doctor: doctor,
															descriptionClassName:
																" !opacity-100",
															description: (
																<div className="flex text-xs flex-col gap-1">
																	<span>
																		{doctorSpecialty(
																			doctor
																		)}
																	</span>
																	<span className="flex items-center gap-1">
																		Status:
																		<span className="text-green-900 drop-shadow-[0px_0px_1px_#ffffff] text-xs font-bold">
																			ONLINE
																		</span>
																	</span>
																</div>
															),
														})
													)}											
												/>
											)}
										/>
									
									
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="danger"
										className="px-5 mr-auto"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
									<ActionBtn
										// size="lg"
										type="success"
										className="px-5"
										onClick={handleSubmit(submit)
											
										}

										
									>
										SUBMIT
									</ActionBtn>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
  )
}

export default forwardRef(AddEmergencyCareModal)
