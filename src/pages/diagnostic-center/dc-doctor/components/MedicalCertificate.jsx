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
import ReactQuillField from "../../../../components/inputs/ReactQuillField";
import DOMPurify from "dompurify";


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
		setValue,
		reset,
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
    const [recommendation, setRecommendation] = useState(""); 
    const { control, handleSubmit } = useForm();
    const [fitToWork, setFitToWork] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
	const handleToggleAdvanced = () => {
	  setShowAdvanced(!showAdvanced);
	};
    const onSubmit = (data) => {
        // Update recommendation state
        setRecommendation(data.recommendation);
        // Handle form submission
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
            setImageSrc(reader.result);
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
		
						<div className="p-2 flex flex-row gap-y-4 relative gap-5 ">
							<div className="bg-gray-600 p-3 min-h-[14in]  overflow-auto phic-forms">
								
								<div className="flex flex-row justify-end">
									<ActionBtn
											className="text-base gap-2 ml-2 mb-2"
											onClick={handlePrint}
											type="secondary"
										>
											<FlatIcon icon="rr-print" /> Print
										</ActionBtn>
										<ActionBtn
											className="text-base gap-2 ml-2 mb-2"
											onClick={handleDownload}
											type="teal"
										>
											<FlatIcon icon="fi fi-bs-disk" /> Download
										</ActionBtn>
								</div>
									

											
<div
className="bg-white p-2 w-[9.5in] gap-y-6"
id="phic-form-printable" ref={componentRef}
>
    <div className="  bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_10%,#000_70%,transparent_100%)] flex flex-col w-[9.3in] min-h-[11in]  border-blue-50 border-2 rounded-xl px-1 py-1">

        <div className="flex w-full pb-1 justify-between">

              
                        <div className="flex">
                            <Img src="/aLab.png" className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                            <div className="">
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
                        </div>
            
                        


                        <div className="px-2 flex flex-row   gap-2">
										
                                        <div className="flex-col ">
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
                                                <h4 className="font-bold text-xs font-mono text-gray-900 flex justify-end">
                                                    Medical Certificate
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
	  <div className="flex flex-col text-start w-full mx-auto">
	  <div className="flex flex-row justify-between ">

                                </div>
	  		
									</div>
									
									</div>
                                    <div className="flex flex-row justify-center mt-5">
                                    <h4 className="font-bold text-xl text-gray-600">
				                        MEDICAL CERTIFICATE
			                        </h4>
                                   
                                    </div>
                                   

								
										<div className="px-5 py-5 font-mono justify-center items-center">
											
										

										<div className="flex flex-col  p-2 text-sm relative">
											
											<div className="absolute">
												<div className="flex items-center gap-2 ml-auto ">
                                                
												</div>
											</div>
                                            <div class="content">
                                                <p >To whom it may concern:</p>
                                                <br></br>
                                                <p className="justify-center flex">This is to certify that ____________________, __ years old M/F,</p>
                                                <br></br>
                                                <p className="justify-center flex gap-4">Presently residing at, <b>{patientAddress(patient)}</b>,</p>
                                                <br></br>
                                                <p className="justify-center flex">consulted/was examined/treated for _______________________ on ___________ for the purpose of ________.</p>
                                                <br></br>
                                                <span className="justify-center flex flex-row gap-4"> <p>That He/She is </p> <b>{fitToWork}</b></span>
                                               
                                            </div>
											
											

                                                <div className="mt-[50px]  ml-[20px]">
                                                <div class="flex flex-row mt-1">
                                                <p><strong>Clinical Impression:</strong></p>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-row items-start gap-4">
                                                        <h4 className="font-semibold">Recommendation:</h4>
                                                        <div
                                                            className="flex-1 text-justify" 
                                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recommendation) }} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center mt-[10px] ml-[450px]">
                                                {imageSrc && (
                                                    <div className="  flex flex-col justify-end items-center">
                                                    <img
                                                        src={imageSrc}
                                                        alt="Uploaded Signature"
                                                        className="max-w-xs w-40 h-24"
                                                    />
                                                        
                                                    </div>
                                                )}
                                                <span className="border-t-gray-500 border-t px-9">Diagnosed by: </span>
                                                </div>
                                               
                                                </div>
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

	<div className="bg-white  w-[3.5in] gap-y-2 border rounded-md py-2 px-2 shadow-2xl">
			<h2 className="block text-md font-sm leading-6 text-blue-900 font-semibold">
				Edit Certificate
			</h2>
			
			

			                        
            <div className="border mt-7 rounded-lg px-2 shadow-lg py-2">
			<div className="flex flex-row gap-2 items-center border-b mb-3">
                                    <FlatIcon icon="fi fi-rr-edit" className="block text-xs font-sm leading-6 text-gray-900 "/>
                                    <span className="text-xs">For Employment</span>
                                    </div>

            <div className="flex flex-row gap-x-4">
							<div className="flex items-center ">
								<input
									id="fitToWork"
									type="checkbox"
									checked={fitToWork === "Fit to Work"}
									onChange={() => setFitToWork("Fit to Work")}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									htmlFor="fitToWork"
									className="ml-2 text-xs font-medium text-gray-700"
								>
									Fit to Work
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="notFitToWork"
									type="checkbox"
									checked={fitToWork === "Not Fit to Work"}
									onChange={() =>
										setFitToWork("Not Fit to Work")
									}
									className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									htmlFor="notFitToWork"
									className="ml-2 text-xs font-medium text-gray-900 "
								>
									Not Fit to Work
								</label>
							</div>
                            <div className="flex items-center">
								<input
									id="notFitToWork"
									type="checkbox"
									checked={fitToWork === ""}
									onChange={() =>
										setFitToWork("")
									}
									className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									htmlFor="notFitToWork"
									className="ml-2 text-xs font-medium text-gray-900 "
								>
									None
								</label>
							</div>
						</div>
                        </div>

                                <div className="border mt-7 rounded-lg px-2 shadow-lg py-2">
                                    <div className="flex flex-row gap-2 items-center">
                                    <FlatIcon icon="fi fi-rr-edit" className="block text-xs font-sm leading-6 text-gray-900 "/>
                                    <span className="text-xs">Doctor's Recommendation</span>
                                    </div>
                                                
                                        
                                   
                                    <div className="flex flex-col mt-2 ">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                        <Controller
                                            name="recommendation"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value, name } }) => (
                                                <ReactQuillField
                                                    name={name}
                                                    value={value}
                                                    onChange={onChange} // Ensure this updates the state
                                                    placeholder="Enter recommendation here..."
                                                />
                                            )}
                                        />
                                        <div className="flex justify-end">
                                        <button className="text-xs bg-gray-200 hover:bg-gray-400 rounded-lg px-4 py-1 mt-2 text-teal-700 hover:text-teal-50 transition-colors duration-300 flex justify-end" type="submit">Submit</button>
                                        </div>
                                     
                                     </form>
									</div>
                                </div>

            <div className="mt-7 flex justify-center rounded-lg border border-dashed border-gray-900/25">
				<div className="text-center">
					<PhotoIcon
						className="mx-auto h-12 w-12 text-gray-300"
						aria-hidden="true"
					/>
					<div className=" flex text-sm leading-b text-gray-600">
                        <label
                            htmlFor="file-input"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500"
                        >
                            Upload Signature
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
						PNG, JPG, Bitmap
					</p>
				</div>
			</div>
                        
		
									</div>
								</div>

								
	);
};

export default forwardRef(MedicalCertificate);
