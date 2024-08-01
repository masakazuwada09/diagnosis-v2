import { useEffect, useRef, useState } from "react";
import AppLayout from "../../components/container/AppLayout";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import PageHeader from "../../components/layout/PageHeader";
import InServiceItem from "./components/InServiceItem";
import FlatIcon from "../../components/FlatIcon";
import InQueueRegular from "./components/InQueueRegular";
import useQueue from "../../hooks/useQueue";
import {
	calculateAge,
	doctorName,
	doctorSpecialty,
	formatDate,
	patientFullName,
} from "../../libs/helpers";
import ReferToSPHModal from "../../components/modal/ReferToSPHModal";
import { useAuth } from "../../hooks/useAuth";
import useDoctorQueue from "../../hooks/useDoctorQueue";
import useLabQueue from "../../hooks/useLabQueue";
import Img from "../../components/Img";
import LaboratoryOrders from "../../components/patient-modules/LaboratoryOrders";
import { Fade } from "react-reveal";
import UploadLabResultModal from "../../components/patient-modules/modals/UploadLabResultModal";
import ActionBtn from "../../components/buttons/ActionBtn";
import TabGroup from "../../components/TabGroup";
import MenuTitle from "../../components/buttons/MenuTitle";
import Chemistry from "../../components/laboratory/Chemistry";
import Microscopy from "../../components/laboratory/Microscopy";
import Hematology from "../../components/laboratory/Hematology";
import Microbiology from "../../components/laboratory/Microbiology";
import Serology from "../../components/laboratory/Serology";
import Bloodtype from "../../components/laboratory/Bloodtype";
import Crossmatching from "../../components/laboratory/Crossmatching";
import Covid from "../../components/laboratory/Covid";
import Miscellaneous from "../../components/laboratory/Miscellaneous";
import ChemistryModal from "../../components/modal/laboratory/ChemistryModal";
import LaboratoryFinalReport from "./components/LaboratoryFinalReport";
import TextInput from "../../components/inputs/TextInput";

const PatientLabQueue = () => {
	
	const { user } = useAuth();
	const { pending, mutatePending, nowServing } = useLabQueue();
	const [order, setOrder] = useState(null);
	const [appointment, setAppointment] = useState(null);

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
						
						<h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider -mb-1">
							Patient Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Patients pending for laboratory services
						</span>
						<div className="pr-5 py-3">
							<TextInput
								iconLeft={"rr-search"}
								placeholder="Search patient..."
								onChange={(e) => {
									setFilters((prevFilters) => ({
										...prevFilters,
										keyword: e.target.value,
									}));
								}}
							/>
						</div>
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
								listPending()?.map((queue, data, index) => {
									return (
										<InQueueRegular
											patient={
											order?.relationships
												?.patient
											}
											data={data}
											
											onClick={() => { 
												setOrder(queue);
												setAppointment(queue);
											}}
											
											patientName={patientFullName(
												queue?.relationships?.patient
											)}
										>
											
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
							<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
								In Service...
							</h1>
						</div>
						<div>
						{/* {appointment?.patient ? (
								<Fade key={`order-${appointment?.id}`}> */}
							{order?.relationships?.patient ? (
								<Fade key={`order-${appointment?.id}`}>
									<div>
										<LaboratoryFinalReport
											appointment={appointment}
											
											mutateAll={mutateAll}	
											setAppointment={setOrder}
											patient={
												order?.relationships
													?.patient
											}
											order_id={order?.id}
											onUploadLabResultSuccess={() => {
												console.log(
													"onUploadLabResultSuccess"
												);
												mutatePending();
												setOrder(null);
											}}
										/>
										{/* <PatientProfile
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
												order_id={order?.id}
												onUploadLabResultSuccess={() => {
													console.log(
														"onUploadLabResultSuccess"
													);
													mutatePending();
													setOrder(null);
												}}
											/>
										</div> */}
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

export default PatientLabQueue;
