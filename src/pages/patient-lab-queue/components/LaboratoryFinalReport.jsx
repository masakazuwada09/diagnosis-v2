/* eslint-disable react/prop-types */

import React, {useState} from "react";
import ActionBtn from "../../../components/buttons/ActionBtn";
import QRCode from "qrcode.react";
import InfoTextForPrint from "../../../components/InfoTextForPrint";
import { formatDate } from "../../../libs/helpers";
import { data } from "autoprefixer";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../../components/FlatIcon";
import { patientFullName,patientAddress, doctorName } from "../../../libs/helpers";

const FormHeading = ({ title }) => {
	return (

		<div className="flex items-center h-12 bg-slate-300 ">
		<div className="flex items-center ">

		</div>
		<div className="flex-grow slanted bg-blue-500 flex items-center justify-start pl-1 ">
		<span className="text-white">www.saranganiprovincialhospital.com</span>
		</div>
		<div className="flex-grow slanted-reverse bg-blue-700 flex items-center justify-start pl-1 ">
		<span className="text-blue-700" value="">.</span>
		</div>

		<div className="slanted bg-blue-500 flex items-center justify-start pl-4"></div>


	</div>
	);
};

const LaboratoryFinalReport = (props) => {
const { loading: btnLoading, appointment, patient, onSave} = props;
const [doctors, setDoctors] = useState([]);
console.log('appointmentsssssssssssss', appointment)
const [doctor, setDoctor] = useState(null);
const componentRef = React.useRef(null);
const handlePrint = useReactToPrint({
	content: () => componentRef.current,
});
const handleDownload = () => {
	const data = () => componentRef.current;
	const url = window.URL.createObjectURL(data);
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', 'example.txt'); // or any other extension
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
const show = (data) => {
	console.log("Accept Patient Referral", data);
	setReferral(() => data);
	getDoctors();
	setModalOpen(true);
};
const getDoctors = () => {
	Axios.get(`/v1/clinic/rhu-doctors`).then((res) => {
		setDoctors(res.data.data);
	});
};

  return (
	<div className="">
		
    <div className=" border-2 px-3 py-1 bg-gray-500" >
								<div className="flex flex-row justify-end">
								<ActionBtn
											className="text-base gap-2 ml-2 mb-2"
											onClick={handlePrint}
											type="success"
										>
											<FlatIcon icon="rr-print" /> Print
										</ActionBtn>
										<ActionBtn
											className="text-base gap-2 ml-2 mb-2"
											onClick={handleDownload}
											type="success"
										>
											<FlatIcon icon="fi fi-bs-disk" /> Save
										</ActionBtn>
								</div>
										
										
		<div className="" ref={componentRef}>
									
								
        <div className="flex flex-col-4 gap-2 bg-white" >
			<div className="" >
					<img
						src="/saranganilogo.png"
						className="w-24 h-24 object-contain m-2"
					/>
			</div>
				<div className="">
				<div className="flex  items-center my-2 ">
				
				</div>
					<div className="text-sm font-semibold">
					<span>SARANGANI PROVINCIAL HOSPITAL</span>
				</div>
				<div className="text-xs font-light ">
					<span>Capitol Complex, Alabel, Sarangani</span>
				</div>
				<div className="text-xs font-light ">
					<span>Tel. No. 083 508 0262</span>
				</div>
                <div className="text-sm font-semibold">
					<span>HOSPITAL LABORATORY DEPARTMENT</span>
				</div>
				<div className="text-base text-red-500 font-bold">
                                <span>LABORATORY REPORT</span>
                            </div>
                </div>
										
			<div className="flex flex-col-2 text-sm ml-auto m-2 bg-white">
				<div>
                    <InfoTextForPrint
								contentClassName="text-sm"
								title="Fullname"
								value= {patientFullName(patient)}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Address"
								value={patientAddress(patient)}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="Account No."
								// value={patient?.civil_status}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Attending Dr"
								value={doctorName(doctor)}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Room"
								// value={patient?.civil_status}
							/>
                           
                </div>
                 <QRCode
					value={`user-${appointment?.scheduledBy?.username}`}
					className="ml-8"
					level="H"
					size={90}
				/>
			
			</div>
           
		</div>
										
	<FormHeading title="" />
		

		<div className="flex flex-col p-2 text-sm relative bg-white ">
			<b>IMPORTANT REMINDERS:</b>
		
			<p className="text-xs">
				All Results on
				this Form are necessary. Laboratory Report with incomplete
				information shall not be processed.
			</p>{" "}
			<b className="text-xs">
				FALSE/INCORRECT INFORMATION OR MISREPRESENTATION
				SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
				ADMINISTRATIVE LIABILITIES.
			</b>
		</div>

		<div className="p-6 flex flex-col gap-y-4 relative border-t-2 bg-white">
			<div className="text-center font-mono text-sm font-semibold">FINAL REPORT</div>
			
		<div className="text-sm">
			<div className="text-center font-mono text-sm font-semibold">----------------CHEMISTRY----------------</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.fbs !== null ? (
				<>
				<div className="mr-auto">FASTING BLOOD SUGAR(FBS)</div>
				<div className="text-center">{appointment?.fbs}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.rbs !== null ? (
				<>
				<div className="mr-auto">RANDOM BLOOD SUGAR(RBS)</div>
				<div className="text-center">{appointment?.rbs}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.creatinine !== null ? (
				<>
				<div className="mr-auto">CREATININE</div>
				<div className="text-center">{appointment?.creatinine}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.uric_acid !== null ? (
				<>
				<div className="mr-auto">URIC ACID</div>
				<div className="text-center">{appointment?.uric_acid}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.sgot !== null ? (
				<>
				<div className="mr-auto">SGOT</div>
				<div className="text-center">{appointment?.sgot}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.sgpt !== null ? (
				<>
				<div className="mr-auto">SGPT</div>
				<div className="text-center">{appointment?.sgpt}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.alkaline_phos !== null ? (
				<>
				<div className="mr-auto">ALKALINE PHOS.</div>
				<div className="text-center">{appointment?.alkaline_phos}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.ldh !== null ? (
				<>
				<div className="mr-auto">LDH</div>
				<div className="text-center">{appointment?.ldh}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.ggt !== null ? (
				<>
				<div className="mr-auto">GGT</div>
				<div className="text-center">{appointment?.ggt}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.magnesium !== null ? (
				<>
				<div className="mr-auto">Magnesium</div>
				<div className="text-center">{appointment?.magnesium}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.phophorus !== null ? (
				<>
				<div className="mr-auto">Phophorus</div>
				<div className="text-center">{appointment?.phophorus}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.amylase !== null ? (
				<>
				<div className="mr-auto">Amylase</div>
				<div className="text-center">{appointment?.amylase}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.hour_urine_volume !== null ? (
				<>
				<div className="mr-auto">24 HOUR URINE VOLUME</div>
				<div className="mr-auto">{appointment?.hour_urine_volume}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.serum_creatinine !== null ? (
				<>
				<div className="mr-auto">SERUM CREATININE</div>
				<div className="mr-auto">{appointment?.serum_creatinine}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mg/dL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.urine_creatinine !== null ? (
				<>
				<div className="mr-auto">URINE CREATININE</div>
				<div className="mr-auto">{appointment?.urine_creatinine}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">mg/dL</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.hours_urine !== null ? (
				<>
				<div className="mr-auto">HOURS URINE CREATININE</div>
				<div className="mr-auto">{appointment?.hours_urine}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">1000-1500mg</div>
				</>
				):("")}
			</div>
			<div className="grid grid-cols-4 font-mono gap-4">
				{appointment?.creatinine_clearance !== null ? (
				<>
				<div className="mr-auto">CREATININE CLEARANCE</div>
				<div className="mr-auto">{appointment?.creatinine_clearance}</div>
				<div className="mr-auto">-</div>
				<div className="mr-auto">98.156 mL/min</div>
				</>
				):("")}
			</div>
		</div>
			
		</div>
		</div> 					

								
    </div>
	</div>
  )
}

export default LaboratoryFinalReport
