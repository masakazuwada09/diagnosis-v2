/* eslint-disable react/prop-types */
import { useState } from "react";
import FlatIcon from "../../../components/FlatIcon";
import Img from "../../../components/Img";
import ActionBtn from "../../../components/buttons/ActionBtn";
import {
	calculateAgeV3,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
} from "../../../libs/helpers";

const ReferralListItem = ({
	acceptPatient,
	updateVitals,
	show = false,
	viewOnly = false,
	updatePatientVital,
	referral,
	reading = false,
}) => {
	const [showInfo, setShowInfo] = useState(show);
	const [updatedVitals, setUpdatedVitals] = useState(false);
	const referralData = JSON.parse(referral?.referral_data) || {};
	return (
		<div className="flex flex-col border rounded-xl relative">
			<div className="flex items-center gap-3 p-3">
				<div className="w-14 h-14 overflow-hidden bg-slate-200 rounded-lg">
					<Img src={""} type="user" name={referral?.patient_name} />
				</div>
				<div className="flex flex-col">
					<h6 className="font-bold mb-1 text-left">
						{/* {referral?.patient_name} */}
						{patientFullName(referral?.patient)}
					</h6>
					<div className="flex items-center text-xs divide-x gap-3">
						<span className="flex items-center gap-1">
							<FlatIcon icon="rr-venus-mars" />
							<span className="font-light capitalize">
								{referral?.patient?.gender}
							</span>
						</span>
						<span className="flex items-center gap-1 pl-3">
							<FlatIcon icon="rr-calendar" />
							<span className="font-light">
								{calculateAgeV3(referral?.dob)} yrs. old
							</span>
						</span>
					</div>
				</div>
				<div className="flex items-center justify-end ml-auto">
					{viewOnly ? (
						""
					) : (
						<>
							{!reading ? (
								<>
									<ActionBtn
										size="sm"
										type="primary-dark"
										className="mr-2"
										onClick={() => {
											setShowInfo(
												(prevShow) => !prevShow
											);
										}}
									>
										Info
										{showInfo ? (
											<FlatIcon
												icon="rr-caret-up"
												className="ml-1"
											/>
										) : (
											<FlatIcon
												icon="rr-caret-down"
												className="ml-1"
											/>
										)}
									</ActionBtn>
									<ActionBtn
										size="sm"
										disabled={referral?.vitals}
										type="primary-dark"
										className="mr-2"
										onClick={() => {
											setUpdatedVitals(true);
											updatePatientVital(
												referral?.vitals
													? {
															...JSON.parse(
																referral?.vitals
															)[0],
															id: referral?.id,
													  }
													: { id: referral?.id }
											);
										}}
									>
										Update Vitals
										{/* <FlatIcon icon="rr-download" className="ml-1" /> */}
									</ActionBtn>
								</>
							) : (
								<></>
							)}

							<ActionBtn
								size="sm"
								type="success"
								disabled={referral?.vitals ? false : true}
								onClick={() => {
									acceptPatient(referral);
								}}
							>
								Accept
								<FlatIcon
									icon="rr-assept-document"
									className="ml-1"
								/>
							</ActionBtn>
						</>
					)}
					{/* <ActionBtn
												size="sm"
												type="danger"
												className="ml-2"
											>
												<FlatIcon
													icon="rr-assept-document"
													className="mr-1"
												/>
												Deny
											</ActionBtn> */}
				</div>
			</div>

			<span className="flex text-xs items-center gap-2 mb-1 px-3 pb-3 ">
				<span className="font- w-1/4">Referral Date & Time:</span>
				<span className="font-bold">
					{formatDateMMDDYYYYHHIIA(
						new Date(`${referralData?.date} ${referralData?.time}`)
					)}
				</span>
			</span>
			{console.log("referralData", referralData)}
			{showInfo ? (
				<div className="flex flex-col p-3 border-t">
					<span className="font-semibold text-blue-800 mb-3 pb-2 border-b">
						Information
					</span>
					<span className="flex text-xs items-center gap-2 mb-1">
						<span className="font-light w-1/4">Doctor:</span>
						<span className="font-bold">
							{referral?.referredToDoctor?.title || "Dr. "}
							{referral?.referredToDoctor?.name}
						</span>
					</span>
					<span className="flex text-xs items-center gap-2 mb-1">
						<span className="font-light w-1/4">
							Chief complaint:
						</span>
						<span className="font-bold">
							{referralData?.chief_complaint || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Brief Clinical History and Pertinent Physical
							Examination:
						</span>
						<span className="font-bold ">
							{referralData?.clinical_history || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Laboratory Findings (Including ECG, X-ray, and other
							diagnostic procedures):
						</span>
						<span className="font-bold ">
							{referralData?.lab_findings || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">Impression:</span>
						<span className="font-bold ">
							{referralData?.impression || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">Action Taken:</span>
						<span className="font-bold ">
							{referralData?.action_taken || "Test"}
						</span>
					</span>
					<span className="flex flex-col w-full text-xs items- mb-1 mt-1">
						<span className="font-light w-full">
							Reason for Referral:
						</span>
						<span className="font-bold ">
							{referralData?.reason || "Test"}
						</span>
					</span>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default ReferralListItem;
