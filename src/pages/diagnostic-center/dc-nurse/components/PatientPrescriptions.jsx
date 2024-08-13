/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import useDataTable from "../../../../hooks/useDataTable";
import { formatDateMMDDYYYYHHIIA } from "../../../../libs/helpers";
import FlatIcon from "../../../../components/FlatIcon";
import ActionBtn from "../../../../components/buttons/ActionBtn";
import ContentTitle from "../../../../components/buttons/ContentTitle";
import Pagination from "../../../../components/table/Pagination";
import Table from "../../../../components/table/Table";
import CreatePrescriptionModal from "../../../../components/patient-modules/modals/CreatePrescriptionModal";
import SelectItemModal from "../../../../components/modal/SelectItemModal";

const PatientPrescriptions = ({
	appointment: propAppointment,
	forCashier = false,
	forBilling = false,
	forHousekeeping = false,
	setOrder,
	hideServices = false,
	mutateAll,
	
},props) => {
	const { patient, allowCreate } = props;
    const [appointment, setAppointment] = useState(propAppointment);
	const { user } = useAuth();
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
	} = useDataTable({
		url: `/v1/clinic/patient-prescription/${patient?.id}`,
	});
	const createPrescriptionRef = useRef(null);
	const selecItemRef = useRef(null);

	return (
		<div className="flex flex-col items-start">
			<ContentTitle title="Patient Prescriptions">
				{user?.type == "DC-NURSE" ? (
					<ActionBtn
						className="px-4 rounded-xl"
						size="sm"
						type="success"
						onClick={() => {
							createPrescriptionRef.current.show(patient);
							// setUpdate(true);
						}}
					>
						<FlatIcon icon="rr-edit" className="mr-1" />
						Create prescription
					</ActionBtn>
				) : (
					""
				)}
			</ContentTitle>
			<Table
				className={`pb-2`}
				loading={loading}
				columns={[
					{
						header: "Date and time",
						className: "text-left",
						tdClassName: "text-left",
						key: "date",
						cell: (data) => {
							return formatDateMMDDYYYYHHIIA(
								new Date(data?.created_at)
							);
						},
					},
					{
						header: "Doctor",
						className: "text-left",
						tdClassName: "text-left",
						key: "doctor",
						cell: (data) => {
							return data?.doctor?.name;
						},
					},
					{
						header: "Status",
						className: "text-left",
						tdClassName: "text-left",
						key: "status",
					},
					{
						header: "Action",
						className: "",
						tdClassName: "text-center flex items-center",
						key: "action",
						cell: (data) => {
							return (
								<div className="w-full flex items-center">
									<ActionBtn className="!w-11 mx-auto">
										<FlatIcon icon="rr-eye" />
									</ActionBtn>
								</div>
							);
						},
					},
				]}
				data={data}
			/>
			<Pagination
				page={page}
				setPage={setPage}
				pageCount={meta?.last_page}
				pageSize={paginate}
				setPageSize={setPaginate}
			/>
			<CreatePrescriptionModal
            data={data}
				ref={createPrescriptionRef}
                patient={appointment?.patient}
				selecItemRef={selecItemRef}
			/>
			<SelectItemModal ref={selecItemRef} />
		</div>
	);
};

export default PatientPrescriptions;
