import React, { useState, useRef } from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import InfoTextForPrint from '../../../../components/InfoTextForPrint';
import { dateToday, formatDate } from '../../../../libs/helpers';
import useMDQueue from '../../../../hooks/useMDQueue';
import useHousekeepingQueue from '../../../../hooks/useHousekeepingQueue';
import DoctorInServiceItem from '../../../department/his-md/components/DoctorInServiceItem';
import HouseKeepingInService from './HousekeepingInService';
import useBillingQueue from '../../../../hooks/useBillingQueue';
import PatientProfileModal from '../../../../components/PatientProfileModal';
import PendingOrdersModal from '../../../../components/PendingOrdersModal';

const Housekeeping = (props, data) => {
    const { loading: btnLoading, appointment, patient, onSave, } = props;
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const componentRef = React.useRef(null);
	const patientProfileRef = useRef(null);
	const pendingOrdersRef = useRef(null);

	const {
		pending: doctorsPending,
		nowServing: housekeepingNowServing,
		pendingForResultReading,
		mutatePending,
		mutatePendingForResultReading,
		mutateNowServing,
	} = useHousekeepingQueue();

	

	useNoBugUseEffect({
		functions: () => {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		},
		params: [appointment],
	});
	
	const handleSave = () => {
		if (onSave) {
			onSave();
		}

    // const handleHousekeepingApproval = () => {
    //     if ()
    // }
		// Logic for saving the invoice
		// You can implement your save logic here
	};
	const mutateAll = () => {
		mutatePending();
		mutatePendingForResultReading();
		mutateNowServing();
	};
  return (
     <div className="relative">
			{loading ? (
				<div className="absolute top-0 left-0 h-full w-full flex items-start justify-center bg-slate-200 bg-opacity-95 backdrop-blur pt-[244px] z-10">
					<div className="flex items-center justify-center text-2xl animate-pulse">
						Loading, please wait...
					</div>
				</div>
			) : (
				""
			)}
			<div className="m-2">
				<div className=" gap-2 text-base ">
					<FlatIcon icon="rr-wallet" className="text-base" />
					<span className="text-md font-semibold m-2 ">
						Status: {""}
						<span className="text-green-500">For Room Inspection</span>
						{/* {billingStatus === "pending" ? (
							<span className="text-yellow-700">Pending</span>
						) : (
							<span className="text-green-700">MGH</span>
						)} */}
					</span>
				</div>
			</div>
							
			<div className="border shadow p-2">
				<div className="text-justify mt-1" >
					
				{housekeepingNowServing?.data?.map((data, queue) => {
								return (
									<HouseKeepingInService
										selected={data?.id == appointment?.id}
										data={data}
										key={`HouseKeepingInService-${data?.id}`}
										
									/>
								);
							})}

					
					
				</div>

				<div className="p-4 flex items-center justify-end">
					<ActionBtn
						type="teal"
						className="ml-2 bg-green-500"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Pending for Cashier
					</ActionBtn>
					{/* Adding more billing-related information here if needed */}
					<ActionBtn
						type="success"
						className="ml-2"
						loading={btnLoading}
						onClick={handleSave}
					>
						<FlatIcon icon="rr-check" />
						Approve for Cashier
					</ActionBtn>
					{/* <ActionBtn className="ml-2" onClick={handleDownload}>
                    Download
                  </ActionBtn>  */}
				</div>
			</div>

			<PatientProfileModal
				pendingOrdersRef={pendingOrdersRef}
				ref={patientProfileRef}
				mutateAll={mutateAll}
				
			/>

			<PendingOrdersModal ref={pendingOrdersRef} />

		</div>

		
  )
}

export default Housekeeping
