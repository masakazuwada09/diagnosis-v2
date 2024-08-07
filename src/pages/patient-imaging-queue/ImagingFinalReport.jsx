/* eslint-disable react/prop-types */

import React, {useState} from "react";
import ActionBtn from "../../components/buttons/ActionBtn";
import QRCode from "qrcode.react";
import InfoTextForPrint from "../../components/InfoTextForPrint";
import { formatDate } from "../../libs/helpers";
import { data } from "autoprefixer";
import { useReactToPrint } from "react-to-print";
import FlatIcon from "../../components/FlatIcon";
import { patientFullName,patientAddress, doctorName } from "../../libs/helpers";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Img from "../../components/Img";



const ImagingFinalReport = (props) => {
const { loading: btnLoading, appointment, patient, onSave} = props;
const [doctors, setDoctors] = useState([]);
console.log('appointmentsssssssssssss', appointment)
const [doctor, setDoctor] = useState(null);
const [image, setImage] = useState(null);
const componentRef = React.useRef(null);
const [images, setImages] = useState({ image1: null, image2: null });
const [showData, setShowData] = useState(null);
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

const handleFileChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => ({ ...prevImages, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
const show = (data) => {
	console.log("Accept Patient Referral", data);
	setReferral(() => data);
	getDoctors();
	setModalOpen(true);
};
const getDoctors = () => {
	Axios.get(`/v1/clinic/rhu-doctors`).then((res) => {
		setDoctors(res.data.data);
	});
};

	
const FormHeading = ({ title }) => {
	return (

		<div className="flex flex-row h-[1056px] items-end bg-gradient-to-t from-sky-500 to-indigo-500 px-1 py-1">
		<div className="flex items-center ">

		</div>
		<div className=" bg-white flex pb-1">
		
        		<QRCode
					value={`user-${appointment?.scheduledBy?.username}`}
					className="px-1 py-1"
					level="H"
					size={50}
				/> 
		</div>
	</div>
	);
};
  return (
	<div className="">

    <div className=" border-1 px-2 py-1 bg-gray-700 overflow-auto" >
                         

	    <div className="flex flex-row justify-start">
        {/* {['image1', 'image2'].map((imageKey, index) => (
        <div key={index} className="flex flex-col items-center space-y-2 ">
          <label
            htmlFor={`file-input-${index}`}
            className="mb-2 mt-1 px-2 py-2 text-xs cursor-pointer rounded-lg bg-gray-500 items-center ml-2 text-white flex flex-row hover:bg-gray-600"
          >
            <FlatIcon
                icon="fi fi-rr-mode-portrait"
              className="h-8 w-6 text-gray-200 gap-1 text-lg"
              aria-hidden="true"
            />
            {`Upload View ${index + 1}`}
            <input
              type="file"
              id={`file-input-${index}`}
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFileChange(e, imageKey)}
            />
          </label>
          
        </div>
      ))} */}
								<ActionBtn
											className="text-base gap-2 ml-2 mb-2 mt-1"
											onClick={handlePrint}
											type="secondary"
										>
											<FlatIcon icon="rr-print" /> Print
										</ActionBtn>
										<ActionBtn
											className="text-base gap-2 ml-2 mb-2 mt-1"
											onClick={handleDownload}
											type="teal"
										>
											<FlatIcon icon="fi fi-bs-disk" /> Save
										</ActionBtn>
								</div>
										
										
		<div className="flex flex-row " ref={componentRef}>
            <div className="h-[1055px] bg-white ">
            <div className="flex flex-row ">
				
           
            <img
			className="w-[400px] object-contain absolute opacity-10 mb-[140px] "
			src="/saranganilogosaturated.png"
			/>
                 <FormHeading />	
				 <div class="absolute bg-dots sm opacity-40 default h-screen w-screen"></div>
            <div className="">
			
            <div className="flex flex-col-2 gap-1 bg-white " >
                
			<div className="" >
            
					<img
						src="/saranganilogo.png"
						className="w-24 h-24 object-contain m-2"
					/>
			</div>
				<div className="">
				<div className="flex  items-center my-2 ">
				
				</div>
					<div className="text-sm font-semibold">
					<span>SARANGANI PROVINCIAL HOSPITAL</span>
				</div>
				<div className="text-xs font-light ">
					<span>Capitol Complex, Alabel, Sarangani</span>
				</div>
				<div className="text-xs font-light ">
					<span>Tel. No. 083 508 0262</span>
				</div>
                <div className="text-sm font-semibold">
					<span>HOSPITAL LABORATORY DEPARTMENT</span>
				</div>
				<div className="text-base text-blue-500 font-bold">
                                <span>IMAGING REPORT</span>
                            </div>
                </div>
										
			<div className="flex text-sm ml-auto m-4 bg-white ">
				<div>
                    <InfoTextForPrint
								contentClassName="text-sm"
								title="Fullname"
								value= {patientFullName(patient)}
							/>
							<InfoTextForPrint
								contentClassName="text-sm"
								title="Address"
								value={patientAddress(patient)}
							/>
                            <InfoTextForPrint
								contentClassName="text-sm"
								title="Account No."
								// value={patient?.civil_status}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Attending Dr"
								value={doctorName(data?.referredToDoctor)}
							/>

							<InfoTextForPrint
								contentClassName="text-sm"
								title="Room"
								// value={patient?.civil_status}
							/>   
                </div>

			</div>
           
		</div>

        <div className="flex flex-col p-2 text-sm relative bg-slate-100 ">
			<b>IMPORTANT REMINDERS:</b>
		
			<p className="text-xs">
				All Results on
				this Form are necessary. Laboratory Report with incomplete
				information shall not be processed.
			</p>{" "}
			<b className="text-xs">
				FALSE/INCORRECT INFORMATION OR MISREPRESENTATION
				SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
				ADMINISTRATIVE LIABILITIES.
			</b>
		</div>
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
        <div className="justify-start flex flex-row text-center font-mono text-sm font-semibold bg-white px-5">
        {/* {['image1', 'image2'].map((imageKey, index) => (
        <div key={index} className="flex flex-col items-center space-y-2 mr-2">
           {images[imageKey] ? (
            <img src={images[imageKey]} alt={`Uploaded ${imageKey}`} className="h-24 w-24 object-cover " />
          ) : (
           ""
          )}
        </div>
      ))} */}
       
        </div>

            </div>							

        
		</div> 	
            </div>
		    				
        
        
        </div>
								
    </div>
	</div>
  )
}

export default ImagingFinalReport
