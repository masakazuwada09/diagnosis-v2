/* eslint-disable react/prop-types */
import MenuLink from '../../components/buttons/MenuLink'
import useAnesthesiaQueue from '../../hooks/useAnesthesiaQueue';
import useQueue from '../../hooks/useQueue';

const HISNurseLink = ({isActive}) => {
const { operatingRoom, pendingForRelease } = useAnesthesiaQueue();
    return (
    <>
			<span className="text-xs font-light text-white	pt-3 pb-1 px-2 w-full border-t border-t-black border-opacity-10">
				Main Menu
			</span>
			<MenuLink
				to={``}
				active={isActive(``)}
				icon="rr-dashboard"
				text="Dashboard"
			/>
			<MenuLink
				to="/patients"
				active={isActive("/patients")}
				icon="rr-users"
				text="Patients"
			/>
			{/* <MenuLink
				to="/telemedicine"
				active={isActive("/telemedicine")}
				icon="rr-wifi"
				text="TeleMedicine"
			/> */}
			<MenuLink
				to="/patient-anesthesia-queue"
				active={isActive("/patient-anesthesia-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={operatingRoom?.data?.length}
			/> 
			<MenuLink
				to="/inventory"
				active={isActive("/inventory")}
				icon="rr-clipboard-list-check"
				text="Inventory"
			/> 
		</>
  )
}

export default HISNurseLink
