import { Link } from "react-router-dom";
import FlatIcon from "../FlatIcon";
import { useAuth } from "../../hooks/useAuth";
import ActionBtn from "../buttons/ActionBtn";
import Img from "../Img";
import ReferralsListModal from "../modal/ReferralsListModal";
import { useEffect, useState, useRef } from "react";
import useClinic from "../../hooks/useClinic";
import AcceptPatientModal from "../modal/AcceptPatientModal";
import UpdatePatientVitalsModal from "../modal/UpdatePatientVitalsModal";
import CloudServerModal from "../modal/CloudServerModal";
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import {ChevronRightIcon , PhoneIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import ConfirmLogoutModal from "../modal/ConfirmLogoutModal";
import MenuLink from "../buttons/MenuLink";
import {
	ArrowPathIcon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
  } from '@heroicons/react/24/outline'



const Header = (props) => {
	const { setSidebarOpen, sidebarOpen } = props;
	const {  checkUserType } = useAuth();
	const { data } = useClinic();
	const referralListRef = useRef(null);
	const updateVitalRef = useRef(null);
	const acceptPatientRef = useRef(null);
	const confirmLogoutRef = useRef(null);
	const cloudServerRef = useRef(null);
	const { user, logout } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/",
	});
	if (user) {
		console.log("datadatadatuser", user);
	}

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const trigger = useRef(null);
	const dropdown = useRef(null);


	 const solutions = [
	
	  ]
	  const callsToAction = [
		{ name: 'Account Settings', href: '#', icon: PlayCircleIcon },
		{ name: 'Logout', href: '#', icon: PhoneIcon },
	  ]

	
	  const isActive = (name) => {
        if (name == "") {
            return location?.pathname == `/${String(user?.type).toLowerCase()}`;
        }
        return location?.pathname?.includes(name);
    };
	const toRHUword = (str) => {
		return str?.replace("RHU", "Rural Health Unit");
	};
	const updatePatientVital = (patient) => {
		updateVitalRef.current.show(patient);
	};


	
		
	  
		// close on click outside
		useEffect(() => {
		  const clickHandler = ({ target }) => {
			if (!dropdown.current) return;
			if (
			  !dropdownOpen ||
			  dropdown.current.contains(target) ||
			  trigger.current.contains(target)
			)
			  return;
			setDropdownOpen(false);
		  };

		  document.addEventListener("click", clickHandler);
		  return () => document.removeEventListener("click", clickHandler);
		});
	  
		// close if the esc key is pressed
		useEffect(() => {
		  const keyHandler = ({ keyCode }) => {
			if (!dropdownOpen || keyCode !== 27) return;
			setDropdownOpen(false);
		  };
		  document.addEventListener("keydown", keyHandler);
		  return () => document.removeEventListener("keydown", keyHandler);
		});

		useEffect(() => {
			const savedTheme = localStorage.getItem("theme");
			const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
	
			if (savedTheme) {
				document.documentElement.classList.toggle("dark", savedTheme === "dark");
			} else {
				document.documentElement.classList.toggle("dark", prefersDarkScheme);
			}
		}, []);


{/*Theme*/}


const toggleTheme = () => {
	const isDarkMode = document.documentElement.classList.toggle("dark");
	localStorage.setItem("theme", isDarkMode ? "dark" : "light");
};



	return (
		<>
			<div className="flex ">
				<div className=" h-full w-full dark:!bg-blue-500 duration-500 dark:text-white z-10  duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.10)] border-b">
					<div className="flex gap-2 w-full justify-between px-5">
						<div className="flex flex-row">
						
							<div
							className={`text-gray-600 dark:!text-white text-xl cursor-pointer ${
								sidebarOpen ? "" : "-left-[47px] -top-[-15px] absolute opacity-90  "
								  }`}
								  onClick={() => {
									setSidebarOpen((prevVal) => !prevVal);	
								}}
							>
								<FlatIcon

									icon="fi fi-rr-apps"
								
								/>
								
								
							</div>
							<span
								className="dark:!text-white text-gray-500 font-bold text-md font-mono flex items-center "
							>
								
								{user?.type}
							</span>
							{checkUserType("nurse") ? (
							<>
								<div
									className="ml-4 flex items-center gap-2 mr-2 px-3 mt-2 mb-2 text-sm font-light dark:!text-white text-gray-700 hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer  rounded-xl border border-gray-500 dark:!border-white border-opacity-20 dark:!border-opacity-20"
									onClick={() => {
										cloudServerRef.current.show();
									}}
								>
									<FlatIcon
										icon="rr-network-cloud"
										className="text-base"
									/>
									<span className="hidden lg:block">
										Cloud Server
									</span>
								</div>
								<div
									className="ml-4 flex items-center gap-2 mr-2 px-3 mt-2 mb-2 text-sm font-light dark:!text-white text-gray-700 hover:bg-blue-900 hover:bg-opacity-20 cursor-pointer  rounded-xl border border-gray-500 dark:!border-white border-opacity-20 dark:!border-opacity-20"
									onClick={() => {
										referralListRef.current.show();
									}}
								>
									<FlatIcon icon="rr-bells" />
									Patient Referrals
									{data?.referrals?.length ? (
										<div className="relative">
											<span className="bg-red-600 animate-ping absolute text-white w-full h-full rounded-full z-10"></span>
											<span className="bg-red-600 text-white z-20 px-2 rounded-full">
												{data?.referrals?.length}
											</span>
										</div>
									) : (
										""
									)}
								</div>
							</>
						) : (
							""
						)}
						
						</div>


			
		


	<section className="flex flex-row gap-3">
	<button onclick="(() => document.body.classList.toggle('dark'))()"
        class="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg class="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>
	<button
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
			
              className=" mb-1 inline-flex items-center justify-center gap-2  rounded-3xl text-base font-medium text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            	>
             
              <span
                className={`duration-100 ${dropdownOpen ? " duration-200" : " duration-300"}`}
              >
                
				<Img
									src={user?.avatar}   // PROFILE AVATAR
									type="user"
									name={user?.name}
									className="h-10 w-10 rounded-full"
									
								/>		
              </span>
            </button>	
      <div className="container">
        <div className="flex justify-center ">
			
          <div className="flex ">
					
		  			
		  
		<button 
		onClick={toggleTheme}
		className=" text-slate-200 dark:text-blue-100 px-3 py-0  rounded-full hover:text-cyan-400 text-2xl">
					
	<label class="relative cursor-pointer">
      <input type="checkbox" onClick={toggleTheme} class="sr-only peer" />
      <div
        class="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:right-[22px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
      </div>
    </label>

	</button>

           

						



            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              className={` absolute right-24 top-full w-[240px] border-slate-200 divide-y divide-stroke overflow-hidden rounded-b-lg  bg-white dark:!bg-blue-500 shadow-lg  text-gray-600 dark:divide-dark-3 dark:bg-dark-2 ${dropdownOpen ? "block" : "hidden "}`}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="relative aspect-square w-10 rounded-full">
				<Img
									src={user?.avatar}   // PROFILE AVATAR
									type="user"
									name={user?.name}
									className="h-30 w-20 rounded-lg"
								/>
                  <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-dark"></span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600  dark:text-white">
				  {user?.name}
                  </p>
                  <p className="text-sm text-body-color dark:text-white ">
				  {user?.type}
                  </p>
                </div>
              </div>
              <div>
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  View profile
                </a>
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Settings
                </a>
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Keyboard shortcuts
                  <span className="text-xs text-dark-5"> ⌘K </span>
                </a>
              </div>
              <div>
               
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Team
                </a>
                
              </div>
              <div>
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Changelog
                </a>
                
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  Support
                </a>
                <a
                  href="#0"
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600  hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                >
                  API
                </a>
              </div>
              <div>
			  <MenuLink

to="/logout"
active={isActive("/logout")}
onClick={async (e) => {
	await e.preventDefault();
	await e.stopPropagation();
	// await logout();
	confirmLogoutRef.current.show();
}}
icon="rr-sign-out-alt"
text="Logout"
/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


	






						{/* <div className="mb- flex ml-4 justify-center items-center bg-primary-dark bg-opacity-10 py-4">
							<Img
								src={user?.avatar}
								type="user"
								name={user?.name}
								className="h-10 w-10 rounded border border-white"
							/>
							 
						</div> 

						{/* <div className="ml-4 flex items-center gap-2 text-white cursor-pointer ">
						<ActionBtn
							type="foreground"
							onClick={logout}
							className="gap-2 bg-opacity-10 !text-blue-100 text- rounded-xl"
						>
							Logout
							<FlatIcon icon="rr-sign-out-alt" />
						</ActionBtn>
					</div> */}
					</div>
				</div>
			</div>
			<ReferralsListModal
				ref={referralListRef}
				acceptPatientRef={acceptPatientRef}
				updatePatientVital={updatePatientVital}
			/>
			<AcceptPatientModal ref={acceptPatientRef} />
			<ConfirmLogoutModal logout={logout} ref={confirmLogoutRef} />
			<UpdatePatientVitalsModal ref={updateVitalRef} />
			<CloudServerModal staticModal={false} ref={cloudServerRef} />
		</>
	);
};

export default Header;
