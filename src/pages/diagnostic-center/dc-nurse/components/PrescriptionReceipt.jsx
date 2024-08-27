/* eslint-disable react/prop-types */

import React, {useState} from "react";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import QRCode from "qrcode.react";
import InfoTextForPrint from "../../../../components/InfoTextForPrint";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../../../components/FlatIcon";
import { patientFullName, patientAddress, doctorName, dateMMDDYYYY, formatDateMMDDYYYYHHIIA, formatDateTime } from "../../../../libs/helpers";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Img from "../../../../components/Img";
import InfoText from "../../../../components/InfoText";

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

const PrescriptionReceipt = (props) => {
	const { loading: date, btnLoading, appointment, patient, onSave } = props;
	const [doctor, setDoctor] = useState(null);
	const componentRef = React.useRef(null);
    const [hasHematology, setHasHematology] = useState(0);
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
			<div className="border-2 px-3 py-1 bg-gray-800 rounded-lg">
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
<div
className=""
id="phic-form-printable" ref={componentRef}
>
<div className="bg-white flex flex-col min-h-[11in] mx-auto border-blue-100 border-2 rounded-xl px-5 py-5">
<div className="flex flex-row justify-between  pb-1">
		<div>
		
          <Img src="/bmcdc_medical.png" className="mx-auto h-20 w-20 text-gray-300"  />
        

		</div>
		
		<div className="absolute ml-[90px]">
			<p className="text-xs font-mono font-bold text-gray-900">
				<i>GTC Diagnostic Center</i>
			</p>
			
			<p className="text-xs font-mono font-bold text-gray-900">
				<i>Republic of the Philippines</i>
			</p>
			
			<p className="text-xs font-mono text-gray-500">
				Citystate Centre 709 Street, Address City
			</p>
			<p className="text-xs font-mono text-gray-500">
				Call Center (02) 441-7442 l Trunkline (02)
				441-7444
			</p>
			<p className="text-xs font-mono text-gray-500">www.laboratory.gov.ph</p>
				
		</div>
					

					<div className="px-2 flex flex-row justify-end items-start  gap-2">
										
					
						<div className="mt-1">
										<QRCode
											value={`user-${appointment?.scheduledBy?.username}`}
											className=""
											level="H"
											size={40}
										/>
						</div>
										
                    </div>
					
					
								
		{/* {showData?.type?.name == "CBC" ? (
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
		)} */}

	</div>
	

  <div className="flex items-center relative justify-center   pt-2">
  <div className="flex flex-wrap ">
   
    </div>
	  <div className="flex flex-col text-start w-full mx-auto">
	  <div className="flex flex-row justify-between ">
                    <div className="">
                        
					    {/* <div className=" bg-blue-600 text-white rounded-sm grid grid-cols-6 text-sm font-semibold text-center font-mono">
						        <div className="col-span-3">
                                ADMISSION DATE
                                </div>
						         <div className="col-span-3">
                                DISCHARGE DATE
                                </div>
                            
                                
					    </div>
                
					    <div className="grid grid-cols-2 text-sm font-light font-mono shadow">
							
					

						<div className="">
		
                        <InfoTextForBilling
                            value={dateMMDDYYYY()}/>
						</div>

						<div className="">
                        <InfoTextForBilling
                                />
                        </div>
                        
                        </div> */}


						

						
                       
					</div>

                    
                                </div>
	  		
									</div>
									
									</div>


								{appointment?.id ? (
									<>
									<div className="flex flex-row justify-center mt-5">
                                    <h4 className="font-bold text-3xl text-gray-800">
				                        Prescription
			                        </h4>
                                   
                                    </div>
                                   

								
										<div className="px-5  font-mono justify-center items-center">
											
										<div className="flex-row">
							<div className="font-semibold text-md  text-gray-800 justify-start flex">
								{patientFullName(patient)}
							</div>
							
							<div className="text-md font-mono justify-start flex">
								{patientAddress(patient)}
							</div>

							<div className="text-md justify-start flex">
								{patient?.gender}
							</div>

							<div className="text-md font-mono justify-start flex">
								Diagnosis Date: {formatDateMMDDYYYYHHIIA(
									new Date(appointment?.created_at)
								)}
							</div>
							
									</div>

										<div className="flex flex-col border-b-2 p-2 text-sm relative">
											
										
											
										</div>
										<div className="flex flex-row items-end justify-start mt-5">
										<FlatIcon icon="fi fi-bs-prescription" className="text-5xl" />Prescription:
						                     </div>
										</div>
									</>
								) : (
								<>
									<div className="flex flex-row justify-center mt-5">
                                    <h4 className="font-bold text-3xl text-gray-800">
				                        Prescription
			                        </h4>
                                   
                                    </div>
                                   

								
										<div className="px-5  font-mono justify-center items-center">
											
										<div className="flex-row">
							<div className="font-semibold text-md  text-gray-800 justify-start flex">
								{patientFullName(patient)}
							</div>
							
							<div className="text-md font-mono justify-start flex">
								{patientAddress(patient)}
							</div>

							<div className="text-md justify-start flex">
								{patient?.gender}
							</div>

							<div className="text-md font-mono justify-start flex">
								Diagnosis Date:{dateMMDDYYYY(appointment?.created_at)}
								
							</div>
							<InfoText
								className="lg:col-span-6"
								label="Date:"
								value={formatDateMMDDYYYYHHIIA(
									new Date(appointment?.created_at)
								)}
							/>
							
									</div>

										<div className="flex flex-col border-b-2 p-2 text-sm relative">
											
										
											
										</div>
										<div className="flex flex-row items-end justify-start mt-5">
										<FlatIcon icon="fi fi-bs-prescription" className="text-5xl" />Prescription:
						                     </div>
										</div>
									</>
								)}
                                    
										

									
									

								{hasHematology ? (
										<div className="px-5 py-5 font-mono justify-center items-center">

										<h1 className="flex justify-center font-bold text-lg border-b border-t mb-2">Hematology</h1>
											<table className="flex flex-col gap-4">
												
										
												<thead>
													<tr className="flex flex-row justify-between gap-12 border-b ">
														<th>Investigation</th>
														<th>Result</th>
														<th>Normal Range Value</th>
														<th>Unit</th>
														
													</tr>
												</thead>
												<tbody>
													<tr className="flex flex-row justify-between gap-12 border-b border-dashed border-b-black">
														<th className="capitalize">
															GLUCOSE, FASTING, PLASMA
														</th>
														<td className="absolute ml-[285px]">
														
															{
																showData
																	?.appointment
																	?.fbs
															}
														</td>
														<td className=" ml-[100px] flex flex-row">
													
															70.00 - 100.00
														</td>
														<td>
															
															mg/dL
														</td>

													</tr>
													
													
													
												</tbody>
											</table>
										</div>
										
										) : showData?.type?.name == "RBS" ? (
											<div className="px-5 py-5 font-mono justify-center items-center">
	
												<h1 className="flex justify-center font-bold text-lg border-b border-t mb-2">Random blood sugar (RBS)</h1>
												<table className="flex flex-col gap-4">
													
											
													<thead>
														<tr className="flex flex-row justify-between gap-12 border-b ">
															<th>Investigation</th>
															<th>Result</th>
															<th>Normal Range Value</th>
															<th>Unit</th>
															
														</tr>
													</thead>
													<tbody>
														<tr className="flex flex-row justify-between gap-12 border-b border-dashed border-b-black">
															<th className="capitalize">
																GLUCOSE, FASTING, PLASMA
															</th>
															<td className="absolute ml-[285px]">
															
																{
																	showData
																		?.appointment
																		?.rbs
																}
															</td>
															<td className=" ml-[90px] flex flex-row">
														
																75.00 - 100.00
															</td>
															<td>
																
																mg/dL
															</td>
	
														</tr>
														
														
														
													</tbody>
												</table>	
									</div>

									
									) : (
										""
									)}
									
  			
  
									</div>


									</div>
			</div>
		</div>
	);
};

export default PrescriptionReceipt;
