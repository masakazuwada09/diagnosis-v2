import React, {useState, useRef} from 'react'
import Img from '../../../../components/Img';
import { patientFullName, calculateAge, formatDate } from '../../../../libs/helpers';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import PendingOrdersModal from './modal/PendingOrdersModal';
import { useImperativeHandle } from 'react';

const PatientProfile = ({patient}, props, ref) => {
    const [showData, setShowData] = useState(null);
    
    useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));
    const show = (data) => {
		setFull(false);
		setShowData(data);
		
		setModalOpen(true);
	};
    const hide = () => {
		setModalOpen(false);
	};
    const [loading, setLoading] = useState(false);
    
	return (
		<div className="flex flex-col lg:flex-row gap-4 items-center px-4 pt-4 border-b justify- md:justify-between w-full bg-slate-50 p-4 h-full">
			<div className='flex flex-row'>
            <div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
				<Img
					type="user"
					name={patientFullName(patient)}
					src={patient?.avatar || ""}
					className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-full"
					alt=""
					id="user-image-sample"
					key={`key-${patient?.id}-${patient?.avatar}`}
				/>
			</div>
			<div className="flex flex-col pl-4">
				<h6
					className={`text-left text-2xl mb-1 font-semibold flex items-center ${
						String(patient?.gender).toLowerCase() == "male"
							? "text-blue-800"
							: "text-pink-800"
					} mb-0`}
				>
					{patientFullName(patient)}
				</h6>
				<div className="flex gap-6 mb-2">
					<div className="flex items-center gap-2 text-base">
						<FlatIcon
							icon="rr-calendar-clock"
							className="text-base"
						/>
						<span>{calculateAge(patient?.birthday)} yrs. old</span>
					</div>
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-calendar" className="text-base" />
						<span>{formatDate(patient?.birthday)}</span>
					</div>
				</div>
				<div className="flex gap-4 mb-2">
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-venus-mars" className="text-base" />
						{String(patient?.gender).toLowerCase() == "male" ? (
							<span className="text-blue-700">Male</span>
						) : (
							<span className="text-pink-700">Female</span>
						)}
					</div>
				</div>								
			</div>
            </div>
            {showData?.status ==
												"pending" ? (
													""
												) : (
													""
												)}

                    
				</div>
                                            
		
	);
};

export default PatientProfile