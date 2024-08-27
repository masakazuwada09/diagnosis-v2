/* eslint-disable react/prop-types */

import React, {useState} from "react";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import QRCode from "qrcode.react";
import InfoTextForPrint from "./InfoTextForPrint";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../../../components/FlatIcon";
import { patientFullName, patientAddress, doctorName } from "../../../../libs/helpers";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const FormHeading = ({ title }) => {
	return (
		<div className="flex items-center bg-blue-950">
			<div className="flex-grow slanted bg-blue-500 flex items-center justify-start pl-1">
				<span className="text-white">Imaging </span>
			</div>
			<div className="flex-grow slanted-reverse bg-blue-700 flex items-center justify-start pl-1">
				<span className="text-blue-700" value="">.</span>
			</div>
			
		</div>
	);
};

const ImagingReceipt = (props) => {
	const { loading: btnLoading, appointment, patient, onSave } = props;
	const [doctor, setDoctor] = useState(null);
	const componentRef = React.useRef(null);
    const [showData, setShowData] = useState(null);
	
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const handleDownload = async () => {
		const input = componentRef.current;
		const canvas = await html2canvas(input);
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF("p", "mm", "a6");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save("LaboratoryReport.pdf");
	};

	return (
		<div className="mt-5">
			<div className="border-2 px-3 py-1 bg-gray-900 rounded-lg">
				<div className="flex flex-row justify-end">
					<ActionBtn
						className="text-base gap-2 ml-2 mb-2 items-center transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-100 duration-100"
						onClick={handlePrint}
						type="success"
					>
						<FlatIcon icon="rr-print" /> Print
					</ActionBtn>
					<ActionBtn
						className="text-base gap-2 ml-2 mb-2 items-center transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-100 duration-100"
						onClick={handleDownload}
						type="secondary"
					>
						<FlatIcon icon="fi fi-bs-disk" /> Save
					</ActionBtn>
				</div>
				<div className="" ref={componentRef}>
					{/* Add the content that you want to print or save as PDF */}
					<div className="flex flex-col-4 gap-2 bg-blue-950 mx-auto p-2 items-center">
						<div className="">
							<img src="/laboratory/radiology.png" className="w-20 h-20 object-contain" />
						</div>
						<div className="text-white">
							<div className="text-sm font-semibold">
								<span>DIAGNOSTIC CENTER</span>
							</div>
							<div className="text-xs font-light">
								<span>Capitol Complex, Alabel, Sarangani</span>
							</div>
							<div className="text-xs font-light">
								<span>Tel. No. 083 508 0262</span>
							</div>

							<div className="text-base text-white font-bold">
								<span>IMAGING REPORT</span>
							</div>
						</div>

						<div className="flex flex-col-2 text-sm ml-auto m-2 text-white bg-blue-900 px-5">
							<div className="text-white px-5 py-1">
								<InfoTextForPrint
									contentClassName="text-sm"
									title="Fullname"
									value={patientFullName(patient)}
								/>
								<InfoTextForPrint
									contentClassName="text-sm"
									title="Address"
									value={patientAddress(patient)}
								/>
								<InfoTextForPrint
									contentClassName="text-sm"
									title="Account No."
								/>
								<InfoTextForPrint
									contentClassName="text-sm"
									title="Imaging Attendant"
									value={doctorName(doctor)}
								/>
								
							</div>
							<QRCode
								value={`user-${appointment?.scheduledBy?.username}`}
								className="ml-8"
								level="H"
								size={50}
							/>
						</div>
					</div>

					<FormHeading title="" />

					<div className="flex flex-col p-2 text-sm relative bg-blue-950 text-white">
			<b>IMPORTANT REMINDERS:</b>
		
			<p className="text-xs">
				All Results on
				this Form are necessary. Imaging Report with incomplete
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
			
            <div className="p-6 flex flex-col gap-y-4 relative border-t-2 bg-white opacity-70">
        <div className="flex flex-col justify-center text-sm ">
		  <h1 className="text-xl font-bold mb-0 ">XRAY (PA View)</h1>

		</div>

        {showData?.type?.name == "CBC" ? (
		<div className="flex flex-col text-sm items-end ml-12">
		  <h1 className="text-4xl font-bold mb-0 ">CBC</h1>
		  <h3 className="text-lg font-bold mb-0">
			  (Complete Blood Count)
		  </h3>
		  <p className="text-sm">Revised September 2018</p>
		</div>
		) : showData?.type?.name == "FBS" ? (
				<div className="flex flex-col text-sm items-end ml-12">
				  <h1 className="text-4xl font-bold mb-0 ">FBS</h1>
				  <h3 className="text-lg font-bold mb-0">
					  (Fast Blood Sugar )
				  </h3>
				  <p className="text-sm">Revised September 2018</p>
				</div>
		) : showData?.type?.name == "RBS" ? (
			<div className="flex flex-col text-sm items-end ml-12">
			  <h1 className="text-4xl font-bold mb-0 ">RBS</h1>
			  <h3 className="text-lg font-bold mb-0">
				  (Random blood Sugar )
			  </h3>
			  <p className="text-sm">Revised September 2018</p>
			</div>
	) : ( ""
		)}


			<div className="text-start font-mono text-sm font-semibold">Impression</div>
			
		<div className="text-sm ">
			
			<div className=" font-mono gap-4">
				{appointment?.fbs !== null ? (
				<>
				
				<h1 className="mr-auto">- Bronchovascular markings are prominent in bilateral lung fields</h1>
                <h1 className="mr-auto">- Rest of the visualised lung fields are normal.</h1>
                <h1 className="mr-auto">- Biletaal hilum appears normal.</h1>
                <h1 className="mr-auto">- Cardiac silhouette is normal.</h1>
				<h1 className="text-center">{appointment?.fbs}</h1>
				
				</>
				):("")}
			</div>
			
		</div>
        <div className="text-start font-mono text-sm font-semibold">Impression</div>
            <h1 className="mr-auto">- Cardiac silhouette is normal.</h1>
        <div className="text-start font-mono text-sm font-semibold">Advice</div>
		
		</div>
			
		</div>
				</div>
			</div>
		</div>
	);
};

export default ImagingReceipt;
