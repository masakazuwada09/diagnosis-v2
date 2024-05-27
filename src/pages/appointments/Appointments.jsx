import { useEffect, useRef, useState } from "react";
import FlatIcon from "../../components/FlatIcon";
import LayoutContainer from "../../components/container/LayoutContainer";
import Header from "../../components/layout/Header";
import AppLayout from "../../components/container/AppLayout";
import PageHeader from "../../components/layout/PageHeader";
import TextInput from "../../components/inputs/TextInput";
import Img from "../../components/Img";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ActionBtn from "../../components/buttons/ActionBtn";
import NewAppointmentModal from "../../components/modal/NewAppointmentModal";
import Axios from "../../libs/axios";
import { useAuth } from "../../hooks/useAuth";
import ShowAppointmentModal from "../../components/modal/ShowAppointmentModal";
import { dateMMDDYYYY } from "../../libs/helpers";

const localizer = momentLocalizer(moment);
const Appointments = () => {
	const { user } = useAuth();
	const newAppointmentRef = useRef(null);
	const showAppointmentModal = useRef(null);

	const [view, setView] = useState("day"); // Default view is monthly
	const [appointments, setAppointments] = useState([]); // Default view is monthly

	const views = ["month", "week", "day"];
	useEffect(() => {
		let t = setTimeout(() => {
			getAppointments();
		}, 200);
		return () => {
			clearTimeout(t);
		};
	}, [user?.id]);

	const handleViewChange = (newView) => {
		setView(newView);
	};

	const getAppointments = () => {
		Axios.get(`v1/telemedicine/all-schedules?date=${dateMMDDYYYY()}`).then(
			(res) => {
				setAppointments(res.data.data);
			}
		);
	};

	return (
		<AppLayout>
			<PageHeader title="Appointments" icon="rr-clipboard-user">
				<div className="ml-auto">
					<ActionBtn
						className="gap-2"
						onClick={() => {
							newAppointmentRef.current.show();
						}}
					>
						<FlatIcon icon="rr-square-plus" /> New appointment
					</ActionBtn>
				</div>
			</PageHeader>
			<div className="container mx-auto p-5">
				<div className="h-[calc(100dvh-188px)]">
					<Calendar
						key={`views-${view}`}
						localizer={localizer}
						onSelectEvent={(event) => {
							console.log("onSelectEvent", event);
							showAppointmentModal.current.show(
								event?.appointment
							);
						}}
						min={
							new Date(
								new Date().getFullYear(),
								new Date().getMonth(),
								new Date().getDate(),
								8
							)
						}
						events={appointments?.map((appointment) => {
							let date = `${appointment?.date}, ${String(
								appointment?.slot?.start_time
							).substring(0, 5)} ${String(
								appointment?.slot?.start_time
							).substring(5, 7)}`;
							return {
								appointment: appointment,
								title: `Virtual consultation PATIENT: ${appointment?.patient?.firstname} ${appointment?.patient?.lastname}`,
								start: moment(date).toDate(),
								end: moment(date).add(30, "minute").toDate(),
							};
						})}
						// 	[
						// 	{
						// 		title: "Virtual Consulation with JANE DOE",
						// 		start: moment(
						// 			"10/20/2023, 8:30:00 AM"
						// 		).toDate(),
						// 		end: moment("10/20/2023, 8:30:00 AM")
						// 			.add(30, "minute")
						// 			.toDate(),
						// 	},
						// 	{
						// 		title: "Virtual Consulation with JANE DOE",
						// 		start: moment(
						// 			"10/20/2023, 8:30:00 AM"
						// 		).toDate(),
						// 		end: moment("10/20/2023, 8:30:00 AM")
						// 			.add(30, "minute")
						// 			.toDate(),
						// 	},
						// ]} // Add your events here
						startAccessor="start"
						endAccessor="end"
						defaultView={view}
						step={30}
						timeslots={1}
						views={views}
					/>
				</div>
			</div>
			<NewAppointmentModal ref={newAppointmentRef} />
			<ShowAppointmentModal ref={showAppointmentModal} />
		</AppLayout>
	);
};

export default Appointments;
