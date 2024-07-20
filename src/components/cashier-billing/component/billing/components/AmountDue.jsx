import React from 'react'
import InfoTextForBilling from '../InfoTextForBilling'
import { dateToday, formatDate, dateOnlyToday, dateMMDDYYYY, patientFullName, patientAddress, formatCurrency  } from "../../../../../libs/helpers";


const AmountDue = (props) => {

    const { loading: btnLoading, appointment, patient, onSave} = props;
    
    let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);

  return (
    <div className="border rounded-sm w-[360px] border-gray-900 ">
					
                    	<div className="">

						<div className="  text-white  grid grid-cols-3 divide-x  font-light text-start font-mono ">
						<div className=" text-xs items-center justify-center flex  bg-gray-200 text-slate-800">
                            
                           ACCOUNT NUMBERS
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex  bg-gray-200 text-slate-800">
                            
                           ACCOUNT BALANCE
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex  bg-gray-700">
                            
                           AMOUNT DUE
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t border-t-slate-500">
						<div className=" text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex ">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t border-t-slate-500">
						<div className=" text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex ">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t border-t-slate-500">
						<div className=" text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex ">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t border-t-slate-500">
						<div className=" text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex ">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t border-t-slate-500">
						<div className=" text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex   text-slate-800">
                            
                           <InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        </div>

						<div className="col-span-1 text-xs items-center justify-center flex ">
                            
						<InfoTextForBilling
                            contentClassName="font-bold "
                            value=""/>
                        
                        </div>
						
					</div>
                    
                    
                    
					

                    <div className="flex flex-row w-full text-sm font-light font-mono border-t border-t-slate-500 ">

						
                        <div className=" text-xs font-bold items-center justify-center flex  bg-gray-200 text-slate-800 border-r  border-r-slate-500 w-full ">
							AMOUNT ENCLOSED
                        </div>
					

						<div className="w-full  border-r  border-r-slate-500 ">

                        <InfoTextForBilling
                            contentClassName="font-bold"
                            value=""/>
                        </div>

					
						<div className=" text-xs font-bold items-center justify-center flex  bg-gray-800 text-slate-50 border-r  border-r-slate-500 w-full">
							TOTAL AMOUNT DUE
                        </div>
                        

						<div className="w-full  ">

                        <InfoTextForBilling
                            contentClassName="font-bold "
                            value={formatCurrency(
								parseFloat(diagnosis?.HOSPITAL_SHARE || 0) +
									parseFloat(
										diagnosis?.PROFESSIONAL_FEE_PF_SHARE ||
											0
									)
							)}/>
                        </div>

					</div>
					

                    
				</div>
               </div>
  )
}




export default AmountDue