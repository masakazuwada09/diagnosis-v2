/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ActionBtn from '../../../../../components/buttons/ActionBtn';
import ReactSelectInputField from '../../../../../components/inputs/ReactSelectInputField';
import { Controller, useForm } from 'react-hook-form';
import { doctorName, doctorSpecialty } from '../../../../../libs/helpers';
import TextInputField from '../../../../../components/inputs/TextInputField';
import { Dialog, Transition } from '@headlessui/react';
import useClinic from '../../../../../hooks/useClinic';
import useNoBugUseEffect from '../../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../../libs/axios';
import { toast } from 'react-toastify';

const UploadPharmacyOrderModal = (props, ref) => {
    const { patient, onSuccess } = props;
	const {
		register,
		getValues,
		setValue,
		control,
		reset,
		trigger,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
    const { title, children, size = "modal-md", onSuccessCallBack } = props;
	const [mount, setMount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
	const [doctor, setDoctor] = useState(null);
	const [doctors, setDoctors] = useState([]);
	const [showData, setShowData] = useState(null);
	const [slots, setSlots] = useState([]);
	const [suppliesOptions, setSuppliesOptions] = useState([]);
	const [selectedSupply, setSelectedSupply] = useState(null);
    const { getDoctors, getDoctorsByHealthUnit, getTimeSlots } = useClinic();

	useEffect(() => {
		let t = setTimeout(() => {
			setMount(1);
		}, 400);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
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
	useNoBugUseEffect({
		functions: () => {
			if (watch("health_unit_id")) {
				setDoctors([]);
				getDoctorsByHealthUnit(watch("health_unit_id")).then((res) => {
					setDoctors(res.data);
				});
			}
		},
		params: [watch("health_unit_id")],
	});
	useNoBugUseEffect({
		functions: () => {
			getTimeSlots({
				date: getValues("date"),
				doctor_id: getValues("doctor_id"),
			}).then((res) => {
				setSlots(Object.values(res.data));
			});
		},
		params: [doctor?.id],
	});
// 	useEffect(() => {
//     Axios.get('/v1/inventory-pharmacy/supplies').then((res) => {
//         const suppliesData = res.data.map(supply => ({
//             label: supply.pharmacy_supplies,
//             value: supply.id,
//             stock: supply.pharmacy_stocks,
//             price: supply.pharmacy_price,
//             status: supply.pharmacy_status,
//             date: supply.pharmacy_date
//         }));
//         setSuppliesOptions(suppliesData);
//     }).catch(err => {
//         console.error("Error fetching supplies data:", err);
//     });
// }, []);
		useEffect(() => {
        Axios.get('/v1/inventory-pharmacy/supplies').then((res) => {
            const suppliesData = res.data
                .filter(supply => supply.pharmacy_stocks > 0) // Filter out supplies with csr_stocks <= 0
                .map(supply => ({
                    label: supply.pharmacy_supplies,
                    value: supply.id,
                    stock: supply.pharmacy_stocks,
                    price: supply.pharmacy_price,
                    status: supply.pharmacy_status,
                    date: supply.pharmacy_date
                }));
            setSuppliesOptions(suppliesData);
        }).catch(err => {
            console.error("Error fetching supplies data:", err);
        });
    }, []);
	const show = (data, appointmentData) => {
		setShowData(data);
		getDoctors().then((res) => {
			setDoctors(res.data.data);
		});
		setModalOpen(true);
	};

	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};
	const submit = (data) => {
		let formData = new FormData();

		formData.append("patient_id", patient?.id);
		formData.append("doctor_id", data?.doctor_id);
		formData.append("inventory_pharmacies_id", data?.inventory_pharmacies_id);
		formData.append("date", data?.date);
		// formData.append("supplies", data?.supplies);
		formData.append("quantity", data?.quantity);
		Axios.post(`v1/anesthesia/patient-pharmacy/store`, formData).then((res) => {
			setTimeout(() => {
				toast.success("Medicines Supplies Added successfully!");
				if (onSuccessCallBack) onSuccessCallBack();
			}, 200);
			hide();

			console.log("patientidpatientidpatientidpatientidpatientidpatientid", patient)
		}).catch(err => {
            toast.error("Error adding CSR Supplies");
            console.error("Error:", err);
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
					<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-20" />
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
							<Dialog.Panel className="w-full lg:max-w-lg transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										PHARMACY
									</span>
									
								</Dialog.Title>
								<div className="px-4 pt-5 pb-6 grid grid-cols-1 gap-2 relative">
									<TextInputField
                                        type="date"
										label="Date"
										placeholder="Enter date of procedure"
										{...register("date", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>
                                    
									 {/* <Controller
                                        name="inventory_pharmacies_id"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "This field is required",
                                            },
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                                            <ReactSelectInputField
                                                isClearable={false}
                                                label={
                                                    <>
                                                        Select Supplies/Medicines
                                                        <span className="text-danger ml-1">*</span>
                                                    </>
                                                }
                                                ref={ref}
                                                value={value}
                                                onChange={(selected) => {
                                                    onChange(selected);
                                                    setSelectedSupply(selected);
                                                }}
                                                onBlur={onBlur}
                                                error={error?.message}
                                                placeholder="Select supplies/medicines"
                                                options={suppliesOptions}
                                            />
                                        )}
                                    /> */}
									 <Controller
                                        name="inventory_pharmacies_id"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "This field is required",
                                            },
                                        }}
                                        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                                            <ReactSelectInputField
                                                isClearable={false}
                                                label={
                                                    <>
                                                        Select Supplies/Medicines
                                                        <span className="text-danger ml-1">*</span>
                                                    </>
                                                }
                                                ref={ref}
                                                value={value}
                                                onChange={(selected) => {
                                                    onChange(selected);
                                                    setSelectedSupply(selected);
                                                }}
                                                onBlur={onBlur}
                                                error={error?.message}
                                                placeholder="Select supplies/medicines"
                                                options={suppliesOptions}
                                            />
                                        )}
                                    />
                                     {/* {selectedSupply && (
                                        <div className="text-sm text-gray-700">
                                            Available Stock: {selectedSupply.stock}
                                        </div>
                                    )} */}
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
															Select Doctor
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
													placeholder="Select Doctor"
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

									<TextInputField
                                     
										label="Quantity"
										placeholder="Quantity"
										{...register("quantity", {
											required: {
												value: true,
												message:
													"This field is required",
											},
										})}
									/>

									
									
								</div>

								<div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
									<ActionBtn
										type="success"
										className="ml-4"
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
  )
}

export default forwardRef(UploadPharmacyOrderModal)
