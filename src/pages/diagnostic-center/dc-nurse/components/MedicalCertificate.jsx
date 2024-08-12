/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */

import React, {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
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
import Barcode from "react-barcode";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Img from "../../../../components/Img";
import LaboratorySummary from "../../dc-cashier/components/LaboratorySummary";

const laboratory_tests = chemistry?.map((data) => data?.name);

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

	

const MedicalCertificate = (props, ref) => {
	const { loading: btnLoading, appointment, onSave} = props;
	const { patient, onSuccess } = props;
	const {
		register,
		getValues,
		watch,
		control,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showData, setShowData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const componentRef = React.useRef(null);
	const [image, setImage] = useState(null);
	const [tests, setTests] = useState([]);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [hasChemistry, setHasChemistry] = useState(0);
	const [hasHematology, setHasHematology] = useState(0);
  
	const handleToggleAdvanced = () => {
	  setShowAdvanced(!showAdvanced);
	};

	useNoBugUseEffect({
		functions: () => {},
	});
	useImperativeHandle(ref, () => ({
		show: show,
		hide: hide,
	}));

	const show = (data) => {
		setShowData(data);
		setModalOpen(true);
	};
	const hide = () => {
		setModalOpen(false);
	};
	const submit = (data) => {
		let formData = new FormData();
		let config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		formData.append("_method", "PATCH");
		formData.append("lab_result_notes", data?.lab_result_notes);

		if (data?.attachment) {
			formData.append("attachment", dataURItoBlob(data?.attachment));
		}
		Axios.post(
			`v1/laboratory/upload-lab-result/${showData?.id}`,
			formData,
			config
		).then((res) => {
			reset();
			toast.success("Laboratory result uploaded successfully!");
			onSuccess();
			hide();
		});
	};
	const hasError = (name) => {
		return errors[name]?.message;
	};
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChemistryChecked = (name) => {
	console.log("onChemistryChecked");
	setHasChemistry(
		getValues(laboratory_tests).filter((x) => x == true).length
	);
};
const onHematologyChecked = (name) => {
	console.log("onHematologyChecked");
	setHasHematology(
		getValues(laboratory_tests).filter((x) => x == true).length
	);
};
	
	return (
		<Transition appear show={modalOpen} as={Fragment}>
			<Dialog as="div" className="" onClose={hide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-blue-200 bg-opacity-75 backdrop-blur z-[300] " />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto !z-[350]">
					<div className="flex min-h-full w-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-[1500px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="div"
									className=" p-4 font-medium leading-6 flex flex-row justify-between items-center text-gray-900 bg-slate-50 border-b"
								>
									<span className="text-xl text-center font-bold  text-blue-900">
										View Laboratory Result
									</span>
									<ActionBtn
										// size="lg"
										type="foreground"
										className="px-5"
										onClick={hide}
									>
										CLOSE
									</ActionBtn>
								</Dialog.Title>
						<div className="p-6 flex flex-row gap-y-4 relative gap-5">
							<div className="bg-gray-600 p-3 min-h-[14in]  overflow-auto phic-forms">
								
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
											<FlatIcon icon="fi fi-bs-disk" /> Download
										</ActionBtn>
								</div>
									

											
<div
className="bg-white p-2 w-[9.5in] gap-y-6 "
id="phic-form-printable" ref={componentRef}
>
<div className="bg-white flex flex-col w-[9.3in] min-h-[11in]  border-blue-100 border-2 rounded-xl px-1 py-1">
<div className="flex flex-row justify-between w-full pb-1">
		<div>
		
          <Img src="/aLab.png" className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
        

		</div>
		
		<div className="absolute ml-[40px]">
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
										
					<div className="flex-row">
							<div className="font-semibold text-sm  text-gray-800 justify-end flex">
								{patientFullName(patient)}
							</div>
							
							<div className="text-xs font-mono justify-end flex">
								{patientAddress(patient)}
							</div>

							<div className="text-xs justify-end flex">
								{patient?.gender}
							</div>

							<div className="text-xs font-mono justify-end flex">
								Admission Date: {dateMMDDYYYY()}
							</div>
							<h4 className="font-bold text-md font-mono text-gray-900 flex justify-end">
								LABORATORY INVOICE
							</h4>
						</div>
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
	

  <div className="flex items-center relative justify-center  px-2 pt-2">
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
                                    <div className="flex flex-row justify-center mt-5">
                                    <h4 className="font-bold text-3xl text-gray-600">
				                        MEDICAL CERTIFICATE
			                        </h4>
                                   
                                    </div>
                                   

								
										<div className="px-5 py-5 font-mono justify-center items-center">
											
										

										<div className="flex flex-col border-b-2 p-2 text-sm relative">
											
											<div className="absolute">
												<div className="flex items-center gap-2 ml-auto ">

												</div>
											</div>
                                            <div class="content">
                                                <p>To whom it may concern:</p>
                                                <br></br>
                                                <p>This is to certify that ____________________, __ years old M/F, presently residing at ______________________________, consulted/was examined/treated for _______________________ on ___________ for the purpose of ________________________________.</p>
                                            </div>
											
											<div class="flex flex-row">
                                            <p><strong>Clinical Impression:</strong></p>
                                                </div>

                                                <div class="recommendation">
                                                    <p><strong>Recommendation/s:</strong></p>
                                                </div>
											
											
										</div>
										<div className="flex flex-row items-end justify-end">
							
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



									</div>

											<div
											className="bg-white p-2 w-[5in] gap-y-2 border rounded-md py-2 px-5 shadow-2xl"
											>
			<h2 className="block text-md font-sm leading-6 text-blue-900 font-semibold">
				Edit Report
			</h2>
			<h2 className="block text-xs font-sm leading-6 text-gray-900">
				Change Unit Logo
			</h2>
			<div className="mt-2 mb-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6-py-10">
				<div className="text-center">
					<PhotoIcon
						className="mx-auto h-12 w-12 text-gray-300"
						aria-hidden="true"
					/>
					<div className="mt-4 flex text-sm leading-b text-gray-600">
						<label
							htmlFor="file-input"
							className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
						>
							Upload Health Unit Logo
							<input
								type="file"
								id="file-input"
								accept="image/*"
								className="sr-only"
								onChange={handleFileChange}
							/>
						</label>
					</div>
					<p className="text-xs leading-5 text-gray-600">
						PNG, JPG, GIF
					</p>
				</div>
			</div>

			

			<h2 className="block text-sm font-sm leading-6 text-gray-900 pt-2 border-t mb-3">
				Filter Tests
			</h2>
			   
			<div className="flex flex-row w-full md:w-1/2 px-3 mb-6 md:mb-0 items-start gap-2">
        
        <input
          type="checkbox"
          className="form-checkbox"
          id="advanced-filter"
          name="advanced-filter"
          onClick={handleToggleAdvanced}
        />
		<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ">
          Laboratory Tests
        </label>
      </div>

      {showAdvanced && (
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ml-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Advanced Filter Options
          </label>
		  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-4">
            Chemistry
          </label>

          {chemistry?.map(
						(data, index) => {
														
								return (
									<label
										className="mb-2 ml-6 flex flex-row items-center text-xs gap-2 text-black hover:bg-blue-100 duration-200"
										key={`${keyByValue(
										data?.name
										)}`}
										onClick={() => {
											setTimeout(
											() => {
											onChemistryChecked(
											data?.name
											);},
											50);}}>
																	<input
																		type="checkbox"
																		{...register(
																			data?.name,
																			{}
																		)}
																	/>
																	
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
													}
												)}
		<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-4">
            Hematology
          </label>
		{hematology?.map(
						(data, index) => {
														
								return (
									<label
										className="mb-2 ml-6 flex flex-row items-center text-xs gap-2 text-black hover:bg-blue-100 duration-200"
										key={`${keyByValue(
										data?.name
										)}`}
										onClick={() => {
											setTimeout(
											() => {
											onHematologyChecked(
											data?.name
											);},
											50);}}>
																	<input
																		type="checkbox"
																		{...register(
																			data?.name,
																			{}
																		)}
																	/>
																	
																	<span>
																		{
																			data?.label
																		}
																	</span>
																</label>
															);
													}
												)}
        </div>
      )}
		
									</div>

									
									

									{/* <div className="flex flex-col mt-0">
										<ReactQuillField
											label="Doctors remarks"
											placeholder="Enter doctor's remarks here..."
										/>
									</div> */}
								</div>

								<div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
									
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default forwardRef(MedicalCertificate);
