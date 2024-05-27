import React from 'react'
import useAnesthesiaQueue from '../../hooks/useAnesthesiaQueue';
import MenuLink from '../../components/buttons/MenuLink';

const HISAnesthesiaMonitorLink = ({isActive}) => {
    const { waitingRoom, operatingRoom, resu, done } = useAnesthesiaQueue();
  return (
   <>
			<MenuLink
				to="/patient-monitoring"
				active={isActive("/patient-monitoring")}
				icon="rr-clipboard-list-check"
				text="Patient Queue"
				counter={waitingRoom?.data?.length}
			/> 
		</>
  )
}

export default HISAnesthesiaMonitorLink
