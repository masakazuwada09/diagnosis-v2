/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FlatIcon from "../../../../components/FlatIcon";

const uniqID = uuidv4();
const TH = (props) => {
	const { col, onSort } = props;
	const [direction, setDirection] = useState(null);
	const triggerDirection = useCallback(() => {
		setDirection((prevDirection) =>
			prevDirection == null ? "desc" : direction == "desc" ? "asc" : null
		);
	}, [direction]);

	return (
		<th
			className={`${col?.className} ${
				col?.sortable ? "cursor-pointer" : ""
			}`}
			onClick={() => {
				if (col?.sortable) {
					triggerDirection();
					if (onSort) {
						onSort(col?.key, direction);
					}
				}
			}}
		>
			<div className="relative text-xs">
				{col?.header}
				{col?.sortable ? (
					<span className="flex flex-row right-1 top-[-2px] scale-125">
						
						
					</span>
				) : (
					""
				)}
			</div>
		</th>
	);
};
const TotalAmount = (props) => {
	const {
		loading = true,
		className = "",
		tableClassName = "",
		theadClassName = "",
		tbodyClassName = "",
		columns = [],
		data = [],
		onSort,
	} = props;
	return (
		<div className={`w-full   ${className}`}>
			<table className=" flex flex-row">
				<thead>
					<tr>
						{columns?.map((col, index) => {
							return (
								<TH
									onSort={onSort}
									key={`${uniqID}-th-${index}`}
									col={col}
								/>
							);
						})}
					</tr>
				</thead>
				<tbody className="relative">
					{loading ? (
						<div className="flex items-center justify-start py-3 px-2  text-xs absolute ml-[5px] w-[200px] top-0 left-0 h-full  bg-gray-200 rounded-xl text-slate-900 bg-opacity-70 animate-pulse backdrop-blur-sm">
							Loading Total Amount...
						</div>
					) : data?.length == 0 ? (
						<tr>
							<td colSpan={9999}>No data to display.</td>
						</tr>
					) : (
						data?.map((rowData, trIndex) => {
							return (
								<tr key={`${uniqID}-tr-${trIndex}`}>
									{columns?.map((col, tdIndex) => {
										return (
											<td
												key={`${uniqID}-td-${trIndex}-${tdIndex}`}
												className={`w-[150px] ${col?.tdClassName}`}
											>
												{col?.cell
													? col?.cell(rowData)
													: rowData[col?.key]}
											</td>
										);
                                        
									})}
                                   
								</tr>
                                
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TotalAmount;
