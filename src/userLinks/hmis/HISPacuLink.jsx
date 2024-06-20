import React from 'react'
import MenuLink from '../../components/buttons/MenuLink';
import useLabQueue from '../../hooks/useLabQueue';
import useAnesthesiaQueue from '../../hooks/useAnesthesiaQueue';

const HISPacuLink = ({isActive}) => {
const { waitingRoom, operatingRoom, resu, done } = useAnesthesiaQueue();
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
			<MenuLink
				to="/pacu-queue"
				active={isActive("/pacu-queue")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={
					// waitingRoom?.data?.length
					parseInt(waitingRoom?.data?.length || 0) +
					parseInt(operatingRoom?.data?.length || 0)+
					parseInt(resu?.data?.length || 0)+
					parseInt(done?.data?.length || 0)
				}
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

export default HISPacuLink
