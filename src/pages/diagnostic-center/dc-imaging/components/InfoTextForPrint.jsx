import FlatIcon from "../../../../components/FlatIcon";

const InfoTextForPrint = ({
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
			className={`flex flex-col sm:flex-row items-center capitalize font-mono ${className}`}
			{...rest}
		>
			<label
				className={`w-full  text-placeholder ml-4 flex text-xs font-light border-opacity-50 capitalize text-white lg:col-span-3 font-bi ${labelClassName}`}
			>
				{icon ? <FlatIcon icon={icon} className="mr-1 " /> : ""} {title}:
			</label>

			<div
				contentEditable
				className={`  rounded-xl w-full px-1 text-xs font-light capitalize lg:col-span-1 items-center  ${contentClassName}`}
			>
				
				{value || (
					<>
						<span className="text-white font-normal text-xs italic">
							blank
						</span>{" "}
						&nbsp;
					</>
				)}
			</div>
		</div>
	);
};

export default InfoTextForPrint;
