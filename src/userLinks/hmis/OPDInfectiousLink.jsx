import React from 'react'
import MenuLink from '../../components/buttons/MenuLink'
// import useERQueue from '../../hooks/useERQueue';
import useERInfectious from '../../hooks/useERInfectious';

const OPDInfectiousLink = ({isActive}) => {
    const { pending, pendingForRelease } = useERInfectious();
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
				to="/opdinfectious-queue"
				active={isActive("/opdinfectious-queue")}
				icon="rr-clipboard-list-check"
				text="Infectious Patient Queue"
				counter={
					parseInt(pending?.data?.length || 0) +
					parseInt(pendingForRelease?.data?.length || 0)
				}
			/>
			{/* <MenuLink
				to="/inventory"
				active={isActive("/inventory")}
				icon="rr-clipboard-list-check"
				text="Inventory"
			/>  */}
	</>
  )
}

export default OPDInfectiousLink
