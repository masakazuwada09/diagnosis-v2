/* eslint-disable react/prop-types */
import  { React, useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import FlatIcon from "../../../components/FlatIcon";
import { useForm } from "react-hook-form";
import useNoBugUseEffect from '../../../hooks/useNoBugUseEffect';
import Axios from '../../../libs/axios';
import AppointmentStatus from '../../../components/AppointmentStatus';
import Img from "../../../components/Img";
import {
	calculateAge,
	formatDate,
	patientAddress,
	getPhilHealth,
	patientFullName,
} from "../../../libs/helpers";

const uniq_id = uuidv4();

/* eslint-disable react/prop-types */
const InfoText = ({
	className = "",
	valueClassName = "",
	label,
	icon,
	value,
}) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label ? (
				<span className="text-slate-800 text-xs capitalize mb-1">
					{label}
				</span>
			) : (
				""
			)}
			<div className="flex items-center mb-0 gap-2">
				<span className="flex items-center justify-center">
					<FlatIcon
						icon={icon || "bs-arrow-turn-down-right"}
						className="text-[10px] text-slate-600 ml-1"
					/>
				</span>
				<span
					className={`capitalize gap-1 text-slate-900 flex text-base flex-wrap ${valueClassName} `}
				>
					{value}
				</span>
			</div>
		</div>
	);
};


const PatientInfo = ({ 
		appointment: propAppointment,
		patient, 
		children, 
		patientSelfie,
	}) => {
	
		

		const {
			register,
			getValues,
			setValue,
			control,
			reset,
			watch,
			handleSubmit,
			formState: { errors },
		} = useForm();
		const [appointment, setAppointment] = useState(propAppointment);
		const [key, setKey] = useState(uniq_id);
		useNoBugUseEffect({
			functions: () => {
				setTimeout(() => {
					if (appointment?.social_history) {
						Object.keys(appointment?.social_history).map((key) => {
							console.log(
								"appointment?.social_history[key]",
								key,
								appointment?.social_history[key]
							);
							setValue(key, appointment?.social_history[key]);
						});
					}
				}, 1500);
			},
			params: [appointment?.id, key],
		});

		const refreshData = () => {
			Axios.get(`v1/clinic/get-appointment/${appointment?.id}`).then(
				(res) => {
					setAppointment(res.data.data);
					setKey(uuidv4());
				}
			);
		};


	return (
		<>

			<div className="group relative h-[108px] w-[108px] min-h-[108px] min-w-[108px] rounded-full aspect-square bg-background">
				
				<Img
					type="user"
					name={`${patient?.lastname}-${patient?.firstname}-${patient?.middle}`}
					src={patientSelfie ? patientSelfie : patient?.avatar || ""}
					className="min-h-[108px] min-w-[108px] aspect-square object-cover rounded-xl"
					alt=""
					id="user-image-sample"
					key={`key-${patient?.id}-${patient?.avatar}`}
				/>
			</div>
			<div className=" pl-2 !text-sm">
				<h6
					className={` text-2xl mb-1 font-semibold flex items-center ${
						String(patient?.gender).toLowerCase() == "male"
							? "text-blue-800"
							: "text-pink-800"
					} mb-0`}
				>
					{patientFullName(patient)}
				</h6>
				<div className="flex flex-col lg:flex-row gap-6 mb-2">
					<div className="flex items-center gap-2 text-base">
						<FlatIcon
							icon="rr-calendar-clock"
							className="text-base"
						/>
						<span>{calculateAge(patient?.birthday)} yrs. old</span>
					</div>
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-calendar" className="text-base" />
						<span>{formatDate(patient?.birthday)}</span>
					</div>
					<div className="flex items-center gap-2 text-base">
						<FlatIcon icon="rr-venus-mars" className="text-base" />
						{String(patient?.gender).toLowerCase() == "male" ? (
							<span className="text-blue-700">Male</span>
						) : (
							<span className="text-pink-700">Female</span>
						)}
					</div>
				</div>

				<div className="flex items-center mb-2 gap-2 text-base">
					<FlatIcon icon="rr-map-marker" className="text-base" />
					<span className="capitalize gap-1 flex flex-wrap">
						{patientAddress(patient)}
						
					</span>
					
				</div>
				
				{appointment?.id ? (

	<div className="flex items-center text-base ">

					<img
						src="/vitals/philhealthlogo.png"
						className="w-8 h-8 object-contain"
					/>

	<span className="capitalize flex flex-wrap">
	
	PHIC-NO: {appointment?.phic_no}
		
	</span>
		
		</div>
		

) : (
""
)}
				

			</div>
			
			{children}

			
			
			</>
		
			);
			};

export default PatientInfo;
