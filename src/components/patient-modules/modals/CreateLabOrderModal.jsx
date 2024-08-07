/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	dateToday,
	dateYYYYMMDD,
	formatDateMMDDYYYY,
	formatDateYYYYMMDD,
	patientFullName,
} from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import Axios from "../../../libs/axios";
import TextInputField from "../../inputs/TextInputField";
import ReactSelectInputField from "../../inputs/ReactSelectInputField";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import FlatIcon from "../../FlatIcon";

const CreateLabOrderModal = (props, ref) => {
	const { patient, onSuccess } = props;
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

	const [showData, setShowData] = useState(null);
	const [labType, setLabType] = useState("");
	const [appointment, setAppointment] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [tests, setTests] = useState([]);
	// useNoBugUseEffect({
	// 	functions: () => {
	// 		getLaboratoryTests();
	// 	},
	// });
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data, appointmentData, type = null) => {
		setLabType(type);
		console.log(
			"patient appointmentData xx",
			appointmentData?.id,
			patient?.id,
			appointmentData
		);
		console.log("/v1/laboratory/tests/list");
		getLaboratoryTests(type);
		setShowData(data);
		setTimeout(() => {
			if (appointmentData?.id) {
				setValue("appointment_id", appointmentData?.id);
			}
			setValue("order_date", dateYYYYMMDD());
		}, 200);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
		reset({
			laboratory_test_type: "",
			notes: "",
			order_date: "",
			patient_id: "",
			appointment_id: "",
		});
	};


	const getLaboratoryTests = (type) => {
		Axios.get(`/v1/laboratory/tests/list?type=${type}`).then((res) => {
			setTests(res.data.data);
		});
	};


	const submit = (data) => {
		let formData = new FormData();
		// formData.append("_method", "PATCH");
		console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
		formData.append("laboratory_test_type", data?.laboratory_test_type);
		formData.append("notes", data?.notes);
		formData.append("order_date", data?.order_date);
		formData.append("patient_id", patient?.id);

		formData.append("appointment_id", data?.appointment_id);

		Axios.post(`v1/doctor/laboratory-order/store`, formData).then((res) => {
			reset();
			toast.success("Laboratory order created successfully!");
			onSuccess();
			hide();
		});
	};
	
	const noHide = () => {};


	const sendToInfectious = (data) => {
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




	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={noHide}>
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
							<Dialog.Panel className="w-full lg:max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										Create{" "}
										{labType == "imaging"
											? "Imaging"
											: "Laboratory"}{" "}
										Order
									</span>
									<span className="text-sm font-light text-blue-900 ">
										Complete form to create laboratory order
									</span>
									<ActionBtn
										type="danger"
										size="sm"
										className="absolute top-4 right-4 "
										onClick={hide}
									>
										<FlatIcon icon="br-cross-small" /> Close
									</ActionBtn>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									<TextInputField
										label="Date"
										type="date"
										error={errors?.order_date?.message}
										placeholder="Enter order date"
										{...register("order_date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
									<Controller
										name="laboratory_test_type"
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
														Select{" "}
														{labType == "imaging"
															? "Imaging"
															: "Laboratory"}{" "}
														Test
													</>
												}
												inputClassName=" "
												ref={ref}
												value={value}
												onChange={onChange}
												onBlur={onBlur} // notify when input is touched
												error={error?.message}
												placeholder="Select"
												options={tests?.map((test) => {
													return {
														label: test?.name,
														value: test?.id,
													};
												})}
											/>
										)}
									/>
									<TextInputField
										label="Notes"
										error={errors?.notes?.message}
										placeholder="Enter notes"
										{...register("notes", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
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
										onClick={handleSubmit(submit)}
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
	);
};

export default forwardRef(CreateLabOrderModal);
