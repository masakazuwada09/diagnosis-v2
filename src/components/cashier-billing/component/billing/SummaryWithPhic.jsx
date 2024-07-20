import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { procedureRates } from "../../../../libs/procedureRates";
import { caseCodes } from "../../../../libs/caseCodes";
import { formatCurrency } from "../../../../libs/helpers";
import InfoTextForSummary from "./InfoTextForSummary";
/* eslint-disable react/prop-types */
const uniq_id = uuidv4();
const SummaryWithPhic = (props) => {
	const { patient, appointment } = props;
	const [summaryData, setSummaryData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/v1/phic-summary-items`);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await response.json();
				setSummaryData(data);
			} catch (error) {
				console.error("Error fetching summary data:", error);
			}
		};

		fetchData();
	}, []);
	let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);
	return (
		<>
			<div className="border border-gray-400">
				<h5 className="text-sm font-md font-mono text-center  bg-slate-700 text-white">
					SUMMARY OF CHARGES - PHIC
				</h5>

				
				<div className="grid grid-cols-4 items-center">
				<div className="flex text-base font-semibold m-2 font-mono col-span-2 text-red-600">
					<p>
						ICD-10 Code: {diagnosis?.CASE_CODE} -{" "}
						{diagnosis?.CASE_RATE_CODE}
					</p>
				</div>
					<div className="text-xs items-center w-full flex-col font-bold">
						Firstcase description: 

						<p className="font-bold text-red-600">
							{diagnosis?.CASE_DESCRIPTION}
						</p>
						
					</div>
					<div className="text-xs items-center w-full flex-col font-bold">
						
						Secondcase description: 
						<p className="font-bold text-red-600">
							{diagnosis?.CASE_DESCRIPTION}
						</p>
						
						</div>
				</div>

				
				<div className=" rounded-md mt-2">
					<div className="border bg-gray-200 rounded-sm grid grid-cols-7 divide-x text-sm font-mono font-semibold text-center items-center">
						<div className="col-span-2">PARTICULARS</div>
						<div className="col-span-1">ACTUAL CHARGES</div>
						<div className="col-span-1">
							SENIOR CITIZEN / PWD DISCOUNT
						</div>
						<div className="col-span-1">FIRST CASE</div>
						<div className="col-span-1">SECOND CASE</div>
						<div className="col-span-1">BALANCE</div>
					</div>
					<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2 ">
							Hospital Charges
						</div>
						<div className="col-span-1">
						<div className="col-span-1">
							{/* add a code for Debit database */}
							<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(diagnosis?.HOSPITAL_SHARE)}
                            />
						</div>
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(diagnosis?.HOSPITAL_SHARE)}
                            />
							
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
								value={patient?.hc_second_case_rate}
                            />
							
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(diagnosis?.HOSPITAL_SHARE)}
                            />
						</div>
					</div>
					<div className="grid grid-cols-7 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Professional Fees
						</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(
									diagnosis?.PROFESSIONAL_FEE_PF_SHARE
								)}
                            />
						</div>
						<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(
									diagnosis?.PROFESSIONAL_FEE_PF_SHARE
								)}
                            />
						</div>
						<div className="col-span-1"></div>
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={formatCurrency(
									diagnosis?.PROFESSIONAL_FEE_PF_SHARE
								)}
                            />
						</div>
					</div>

					<div className="grid grid-cols-7 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
						<div className="col-span-2 text-right mr-1">Total:</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							{formatCurrency(
								parseFloat(diagnosis?.HOSPITAL_SHARE || 0) +
									parseFloat(
										diagnosis?.PROFESSIONAL_FEE_PF_SHARE ||
											0
									)
							)}
						</div>
						<div className="col-span-1">
							{patient?.total_senior_pwd_discount}
						</div>
						<div className="col-span-1">
							{patient?.total_first_case_rate}
						</div>
						<div className="col-span-1">
							{patient?.total_second_case_rate}
						</div>
						<div className="col-span-1">
							{formatCurrency(
								parseFloat(diagnosis?.HOSPITAL_SHARE || 0) +
									parseFloat(
										diagnosis?.PROFESSIONAL_FEE_PF_SHARE ||
											0
									)
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SummaryWithPhic;
