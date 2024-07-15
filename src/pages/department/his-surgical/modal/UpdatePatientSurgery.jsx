/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-refresh/only-export-components */

import React, { Fragment, forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import ActionBtn from '../../../../components/buttons/ActionBtn';
import { Controller, useForm } from 'react-hook-form';
import useNoBugUseEffect from '../../../../hooks/useNoBugUseEffect';
import Axios from '../../../../libs/axios';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import ReactSelectInputField from '../../../../components/inputs/ReactSelectInputField';
import ReactQuillField from '../../../../components/inputs/ReactQuillField';
import TextInputField from '../../../../components/inputs/TextInputField';
import { patientFullName } from '../../../../libs/helpers';
import FlatIcon from '../../../../components/FlatIcon';
import axios from 'axios';
import NewAppointmentModal from '../../../../components/modal/NewAppointmentModal';
import AppointmentChoiceModal from '../../../patients/components/AppointmentChoiceModal';
import PrivacyPolicyModal from '../../../../components/modal/PrivacyPolicyModal';
import CreateEmergencyCareModal from '../../../hims/his-er/modal/CreateEmergencyCareModal';
import AddPatientForDeliveryModal from '../../his-anesthesia/components/modal/AddPatientForDeliveryModal';
import AddPatientOperation from '../../his-anesthesia/components/modal/AddPatientOperation';
import ProcedureChoiceModal from './ProcedureChoiceModal';
import CreateAppointmentsModal from '../../../patients/components/CreateAppointmentsModal';

const UpdatePatientSurgery = (props, ref) => {
  const { patient, onSuccess } = props;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showData, setShowData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState(null);
  const [loading, setLoading] = useState(false);
  const createAppointmentRef = useRef(null);
  const privacyRef = useRef(null);
  const referToRHURef = useRef(null);
  const appointmentChoiceRef = useRef(null);
  const ERCareChoiceRef = useRef(null);
  const bookTeleMedicineRef = useRef(null);
  const operationProcedureRef = useRef(null);
  const operationDeliveryRef = useRef(null);
  const procedureChoiceRef = useRef(null);
  const [patientSelfie, setPatientSelfie] = useState(null);

  useNoBugUseEffect({
    functions: () => {},
  });

  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
  }));

  const show = (data) => {
    setShowData(data);
    setModalOpen(true);
    getOperationProcedure(data);
  };

  const hide = () => {
    setModalOpen(false);
  };

  const submit = (data) => {
    setSaving(true);
    const operationNotesPlainText = data?.operation_notes.replace(/<[^>]+>/g, '');
    let formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("operation_status", data?.operation_status);
    formData.append("operation_notes", operationNotesPlainText);
    Axios.post(`v1/anesthesia/operation-procedure/update/${showData?.id}`, formData)
      .then((res) => {
        if (onSuccess) onSuccess();
        setTimeout(() => {
          setLoading(false);
          toast.success("Surgery Procedure updated successfully!");
          if (data?.operation_status === "For Discharge") {
            // Add necessary mutation functions here
          }
        }, 400);
        hide();
      })
      .catch((error) => {
        console.error("Error updating operation procedure:", error);
        toast.error("Error updating operation procedure.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const getOperationProcedure = (operationData) => {
    Axios.get(`v1/anesthesia/operation-procedure/updated-procedure/${operationData?.id}`)
      .then((res) => {
        const responseData = res.data.data;
        if (responseData) {
          setOperation(responseData);
          setValue("operation_status", responseData?.operation_status);
          setValue("operation_notes", responseData?.operation_notes);
        } else {
          console.error("No data found for the operation procedure.");
        }
      })
      .catch((error) => {
        console.error("Error fetching operation procedure:", error);
      });
  };

  const getStatusOptions = (currentStatus) => {
    const options = [
      { label: "Surgery Room", value: "Surgery Room" },
      { label: "RESU", value: "RESU" },
      { label: "DONE", value: "DONE" },
      { label: "For Discharge", value: "For Discharge" },
      { label: "ICU", value: "ICU" },
      { label: "PACU", value: "PACU" },
    ];

    switch (currentStatus) {
      case "Surgery Room":
        return options.filter(opt => ["RESU", "DONE"].includes(opt.value));
      case "RESU":
        return options.filter(opt => ["Surgery Room", "DONE"].includes(opt.value));
      case "DONE":
        return options.filter(opt => ["For Discharge", "ICU", "PACU"].includes(opt.value));
      default:
        return [];
    }
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" className="" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur z-[300]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto !z-[350]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full lg:max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="p-4 font-medium leading-6 flex flex-col items-start text-gray-900 bg-slate-50 border-b"
                >
                  <span className="text-xl text-center font-bold text-blue-900">
                    Operating Procedure
                  </span>
                </Dialog.Title>
                <div className="p-6 flex flex-col gap-y-4 relative">
                  <div className="flex items-center gap-16 mb-2">
                    <span className="text-base">Procedure ID:</span>
                    <span className="font-bold text-sm text-slate-700 italic ml-16">
                      {showData?.operation_number}
                    </span>
                  </div>
                  <div className="flex items-center gap-16 mb-2">
                    <span className="text-base">Procedure:</span>
                    <span className="font-bold text-base text-red-800 ml-20">
                      {showData?.procedure}
                    </span>
                  </div>
                  <div className="flex items-center gap-16 mb-2">
                    <span className="text-base">Fullname</span>
                    <span className="font-bold text-sm text-slate-700 italic ml-24">
                      {patientFullName(showData?.relationships?.patient)}
                    </span>
                  </div>
                  <div className="flex items-center gap-16 mb-2">
                    <span className="text-base">Date:</span>
                    <span className="font-bold text-sm text-slate-700 italic ml-32">
                      <TextInputField
                        type="date"
                        className="focus:outline-none focus:border-blue-500"
                        value={showData?.operation_date}
                        onChange={(e) => setShowData({ ...showData, operation_date: e.target.value })}
                      />
                    </span>
                  </div>
                  <div className="flex items-center gap-16 mb-2">
                    <span className="text-base">Time:</span>
                    <span className="font-bold text-sm text-slate-700 italic ml-32">
                      <TextInputField
                        type="time"
                        className="focus:outline-none focus:border-blue-500"
                        value={showData?.operation_time}
                        onChange={(e) => setShowData({ ...showData, operation_time: e.target.value })}
                      />
                    </span>
                  </div>
                  <Controller
                    name="operation_notes"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    render={({ field }) => (
                      <ReactQuillField
                        name={field.name}
                        error={errors.operation_notes}
                        label="Notes"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="px-4 py-4 border-t flex items-center justify-end bg-slate-">
                  <ActionBtn
                    type="danger"
                    className="px-5 mr-auto"
                    onClick={hide}
                  >
                    CLOSE
                  </ActionBtn>
                  <ActionBtn
                    type="secondary"
                    className="ml-auto h-14 !rounded-[30px] font-medium gap-2 px-4"
                    onClick={() => {
                      procedureChoiceRef.current.show();
                    }}
                  >
                    <FlatIcon icon="bs-add-folder" />
                    Choose Operation
                  </ActionBtn>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        <CreateAppointmentsModal
          referToRHURef={referToRHURef}
          ref={createAppointmentRef}
          patientSelfie={patientSelfie}
          setPatientSelfie={setPatientSelfie}
        />

        <AddPatientOperation
          patient={patient}
          ref={operationProcedureRef}
        />
        <AddPatientForDeliveryModal
          patient={patient}
          ref={operationDeliveryRef}
        />

        <ProcedureChoiceModal 
          ref={procedureChoiceRef}
          onClickSurgery={() => {
            operationProcedureRef.current.show({ patient });
          }}
          onClickDelivery={() => {
            operationDeliveryRef.current.show({ patient });
          }}
        />

        <CreateEmergencyCareModal ref={ERCareChoiceRef} /> 

        <PrivacyPolicyModal
          ref={privacyRef}
          onSuccess={(data) => {
            createAppointmentRef.current.show({ patient });
          }}
          patientSelfie={patientSelfie}
          setPatientSelfie={setPatientSelfie}
        />
        <AppointmentChoiceModal
          ref={appointmentChoiceRef}
          onClickConsult={() => {
            privacyRef.current.show({ patient });
          }}
          onClickAhef={() => {}}
          onClickTelemedicine={() => {
            bookTeleMedicineRef.current.show();
          }}
        />
        <NewAppointmentModal
          ref={bookTeleMedicineRef}
          onClickConsult={() => {
            privacyRef.current.show({ patient });
          }}
          onClickAhef={() => {}}
          onClickTelemedicine={() => {
            bookTeleMedicineRef.current.show();
          }}
        />
      </Dialog>
    </Transition>
  );
};

export default forwardRef(UpdatePatientSurgery);