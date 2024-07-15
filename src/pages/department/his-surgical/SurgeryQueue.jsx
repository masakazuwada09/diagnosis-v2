
import { useRef, useState } from 'react'
import useAnesthesiaQueue from '../../../hooks/useAnesthesiaQueue';
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../components/FlatIcon';
import AppLayout from '../../../components/container/AppLayout';
import InQueueAnesthesia from '../his-anesthesia/components/InQueueAnesthesia';
import {  doctorName, doctorSpecialty, formatDate, patientFullName } from '../../../libs/helpers';
import ActionBtn from '../../../components/buttons/ActionBtn';
import UpdatePatientOperation from '../his-anesthesia/components/modal/UpdatePatientOperation';
import { useAuth } from '../../../hooks/useAuth';
import useDoctorQueue from '../../../hooks/useDoctorQueue';
import useERQueue from '../../../hooks/useERQueue';
import DoctorInQueueRegular from '../his-md/components/DoctorInQueueRegular';
import ConsultPatientModal from '../his-md/components/ConsultPatientModal';
import InQueueSurgery from './components/InQueueSurgery';
import useSurgeryQueue from '../../../hooks/useSurgeryQueue';

const SurgeryQueue = (props) => {
	const {  surgeryRoom, mutateSurgeryRoom, resu, mutateResu, done, mutateDone } = useSurgeryQueue();
    const [order, setOrder] = useState(null);
	const {patient} = props;
	const { user } = useAuth();
	const {
		pending: doctorsPending,
		nowServing: doctorsNowServing,
		pendingForResultReading,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useDoctorQueue();
	const { pending, nowServing } = useERQueue();
	const acceptPatientRef = useRef(null);
	
	
	useNoBugUseEffect({
        functions: () => {},
    });

	const isDoctor = () => {
		return user?.type == "rhu-doctor" || user?.type == "RHU-DOCTOR"; // check if the doctor is RHU or HIS if HIS the queue will appear at the central-doctor user
	};
	const mutateAll = () => {
		mutatePending();
		mutatePendingForResultReading();
		mutateNowServing();
	};
	const listPending = () => {
		return (isDoctor() ? doctorsPending?.data : pending?.data) || [];
	};
	// const listPendingWaiting = () => {
    //     return waitingRoom?.data || [];
    // };
	const listPendingSurgery = () => {
        return surgeryRoom?.data || [];
    };
	const listPendingRESU = () => {
        return resu?.data || [];
    };
	const listPendingDone = () => {
        return done?.data || [];
    };
  return (
	<AppLayout>
            <div className="p-4 h-full overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 divide-x">
					
                    <div className="lg:col-span-3">
                        <h1 className="text-xl font-bold font-opensans text-red-700 tracking-wider mb-2 ml-2">
                            <FlatIcon icon="rr-procedures" className="text-xl" /> Surgery Room
                        </h1>
                        <div className="flex flex-col gap-y-4 relative ml-2">
                            {listPendingSurgery()?.length === 0 ? (
                                <span className="text-center py-20 font-bold text-slate-400">
                                    No patients in Surgery Room.
                                </span>
                            ) : (
                                listPendingSurgery()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "Surgery Room" && (
                                            <InQueueSurgery
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="surgeryRoom"
                                                number={queue.id}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												patient={queue?.relationships?.patient}
												data={queue}
													>
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-slate-700 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
												
												
												</div>
                                            </InQueueSurgery>
                                        )
                                    );
                                })
                            )}
                        </div>
						
                    </div>
                    <div className="lg:col-span-3">
                        <h1 className="text-xl font-bold font-opensans text-primary-dark tracking-wider mb-2 ml-2">
                            <FlatIcon icon="rr-procedures" className="text-xl" /> RESU
                        </h1>
                        <div className="flex flex-col gap-y-4 relative ml-2">
                            {listPendingRESU()?.length === 0 ? (
                                <span className="text-center py-20 font-bold text-slate-400">
                                    No patients in RESU.
                                </span>
                            ) : (
                                listPendingRESU()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "RESU" && (
                                            <InQueueSurgery
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="resu"
                                                number={queue.id}
												patient={queue?.relationships?.patient}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												data={queue}
                                            >
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-blue-800 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
												
												
											</div>
                                            </InQueueSurgery>
                                        )
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h1 className="text-xl font-bold font-opensans text-success-dark tracking-wider mb-2 ml-2">
                            <FlatIcon icon="rr-procedures" className="text-xl" /> Done (Back to Room)
                        </h1>
                        <div className="flex flex-col gap-y-4 relative ml-2">
                            {listPendingDone()?.length === 0 ? (
                                <span className="text-center py-20 font-bold text-slate-400">
                                    No patients in Back to Room.
                                </span>
                            ) : (
                                listPendingDone()?.map((queue, index) => {
                                    return (
                                        queue?.operation_status === "DONE" && (
                                            <InQueueSurgery
                                                key={queue.id}
                                                queue={queue}
                                                currentSection="done"
                                                number={queue.id}
												patient={queue?.relationships?.patient}
                                                patientName={patientFullName(queue?.relationships?.patient)}
												data={queue}
												
									
                                            >
                                                <div className="w-full flex flex-col ">
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Status:
													</span>
													<span className="font-bold text-lg text-green-800 italic">
														{queue?.operation_status}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Date:
													</span>
													<span className="font-light italic">
														{formatDate(
															new Date(
																queue?.operation_date
															)
														)}
													</span>
												</div>
                                                <div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Time:
													</span>
													<span className="font-light italic">
														{queue?.operation_time}
													</span>
												</div>
												<div className="flex items-center gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Procedure
													</span>
													<span className="text-sm font-bold text-red-700">
														{" "}
														{queue?.procedure}
													</span>
												</div>
												
												<div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Surgeon:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.surgeon}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
                                                <div className="flex items-start gap-16 mb-2">
													<span className="text-sm w-[58px]">
														Anesthesiologist:{" "}
													</span>
													<span className="flex flex-col font-bold">
														<span className="mb-2">
															{/* {doctorName(
																queue
																	?.relationships
																	?.doctor
															)} */}
															{queue?.anesthesiologist}
														</span>
														<span className="font-light text-sm">
															{doctorSpecialty(
																queue
																	?.relationships
																	?.doctor
															)}
														</span>
													</span>
												</div>
												
												
											</div>
                                            </InQueueSurgery>
                                        )
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
			<ConsultPatientModal ref={acceptPatientRef} mutateAll={mutateAll} />
			
        </AppLayout>
  )
}

export default SurgeryQueue
