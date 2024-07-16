import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import { patientFullName, patientRoomNumber, dateToday } from "../../../../libs/helpers";
import InfoTextForPrint from "../../../../components/InfoTextForPrint";

/* eslint-disable react/prop-types */
const HouseKeepingInService = ({
	room = "1",
	data,
	openProfileAction,
	labOrdersStr = "",
	patientQueueName = "#1 - John Doe",
	doctor = {
		title: "Dr.",
		name: "Tanya White",
		specialty: "Cardiologists",
	},
}) => {
	const isForResultReading = () => {
		return (
			data?.status == "in-service-result-reading" ||
			data?.has_for_reading?.length
		);
	};
	return (
		<div
			className={`flex flex-col border  p-1 rounded-xl ${
				isForResultReading()
					? " bg-orange-50 border-orange-100 "
					: " bg-yellow-50 border-blue-100 "
			}`}
		>
			{isForResultReading() ? (
				<span className=" text-red-500 text-center italic rounded-xl  text-xs">
					Pending{" "}
					<span className="text-red-500 font-medium ">
						for
						{labOrdersStr.includes(`"type":"imaging"`) &&
						labOrdersStr.includes(`"type":"laboratory-test"`)
							? " IMAGING and LABORATORY "
							: labOrdersStr.includes(`"type":"imaging"`)
							? " IMAGING "
							: " LABORATORY "}
						result reading
					</span>
				</span>
			) : (
				""
			)}
			<div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
				<div className="flex flex-col justify-center items-center">
                <span className="font-light text-sm text-slate-600 mb-1">
						Patient
					</span>
					<h2
						className={`text-3xl tracking-tight text-center font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-warning"
						} -mb-1`}
					>
						{`#${data?.id} - ${patientFullName(data?.patient)}`}
					</h2>
					<span className="font-light text-sm text-slate-600 mb-1 ">
						Room No
					</span>
					
					<h2
						className={`text-3xl font-bold ${
							isForResultReading()
								? "text-indigo-600"
								: "text-warning"
						} -mb-1`}
					>
						
						{/* {` ${patientRoomNumber(data?.room?.name)}`} */}
						{data?.room_number}

					</h2>
				</div>
                <div className="grid grid-cols-1">

						<div className="m-2">
						
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Date"
								value={dateToday()}
							/>

                            <InfoTextForPrint
								contentClassName="text-sm mt-2"
								title="Room"
								value={data?.room_number}
								
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Hospital No."
								// value={patient?.civil_status}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Account No."
								// value={patient?.civil_status}
							/>

                            <InfoTextForPrint
								contentClassName="text-sm"
								title="Contact No."
								// value={patient?.civil_status}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Ward"
								// value={patient?.civil_status}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="OR Number"
								value={""}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Amount"
								// value={patient?.civil_status}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="CERTIFIED CORRECT BY"
								// value={user?.name}
							/>
                            

						</div>
                        

						
						<div className="mt-8 mr-4">
							
						
						</div>
					</div>
                    <div className="grid grid-cols-2">
						<div className="mt-4 ml-4">
							
						
						</div>
						
					</div> 
				<div className="flex flex-col justify-center items-center">
					
				</div>
			</div>

			<span className="border-b  pb-4 mb-4 "></span>

		
			
		</div>
	);
};

export default HouseKeepingInService;
