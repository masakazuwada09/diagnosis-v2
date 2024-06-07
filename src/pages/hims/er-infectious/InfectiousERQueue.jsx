import { useEffect, useRef, useState } from "react";
import AppLayout from "../../../components/container/AppLayout";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import PageHeader from "../../../components/layout/PageHeader";
import FlatIcon from "../../../components/FlatIcon";

import DoctorInQueueRegular from "../../doctor-patient-queue/components/DoctorInQueueRegular";
import useERQueue from "../../../hooks/useERQueue";
import useDoctorQueue from "../../../hooks/useDoctorQueue";
import DoctorInServiceItem from "../../doctor-patient-queue/components/DoctorInServiceItem";

import InfectiousInQueueRegular from "./components/InfectiousInQueueRegular";
import useERInfectious from "../../../hooks/useERInfectious";
import useInfectiousQueue from "../../../hooks/useInfectiousQueue";
import InfectiousInServiceItem from "./InfectiousInServiceItem";
import InfectiousPatientModal from "./modal/InfectiousPatientModal";

import useQueue from "../../../hooks/useQueue";
import {
	formatDate,
	formatDateTime,
	patientFullName,
} from "../../../libs/helpers";


import ReferToSPHModal from "../../../components/modal/ReferToSPHModal";
import { useAuth } from "../../../hooks/useAuth";

import ConsultPatientModal from "../../doctor-patient-queue/components/ConsultPatientModal";
import ConsultInfectiousModal from "./components/ConsultInfectiousModal";



import DoctorInQueuePriority from "../../doctor-patient-queue/components/DoctorInQueuePriority";
import PendingOrdersModal from "../../../components/PendingOrdersModal";




const InfectiousERQueue = () => {
	const { user } = useAuth();
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		pendingForResultReading,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useInfectiousQueue();
	const { pending, nowServing } = useERInfectious();
	const referToSphModalRef = useRef(null);
	const patientProfileRef = useRef(null);
	const acceptPatientRef = useRef(null);
	const pendingOrdersRef = useRef(null);

	useNoBugUseEffect({
		functions: () => {},
	});
	const isDoctor = () => {
		return user?.type == "er-infectious" || user?.type == "ER-Infectious"; // check if the doctor is RHU or HIS if HIS the queue will appear at the central-doctor user
	};

	const listPending = () => {
		return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	const mutateAll = () => {
		mutatePending();
		mutatePendingForResultReading();
		mutateNowServing();
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
							In Queue
						</h1>
						<span className="noto-sans-thin text-slate-500 text-sm font-light">
							Infectious Patients pending for  acceptance
						</span>
						<div className="flex flex-col gap-y-4 py-4">
							{listPending()?.length == 0 &&
							pendingForResultReading?.data?.length == 0 ? (
								<div className="text-slate-300 py-20 text-center">
									No patient in queue.{" "}
								</div>
							) : (
								""
							)}
							{pendingForResultReading?.data?.map((queue) => {
								if (
									queue.status != "in-service-result-reading"
								) {
									console.log("queuequeuequeue", queue);
									return (
										<DoctorInQueuePriority
											labOrdersStr={JSON.stringify(
												queue?.lab_orders
											)}
											date={formatDate(
												new Date(queue?.created_at)
											)}
											acceptAction={() => {
												acceptPatientRef.current.show(
													queue
												);
											}}
											key={`iqr-prio-${queue.id}`}
											number={`${queue.id}`}
											patientName={patientFullName(
												queue?.patient
											)}
										/>
									);
								}
							})}
							{listPending()?.map((queue, index) => {
								return (
									<InfectiousInQueueRegular
										date={formatDate(
											new Date(queue?.created_at)
										)}
										acceptAction={() => {
											acceptPatientRef.current.show(
												queue
											);
										}}
										key={`iqr-${queue.id}`}
										number={`${queue.id}`}
										patientName={patientFullName(
											queue?.patient
										)}
									/>
								);
							})}
						</div>
					</div>
					<div className="lg:col-span-8 pl-4">
						<h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider -mb-1">
							In Service...
						</h1>
						<span className="mb-3 noto-sans-thin text-slate-500 text-sm font-light">
							&nbsp;
						</span>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{doctorsNowServing?.data?.map((data) => {
								return (
									<InfectiousInServiceItem
										data={data}
										labOrdersStr={JSON.stringify(
											data?.lab_orders
										)}
										pendingOrdersRef={pendingOrdersRef}
										key={`InfectiousInServiceItem-${data?.id}`}
										openProfileAction={() => {
											patientProfileRef.current.show(
												data
											);
										}}
									/>
								);
							})}
							{doctorsNowServing?.data?.length == 0 ? (
								<span className="py-20 text-center lg:col-span-2 text-slate-500 text-lg font-bold">
									No data available.
								</span>
							) : (
								""
							)}
							
						</div>
					</div>
					
				</div>
			</div>


			<ReferToSPHModal ref={referToSphModalRef} mutateAll={mutateAll} />

			
			<ConsultInfectiousModal ref={acceptPatientRef} mutateAll={mutateAll} />
			
			<InfectiousPatientModal
				pendingOrdersRef={pendingOrdersRef}
				ref={patientProfileRef}
				mutateAll={mutateAll}
			/>


			<PendingOrdersModal ref={pendingOrdersRef} />


		</AppLayout>
	);
};

export default InfectiousERQueue;
