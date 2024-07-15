import FlatIcon from "../../../components/FlatIcon";
import ActionBtn from "../../../components/buttons/ActionBtn";

const InQueueForRelease = ({
	children,
	onClick,
	referAction,
	number,
	selected,
	patientName,
}) => {
	return (
		<div
			className={`p-3 gap-3 relative rounded-[20px] border border-orange-300 bg-orange-50  cursor-pointer hover:bg-indigo-100 hover:border-indigo-500 duration-200 ${
				selected
					? "!bg-green-50 !border-green-800 shadow-sm shadow-green-500"
					: ""
			}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-4">
				<span className={`flex items-center justify-center bg-orange-100 text-orange-500 tracking-tight rounded-[18px] font-bold w-12 aspect-square ${
				selected
					? "!bg-green-50 !border-green-800 shadow-sm shadow-green-500"
					: ""
			}`}>
					#{number}
				</span>
				<span className="tracking-tight font-bold text-lg text-orange-800 ">
					{patientName}
				</span>
			</div>
			
			{children}
		</div>
	);
};

export default InQueueForRelease;
