import FlatIcon from "./FlatIcon";

const InfoText = ({
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
			className={`flex flex-col lg:flex-row items-center lg:gap-2 border-b border-b-gray-400 border-dashed  ${className}`}
			{...rest}
		>
			<label
				className={` flex items-center text-xs font-md border-opacity-50 capitalize text-slate-900 lg:col-span-3 ${labelClassName}`}
			>
				{icon ? <FlatIcon icon={icon} className="mr-1" /> : ""} {title}:
			</label>

			<div
				className={`text-darker text-sm font-semibold capitalize lg:col-span-8 ${contentClassName}`}
			>
				{value || (
					<>
						<span className="text-gray-200 font-normal text-xs italic">
							blank
						</span>{" "}
						&nbsp;
					</>
				)}
			</div>
		</div>
	);
};

export default InfoText;
