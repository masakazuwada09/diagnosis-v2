/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import useDataTable from "../../../../hooks/useDataTable";
import Img from "../../../../components/Img";
import {
	doctorName,
	doctorSpecialty,
	formatDateMMDDYYYY,
	formatDateMMDDYYYYHHIIA,
	patientFullName,
	patientAddress,
	keyByValue,
	dateMMDDYYYY
} from "../../../../libs/helpers";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import LaboratorySummary from "./LaboratorySummary";
import QRCode from "qrcode.react";
import ContentTitle from "../../../../components/buttons/ContentTitle";
import Pagination from "../../../../components/table/Pagination";
import Table from "../../../../components/table/Table";
import CreateLabOrderModal from "../../../../components/patient-modules/modals/CreateLabOrderModal";
import { useAuth } from "../../../../hooks/useAuth";
import useNoBugUseEffect from "../../../../hooks/useNoBugUseEffect";
import UploadLabResultModal from "../../../../components/patient-modules/modals/UploadLabResultModal";
import ViewLabResultModal from "../../../../components/patient-modules/modals/ViewLabResultModal";
import UploadCBCModal from "../../../../components/patient-modules/modals/UploadCBCModal";
import DeleteOrderModal from "../../../../components/patient-modules/modals/DeleteOrderModal";
import UploadOGTTModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadOGTTModal";
import UploadPregnancyTestModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadPregnancyTestModal";
import UploadFBSModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadFBSModal";
import UploadRBSModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadRBSModal";
import UploadCreatinineModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadCreatinineModal";
import UploadUricAcidModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadUricAcidModal";
import UploadSGOTModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadSGOTModal";
import UploadSGPTModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadSGPTModal";
import UploadAlkalinePhosModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadAlkalinePhosModal";
import UploadLDHModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadLDHModal";
import UploadGGTModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadGGTModal";
import UploadMagnesiumModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadMagnesiumModal";
import UploadPhosphurosModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadPhosphurosModal";
import UploadAmylaseModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadAmylaseModal";
import UploadCultureSensitiveInitialModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadCultureSensitiveInitialModal";
import UploadLipidProfileModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadLipidProfileModal";
import UploadElectrolytesModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadElectrolytesModal";
import UploadBilirubinModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadBilirubinModal";
import UploadTotalProteinModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadTotalProteinModal";
import UploadUreaModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadUreaModal";
import UploadUrineCreatinineClearanceModal from "../../../../components/patient-modules/modals/laboratory/chemistry/UploadUrineCreatinineClearanceModal";
import UploadCompleteBloodCountModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadCompleteBloodCountModal";
import UploadCuagulationStudiesModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadCuagulationStudiesModal";
import UploadDifferentialCountModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadDifferentialCountModal";
import UploadErythrocyteModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadErythrocyteModal";
import UploadPlateletCountModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadPlateletCountModal";
import UploadRedCellIndicesModal from "../../../../components/patient-modules/modals/laboratory/hematology/UploadRedCellIndicesModal";
import UploadReticulocyteCount from "../../../../components/patient-modules/modals/laboratory/hematology/UploadReticulocyteCount";
import UploadAFBStainModal from "../../../../components/patient-modules/modals/laboratory/microbiology/UploadAFBStainModal";
import UploadCultureSensitivityFinalModal from "../../../../components/patient-modules/modals/laboratory/microbiology/UploadCultureSensitivityFinalModal";
import UploadGramStainModal from "../../../../components/patient-modules/modals/laboratory/microbiology/UploadGramStainModal";
import UploadKOHModal from "../../../../components/patient-modules/modals/laboratory/microbiology/UploadKOHModal";
import UploadAscarisModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadAscarisModal";
import UploadEntamoebaColiCystModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadEntamoebaColiCystModal";
import UploadEntamoebaColiTrophozoiteModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadEntamoebaColiTrophozoiteModal";
import UploadEntamoebaHistolyticaCystModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadEntamoebaHistolyticaCystModal";
import UploadEntamoebaHistolyticaTrophozoiteModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadEntamoebaHistolyticaTrophozoiteModal";
import UploadFecalOccultBloodModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadFecalOccultBloodModal";
import UploadGiardiaLambliaCystModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadGiardiaLambliaCystModal";
import UploadGiardiaLambliaTrophozoiteModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadGiardiaLambliaTrophozoiteModal";
import UploadHookWormModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadHookWormModal";
import UploadMacroscopicModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadMacroscopicModal";
import UploadMicroscopicModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadMicroscopicModal";
import UploadTrichiurisModal from "../../../../components/patient-modules/modals/laboratory/microscopy/fecalysis/UploadTrichiurisModal";
import UploadCastsModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadCastsModal";
import UploadCrystalsModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadCrystalsModal";
import UploadChemicalExamModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadChemicalExamModal";
import UploadMacroscopicExamModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadMacroscopicExamModal";
import UploadMicroscopicExamModal from "../../../../components/patient-modules/modals/laboratory/microscopy/urine-examination/UploadMicroscopicExamModal";
import UploadAntiHBSModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadAntiHBSModal";
import UploadAntiHCVModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadAntiHCVModal";
import UploadASOModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadASOModal";
import UploadCKMBModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadCKMBModal";
import UploadCRPModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadCRPModal";
import UploadDengueDuoModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadDengueDuoModal";
import UploadHBsAgModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadHBsAgModal";
import UploadRheumatoidModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadRheumatoidModal";
import UploadSyphilisModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadSyphilisModal";
import UploadTroponinModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadTroponinModal";
import UploadTyphoidTestModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadTyphoidTestModal";
import UploadWidalTestModal from "../../../../components/patient-modules/modals/laboratory/serology/UploadWidalTestModal";
import UploadBloodTypingModal from "../../../../components/patient-modules/modals/laboratory/UploadBloodTypingModal";
import UploadCovidRapidTestModal from "../../../../components/patient-modules/modals/laboratory/UploadCovidRapidTestModal";
import UploadCrossMatchingModal from "../../../../components/patient-modules/modals/laboratory/UploadCrossMatchingModal";
import UploadMiscellaneousFormModal from "../../../../components/patient-modules/modals/laboratory/UploadMiscellaneousFormModal";
import TextInputField from "../../../../components/inputs/TextInputField";
import { useForm } from "react-hook-form";
import PrintLabResultModal from "../../../../components/patient-modules/modals/PrintLabResultModal";
import PrintAllLabResultModal from "../../../../components/patient-modules/modals/PrintAllLabResultModal";
import PrintReceipt from "./PrintReceipt";
import { useReactToPrint } from "react-to-print";
import PaymentTable from "./PaymentTable";
import TotalAmount from "./TotalAmount";
import { payment } from "../../../../libs/laboratoryOptions";
import PendingOrdersModal from "./modal/PendingOrdersModal";

const Status = ({ status }) => {
	const color = () => {
		switch (status) {
			case "pending":
				return " text-red-700";
			case "for-result-reading":
				return " text-blue-700";
			default:
				return " text-white";
		}
	};
	return (
		<span
			className={`${color()} px-2 italic text-center rounded-2xl text-xs py-[2px]`}
		>
			{status}
		</span>
	);
};

const LaboratoryOrders = (props) => {
	const {
		showTitle = true,
		appointment,
		patient,
		laboratory_test_type,
		allowCreate = true,
		onUploadLabResultSuccess,
		order_id,
	} = props;
	const {
		register,
		getValues,
		setValue,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { user } = useAuth();

	const componentRef = React.useRef(null);
	const [image, setImage] = useState(null);
	const pendingOrdersRef = useRef(null);
	const [order, setOrder] = useState(null);
	const [hasHematology, setHasHematology] = useState(0);
	const [hasPayment, setHasPayment] = useState();
	const [showData, setShowData] = useState(null);
	const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

	const isLaboratoryUser = () => {
		return user?.type == "RHU-XRAY" || user?.type == "DC-NURSE";
	};
	const isXrayUser = () => {
		return user?.type === "DC-NURSE";
	};
	const onPaymentChecked = () => {
		setHasPayment(getValues(payment.map(b => b.name)).filter(x => x).length);
	  };
	const testHeader = isXrayUser() ? "Imaging Test" : "Laboratory Test";
	const {
		page,
		setPage,
		meta,
		setMeta,
		loading,
		setLoading,
		paginate,
		setPaginate,
		data,
		setData,
		column,
		setColumn,
		direction,
		setDirection,
		filters,
		setFilters,
		reloadData,
	} = useDataTable
	({
		url: `/v1/doctor/laboratory-order/patient/${patient?.id}`, 
		defaultFilters: {
			...(order_id ? { order_id: order_id } : {}),
			...(laboratory_test_type
				? { laboratory_test_type: laboratory_test_type }
				: {}),
			...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
		},
	});
	useNoBugUseEffect({
		functions: () => {
			setFilters((prevFilters) => ({
				...prevFilters,

				order_id: order_id,
			}));
		},
	});
	const createLabOrderRef = useRef(null);
	const uploadLabResultRef = useRef(null);
	const printLabResultRef = useRef(null);
	const printLabReceiptRef = useRef(null);
	const printAllLabResultRef = useRef(null);
	//chemistry ref
	const uploadFBSRef = useRef(null);
	const uploadRBSRef = useRef(null);
	const uploadCreatinineRef = useRef(null);
	const uploadUricAcidRef = useRef(null);
	const uploadSGOTRef = useRef(null);
	const uploadSGPTRef = useRef(null);
	const uploadAlkalinePhosRef = useRef(null);
	const uploadLDHRef = useRef(null);
	const uploadGGTRef = useRef(null);
	const uploadMagnesiumRef = useRef(null);
	const uploadPhophorusRef = useRef(null);
	const uploadAmylaseRef = useRef(null);
	const uploadcultureInitialRef = useRef(null);
	const uploadLipidProfileRef = useRef(null);
	const uploadElectrolytesRef = useRef(null);
	const uploadBilirubinRef = useRef(null);
	const uploadTotalProteinRef = useRef(null);
	const uploadUreaRef = useRef(null);
	const uploadOralGlucoseRef = useRef(null);
	const uploadUrineCreatinineRef = useRef(null);
	// hematology ref
	const uploadCBCResultRef = useRef(null);
	const uploadCuagulationStudiesRef = useRef(null);
	const uploadDifferentialCountRef = useRef(null);
	const uploadErythrocyteRef = useRef(null);
	const uploadPlateletCountRef = useRef(null);
	const uploadRedcellInficesRef = useRef(null);
	const uploadReticulocyteRef = useRef(null);
	// microbiology ref
	const uploadAFBStainRef = useRef(null);
	const uploadCultureSensitivityFinalRef = useRef(null);
	const uploadGramStainRef = useRef(null);
	const uploadKOHRef = useRef(null);
	// microscopy ref
		// fecalysis ref
		const uploadAscarisRef = useRef(null);
		const uploadEntomoebaCystRef = useRef(null);
		const uploadEntomoebaTrophozoiteRef = useRef(null);
		const uploadFecalOccultRef = useRef(null);
		const uploadGiardiaCystRef = useRef(null);
		const uploadGiardiaTrophozoiteRef = useRef(null);
		const uploadHookwormRef = useRef(null);
		const uploadMacroscopicFecalysisRef = useRef(null);
		const uploadMicroscopicFecalysisRef = useRef(null);
		const uploadTrichiurisRef = useRef(null);
		const uploadEntamoebaHistolyticaCystRef = useRef(null);
		const uploadEntamoebaHistolyticaTrophozoiteRef = useRef(null);
		// urine ref
		const uploadCastsRef = useRef(null);
		const uploadChemicalRef = useRef(null);
		const uploadCrystalRef = useRef(null);
		const uploadMacroscopicUrineRef = useRef(null);
		const uploadMicroscopicUrineRef = useRef(null);
		const uploadPregnancyTestRef = useRef(null);
	// serology ref
	const uploadAntiHBSRef = useRef(null);
	const uploadAntiHCVRef = useRef(null);
	const uploadASORef = useRef(null);
	const uploadCKMBRef = useRef(null);
	const uploadCRPRef = useRef(null);
	const uploadDengueDuoRef = useRef(null);
	const uploadHBsAGRef = useRef(null);
	const uploadRheumatoidRef = useRef(null);
	const uploadSyphilisRef = useRef(null);
	const uploadTroponinRef = useRef(null);
	const uploadTyphoidRef = useRef(null);
	const uploadWidalTestRef = useRef(null);

	const uploadBloodTypeRef = useRef(null);
	const uploadCovidTestRef = useRef(null);
	const uploadCrossMatchingRef = useRef(null);
	const uploadMiscellaneousRef = useRef(null);


	const deleteLabOrderRef = useRef(null);
	const isDoctor = () => {
		return String(user?.type || "")
			.toLowerCase()
			.includes("doctor");
	};

	const renderResultCell = (data) => {
    if (data?.order_status === "pending") {
        if (isLaboratoryUser()) {
            const labModalRefs = {
				//Chemistry
                "FBS": uploadFBSRef,
                "RBS": uploadRBSRef,
                "Creatinine": uploadCreatinineRef,
                "Uric Acid": uploadUricAcidRef,
                "SGOT": uploadSGOTRef,
                "SGPT": uploadSGPTRef,
                "Alkaline Phos": uploadAlkalinePhosRef,
                "LDH": uploadLDHRef,
                "GGT": uploadGGTRef,
                "Magnesium": uploadMagnesiumRef,
                "Phophorus": uploadPhophorusRef,
                "Amylase": uploadAmylaseRef,
				"Culture and Sensitivity Initial Result": uploadcultureInitialRef,
                "Lipid Profile": uploadLipidProfileRef,
                "Electrolytes": uploadElectrolytesRef,
                "Bilirubin": uploadBilirubinRef,
                "Total Protein": uploadTotalProteinRef,
                "Urea": uploadUreaRef,
                "Oral Glucose Tolerance Test": uploadOralGlucoseRef,
                "24 Hours Urine Creatinine Clearance": uploadUrineCreatinineRef,
				//Hematology
				"CBC": uploadCBCResultRef,
                "Cuagulation Studies": uploadCuagulationStudiesRef,
                "Differential Count": uploadDifferentialCountRef,
                "Erythrocyte": uploadErythrocyteRef,
                "Platelet Count": uploadPlateletCountRef,
                "Red Cell Indices": uploadRedcellInficesRef,
				"Rerticulocyte Count": uploadReticulocyteRef,
				//Microbiology
				"AFB Stain": uploadAFBStainRef,
                "Culture Sensitivity Final Result": uploadCultureSensitivityFinalRef,
                "Gram Stain": uploadGramStainRef,
				"KOH": uploadKOHRef,
				//Microscopy
					//fecalysis
					"Ascaris Lumbricoides Ova": uploadAscarisRef,
					"Entamoeba Coli Cyst ": uploadEntomoebaCystRef,
					"Entamoeba Coli Trophozoite": uploadEntomoebaTrophozoiteRef,
					"Entamoeba Histolytica Cyst": uploadEntamoebaHistolyticaCystRef,
					"Entamoeba Histolytica Trophozoite": uploadEntamoebaHistolyticaTrophozoiteRef,
					"Fecal Occult Blood": uploadFecalOccultRef,
					"Giardia Lamblia Cyst": uploadGiardiaCystRef,
					"Giardia Lamblia Trophozoite": uploadGiardiaTrophozoiteRef,
					"Hookworm Ova": uploadHookwormRef,
					"Fecalysis Macroscopic Examination": uploadMacroscopicFecalysisRef,
					"Fecalysis Microscopic Examination": uploadMicroscopicFecalysisRef,
					"Trichiuris trichiura Ova": uploadTrichiurisRef,
					//Urine
					"Casts": uploadCastsRef,
					"Chemical Examination": uploadChemicalRef,
					"Crystal": uploadCrystalRef,
					"Urine Macroscopic Examination": uploadMacroscopicUrineRef,
					"Urine Microscopic Examination": uploadMicroscopicUrineRef,
					"Pregnancy Test": uploadPregnancyTestRef,
				//Serology
				"HBsAg (Hepatitis B Surface Antigen)": uploadHBsAGRef,
				"Anti - HBS": uploadAntiHBSRef,
				"Anti - HCV": uploadAntiHCVRef,
				"Syphilis (Rapid Test)": uploadSyphilisRef,
				"ASO (Antistreptolysin O Titer)": uploadASORef,
				"RA/RF (Rheumatoid Factor)": uploadRheumatoidRef,
				"CRP (C-Reactive Protein)": uploadCRPRef,
				"Troponin - I": uploadTroponinRef,
				"Dengue Duo": uploadDengueDuoRef,
				"Typhoid Test": uploadTyphoidRef,
				"Widal Test": uploadWidalTestRef,
				"CK - MB": uploadCKMBRef,

				"Blood Typing": uploadBloodTypeRef,
				"Covid-19 Rapid Test": uploadCovidTestRef,
				"Cross Matching": uploadCrossMatchingRef,
				"Miscellaneous Form": uploadMiscellaneousRef,
				
			};

    const modalRef = labModalRefs[data?.type?.name] || uploadLabResultRef;
            return (
                <span
                    className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                    onClick={() => modalRef.current.show(data)}
                >
                    <FlatIcon icon="rr-upload" />
                    {data?.type?.name === "CBC" || data?.type?.name === "RBS" || data?.type?.name === "FBS" ? "Add Result" : "Upload"}
					
                </span>
            );
        } else {
            return (
				<span
					className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
					onClick={() => printLabReceiptRef.current.show({...data, appointment})}
				>
					<FlatIcon icon="rs-document" />
					Print Result
				</span>
			);
        }
    } else if (data?.order_status === "pending") {
        return (
            <span
                className="text-blue-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 py-2 rounded-3xl gap-1"
                onClick={() => printLabResultRef.current.show({...data, appointment})}
            >
                <FlatIcon icon="rs-document" />
                View Result
            </span>
        );
    } else {
        return null;
    }
};
	return (
		<div
			className="bg-gray-600 p-1 w-[9.5in] gap-y-6 rounded-lg ">
				<div className="flex flex-row mt-2 mb-2 px-2 justify-between gap-2">
									{payment?.map((data, index) => (
											<tr
											key={`${keyByValue(data.label)}`}
											onClick={() => setTimeout(onPaymentChecked, 50)}
											>
											<td className="!py-0 align-middle ">
												<label className="mb-0 p-2 flex items-center text-sm gap-2 text-gray-100 cursor-pointer  hover:!text-gray-300 ">
												<input
													type="checkbox"
													className=""
													{...register(data.name, {})}
												/>
												<span>{data.label}</span>
												</label>
											</td>
											<td className="p-1">
												
											</td>
											</tr>
										))}

										 {hasPayment ? (
											<div className="flex flex-row gap-2 ">
													<ActionBtn
														className="font-bold transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-100 duration-300"
														onClick={handlePrint}
														type="success"
													>
														<FlatIcon icon="rr-print" className="text-sm mr-1	"/> Print
													</ActionBtn>
													

													<ActionBtn
														type="secondary"
														
														size=""
														onClick={() => {
															pendingOrdersRef.current.show(
																data
															);
														}}
														className="items-center transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-100 duration-300"
													>
														<FlatIcon
															className="text-sm mr-1	"
															icon="rr-right"
														/>
														<div className="flex flex-col text-left ">
															<span className="font-bold text-sm  ">
																Send Order
															</span>
														
														</div>
													</ActionBtn>
											</div>
														
													
														 ) : (
															<span
															  
															  size="sm"
															  loading={loading}
															  className="gap-4 px-6 py-2 bg-gray-700 rounded-md text-sm text-gray-800"
															  // onClick={handleSubmit(sendToInfectious)}
															>
															  
															  Check Payment
															</span>
														  )}
						
									</div>
	<div className="bg-white flex flex-col w-[9.3in] min-h-[14in]  border-gray-200 border-2 rounded-xl mx-auto px-2 py-2" id="phic-form-printable" ref={componentRef}>
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
				</div>
	


                <div className="flex flex-col px-12  -ml-20">
		<div>
			<PaymentTable
				className={`pb-1 text-xs mt-12`}
				loading={loading}
				columns={[
					{
						header: "Order Date",
						className: "text-center font-mono",
						tdClassName: "text-center ",
						key: "date",
						cell: (data) => {
							return formatDateMMDDYYYY(
								new Date(data?.order_date)
							);
						},
					},
					{
						header: testHeader,
						className: "text-center font-mono",
						tdClassName: "text-center",
						key: "type",
						cell: (data) => {
							return data?.type?.name;
						},
					},
					{
						header: "Laboratory Rate",
						className: "text-center font-mono",
						tdClassName: "text-center",
						key: "",
						cell: (data) => {patient?.room_credit}
					},
					
				]}
				data={data}
			/>
				</div>
				
				
				<div className="flex flex-row justify-start ml-[600px] w-[200px] mt-5">
				<TotalAmount
				className={``}
				loading={loading}
				columns={[
					
					{
						header: "TOTAL: ",
						className: "text-left",
						tdClassName: "text-left",
						// cell: (data) => {
						// 	return formatDateMMDDYYYY(
						// 		new Date(data?.order_date)
						// 	);
						// },
					},
					
					
					
				]}
				data={data}
			/>
				</div>
					</div>
				
				
								
									
										<div className="px-10 py-5 font-mono justify-center items-center">
										
										

										<div className="flex flex-col border-b-2 p-2 text-xs relative text-gray-500">
											<b>Terms and Conditions:</b>
											<div className="absolute">
												
											</div>
											<p className="text-xs ">
											<b>1. Payment:</b> Payment is due at the time of service unless prior arrangements are made.
											</p>
											<p className="text-xs">
											<b>2. Results:</b> Test results will be provided as specified, typically within [X] days.
											</p>
											<p className="text-xs">
											<b>3. Accuracy:</b> We ensure the accuracy of tests; however, results should be interpreted by a healthcare provider.
											</p>
											<p className="text-xs">
											<b>4. Confidentiality:</b> All patient information is kept confidential according to HIPAA regulations.
											</p>
											<p className="text-xs">
											<b>5. Re-tests:</b> Additional tests may be required if initial results are inconclusive.
											</p>
											<p className="text-xs">
											<b>6. Cancellation:</b> Appointments must be canceled at least [X] hours in advance.
											</p>
											<p className="text-xs">
											<b>7. Liability:</b> The lab is not responsible for any delays caused by external factors.
											</p>
											
											
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
									<div>
									</div>
									

									<PendingOrdersModal
											pendingOrdersRef={pendingOrdersRef}
											
											patient={
												patient
											}
											laboratory_test_type={
												2
											}
											appointment={
												showData
											}
											allowCreate={
												true
											}
											ref={pendingOrdersRef} />
											
									</div>
									
		
	);
};

export default LaboratoryOrders;
