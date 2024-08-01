import React from "react";
import ActionBtn from "../../../../../../components/buttons/ActionBtn";
import FlatIcon from "../../../../../../components/FlatIcon";

export default function Final({ appointment, releasePrescription }) {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-teal-700">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your Patient has been Released.
        </div>
        <a className="mt-10" href="">
        <ActionBtn
				className="px-4 !rounded-2xl w-full mx-auto mt-5"
				type="teal"
				onClick={releasePrescription}
			>
				<FlatIcon icon="rr-check" className="mr-2 text-xl" />
				Release Patient
			</ActionBtn>
          {/* <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Close
          </button> */}
        </a>
      </div>
    </div>
  );
}
