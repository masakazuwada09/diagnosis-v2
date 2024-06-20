/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";

import { v4 as uuidv4 } from "uuid";
import Axios from "../../../../libs/axios";
import ReactSelectInputField from "../../../../components/inputs/ReactSelectInputField";
import TextInputField from "../../../../components/inputs/TextInputField";
import {
	dataURItoBlob,
	dateYYYYMMDD,
	doctorName,
	doctorSpecialty,
	patientFullName,
} from "../../../../libs/helpers";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { Controller, set, useForm } from "react-hook-form";
import ReactQuillField from "../../../../components/inputs/ReactQuillField";
import ImagePicker from "../../../../components/inputs/ImagePicker";
import ContentTitle from "../../../../components/buttons/ContentTitle";
import InfoText from "../../../../components/InfoText";
import ReleaseMedStep1 from "../../../../pages/appointments/components/ReleaseMedStep1";
import ReleaseMedStep2 from "../../../../pages/appointments/components/ReleaseMedStep2";
import ReleaseMedStep3 from "../../../../pages/appointments/components/ReleaseMedStep3";
import { mutate } from "swr";
import PatientCSROrder from "../../../department/his-nurse/components/PatientCSROrder";
import PatientPharmacyOrder from "../../../department/his-nurse/components/PatientPharmacyOrder";

const uniq_id = uuidv4();
const PACUServices = (props) => {
	const { patient, appointment, setAppointment, mutateAll } = props;
	const [showData, setShowData] = useState(null);
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
		formdata.append("surgery_date", data?.surgery_date);
		formdata.append("surgery_time", data?.surgery_time);
		formdata.append("_method", "PATCH");

		Axios.post(`v1/clinic/tb-assign-to-doctor/${appointment?.id}`, formdata)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient update success!");
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



	const show = (data) => {
		setShowData(data);
		console.log("procedure ID---------------->>>", showData?.id);
		// console.log("/v1/anesthesia/operation-procedure/list");
		setModalOpen(true);
		getOperationProcedure(data);
		
	};


	return (
		<div className="gap-10 bottom-5">
		
                <PatientCSROrder 
                    className="gap-5 py-5 pt-5"
                    patient={patient}/>

                <PatientPharmacyOrder 
                    className="gap-5 py-5 pt-5"
                    patient={patient}/>


        </div>
	);
};

export default PACUServices;
