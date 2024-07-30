import useDataTable from "../../../../hooks/useDataTable";
import Table from "../../../table/Table";
import { v4 as uuidv4 } from "uuid";
import InfoTextForSummary from "./InfoTextForSummary";

/* eslint-disable react/prop-types */
const uniq_id = uuidv4();
const SummaryOfCharges = (props) => {
	const { patient } = props;
	const { loading, data } = useDataTable({
		url: `/v1/particular-items`,
		// url of API for patient that has a pending that need performed
	});

	return (
		<>
			<div className="border ">
			
				<h5 className="text-sm bg-gray-700 font-md font-mono text-center text-white ">
					SUMMARY OF CHARGES
				</h5>
				<div className="">
					<div className="border  bg-gray-100  grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono">
						<div className="col-span-2">PARTICULARS</div>
						<div className="col-span-1">DEBIT</div>
						<div className="col-span-1">DISCOUNT</div>
						<div className="col-span-1">CREDIT</div>
						<div className="col-span-1">BALANCE</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Drugs and Medicines (GF)
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							NonDrugs / Supplies
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Laboratory Examination
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
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center  mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Radiology
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
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Room and Board
						</div>
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={patient?.room_debit}
                            />
							
						</div>
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={patient?.room_discount}
                            />
						</div>
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={patient?.room_credit}
                            />
							</div>
						<div className="col-span-1">
						<InfoTextForSummary
                                contentClassName="text-sm"
								value={patient?.room_balance}
                            />
							
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">
							Miscellaneous
						</div>
						<div className="col-span-1">
							{/* Code For Debit Database */}
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
					<div className="grid grid-cols-6 divide-x text-xs font-light text-center mt-2 font-mono">
						<div className="col-span-2 text-left ml-2">PHIC</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>

					</div>
					<div className="grid grid-cols-6 border-t divide-x text-sm font-semibold text-center mt-2 font-mono">
						<div className="col-span-2 text-right mr-1">Total:</div>
						<div className="col-span-1">
							{/* add a code for Debit database */}
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
						<div className="col-span-1">
							<InfoTextForSummary
                                contentClassName="text-sm"
                            />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SummaryOfCharges;
