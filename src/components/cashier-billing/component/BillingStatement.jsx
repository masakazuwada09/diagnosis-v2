import useDataTable from "../../../hooks/useDataTable";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../FlatIcon";
import InfoTextForPrint from "../../InfoTextForPrint";
import { dateToday, formatDate, dateOnlyToday, dateMMDDYYYY, patientFullName, patientAddress, formatCurrency  } from "../../../libs/helpers";
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
import AmountDue from "./billing/components/AmountDue";
import CreditCardDetails from "./billing/components/CreditCardDetails";
import Img from "../../Img";



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

	let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);

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

            

            <div className="p-1">
                <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat px-5 py-5" ref={componentRef}>

                                    
                    
                        
        <header class="mb-2">
            <div class="flex justify-between items-center border-b border-b-slate-500  gap-1">
            <img
										src="/caduceus.png"
										className=" object-contain bottom-0 left-0 right-0 top-0 h-12 w-12 overflow-hidden bg-fixed "
									/>

                <div>
                    <h1 class="text-md font-bold text-gray-800">{patient?.RHU_name}Hospital Name</h1>
                    <p class="text-sm text-gray-600">123 Medical Street, City, Country</p>
                    <p class="text-sm text-gray-600">Phone: (123) 456-7890</p>
                </div>

				<Img
				src={patient?.avatar || ""}
				type="user"
				name={patientFullName(patient)}
				className="h-14 w-14 rounded-full object-contain bg-slate-400"
			/>
                
                <CreditCardDetails/>

            </div>
        </header>

        

                <div className="flex flex-row justify-between gap-5">
                    <div className="border rounded-sm w-[350px] border-gray-400">
					    <div className=" bg-blue-600 text-white rounded-sm grid grid-cols-6 text-sm font-semibold text-center font-mono">
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
                                value={dateMMDDYYYY()}/>
                        </div>
                        
                        </div>
						<div className="px-3 py-2 flex flex-col w-full ">
							
						
                    
						<InfoTextForPrint
							contentClassName="text-sm w-full items-center border rounded-sm w-[350px] border-gray-400"
							title="PATIENT NAME"
							value={patientFullName(patient)}
							
						/>
						
						<InfoTextForPrint
							contentClassName="text-sm w-full items-center border rounded-sm w-[350px] border-gray-400"
							className=""
							title="ADDRESS"
							value={patientAddress(patient)}
						/>
					
						<InfoTextForPrint
							contentClassName="text-sm w-full items-center border rounded-sm w-[350px] border-gray-400"
							title="PHILHEALTH NUMBER"
							value={patient?.philhealth}
						/>
						
						
                        
                        </div>

						
                       
					</div>


                    <div className="items-center">

					<AmountDue
						appointment={appointment}
                        patient={patient}
					/>
		
                    </div>
                    
                </div>


                {/* <div className="flex flex-row justify-between mt-2">
                    <h5 className="text-xs font-bold justify-center w-[370px] text-blue-800">
                        Please check box if address is incorrect or insurance infromation has changed, and indicate change(s) on reverse side or call 573-883-7718
				    </h5>
                <h5 className="text-md font-italic justify-start">
					
				</h5>
                <h5 className="text-md font-italic justify-start">
					BILLING STATEMENT
				</h5>
                </div> */}
            
          


               

                <div className="flex flex-row justify-between mt-2 items-center">
                    
                    

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
						<QRCode
						value={`user-${showData?.receivedBy?.username}`}
						level="H"
						size={50}
					/>
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
