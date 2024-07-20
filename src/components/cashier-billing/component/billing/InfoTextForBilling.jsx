import FlatIcon from "../../../FlatIcon";

const InfoTextForBilling = ({
	className = "",
	labelClassName = "",
	contentClassName = "",
	icon,
	title,
	value,
	...rest
}) => {
	return (
		<div
			className={`flex flex-col  capitalize font-mono  border-b  border-b-slate-300 w-full   ${className}`}
			{...rest}
		>
			<div
				contentEditable
				className={`text-darker  rounded-xl w-full px-1 text-sm font-semibold capitalize flex justify-center   ${contentClassName}`}
			>
				{value || " "}
				{/* {value || (
					<>
						<span className="text-gray-200 font-normal text-xs italic">
							blank
						</span>{" "}
						&nbsp;
					</>
				)} */}
			</div>
		</div>
	);
};

export default InfoTextForBilling;
