/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
	useRef
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LaboratoryOrders from "../../../../../components/patient-modules/LaboratoryOrders";
import ActionBtn from "../../../../../components/buttons/ActionBtn";
import useDataTable from "../../../../../hooks/useDataTable";
import useNoBugUseEffect from "../../../../../hooks/useNoBugUseEffect";
import FlatIcon from "../../../../../components/FlatIcon";
import { Fade } from "react-reveal";

const PendingOrdersModal = ( props, ref,) => {
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
	const {
		showTitle = true,
		patient,
		appointment,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
	const [mount, setMount] = useState(0);
	
	const [modalData, setModalData] = useState(null);
	const [showData, setShowData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const pendingOrdersRef = useRef(null);
	const [order, setOrder] = useState(null);

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
		reloadData,
	} = useDataTable
	({
		url: `/v1/doctor/laboratory-order/patient/${patient?.id}`,
		defaultFilters: {
			...(order_id ? { order_id: order_id } : {}),
			...(laboratory_test_type
				? { laboratory_test_type: laboratory_test_type }
				: {}),
			...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
		},
	});

	useNoBugUseEffect({
		functions: () => {
			setFilters((prevFilters) => ({
				...prevFilters,

				order_id: order_id,
			}));
		},
	});

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

	const show = (showData = null) => {
		setModalOpen(true);
		if (showData) {
			setModalData(showData);
		}
	};
	const hide = () => {
		setModalOpen(false);
	};
	const nohide = () => {};

	const submit = (data) => {
		let formData = new FormData();
		if (modalData.fn) {
			modalData.fn();
			hide();
		}
	};

	console.log("MODALLLLLLLLLLLL", modalData);

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

				<div className="fixed inset-0 overflow-y-auto !z-[1000]">
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
							<Dialog.Panel className="w-full lg:max-w-3xl transform overflow-visible rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className="py-3 px-4 flex flex-col border-b "
								>
									<span className="text-xl font-bold  text-blue-900">
										Send Patient to Laboratory/Imaging
									</span>
									<span className="text-sm font-light text-blue-900 ">
										List of pending orders...
									</span>
								</Dialog.Title>
								<div className=" pt-5 grid grid-cols-1 gap-5 relative">
									
									
									<LaboratoryOrders
										
										data={data}	
										patient={
											order_id
										}
										
									/>
									
								</div>

								<div className="px-5 py-2 flex items-center justify-end bg-slate- border-t">
									
									<ActionBtn
										type="secondary"
										className="items-center transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-100 duration-300 px-2 py-1"
										size="xl"
										onClick={handleSubmit(submit)}
									>
										<FlatIcon
															className="text-sm mr-1	"
															icon="rr-right"
														/>
														<div className="flex flex-col text-left ">
															<span className="font- text-sm  ">
															Send Order
										</span>			
									</div>
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

export default forwardRef(PendingOrdersModal);
