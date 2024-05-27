import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import { useAuth } from "../../hooks/useAuth";
import ActionBtn from "../buttons/ActionBtn";
import Img from "../Img";
import ReferralsListModal from "../modal/ReferralsListModal";
import { useRef } from "react";
import useClinic from "../../hooks/useClinic";
import AcceptPatientModal from "../modal/AcceptPatientModal";
import CloudServerModal from "../modal/CloudServerModal";
import UpdateVitalModalReferral from "../modal/UpdateVitalModalReferral";
import ReadingListModal from "../modal/ReadingListModal";
import useNetworkStatus from "../../hooks/useNetworkStatus";
const Header = (props) => {
	const { setSidebarOpen, sidebarOpen } = props;
	const { user, checkUserType } = useAuth();
	const { data } = useClinic();
	const { isOnline } = useNetworkStatus();
	const referralListRef = useRef(null);
	const readignListRef = useRef(null);
	const updateVitalRef = useRef(null);
	const acceptPatientRef = useRef(null);
	console.log("datadatadatuser", user);
	const cloudServerRef = useRef(null);

	const toRHUword = (str) => {
		return str?.replace("RHU", "Rural Health Unit");
	};
	const updatePatientVital = (patient) => {
		updateVitalRef.current.show(patient);
	};
	return (
		<>
			<div className="bg-primary">
				<div className="h-[60px] w-full bg-blue-600 bg-opacity-60 flex items-center z-10 px-2">
					<div className="flex items-center w-full lg:pl-2">
						<div className="flex items-center justify-center gap-2">
							<div
								className="bg-black bg-opacity-0 cursor-pointer mr- duration-200 hover:bg-opacity-30 w-8 h-7 pt-[2px] text-white rounded-md flex items-center justify-center"
								onClick={() => {
									setSidebarOpen((prevVal) => !prevVal);
								}}
							>
								<FlatIcon
									icon="br-bars-staggered"
									className="text-sm"
								/>
							</div>
							<span
								className="text-white font-bold text-sm lg:text-lg font-mono flex items-center"
								style={{ textShadow: "0px 1px 1px black" }}
							>
								{/* {user?.name ? (
									<>
										{toRHUword(user?.name)}
										<span className="mx-2 -mt-[2px]">
											|
										</span>
									</>
								) : (
									""
								)} */}

								{user?.type}
							</span>
						</div>
						{isOnline ? (
							<>
								{checkUserType("nurse") ? (
									<>
										<div
											className="ml-auto flex items-center bg-[#f07e32] gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-orange-700 cursor-pointer py-0 h-9 rounded-xl border border-orange-700 border-opacity-20 duration-500 shadow bg-opacity-90"
											onClick={() => {
												cloudServerRef.current.show();
											}}
										>
											<FlatIcon
												icon="rr-network-cloud"
												className="text-base"
											/>
											<span className="hidden lg:block">
												Cloud Server
											</span>
										</div>
										<div
											className="ml-4 flex items-center gap-2 mr-2 px-3 text-sm font-light text-white hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer py-2 rounded-xl border border-white border-opacity-20"
											onClick={() => {
												referralListRef.current.show();
											}}
										>
											<FlatIcon icon="rr-bells" />
											Patient Referrals
											{data?.referrals?.length ? (
												<div className="relative">
													<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
													<span className="bg-red-600 text-white z-20 px-2 rounded-full">
														{
															data?.referrals
																?.length
														}
													</span>
												</div>
											) : (
												""
											)}
										</div>
									</>
								) : (
									""
								)}
								{checkUserType("doctor") ? (
									<>
										<div
											className="ml-4 flex items-center gap-1 mr-2 px-3 text-sm font-light text-white hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer py-2 rounded-xl border border-white border-opacity-20"
											onClick={() => {
												readignListRef.current.show();
											}}
										>
											<FlatIcon icon="rr-bells" />
											Reading Referrals
											{data?.reading?.length ? (
												<div className="relative">
													<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
													<span className="bg-red-600 text-white z-20 px-2 rounded-full">
														{data?.reading?.length}
													</span>
												</div>
											) : (
												""
											)}
										</div>
									</>
								) : (
									""
								)}
							</>
						) : (
							<div className="ml-auto">
								<span className="bg-red-600 bg-opacity-90 text-white gap-2 px-3 py-2 rounded-xl font-bold text-lg">
									<FlatIcon
										icon="rr-cloud-disabled"
										className="mr-1"
									/>
									NO INTERNET CONNECTION
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<ReferralsListModal
				ref={referralListRef}
				isOnline={isOnline}
				acceptPatientRef={acceptPatientRef}
				updatePatientVital={updatePatientVital}
			/>

			<ReadingListModal
				isOnline={isOnline}
				ref={readignListRef}
				acceptPatientRef={acceptPatientRef}
				updatePatientVital={updatePatientVital}
			/>

			<AcceptPatientModal isOnline={isOnline} ref={acceptPatientRef} />

			<UpdateVitalModalReferral
				isOnline={isOnline}
				ref={updateVitalRef}
				referralListRef={referralListRef}
			/>
			<CloudServerModal
				isOnline={isOnline}
				staticModal={false}
				ref={cloudServerRef}
			/>
		</>
	);
};

export default Header;
