import React, {useState} from 'react'
import { Dialog, Transition } from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	dataURItoBlob,
	formatDateMMDDYYYY,
	formatDateYYYYMMDD,
	dateMMDDYYYY,
	patientFullName,
	patientAddress,
	dateMM,
	dateDD,
	dateYYYY,
	timeHH,
	timeII,
	calculateHemoglobin,
	calculateBMI, calculateBPMeasurement,
	keyByValue
} from "../../../../libs/helpers";
import { chemistry, hematology } from "../../../../libs/laboratoryOptions";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import Axios from "../../../../libs/axios";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../../../components/FlatIcon";
import QRCode from "qrcode.react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Img from "../../../../components/Img";
import LaboratorySummary from "./LaboratorySummary";
const FormHeading = ({ title }) => {
	return (
		
		<div className="flex items-center">
		<div className="flex items-center">
		  
		</div>
		<div className="flex-grow flex items-center justify-center ">
		  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		</div>
	
		
		  <div className="slanted bg-gray-500 flex items-end justify-end "></div>
		
		  
	  </div>
	);
};

const PrintReceipt = (props, ref) => {
	const { loading: btnLoading, appointment, onSave} = props;
	const { patient, onSuccess } = props;
	const [image, setImage] = useState(null);
	const [hasChemistry, setHasChemistry] = useState(0);
	const [hasHematology, setHasHematology] = useState(0);
	const [showData, setShowData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const componentRef = React.useRef(null);
	const [tests, setTests] = useState([]);
	const [showAdvanced, setShowAdvanced] = useState(false);

  return (
<div
className="bg-white p-2 w-[9.5in] gap-y-6 "
id="phic-form-printable" ref={componentRef}
>
	<div className="bg-white flex flex-col w-[9.3in] min-h-[11in]  border-blue-100 border-2 rounded-xl px-1 py-1">
	<div className="flex flex-row justify-between w-full pb-1">
		<div>
			

		{image ? (
          <img src={image} alt="Uploaded" className="mx-auto h-24 w-24 object-cover rounded-full" />
        ) : (
          <Img src="/aLab.png" className="mx-auto h-24 w-24 text-gray-300" aria-hidden="true" />
        )}

		</div>
		
		<div className="absolute ml-[100px]">
			<p className="text-xs text-gray-900">
				<i>Republic of the Philippines</i>
			</p>
			
			<p className="text-xs text-gray-500">
				Citystate Centre 709 Street, Address City
			</p>
			<p className="text-xs text-gray-500">
				Call Center (02) 441-7442 l Trunkline (02)
				441-7444
			</p>
			<p className="text-xs text-gray-500">www.laboratory.gov.ph</p>
				
		</div>
					

					<div className="px-2 py-1 flex flex-row justify-end items-start absolute ml-[580px]">
						
					<div className="flex-row">
							<div className="font-bold text-md font-serif text-blue-700">
								{patientFullName(patient)}
							</div>
							
							<div className="text-xs font-mono">
								{patientAddress(patient)}
							</div>

							<div className="text-xs">
								{patient?.gender}
							</div>

							{/* <div className="text-sm">
								Admission Date: {dateMMDDYYYY()}
							</div> */}
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
	

  <div className="flex items-center relative justify-center  px-2 pt-2">
  <div className="flex flex-wrap -mx-3 mb-6">
   
    </div>
	  <div className="flex flex-col text-start w-full mx-auto">
		
	  <div className="flex flex-row justify-center">
	  <h4 className="font-normal font- text-3xl text-gray-600">
				Laboratory Receipt
			</h4>
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


                    <div className="items-center">

		
                    </div>
                    
                </div>
	  		
									</div>
									<div className="flex flex-col text-center right-2 top-0">
									
													

										
									</div>
									</div>
                                    <FormHeading title="" />
										

									
										<div className="px-5 py-5 font-mono justify-center items-center">
											<LaboratorySummary
												appointment={appointment}
												patient={patient}
												className="m-2 font-bold"
											/>
										
										

										<div className="flex flex-col border-b-2 p-2 text-xs relative">
											<b>Terms and Conditions:</b>
											<div className="absolute">
												<div className="flex items-center gap-2 ml-auto ">

												</div>
											</div>
											<p className="text-xs ">
											<b>1. Payment:</b> Payment is due at the time of service unless prior arrangements are made.
											</p>
											<p className="text-xs">
											<b>2. Results:</b> Test results will be provided as specified, typically within [X] days.
											</p>
											<p className="text-xs">
											<b>3. Accuracy:</b> We ensure the accuracy of tests; however, results should be interpreted by a healthcare provider.
											</p>
											<p className="text-xs">
											<b>4. Confidentiality:</b> All patient information is kept confidential according to HIPAA regulations.
											</p>
											<p className="text-xs">
											<b>5. Re-tests:</b> Additional tests may be required if initial results are inconclusive.
											</p>
											<p className="text-xs">
											<b>6. Cancellation:</b> Appointments must be canceled at least [X] hours in advance.
											</p>
											<p className="text-xs">
											<b>7. Liability:</b> The lab is not responsible for any delays caused by external factors.
											</p>
											
											
										</div>
										<div className="flex flex-row items-end justify-end">
										<QRCode
											value={`user-${appointment?.scheduledBy?.username}`}
											className="ml-8"
											level="H"
											size={90}
										/>
						</div>
										</div>
										

									
									

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
  )
}

export default PrintReceipt