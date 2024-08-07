import React, { useState, useRef } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import FlatIcon from '../../../../components/FlatIcon';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import InfoTextForPrint from '../../../../components/InfoTextForPrint';
import { dateToday, patientFullName, keyByValue, formatDateMMDDYYYYHHIIA } from '../../../../libs/helpers';
import useHousekeepingQueue from '../../../../hooks/useHousekeepingQueue';
import { Controller, useForm } from 'react-hook-form';
import TextInputField from '../../../../components/inputs/TextInputField';
import { Bed, Restroom } from "../../../../libs/housekeeping";

const Housekeeping = (props) => {
  const { loading: patient, btnLoading, appointment, onSave } = props;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasBed, setHasBed] = useState();

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isForResultReading = () => {
    return appointment.status === "in-service-result-reading" || appointment.has_for_reading?.length;
  };

  const onBedChecked = () => {
    setHasBed(getValues(Bed.map(b => b.name)).filter(x => x).length);
  };

  useNoBugUseEffect({
    functions: () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    },
    params: [appointment],
  });

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const housekeepingApproval = (data) => {
		setLoading(true);
		let formdata = new FormData();
		formdata.append("rhu_id", data?.rhu_id);
		formdata.append("_method", "PATCH");
		
		Axios.post(
			`v1/clinic/send-from-housekeeping-to-cashier/${appointment?.id}`,
			formdata
		)
			.then((response) => {
				let data = response.data;
				// console.log(data);
				if (mutateAll) {
					mutateAll();
				}
				setTimeout(() => {
					setAppointment(null);
				}, 100);
				setTimeout(() => {
					toast.success("Patient sent to Cashier!");
					setLoading(false);
				}, 200);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

  return (
    <div
      className={`flex flex-col border p-1 rounded-xl ${
        isForResultReading() ? "bg-orange-50 border-orange-100" : "bg-green-50 border-blue-100"
      }`}
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x">
        <div className="flex flex-col justify-center items-center">
          <span className="font-light text-sm text-slate-600 mb-1">Patient</span>
          <h2
            className={`text-3xl tracking-tight text-center font-bold ${
              isForResultReading() ? "text-indigo-600" : "text-success"
            } -mb-1`}
          >
            {`#${appointment.id} - ${patientFullName(appointment.patient)}`}
         
          
          </h2>
          <span className="font-light text-sm text-slate-600 mb-1">Room No</span>
          <h2
            className={`text-3xl font-bold ${
              isForResultReading() ? "text-indigo-600" : "text-success"
            } -mb-1`}
          >
            {appointment?.room_number}
          </h2>
        </div>
        <div className="grid grid-cols-1">
          <div className="m-2 w-full px-5 pt-5 text-md">
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Date"
              value={formatDateMMDDYYYYHHIIA(
                new Date(appointment.created_at)
              )}
            />
            <InfoTextForPrint
              contentClassName="text-sm mt-2"
              title="Room"
              value={appointment.room_number}
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Philhealth no."
              value={appointment?.patient?.philhealth}
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Account No."
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Contact No."
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Ward"
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="OR Number"
              value=""
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="Amount"
            />
            <InfoTextForPrint
              contentClassName="text-sm"
              title="CERTIFIED CORRECT BY"
              value={user?.name}
            />
          </div>
          <div className="mt-8 mr-4 px-5"></div>
        </div>
        <div className="grid grid-cols-2">
          <div className="mt-4 ml-4"></div>
        </div>
        <div className="flex flex-col justify-center items-center"></div>
      </div>

      <h4 className="border-y-2 text-base font-bold p-2 mb-4">Patient's Bed</h4>

      <div className="lg:col-span-12">
        <div className="table table-bordered w-full">
          <table className="bordered">
            <thead>
              <tr>
                <th className="w-1/5">Click if Bed has issues</th>
                <th className="flex justify-center">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {Bed?.map((data, index) => (
                <tr
                  key={`${keyByValue(data.label)}`}
                  onClick={() => setTimeout(onBedChecked, 50)}
                >
                  <td className="!py-0 align-middle">
                    <label className="mb-0 p-2 flex items-center text-sm gap-2 text-gray-600 cursor-pointer hover:!text-blue-600">
                      <input
                        type="checkbox"
                        {...register(data.name, {})}
                      />
                      <span>{data.label}</span>
                    </label>
                  </td>
                  <td className="p-1">
                    <TextInputField
                      inputClassName="bg-white"
                      placeholder={`${data.label} details...`}
                      disabled={!watch(data.name)}
                      {...register(`${data.name}_details`, {})}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-4 flex items-center justify-end bg-slate- border-t">
        {hasBed ? (
          
          <ActionBtn
          type="success"
          className="ml-2"
          loading={btnLoading}
          onClick={handleSave}
        >
          <FlatIcon icon="rr-check" />
          Approve for Cashier
        </ActionBtn>

        ) : (
          <span
            
            size="sm"
            loading={loading}
            className="gap-4 px-6 bg-gray-100 text-slate-600"
            // onClick={handleSubmit(sendToInfectious)}
          >
            
            Check listed items
          </span>
        )}
      </div>

      <span className="border-b pb-4 mb-4"></span>
    </div>
  );
};

export default Housekeeping;
