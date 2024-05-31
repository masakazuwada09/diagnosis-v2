/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import FlatIcon from "../FlatIcon";
import ActionBtn from "../buttons/ActionBtn";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";

import { v4 as uuidv4 } from "uuid";
import Axios from "../../libs/axios";
import ReactSelectInputField from "../inputs/ReactSelectInputField";
import TextInputField from "../inputs/TextInputField";
import {
	dataURItoBlob,
	dateYYYYMMDD,
	doctorName,
	doctorSpecialty,
	patientFullName,
} from "../../libs/helpers";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Controller, set, useForm } from "react-hook-form";
import ReactQuillField from "../inputs/ReactQuillField";
import ImagePicker from "../inputs/ImagePicker";
import ContentTitle from "../buttons/ContentTitle";
import InfoText from "../InfoText";
import ReleaseMedStep1 from "../../pages/appointments/components/ReleaseMedStep1";
import ReleaseMedStep2 from "../../pages/appointments/components/ReleaseMedStep2";
import ReleaseMedStep3 from "../../pages/appointments/components/ReleaseMedStep3";
import { mutate } from "swr";

const uniq_id = uuidv4();
const PatientServices = (props) => {
	const { appointment, setAppointment, mutateAll } = props;
	const { user } = useAuth();
	const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useNoBugUseEffect({
		functions: () => {
			getItems();
			getHUList("RHU");
		},
		params: [appointment?.id],
	});

	const [step, setStep] = useState(1);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imageCaptured, setImageCaptured] = useState(null);
	const [isPositive, setIsPositive] = useState(false);
	const [isSelectorLoading, setIsSelectorLoading] = useState(false);
	const [items, setItems] = useState([]);
	const [itemUsed, setItemUsed] = useState(false);
	const [forConfirmation, setForConfirmation] = useState(false);
	const [doctorList, setDoctorList] = useState([]);
	const [roomList, setRoomList] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [satisfaction, setStatisfaction] = useState(null);

	useNoBugUseEffect({
		functions: () => {
			if (getValues("rhu_id")) {
				getDoctors();
			}
		},
		params: [watch("rhu_id")],
	});

	useNoBugUseEffect({
		functions: () => {
			if (user?.health_unit_id) {
				setValue("rhu_id", user?.health_unit_id);
			}
		},
		params: [user?.health_unit_id],
	});
	const getDoctors = () => {
		Axios.get(
			`v1/clinic/doctors-by-location?health_unit_id=${getValues(
				"rhu_id"
			)}`
		).then((res) => {
			setDoctorList(res.data.data);
		});
	};
	const getItems = () => {
		Axios.get(`v1/item-inventory?location_id=${user?.health_unit_id}`).then(
			(res) => {
				setItems(res.data.data);
			}
		);
	};
	const addNewSelectedItem = () => {
		setSelectedItems((prevItems) => [
			...prevItems,
			{
				id: uuidv4(),
				item: null,
				quantity: 0,
			},
		]);
	};
	const removeSelectedItem = (id) => {
		setSelectedItems((prevItems) =>
			prevItems.filter((item) => item.id != id)
		);
	};
	const updateItemInSelected = (id, itemData) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						item: itemData,
					};
				}
				return item;
			})
		);
	};
	const updateItemQty = (id, qty) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						quantity: qty,
					};
				}
				return item;
			})
		);
	};
	const useItems = () => {
		console.log("itemsssss", items);
		if (selectedItems?.length == 0) {
			toast.warning("Please select item(s) to continue...", {
				position: "bottom-right",
			});
			return;
		} else if (selectedItems[0]?.item == null) {
			toast.warning("Please select item(s) to continue...", {
				position: "bottom-center",
			});
			return;
		}

		// items.map()
		///v1/doctor/laboratory-order/store
		const formData = new FormData();
		formData.append("order_date", dateYYYYMMDD());
		formData.append("patient_id", appointment?.patient?.id);
		formData.append("appointment_id", appointment?.id);
		formData.append("health_unit_id", user?.health_unit_id);

		formData.append(
			"laboratory_test_type",
			String(appointment?.post_notes).toLowerCase()
		);
		formData.append("notes", String(appointment?.post_notes).toLowerCase());
		formData.append("_method", "PATCH");
		selectedItems.map((x) => {
			formData.append("inventory_id[]", x.id);
			formData.append("items[]", x.item?.item?.id);
			formData.append("quantity[]", x.quantity || 1);
		});
		Axios.post(`/v1/clinic/tb-lab-service/${appointment?.id}`, formData)
			.then((res) => {
				setItemUsed(true);
				toast.success("Success! item used successfully!");
				// setRefreshKey((x) => x + 1);
			})
			.catch(() => {
				toast.error("Something went wrong!");
			});
	};

	const sendToDoctor = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("doctor_id", data?.doctor_id);
		formdata.append("room_number", data?.room_number);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/clinic/tb-assign-to-doctor/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient referral success!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const hasError = (name) => {
		return errors[name]?.message;
	};
	const [HUList, setHUList] = useState([]);
	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setValue("location_type", user?.healthUnit?.type);
				setValue("health_unit_id", user?.health_unit_id);
			}, 200);
		},
		params: [user?.id],
	});

	const getHUList = (type) => {
		Axios.get(`v1/health-unit/list?type=${type}`)
			.then((res) => {
				setHUList(res.data.data);
			})
			.finally(() => {
				setIsSelectorLoading(false);
			});
	};
	const releasePrescription = (data) => {
		// setLoading(true);
		// console.log("prescriptionItems", prescriptionItems);
		let formData = new FormData();
		// formData.append("appointment_id", appointment_id);
		formData.append("_method", "PATCH");
		appointment?.prescriptions.map((data) => {
			formData.append("inventory_id[]", data.inventory_id);
			formData.append("quantity[]", data.quantity);
			formData.append("items[]", data?.item?.id);
			formData.append("sig[]", data?.sig);
			formData.append("details[]", "medicine released");
		});
		Axios.post(
			`/v1/clinic/tb-released-medicine/${appointment?.id}`,
			formData
		)
			.then((res) => {
				setStep(2);
				toast.success("Prescription released!");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const submitSatisfaction = () => {
		const formData = new FormData();
		formData.append("_method", "PATCH");
		formData.append("satisfaction", satisfaction);
		Axios.post(
			`/v1/clinic/tb-satisfaction-rate/${appointment?.id}`,
			formData
		)
			.then((res) => {
				// addToList(data);
				// setTimeout(() => {
				// setLoading(false);
				setStep(3);
				toast.success("Satisfaction successfully submitted!");
				// }, 400);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const submitSelfie = () => {
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
			// onUploadProgress: progressEvent => onProgress(progressEvent),
		};
		const formData = new FormData();
		const file = dataURItoBlob(imageCaptured);
		formData.append("_method", "PATCH");
		formData.append("selfie", file);
		Axios.post(
			`/v1/clinic/tb-selfie/${appointment?.id}`,
			formData,
			config
		).then((res) => {
			setTimeout(() => {
				setAppointment(null);
				if (mutateAll) mutateAll();
			}, 100);
			setTimeout(() => {
				toast.success("Selfie successfully submitted!");
				setStep(1);
				setAppointment(null);
			}, 300);
		});
	};
	return (
		<div className="flex flex-col items-start">
			{appointment?.status == "pending-for-rhu-release" ? (
				<>
					<div className="flex items-center w-full justify-center px-4 pb-4 gap-4">
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 1
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 1</b>
							<span className="text-xs">
								Release medicine form
							</span>
						</div>
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 2
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 2</b>
							<span className="text-xs">Satisfaction Rating</span>
						</div>
						<div
							className={`h-14 w-1/4 rounded-lg bg-slate-200 flex items-center justify-center  flex-col duration-200 ${
								step == 3
									? "opacity-100 !bg-green-100"
									: "opacity-50"
							}`}
						>
							<b className="text-sm">Step 3</b>
							<span className="text-xs">
								Proof of Patient and Personnel
							</span>
						</div>
					</div>
					<div className="p-5 mx-auto w-4/5 border rounded-xl">
						{step == 1 ? (
							<ReleaseMedStep1
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								releasePrescription={releasePrescription}
							/>
						) : (
							""
						)}
						{step == 2 ? (
							<ReleaseMedStep2
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								satisfaction={satisfaction}
								setStatisfaction={setStatisfaction}
								submitSatisfaction={submitSatisfaction}
							/>
						) : (
							""
						)}
						{step == 3 ? (
							<ReleaseMedStep3
								imageCaptured={imageCaptured}
								setImageCaptured={setImageCaptured}
								loading={loading}
								setLoading={setLoading}
								appointment={appointment}
								submitSelfie={submitSelfie}
							/>
						) : (
							""
						)}
					</div>
				</>
			) : (
				<div className="flex flex-col w-full gap-4 pb-2">
					<div className="p-0 flex flex-col gap-y-4 relative w-full">
						<h4 className="text-md text-indigo-800 border-b border-b-indigo-600 pb-1 font-bold mb-0">
							Send patient to Doctor
						</h4>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							
							<Controller
								name="doctor_id"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
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
										label="Select Doctor"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Doctor`}
										options={doctorList?.map((doctor) => ({
											label: `${doctorName(doctor)}`,
											value: doctor?.id,
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
										}))}
									/>
								)}
							/>
							<Controller
								name="room_number"
								control={control}
								rules={{
									required: {
										value: true,
										message: "This field is required",
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
										label="Select Room"
										isLoading={isSelectorLoading}
										onChangeGetData={(data) => {}}
										inputClassName=" "
										ref={ref}
										value={value}
										onChange={onChange}
										onData
										onBlur={onBlur} // notify when input is touched
										error={error?.message}
										placeholder={`Select Room`}
										// options={roomList?.map((doctor) => ({
										// 	label: `${doctorName(doctor)}`,
										// 	value: doctor?.id,
										// }))}
										options={[
													// {
													// 	label: "Provincial Hospital (PH)",
													// 	value: "PH",
													// },
													{
														label: "1",
														value: "1",
													},
                                                    {
														label: "2",
														value: "2",
													},
                                                    {
														label: "3",
														value: "3",
													},
                                                    {
														label: "4",
														value: "4",
													},
                                                    {
														label: "5",
														value: "5",
													},
                                                    {
														label: "6",
														value: "6",
													},
                                                    {
														label: "7",
														value: "7",
													},
                                                    {
														label: "8",
														value: "8",
													},
                                                    {
														label: "9",
														value: "9",
													},
                                                    {
														label: "10",
														value: "10",
													},
                                                    
													// {
													// 	label: "Barangay Health Station (BHS)",
													// 	value: "BHS",
													// },
												]}
									/>
								)}
							/>
						</div>

						<ActionBtn
							className="px-4 !rounded-2xl w-full"
							type="success"
							size="lg"
							loading={loading}
							onClick={handleSubmit(sendToDoctor)}
						>
							<FlatIcon
								icon="rr-check"
								className="mr-2 text-xl"
							/>
							Send patient to doctor
						</ActionBtn>
					</div>
				</div>
			)}
		</div>
	);
};

export default PatientServices;
