import { Disclosure, Transition } from "@headlessui/react";
import FlatIcon from "./FlatIcon";
import ActionBtn from "./buttons/ActionBtn";

const CollapseDiv = ({
	title = "Title",
	children,
	headerClassName = "",
	bodyClassName = "",
	defaultOpen = false,
	
	
}) => {
	return (
		<Disclosure
			as={"div"}
			className=" border-b  border-gray-300 duration-200"
			defaultOpen={defaultOpen}
		>
			{({ open }) => (
				<>

				
					<Disclosure.Button
						as="div"
						className={`bg-background p-3 gap-2 text-base font-bold flex items-center cursor-pointer  ${
							!open && "bg-black"
						} ${headerClassName}`}

						
					>
						
						{title}
						<div className="flex items-center justify-center ml-auto text-gray-400 text-xs">
							
						<FlatIcon
										
										icon="fi fi-rr-menu-dots-vertical"
										className={`text-xl text-gray-500 duration-100  ${
											open ? "scale-0 duration-400" : ""
										} duration-200`}
									/>
									
						</div>
						
					</Disclosure.Button>

					<Transition
						show={open}
						enter="transition duration-300 ease-out"
						enterFrom="transform scale-100 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-200 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-100 opacity-0"
					>
						<Disclosure.Panel
							as="div"
							className={`p-3 ${bodyClassName} ` }
						>
							
							{children}
							
						</Disclosure.Panel>


				

					</Transition>
				</>
			)}
		</Disclosure>
	);
};

export default CollapseDiv;
