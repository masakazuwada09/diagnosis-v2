import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";

const InQueueRegular = ({ data, onClick, children, number, patientName }) => {
	return (
		<div
			className="p-3 gap-3 relative rounded-[20px] border border-blue-300 bg-blue-50  cursor-pointer hover:bg-green-100 hover:border-green-500 duration-200"
			onClick={onClick}
		>
			<div className="flex items-center gap-4">
				
				<span className="flex items-center justify-center bg-blue-100 text-blue-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square">
					#{number}
				</span>
				
				<span className="tracking-tight font-bold text-lg">
					{patientName}
				</span>

				<div className="flex items-center gap-2 text-sm -ml-3 -mt-0 justify-end">
						<FlatIcon icon="fi fi-rr-bed" />
						{data?.room_number}
					</div>
				
			</div>
			
			{children}

					
		</div>
	);
};

export default InQueueRegular;
