import useDataTable from "../../../hooks/useDataTable";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../FlatIcon";
import InfoTextForPrint from "../../InfoTextForPrint";
import { dateToday, formatDate, dateOnlyToday, dateMMDDYYYY, patientFullName, patientAddress  } from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import SummaryOfCharges from "./billing/SummaryOfCharges";
import SummaryWithPhic from "./billing/SummaryWithPhic";
import ProfessionalFeeSOA from "./billing/ProfessionalFeeSOA";
import { useAuth } from "../../../hooks/useAuth";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import InfoTextForBilling from "./billing/InfoTextForBilling";
import { useForm } from 'react-hook-form';
import QRCode from "qrcode.react";
import PatientInfo from "../../../pages/patients/components/PatientInfo";




const CheckBox = ({
	label,
    icon,
	checked = "",
	className = "",
	inputClassName = "",
	...rest
}) => {
	const [inputChecked, setInputChecked] = useState("");
	useEffect(() => {
		let t = setTimeout(() => {
			if (checked == "checked") {
				setInputChecked(checked);
			}
		}, 100);
		return () => {
			clearTimeout(t);
		};
	}, [checked]);

	return (
		<label
			className={`flex items-center text-xs gap-1 font-normal ${className}`}
		>
			<input
				checked={inputChecked}
				type="checkbox"
				className={inputClassName}
				onChange={() => {
					setInputChecked((inputChecked) =>
						inputChecked == "checked" ? "" : "checked"
					);
				}}
				{...rest}
			/>
			{label}
		</label>
	);
};

/* eslint-disable react/prop-types */
const BillingStatement = (props) => {
    const { register, setValue, watch, getValues, handleSubmit } = useForm({
		defaultValues: {
			avatar: "",
			prefix: "",
			suffix: "",
			firstname: "",
			lastname: "",
			middlename: "",
			gender: "",
			birthdate: "",
			birthplace: "",
			barangay: "",
			city: "",
			civil_status: "",
			philhealth: "",
			religion: "",
			mother_firstname: "",
			mother_lastname: "",
			mother_middlename: "",
			country: "",
			region: "",
			province: "",
			municipality: "",
			zip_code: "",
			street: "",
			floor: "",
			subdivision: "",
			house_number: "",
			purok: "",
			mobile: "",
			lat: "",
			lng: "",
			tin: "",
			unit: "",
			profession: "",
			salary: "",
			direct_contributor: "",
			indirect_contributor: "",
			spouse_lastname: "",
			spouse_firstname: "",
			spouse_suffix: "",
			spouse_middlename: "",
			mailing_unit: "",
			mailing_building: "",
			mailing_house_number: "",
			mailing_street: "",
			mailing_subdivision: "",
			mailing_barangay: "",
			mailing_municipality: "",
			mailing_city: "",
			mailing_province: "",
			mailing_zip_code: "",
		},
	});
    const { loading: btnLoading, appointment, patient, onSave} = props;
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [showData, setShowData] = useState(null);
    const componentRef = React.useRef(null);
    const billingStatus = patient?.billing_status || "pending";

	const mutateAll = () => {
		mutatePending();
		mutatePendingForResultReading();
		mutateNowServing();
		mutatePendingForRelease();
		//mutatePendingPatient();
		//mutateNowServingPatient();
	};

    useNoBugUseEffect({
        functions: () => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        },
        params: [appointment],
    });

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
        // Logic for saving the invoice
        // You can implement your save logic here
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="relative">
            {loading ? (
                <div className="absolute top-0 left-0 h-full w-full flex items-start justify-center bg-slate-200 bg-opacity-95 backdrop-blur pt-[244px] z-10">
                    <div className="flex items-center justify-center text-2xl animate-pulse">
                        Loading, please wait...
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="m-2">
                <div className=" gap-2 text-base">
                    <FlatIcon icon="rr-wallet" className="text-base" />
                    <span className="text-lg font-semibold m-2">
                        Status: {""}
                        {billingStatus === "pending" ? (
                            <span className="text-yellow-700">Pending</span>
                        ) : (
                            <span className="text-green-700">MGH</span>
                        )}
                    </span>
                </div>
            </div>

            

            <div className="p-2">
                <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat px-12 py-12" ref={componentRef}>

                                    
                    
                        
        <header class="mb-8">
            <div class="flex justify-start items-center border-b pb-4 gap-5">
            <img
										src="/caduceus.png"
										className=" object-contain bottom-0 left-0 right-0 top-0 h-12 w-12 overflow-hidden bg-fixed "
									/>
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">Hospital Name</h1>
                    <p class="text-sm text-gray-600">123 Medical Street, City, Country</p>
                    <p class="text-sm text-gray-600">Phone: (123) 456-7890</p>
                </div>
                
                <div className="border rounded-sm w-full border-gray-400">
					
                    <div className="">
					<div className="border bg-gray-100 rounded-sm grid grid-cols-1 divide-x  font-semibold text-start font-mono ">
						<div className="col-span-1 text-xs items-center">
                            
                            IF PAYING BY MASTERCARD,DISCOVER,VISA OR AMERICAN EXPRESS, FILL OUT BELOW

                        </div>
						
					</div>
                    
                    
                    
					<div className="flex flex-row gap-2 px-5 text-xs font-light mt-2 font-mono justify-center">

                    <div className="flex flex-row  ">
										<div className="flex flex-row gap-2 ">
                                        
											<CheckBox
												key={`payment_visa-${watch(
													"civil_status"
												)}`}
												label=""
												value="Visa"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("visa")
														? "checked"
														: ""
												}
                                                
											/>
                                            <FlatIcon icon="fi fi-brands-visa" className="text-2xl mr-4" />
                                        
                   
											<CheckBox
												key={`payment_amex-${watch(
													"civil_status"
												)}`}
												label=""
												value="Amex"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("amex")
														? "checked"
														: ""
												}
											/>
                                            <FlatIcon icon="fi fi-brands-american-express" className="text-2xl mr-4" />


                                            
											    <CheckBox
												key={`payment_applepay-${watch(
													"civil_status"
												)}`}
												label=""
												value="ApplePay"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("applepay")
														? "checked"
														: ""
												}
											    />
                                            <FlatIcon icon="fi fi-brands-apple-pay" className="text-2xl mr-4" />

											<CheckBox
												key={`payment_gcash-${watch(
													"civil_status"
												)}`}
												label="Gcash"
												value="gcash"
												onChange={(e) => {
													setValue(
														"civil_status",
														e.target.value
													);
												}}
												checked={
													String(
														watch("civil_status")
													)
														.toLowerCase()
														?.includes("gcash")
														? "checked"
														: ""
												}
											/>
											
										</div>
									</div>

                   
						
                        
					</div>

                    <div className="grid grid-cols-2 text-sm font-light font-mono border-t">

						<div className="flex flex-row w-full border-r border-dashed">
                        
                        <InfoTextForPrint
                            contentClassName="text-sm"
                            title="Card no."
                            value=""/>
						</div>

						<div className="flex flex-row w-full border-r border-dashed">
                        <InfoTextForPrint
                            contentClassName="text-sm "
                            title="Security Code."
                            value=""/>
                        </div>

                        
						
                        
					</div>

                    
				</div>
               </div>

            </div>
        </header>

        

                <div className="flex flex-row justify-between mt-1 gap-5">
                    <div className="border rounded-sm w-[350px] border-gray-400">
					    <div className=" bg-blue-600 text-white rounded-sm grid grid-cols-6 text-sm font-semibold text-center font-mono">
						        <div className="col-span-3">
                                ADMISSION DATE
                                </div>
						         <div className="col-span-3">
                                DISCHARGE DATE
                                </div>
                            
                                
					    </div>
                
					    <div className="grid grid-cols-2 text-sm font-light font-mono ">
							
					


						<div className="">
		
                        <InfoTextForBilling
                            value={dateMMDDYYYY()}/>
						</div>

						<div className="">
                        <InfoTextForBilling
                                value={dateMMDDYYYY()}/>
                        </div>
                        
                        </div>
						<div className="px-2 flex flex-col w-full ">
						<h5 className="text-xs font-bold w-full text-gray-800 ">
                    
						<InfoTextForPrint
							contentClassName="text-sm w-full items-center"
							title="PATIENT NAME"
							value={patientFullName(patient)}
							
						/>
						</h5>
						<h5 className="text-xs font-bold w-full text-gray-800">
					
						<InfoTextForPrint
							contentClassName="text-sm"
							className=""
							title="ADDRESS"
							value={patientAddress(patient)}
						/>
					
						<InfoTextForPrint
							contentClassName="text-sm"
							title="PHILHEALTH NUMBER"
							value={patient?.philhealth}
						/>
						</h5>
						
                        
                        </div>


                       
					</div>
                    <div className="items-center">
                    <QRCode
						value={`user-${showData?.receivedBy?.username}`}
						level="H"
						size={50}
					/>
                    </div>
                    
                </div>


                <div className="flex flex-row justify-between mt-2">
                    <h5 className="text-xs font-bold justify-center w-[370px] text-blue-800">
                        Please check box if address is incorrect or insurance infromation has changed, and indicate change(s) on reverse side or call 573-883-7718
				    </h5>
                <h5 className="text-md font-italic justify-start">
					
				</h5>
                <h5 className="text-md font-italic justify-start">
					BILLING STATEMENT
				</h5>
                </div>
            
          


               

                <div className="flex flex-row justify-between mt-5 items-center">
                    
                    

                    <h5 className="text-xs font-bold justify-center w-[370px] text-gray-800">
                        
				    </h5>
                
                </div>

                       
                    <SummaryOfCharges
                        appointment={appointment}
                        patient={patient}
                        className="m-2 font-bold"
                    />
                    <SummaryWithPhic
                        appointment={appointment}
                        patient={patient}
                        className="m-2"
                    />
                    <ProfessionalFeeSOA
                        appointment={appointment}
                        patient={patient}
                        className="m-2"
                    />

               

                    <div className="grid grid-cols-2">
                        <div className="mt-8 ml-4">
                            <InfoTextForPrint
                                contentClassName="text-sm"
                                title="CERTIFIED CORRECT BY"
                                value={user?.name}
                            />
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="mt-4 ml-4">
                            <InfoTextForPrint
                                contentClassName="text-sm"
                                title="Contact No."
                            />
                            <p className="text-xs">PLEASE PAY AT THE CASHIER</p>
                        </div>
                        <div className="mt-8 mr-4">
                            <p className="text-xs">
                                Signature Over Printed Name of Member or
                                Representative
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 flex items-center justify-end">
                    {/* {billingStatus === "mgh" && ( */}
                        <ActionBtn
                            className="text-base gap-2 ml-2"
                            onClick={handlePrint}
                        >
                            <FlatIcon icon="rr-print" /> Print
                        </ActionBtn>
                    {/* )} */}
                    <ActionBtn
                        type="success"
                        className="ml-2"
                        loading={btnLoading}
                        onClick={handleSave}
                    >
                        <FlatIcon icon="rr-check" />
                        Done
                    </ActionBtn>
                </div>
            </div>
        </div>
    );
};

export default BillingStatement;
