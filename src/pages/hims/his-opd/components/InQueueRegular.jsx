import React from "react";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";

const InQueueRegular = ({
	children,
	roomNumber,
	onClick,
	referAction,
	number,
	selected,
	patientName,
	date,
}) => {
	return (
		<div
			className={` p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-50  cursor-pointer hover:bg-green-100 hover:border-green-500 duration-200 ${
				selected
					? "!bg-green-100 !border-indigo-800 shadow-sm shadow-green-500"
					: ""
			}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-7 mt-2">
				<span className="flex items-center justify-center bg-blue-100 text-blue-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
					#{number}
				</span>

				<div>

				{date ? (
					<div className="flex items-center gap-2 text-sm -ml-3 -mt-3 font-bold text-gray-600">
						<FlatIcon icon="rr-calendar" className="text-gray-800" />
						{date}
					</div>
					
				) : (
					""
				)}
				<div className="tracking-tight font-bold text-gray-700 text-lg">
					{patientName}
				</div>

				</div>
				

				
					
			</div>
			{children}
				
			</div>

	);
};

export default InQueueRegular;
