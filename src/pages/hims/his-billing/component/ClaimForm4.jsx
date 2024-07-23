import React, { useEffect, useState } from 'react'
import { calculateAge } from '../../../../libs/helpers';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { useReactToPrint } from 'react-to-print';
import { useForm } from 'react-hook-form';
import FlatIcon from '../../../../components/FlatIcon';
/* eslint-disable react/prop-types */
const BoxInput = () => {
	return (
		<>
			<label className="flex items-center border-l last:border-r border-b border-black">
				<input
					type="text"
					className="w-4 p-0 leading-none text-center border-0 !text-xs h-3"
					maxLength={1}
				/>
			</label>
		</>
	);
};
const BoxInputGroup = ({
	children,
	label = "",
	className = "",
	labelClassName = "",
}) => {
	return (
		<div
			className={`flex flex-col items-center relative pt-1 ${className}`}
		>
			<div className="flex items-center">{children}</div>
			{label && (
				<label
					className={` absolute !text-[8px] -bottom-[20px] ${labelClassName}`}
				>
					{label}
				</label>
			)}
		</div>
	);
};
const UnderlineInput = ({
	label = "",
	className = "",
	labelClassName = "",
	inputClassName = "",
}) => {
	return (
		<label
			className={`flex flex-col justify-center items-center gap-0 ${className}`}
		>
			<input
				type="text"
				className={`pl-[2px] w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
			<label className={`!text-[10px] ${labelClassName}`}>{label}</label>
		</label>
	);
};
const TextInput = ({
	label = "",
	className = "",
	labelClassName = "",
	inputClassName = "",
}) => {
	return (
		<label className={`flex items-center gap-0 ${className}`}>
			<label className={`text-xs ${labelClassName}`}>{label}</label>
			<input
				type="text"
				className={`pl-[2px] border-b w-full ${inputClassName}`}
				style={{ borderWidth: "0px", borderBottom: "1px solid #000" }}
			/>
		</label>
	);
};

const CheckBox = ({
	label,
	checked = "",
	className = "",
	inputClassName = "",
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
			/>
			{label}
		</label>
	);
};




const ClaimForm4 = (props) => {
	const { register, setValue, watch, getValues, handleSubmit } = useForm({
	});
	const { loading: btnLoading, appointment, patient, onSave} = props;
	const componentRef = React.useRef(null);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});


  return (
    <div className="bg-gray-600 p-11 h-screen  phic-forms">

						<ActionBtn
							className="text-base gap-2 ml-2 mb-2"
							onClick={handlePrint}
							type="success"
						>
							<FlatIcon icon="rr-print" /> Print
						</ActionBtn>
						
			<div
				className="bg-white p-[0.5in]  flex flex-col w-[9.5in] gap-y-6 mx-auto"
				id="phic-form-printable" ref={componentRef}
			>
						

				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] ">
					<div className="flex items-center">
						<img
							src="/philhealth.png"
							className="h-[88px] mr-auto"
						/>
						<div className="flex flex-col items-center justify-center ">
							<b className="text-xs">
								This form may be reproduced and is NOT FOR SALE
							</b>
							<h3 className="text-2xl font-bold">CF4</h3>
							<b className="text-xs">(Claim Form 4)</b>
							<b className="text-xs">February 2020</b>
							<div className="flex items-center text-xs">
								<b className="mr-2">Series #</b>
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
								<BoxInput />
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<h6 className="font-bold text-xs">
							IMPORTANT REMINDERS:
						</h6>
						<p className="text-xs">
							PLEASE FILL OUT APPROPRIATE FIELDS, WRITE IN CAPITAL
							LETTERS AND CHECK THE APPROPRIATE BOXES.
						</p>
						<p className="text-xs">
							This form, together with other supporting documents,
							should be filled within{" "}
							<b> sixty (60) calendar days</b> from the date of
							discharge.
						</p>
						<p className="text-xs">
							All information, fields and tick boxes in this form
							are necessary.{" "}
							<b>
								Claim forms with incomplete information shall
								not be processed.
							</b>
						</p>
						<p className="font-bold text-xs">
							FALSE / INCORRECT INFORMATION OR MISREPRESENTATION
							SHALL BE SUBJECT TO CRIMINAL, CIVIL OR
							ADMINISTRATIVE LIABILITIES.
						</p>
					</div>

					<div className="border flex items-center justify-center text-xs font-bold">
						I . HEALTH CARE INSTITUTION (HCI) INFORMATION
					</div>
					<div className="border-x border-b flex font-bold">
						<div className="border-r p-1 pb-0 text-xs w-3/5 flex flex-col">
							<span> 1. Name of HCI &nbsp;&nbsp;</span>
							<div contentEditable className="h-4 p-1"></div>
						</div>
						<div className=" text-xs p-1 pb-0 flex flex-col">
							<span>2. Accreditation Number &nbsp;&nbsp;</span>
							<div contentEditable className="h-4 p-1"></div>
						</div>
					</div>
					<div className="border-x border-b flex flex-col font-bold">
						<div className="p-1 pb-0 text-xs flex-col">
							3. Address of HCI
						</div>
						<div className="flex border- w-full ">
							<div
								className="text-xs border-0 w-[20%] text-center h-5 p-1"
								contentEditable
							></div>
							<div
								className="text-xs border-0 w-[20%] text-center h-5 p-1"
								contentEditable
							></div>
							<div
								className="text-xs border-0 w-[25%] text-center h-5 p-1"
								contentEditable
							></div>
							<div
								className="text-xs border-0 w-[25%] text-center h-5 p-1"
								contentEditable
							></div>
							<div
								className="text-xs border-0 w-[10%] text-center h-5 p-1"
								contentEditable
							></div>
						</div>
						<div className="flex border-t w-full ">
							<div className="text-[8px] border-x w-[20%] text-center">
								Bldg No. and Name/ Lot/Block
							</div>
							<div className="text-[8px] border-x w-[20%] text-center">
								Street/Subdivision/Village
							</div>
							<div className="text-[8px] border-x w-[25%] text-center">
								Barangay/City/ Municipality
							</div>
							<div className="text-[8px] border-x w-[25%] text-center">
								Province
							</div>
							<div className="text-[8px] border-x w-[10%] text-center">
								Zip Code
							</div>
						</div>
					</div>

					<div className="border-x border-b flex items-center justify-center text-xs font-bold">
						II. PATIENT'S DATA
					</div>
					<div className="border-x flex font-bold">
						<div className="border-r pt-1 pb-0 text-xs w-[75%] flex flex-col">
							<span className="pb-0 text-xs">
								1. Name of Patient
							</span>
						</div>
						<div className=" text-xs p-1 pb-0 flex flex-col w-[25%]">
							<div>2. PIN</div>
							<div
								className="text-center p-1 h-5 w-full"
								contentEditable
							></div>
						</div>
					</div>
					<div className="border-b border-x flex">
						<div className="border-r w-[75%]">
							<div className="grid grid-cols-3">
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2  border-b text-center"
								>
									{patient?.lastname}
								</div>
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2 border-b text-center"
								>
									{patient?.firstname}
								</div>
								<div
									contentEditable
									className="text-[14px] font-semibold pb-2 -mt-2  border-b text-center"
								>
									{patient?.middlename}
								</div>
								<div className="text-[8px] border-b border-r text-center">
									Last Name
								</div>
								<div className="text-[8px] border-b border-r text-center">
									First Name
								</div>
								<div className="text-[8px] border-b text-center">
									Middle Name
								</div>
							</div>
							<span className="text-xs font-bold p-1 flex flex-col">
								5. Chief Complaint
								<div
									className="p-1 h-5 w-full"
									contentEditable
								></div>
							</span>
						</div>
						<div className="flex flex-col w-[25%]">
							<div className="border-b text-xs font-bold p-1 gap-2 pb-[10px] w-full">
								3. Age: &nbsp;&nbsp;
								<span>
									{calculateAge(patient?.birthday)} yrs. old
								</span>
							</div>
							<div className="text-xs font-bold flex items-center p-1 gap-2 pb-3 w-full">
								<span>4. Sex</span>
								<CheckBox
									label="Male"
									checked={
										patient?.gender == "male"
											? "checked"
											: ""
									}
								/>
								<CheckBox
									label="Female"
									checked={
										patient?.gender == "female"
											? "checked"
											: ""
									}
								/>
							</div>
						</div>
					</div>

					<div className="border-b border-x flex">
						<div className="border-r w-[75%] grid grid-cols-2">
							<div
								className="text-xs font-bold pb-0 p-1 border-r flex flex-col"
								contentEditable
							>
								<span>6. Admitting Diagnosis:</span>
								<br />
							</div>

							<div
								className="text-xs font-bold pb-0 p-1 flex flex-col"
								contentEditable
							>
								<span> 7 . Discharge Diagnosis:</span>
								<br />
							</div>
						</div>
						<div className="flex flex-col w-[25%]">
							<div
								className="text-xs font-bold p-1 pb-0 border-b flex flex-col"
								contentEditable
							>
								<span>8. a. 1st Case Rate Code</span>
								<br />
							</div>
							<div
								className="text-xs font-bold p-1 pb-0 flex flex-col"
								contentEditable
							>
								<span>8. b. 2nd Case Rate Code</span>
								<br />
							</div>
						</div>
					</div>

					<div className="border-b border-x grid grid-cols-2 p-1">
						<div className="flex items-center pb-4">
							<span className="text-xs font-bold">
								9. a. Date Admitted:{" "}
							</span>
							<div className="flex items-center gap-2 ml-2">
								<BoxInputGroup
									label="Month"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Day"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Year"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
							</div>
						</div>
						<div className="flex items-center pt-1 pb-4">
							<span className="text-xs font-bold">
								9. b. Time Admitted:{" "}
							</span>
							<div className="flex items-center gap-2 ml-2">
								<BoxInputGroup
									label="hour"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="min"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<div />
								<div />
								<CheckBox label="AM" />
								<CheckBox label="PM" />
							</div>
						</div>
					</div>
					<div className="border-b border-x grid grid-cols-2 p-1">
						<div className="flex items-center pb-4">
							<span className="text-xs font-bold">
								10. a. Date Discharged
							</span>
							<div className="flex items-center gap-2 ml-2">
								<BoxInputGroup
									label="Month"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Day"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Year"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
							</div>
						</div>
						<div className="flex items-center pt-1 pb-4">
							<span className="text-xs font-bold">
								10. b. Time Discharged:
							</span>
							<div className="flex items-center gap-2 ml-2">
								<BoxInputGroup
									label="hour"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="min"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<div />
								<div />
								<CheckBox label="AM" />
								<CheckBox label="PM" />
							</div>
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center text-xs font-bold">
						<h5 className="font-bold4">
							III. REASON FOR ADMISSION
						</h5>
					</div>

					<div className="border-b border-x flex">
						<span className="text-xs font-bold p-1 whitespace-nowrap">
							1. History of Present Illness:
						</span>
						<div
							className="w-full pl-1 text-xs font-bold"
							contentEditable
						></div>
					</div>
					<div className="border-b border-x flex flex-col">
						<div className="flex items-center">
							<span className="text-xs font-bold p-1 whitespace-nowrap">
								2 a. Pertment Past Medical History.
							</span>
							<div
								className="w-full pl-1 text-xs font-bold"
								contentEditable
							></div>
						</div>
						<span className="text-xs font-bold p-1">
							2 b. OB/GYN History
						</span>
						<div className="flex items-center gap-1 pb-1">
							<TextInput
								label="G"
								className="w-[33px] mx-4"
								inputClassName="text-center"
							/>
							<TextInput
								label="P"
								className="w-[33px] mx-2"
								inputClassName="text-center"
							/>
							(
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							,
							<UnderlineInput
								className="w-[33px] -mb-[3px]"
								inputClassName="text-center"
							/>
							)
							<TextInput
								label="LMP"
								className="w-[88px] mx-2"
								inputClassName="text-center"
							/>
							<CheckBox label={`NA`} />
						</div>
					</div>
					<div className="border-b border-x flex flex-col">
						<span className="text-xs font-bold px-1 pt-2">
							3. Pertinent Signs and Symptoms on Admission (tick
							applicable box/es):
						</span>
						<div className="grid grid-cols-4 gap-2 p-2 px-3">
							<CheckBox label={`Altered mental sensorium`} />
							<CheckBox label={`Diarrhea`} />
							<CheckBox label={`Hematemesis `} />
							<CheckBox label={`Palpitations`} />
							<CheckBox label={`Abdminal cramp/pain`} />
							<CheckBox label={`Dizziness`} />
							<CheckBox label={`Hematuria`} />
							<CheckBox label={`Seizures`} />
							<CheckBox label={`Anorexia`} />
							<CheckBox label={`Dysphagia`} />
							<CheckBox label={`Hemoptysis`} />
							<CheckBox label={`Skin rashes`} />
							<CheckBox label={`Bleeding gums`} />
							<CheckBox label={`Dysuria`} />
							<CheckBox label={`Jaundice`} />
							<CheckBox label={`Sweating`} />
							<CheckBox label={`Blurring of vision`} />
							<CheckBox label={`Epistaxis`} />
							<CheckBox label={`Lower extremity edema`} />
							<CheckBox label={`Urgency`} />
							<CheckBox label={`Chest pain/discomfort`} />
							<CheckBox label={`Fever`} />
							<CheckBox label={`Myalgia`} />
							<CheckBox label={`Vomiting`} />
							<CheckBox label={`Constipation`} />
							<CheckBox label={`Frequency of urination`} />
							<CheckBox label={`Orthopnea`} />
							<CheckBox label={`Weight loss`} />
							<CheckBox label={`Cough`} />
							<CheckBox label={`Headache`} />
							<CheckBox label={`Pain, ________________ (site)`} />
							<CheckBox label={`Others ________________`} />
						</div>
					</div>

					<div className="border-b border-x flex flex-col pb-2">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								4. Referred from another health care institution
								(HCI):{" "}
							</span>

							<CheckBox label="No" />
							<div className="flex">
								<CheckBox label="Yes, Specify Reason " />
								<UnderlineInput className="w-1/2" />
							</div>
						</div>
						<div className="flex justify-end pr-2">
							<TextInput
								className="w-3/5"
								label="Name of Originating HCI"
								labelClassName="whitespace-pre"
							/>
						</div>
					</div>

					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								5. Physical Examination on Admission (Pertinent
								Findings per System)
							</span>
						</div>

						<div className="absolute w-[144px] top-2 right-2 border p-1">
							<div className="flex">
								<TextInput label="Height:" />
								(cm)
							</div>
							<div className="flex">
								<TextInput label="Weight:" />
								(kg)
							</div>
						</div>
						<div className="flex items-center gap-4 px-2 mb-3">
							<label className="text-xs">General Survey</label>
							<CheckBox
								className="ml-11"
								label="Awake and alert"
							/>
							<CheckBox
								className="ml-11"
								label="Altered sensorium: __________________"
							/>
						</div>

						<div className="flex items-center gap-4 px-2 pb-2">
							<label className="text-xs">Vital Signs:</label>
							<div className="flex items-center text-xs">
								<label>BP:</label>
								<TextInput className="w-[44px]" />{" "}
								<span>/</span>
								<TextInput className="w-[44px]" />
							</div>
							<TextInput label="HR:" className="w-[128px]" />
							<TextInput label="RR:" className="w-[128px]" />
							<TextInput label="Temp:" className="w-[128px]" />
						</div>
						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								HEENT:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2">
								<CheckBox label={`Essentially normal`} />
								<CheckBox
									label={`Abnormal pupillar reaction`}
								/>
								<CheckBox label={`Cervical lymphadenopathy `} />
								<CheckBox label={`Dry Mucous membrane`} />
								<CheckBox label={`Icteric sclerae`} />
								<CheckBox label={`Pale conjunctivae`} />
								<CheckBox label={`Sunken eyeballs`} />
								<CheckBox label={`Sunken fontanelle`} />
								<TextInput label="Others:" />
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white flex flex-col w-[8.5in] min-h-[13in] ">
					<div className="border-y border-x flex flex-col pb-2 relative">
						<div className="text-xs font-bold px-1 pt-2 flex items-center w-full gap-2 mb-2">
							<span>
								5. Physical Examination on Admission (Pertinent
								Findings per System)
							</span>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								CHEST/LUNGS:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox
									label={`Asymmetrical chest expansion `}
								/>
								<CheckBox label={`Decreased breath sounds`} />
								<CheckBox label={`Wheezes`} />
								<CheckBox label={`Lump/s over breast(s)`} />
								<CheckBox label={`Rales/crackles/rhonchi`} />
								<CheckBox
									label={`Intercostal rib/clavicular retraction`}
								/>
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								CVS:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Displaced apex beat`} />
								<CheckBox label={`Heaves and/or thrills`} />
								<CheckBox label={`Pericardia! bulge`} />
								<CheckBox label={`Irregular rhythm`} />
								<CheckBox label={`Muffled heart sounds`} />
								<CheckBox label={`Murmur`} />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								ABDOMEN:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Abdominal rigidity`} />
								<CheckBox label={`Abdomen tenderness`} />
								<CheckBox label={`Hyperactive bowel sounds`} />
								<CheckBox label={`Palpable mass(es)`} />
								<CheckBox label={`Tympanitic/dull abdomen`} />
								<CheckBox label={`Uterine contraction`} />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								GU (I E):
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox
									label={`Blood stained in exam finger`}
								/>
								<CheckBox label={`Cervical dilatation`} />
								<CheckBox
									label={`Presence of abnormal discharge`}
								/>
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								SKIN / EXTREMITIES:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Clubbing`} />
								<CheckBox label={`Cold clammy skin`} />
								<CheckBox label={`Cyanosis/mottled skin`} />
								<CheckBox label={`Edema/swelling`} />
								<CheckBox label={`Decreased mobility`} />
								<CheckBox label={`Pale nailbeds`} />
								<CheckBox label={`Poor skin turgor`} />
								<CheckBox label={`Rashes/petechiae`} />
								<CheckBox label={`Weak pulses `} />
								<div />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>

						<div className="flex mb-3">
							<label className="text-xs min-w-[98px] pl-2">
								NEURO·EXAM:
							</label>
							<div className="grid grid-cols-4 gap-1 pl-2	 w-full">
								<CheckBox label={`Essentially normal`} />
								<CheckBox label={`Abnormal gait`} />
								<CheckBox label={`Abnormal position sense`} />
								<CheckBox
									label={`Abnormal/decreased sensation`}
								/>
								<CheckBox label={`Abnormal reflex(es)`} />
								<CheckBox label={`Poor/altered memory`} />
								<CheckBox label={`Poor muscle tone/strength`} />
								<CheckBox label={`Poor coordination`} />
								<div />
								<TextInput label="Others:" />
							</div>
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center text-xs p-2">
						<b>
							IV. COURSE IN THE WARD (Attach photocopy of
							laboratory/Imaging results)
						</b>
						<CheckBox label="Check box if there is/are additional sheet(s)." />
					</div>

					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								Date
							</div>
							<div
								className="w-4/5 border-r py-1 text-center px-1 text-xs"
								contentEditable
							>
								DOCTOR'S ORDER/ACTION
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-1/5 border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-4/5 border-r py-1 text-left px-1 text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex flex-col">
							<div className="w-full border-r py-1 text-left px-2 pb-0 text-xs">
								SURGICAL PROCEOURE/ RVS CODE (Attach photocopy
								of OR technique):
							</div>
							<UnderlineInput />
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center gap-2 text-xs p-2">
						<b>V. DRUGS/MEDICINES</b>
						<CheckBox label="Check box if there is/are additional sheet(s)." />
					</div>
					<div className="border-b border-x flex flex-col pb-2 relative">
						<div className="flex border-b">
							<div
								className="w-[10%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Generic Name
							</div>
							<div
								className="w-[23%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Quantity/Dosage/Route/Frequency
							</div>
							<div
								className="w-[10%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Total Cost
							</div>
							<div
								className="w-[15%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Generic Name (cont)
							</div>
							<div
								className="w-[28%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Quantity/Dosage/Route/Frequency (cont)
							</div>
							<div
								className="w-[16%] border-r py-1 text-center text-[10px] font-semibold"
								contentEditable
							>
								Total Cost (cont)
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[23%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[15%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[28%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[16%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[23%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[15%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[28%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[16%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[23%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[15%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[28%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[16%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
						<div className="flex border-b">
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[23%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[10%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[15%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[28%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
							<div
								className="w-[16%] border-r py-1 text-center text-xs"
								contentEditable
							>
								&nbsp;
							</div>
						</div>
					</div>

					<div className="border-b border-x flex items-center justify-center text-xs p-2">
						<b>VI . OUTCOME OF TREATMENT</b>
					</div>
					<div className="border-b border-x flex p-2 gap-4 relative">
						<CheckBox label={`IMPROVED`} />
						<CheckBox label={`RECOVERED`} />
						<CheckBox label={`HAMA/DAMA`} />
						<CheckBox label={`EXPIRED`} />
						<CheckBox label={`ABSCONDED`} />
						<CheckBox label={`TRANSFERRED`} />
						<TextInput
							label={`Specify reason:`}
							labelClassName="whitespace-pre"
						/>
					</div>
					<div className="border border-black p-1 flex flex-col mt-2">
						<div className="flex items-center gap-1 text-xs">
							Certification of Attending Health Care Professional:
						</div>
						<p className="pl-11 py-6 text-xs text-center font-bold italic">
							I certify that the above information given in this
							form are true and correct
						</p>
						<div className="flex items-center justify-center pb-4 px-2 w-full">
							<UnderlineInput
								className="w-1/2"
								inputClassName="text-center"
								label="Signature over Printed Name of Attending Health Care Professional"
							/>
							<div className="flex items-center gap-2 ml-11 text-sm">
								<span className="text-xs">Date</span>
								<BoxInputGroup
									label="Month"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Day"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
								<b>-</b>
								<BoxInputGroup
									label="Year"
									labelClassName="italic"
								>
									<BoxInput />
									<BoxInput />
									<BoxInput />
									<BoxInput />
								</BoxInputGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default ClaimForm4
