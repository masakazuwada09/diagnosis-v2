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
			className={`flex flex-col sm:flex-row items-center capitalize font-mono  border-b  border-b-slate-300  ${className}`}
			{...rest}
		>
			<label
				className={`w-full pt-3 text-placeholder flex text-xs font-light border-opacity-50 capitalize text-slate-800 lg:col-span-3 ${labelClassName}`}
			>
				{icon ? <FlatIcon icon={icon} className="mr-1" /> : ""} {title}
			</label>

			<div
				contentEditable
				className={`text-darker  rounded-xl w-full px-1 text-sm font-semibold capitalize lg:col-span-8 ${contentClassName}`}
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
