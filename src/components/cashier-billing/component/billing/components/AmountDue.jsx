import React from 'react'
import InfoTextForBilling from '../InfoTextForBilling'
import { dateToday, formatDate, dateOnlyToday, dateMMDDYYYY, patientFullName, patientAddress, formatCurrency  } from "../../../../../libs/helpers";


const AmountDue = (props) => {

    const { loading: btnLoading, appointment, patient, onSave} = props;
    
    let diagnosis = caseCodes?.find(
		(x) => x.CASE_CODE == appointment?.diagnosis_code
	);

  return (
    <div className="border rounded-sm w-[360px] border-gray-300 ">
					
                    	<div className="">

						<div className="  text-white flex flex-row justify-center gap-9 divide-x  font-light text-start font-mono  items-center mb-3">
						<div className=" text-xs items-center justify-center flex  bg-gray-200 text-slate-800 ">
                            
                           ACCOUNT NUMBERS
                        </div>

						<div className=" text-xs items-center justify-center flex  bg-gray-200 text-slate-800">
                            
                           ACCOUNT BALANCE
                        </div>

						<div className=" text-xs items-center justify-center flex text-slate-800 bg-gray-200">
                            
                           AMOUNT DUE
                        </div>
						
					</div>

					<div className="    grid grid-cols-3 divide-x  font-light text-start font-mono border-t  border-t-slate-500 ">
						<div className=" text-xs items-center justify-center flex   text-slate-800 ">
                            
                           <InfoTextForBilling
                            className=''
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
                    
                    
                    
					

                    <div className="flex flex-row w-full text-sm font-light font-mono border-t border-t-slate-500 items-center">

						
                        <div className=" text-xs font-bold justify-center flex-col flex  bg-gray-200 text-slate-800 border-r  border-r-slate-400 w-full ">
							AMOUNT ENCLOSED
                        </div>
					

						<div className="w-full  ">

                        <InfoTextForBilling
                            contentClassName="font-bold"
                            value=""/>
                        </div>

					
						<div className=" text-xs font-bold items-center justify-center flex h-8 bg-gray-700 text-white  w-full">
							TOTAL AMOUNT
                        </div>
                        

						<div className="w-full justify-center ">

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