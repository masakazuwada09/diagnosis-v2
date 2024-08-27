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
import ActionBtn from "../../../../components/buttons/ActionBtn";
import Axios from "../../../../libs/axios";
import { patientFullName } from "../../../../libs/helpers";
import PatientInfo from "../../../patients/components/PatientInfo";
import AppointmentDetails from "../../../appointments/components/AppointmentDetails";
import FlatIcon from "../../../../components/FlatIcon";
import useDoctorQueue from "../../../../hooks/useDoctorQueue";


const ConsultPatientModal = (props, ref) => {
	const { mutateAll } = props;
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

	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useDoctorQueue();

	const isDoctor = () => {
		return user?.type == "dc-doctor" || user?.type == "dc-doctor";
	};



	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [appointment, setAppointment] = useState(null);
	const { patient } = props;

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		console.log("appointment", data);
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};

	const submit = (data) => {
		let formData = new FormData();
		formData.append("_method", "PATCH");
		Axios.post(
			`v1/clinic/doctor-accept-patient/${showData?.id}`,
			formData
		).then((res) => {
			reset();
			mutateAll();
			toast.success("Patient accepted successfully!");
			hide();
		});
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
					<div className="inset-0 bg-opacity-75 z-20 " />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[100]">
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
							<Dialog.Panel className="w-full lg:max-w-4xl  transform overflow-hidden rounded-2xl bg-gray-100 text-left absolute ml-[800px] mb-[490px] shadow-2xl transition-all">
								{/* <Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
								>
									
								</Dialog.Title> */}
						
								<div>
									<h4 className="border flex items-center text-base font-bold p-2 mb-0 text-gray-700 border-indigo-100 px-8">
										<span>Diagnosis Information</span>
									</h4>
									<div className="flex flex-col lg:flex-row gap-2 border-x border-indigo-100 p-2">
										<PatientInfo
											patient={showData?.patient}
											appointment={appointment}
										>
											<div className="ml-auto pt-6">
											

												
												<span >{patient?.philhealth}</span>
												<ActionBtn
													type="teal"
													// loading={loading}
													size="lg"
													onClick={handleSubmit(
														submit
													)}
													className="px-4 w-[200px] h-10 gap-2"
												>
													<FlatIcon
														className="text-2xl mr-2 "
														icon="fi fi-rr-time-check"
													/>
													<div className="flex flex-col text-left">
														<span className="font-bold -mb-1">
															Accept Patient
														</span>
														<span className="text-[10px] font-light max-w-full">
															Patient will be on
															service list
														</span>
													</div>
												</ActionBtn>
											</div>
										</PatientInfo>
									</div>
									{appointment?.id ? (
										""
										) : (
							<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">

							{doctorsNowServing?.data?.slice(0, 1).map((data) => (
							<AppointmentDetails
								forResult={true}
								appointment={showData}
								data={data}
							/>
							))}
								
							</div>
						)}
									
								</div>

								
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(ConsultPatientModal);
