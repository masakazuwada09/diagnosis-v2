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
	dataURItoBlob,
	formatDateMMDDYYYY,
	formatDateYYYYMMDD,
	patientFullName,
} from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import Axios from "../../../libs/axios";
import TextInputField from "../../inputs/TextInputField";
import ReactSelectInputField from "../../inputs/ReactSelectInputField";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import ReactQuillField from "../../inputs/ReactQuillField";
import ImagePicker from "../../inputs/ImagePicker";
import InfoText from "../../InfoText";

const ViewLabResultModal = (props, ref) => {
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
	const [modalOpen, setModalOpen] = useState(false);
	const [tests, setTests] = useState([]);
	useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const submit = (data) => {
		let formData = new FormData();
		let config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		formData.append("_method", "PATCH");
		formData.append("lab_result_notes", data?.lab_result_notes);

		if (data?.attachment) {
			formData.append("attachment", dataURItoBlob(data?.attachment));
		}
		Axios.post(
			`v1/laboratory/upload-lab-result/${showData?.id}`,
			formData,
			config
		).then((res) => {
			reset();
			toast.success("Laboratory result uploaded successfully!");
			onSuccess();
			hide();
		});
	};
	const hasError = (name) => {
		return errors[name]?.message;
	};
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
							<Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										View Laboratory Result
									</span>
								</Dialog.Title>
								<div className="p-6 flex flex-col gap-y-4 relative">
									{showData?.type?.name == "CBC" ? (
										<div className="table">
											<table>
												<thead>
													<tr>
														<th>Name</th>
														<th>Result</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th className="capitalize">
															hemoglobin
														</th>
														<td>
															{
																showData
																	?.appointment
																	?.hemoglobin
															}{" "}
															g/L
														</td>
													</tr>
													<tr>
														<th className="capitalize">
															hematocrit
														</th>
														<td>
															{
																showData
																	?.appointment
																	?.hematocrit
															}{" "}
															L/L
														</td>
													</tr>
													<tr>
														<th className="uppercase">
															rcbc
														</th>
														<td>
															{
																showData
																	?.appointment
																	?.rcbc
															}{" "}
															x10¹²/L
														</td>
													</tr>
													<tr>
														<th className="uppercase">
															wbc
														</th>
														<td>
															{
																showData
																	?.appointment
																	?.wbc
															}{" "}
															x10⁹/L
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									) : (
										<>
											<div>
												<span
													className={`text-sm mb-1 font-medium text-dark`}
												>
													Attachment
												</span>
												<div className="border border-slate-300 aspect-video relative ">
													<img
														src={
															showData?.attachment
														}
														className="object-contain absolute top-0 left-0 w-full h-full bg-slate-300"
													/>
												</div>
											</div>
											<div className="flex flex-col">
												<span
													className={`text-sm mb-1 font-medium text-dark`}
												>
													Remarks:
												</span>
												<div
													className="p-2 italic font-light bg-yellow-50"
													dangerouslySetInnerHTML={{
														__html: showData?.lab_result_notes,
													}}
												></div>
											</div>
										</>
									)}

									{/* <div className="flex flex-col mt-0">
										<ReactQuillField
											label="Doctors remarks"
											placeholder="Enter doctor's remarks here..."
										/>
									</div> */}
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									<ActionBtn
										// size="lg"
										type="foreground"
										className="px-5"
										onClick={hide}
									>
										CLOSE
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

export default forwardRef(ViewLabResultModal);
