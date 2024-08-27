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
			className={`flex flex-row  capitalize font-mono  w-full   ${className}`}
			{...rest}
		>
			<div
				contentEditable
				className={`text-teal-700   w-full text-sm font-semibold capitalize flex justify-center border-r border-r-slate-300 border-l border-l-slate-300 ${contentClassName}`}
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
