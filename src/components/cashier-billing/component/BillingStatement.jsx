import useDataTable from "../../../hooks/useDataTable";
import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../FlatIcon";
import InfoTextForPrint from "../../InfoTextForPrint";
import { dateToday, formatDate, dateOnlyToday, dateMMDDYYYY  } from "../../../libs/helpers";
import ActionBtn from "../../buttons/ActionBtn";
import SummaryOfCharges from "./billing/SummaryOfCharges";
import SummaryWithPhic from "./billing/SummaryWithPhic";
import ProfessionalFeeSOA from "./billing/ProfessionalFeeSOA";
import { useAuth } from "../../../hooks/useAuth";
import useNoBugUseEffect from "../../../hooks/useNoBugUseEffect";
import InfoTextForBilling from "./billing/InfoTextForBilling";

/* eslint-disable react/prop-types */
const BillingStatement = (props) => {
    const { loading: btnLoading, appointment, patient, onSave} = props;
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const componentRef = React.useRef(null);
    const billingStatus = patient?.billing_status || "pending";

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

            <div className=" p-2 px-5">
                <div className="px-12 py-12" ref={componentRef}>
               
                <div className="border rounded-md w-[400px] justify-center">
					
                    <div className="">
					<div className=" bg-gray-100 rounded-sm grid grid-cols-6 divide-x text-sm font-semibold text-center font-mono">
						<div className="col-span-3">STATEMENT DATE</div>
						<div className="col-span-3">DUE DATE</div>
					</div>
                    
                    
                    
					<div className="grid grid-cols-6 text-xs font-light mt-2 font-mono ">

						<div className="col-span-3">
                        <InfoTextForBilling
                                value={dateMMDDYYYY()}/>
                                 
						</div>
						<div className="col-span-3 ">
                        <InfoTextForBilling
                                value={dateMMDDYYYY()}/>
                        </div>
						
                        
					</div>
				</div>
               </div>


               <div className="border rounded-md w-[400px] justify-center mt-2">
					
                    <div className="">
					<div className="border bg-gray-100 rounded-sm grid grid-cols-3 divide-x text-sm font-semibold text-center font-mono ">
						<div className="col-span-3">Payment Method</div>
						
					</div>
                    
                    
                    
					<div className="grid grid-cols-6 text-xs font-light mt-2 font-mono px-5">

                    <FlatIcon icon="fi fi-brands-visa" className="text-3xl" />
                    <FlatIcon icon="fi fi-brands-american-express" className="text-3xl" />
                    <FlatIcon icon="fi fi-brands-apple-pay" className="text-3xl" />
						
                        
					</div>

                    
				</div>
               </div>


               

               <div className="flex flex-row justify-between mt-5">
                    <h5 className="text-xs font-bold justify-center w-[370px] text-blue-800">
                        Please check box if address is incorrect or insurance infromation has changed, and indicate change(s) on reverse side or call 573-883-7718
				    </h5>
                <h5 className="text-md font-italic justify-start">
					STATEMENT
				</h5>
                <h5 className="text-md font-italic ">
					STATEMENT
				</h5>
                </div>

                
               

                <div className="flex flex-row justify-between mt-5">
                    <h5 className="text-xs font-bold justify-center w-[370px] text-gray-800">
                        PATIENT NAME:
				    </h5>
                    <h5 className="text-xs font-bold justify-center w-[370px] text-gray-800">
                        ADDRESS:
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
                        <div className="mt-8 mr-4">
                            <InfoTextForPrint
                                contentClassName="text-sm"
                                title="OR Number"
                                value={""}
                            />
                            <InfoTextForPrint
                                contentClassName="text-sm"
                                title="Amount"
                                value={patient?.civil_status}
                            />
                            <InfoTextForPrint
                                contentClassName="text-sm"
                                title="Date"
                                value={dateToday()}
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
