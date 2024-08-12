import { useEffect, useRef, useState } from "react";
import AppLayout from "../../../../components/container/AppLayout";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import PageHeader from "../../../../components/layout/PageHeader";
import InServiceItem from "../../../patient-lab-queue/components/InServiceItem";
import FlatIcon from "../../../../components/FlatIcon";
import InQueueRegular from "../../../patient-queue/components/InQueueRegular";
import useQueue from "../../../../hooks/useQueue";
import {
	calculateAge,
	doctorName,
	doctorSpecialty,
	formatDate,
	patientFullName,
} from "../../../../libs/helpers";
import ReferToSPHModal from "../../../../components/modal/ReferToSPHModal";
import { useAuth } from "../../../../hooks/useAuth";
import useDoctorQueue from "../../../../hooks/useDoctorQueue";
import useLabQueue from "../../../../hooks/useLabQueue";
import Img from "../../../../components/Img";
import LaboratoryOrders from "./LaboratoryOrders";
import { Fade } from "react-reveal";
import UploadLabResultModal from "../../../../components/patient-modules/modals/UploadLabResultModal";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import TabGroup from "../../../../components/TabGroup";
import MenuTitle from "../../../../components/buttons/MenuTitle";
import Chemistry from "../../../../components/laboratory/Chemistry";
import Microscopy from "../../../../components/laboratory/Microscopy";
import Hematology from "../../../../components/laboratory/Hematology";
import Microbiology from "../../../../components/laboratory/Microbiology";
import Serology from "../../../../components/laboratory/Serology";
import Bloodtype from "../../../../components/laboratory/Bloodtype";
import Crossmatching from "../../../../components/laboratory/Crossmatching";
import Covid from "../../../../components/laboratory/Covid";
import Miscellaneous from "../../../../components/laboratory/Miscellaneous";
import ChemistryModal from "../../../../components/modal/laboratory/ChemistryModal";
import PatientInfo from "../../../patients/components/PatientInfo";
import CashierAppointmentDetails from "./CashierAppointmentDetails";
import PatientProfile from "./PatientProfile";
import PendingOrdersModal from "./modal/PendingOrdersModal";
import useMDQueue from "../../../../hooks/useMDQueue";



const PatientCashierLab = () => {
	
	const { user } = useAuth();
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		pendingForResultReading,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useMDQueue();
	const { pending, nowServing } = useLabQueue();
	const patientProfileRef = useRef(null);
	const pendingOrdersRef = useRef(null);
	const [order, setOrder] = useState(null);
	
	const [appointment, setAppointment] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingDone, setLoadingDone] = useState(false);
	const [showData, setShowData] = useState(null);
	const referToSphModalRef = useRef(null);
	const uploadLabResultRef = useRef(null);
	const [selectedTab, setSelectedTab] = useState("");
	useNoBugUseEffect({
		functions: () => {},
	});

	const listPending = () => {
		return pending?.data || [];
		// return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	const mutateAll = () => {
		mutatePending();
	};
	return (
		<AppLayout>
			{/* <PageHeader
				title="Patient Queue"
				subtitle={"View patients in queue"}
				icon="rr-clipboard-list-check"
			/> */}
			<div className="p-4 h-full overflow-auto ">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					<div className="lg:col-span-4">
						<h1 className="text-lg font-semibold font-opensans text-gray-400 tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for laboratory services
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{/* <span className="font-medium text-md text-orange-500 -mb-2 ">
								Priority Lane
							</span> */}
							{/* <InQueuePriority
								number="3"
								patientName="Raelyn Cameron"
								priorityType="PWD"
							/>
							<InQueuePriority
								number="4"
								patientName="Kamdyn Castillo"
								priorityType="PWD"
							/> */}
							{/* <span className="border-b border-b-slate-100"></span> */}
							{/* <span className="font-medium text-md text-blue-500 -mb-2 ">
								Regular
							</span> */}
							{listPending()?.length == 0 ? (
								<span className="text-center py-20 font-bold text-slate-400">
									No patients in queue.
								</span>
							) : (
								listPending()?.map((queue, index) => {
									return (
										<InQueueRegular
											selected={
												queue?.patient?.id ===
												order?.relationships?.patient
													?.id
											}
											onClick={() => { 
												setOrder(queue);
											}}
											key={`iqr-${queue.id}`}
											number={`${queue.id}`}
											patientName={patientFullName(
												queue?.relationships?.patient
											)}
										>
											<div className="w-full flex flex-col pl-16">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm w-[100px]">
														Lab Order:
													</span>
													<span className="font-bold text-red-700">
														{" "}
														{queue?.type?.name}
													</span>
												</div>
												
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm w-[58px]">
														Status
													</span>
													<span className="font-Bold text-red-700">
														Pending for Payment
													</span>
												</div>
												
											</div>
										</InQueueRegular>
									);
								})
							)}
							{/* <InQueueRegular
								number="6"
								patientName="Mylo Daugherty"
							/>
							<InQueueRegular
								number="7"
								patientName="Emmeline Larson"
							/> */}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<div className="flex items-center gap-4 pb-4">
							<h1 className="text-lg font-semibold font-opensans text-gray-400 tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
						{order?.relationships?.patient ? (
								<Fade key={`order-${order?.id}`}>
									<div>
										<PatientInfo
											patient={
												order?.relationships?.patient
											}
											
										/>
										<div className="py-4">
											<LaboratoryOrders
												
												patient={
													order?.relationships
														?.patient
												}
												
											/>
							
										</div>
									</div>
									
								</Fade>
							) : (
								<span className="w-full font-medium text-lg text-center py-20 text-slate-300">
									No patient selected
								</span>
							)}
							
						</div>
					</div>
				</div>
				
			</div>
		</AppLayout>
	);
};

export default PatientCashierLab;
