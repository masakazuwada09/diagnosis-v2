/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";
import ReactSelectInputField from "../../../../components/inputs/ReactSelectInputField";
import ActionBtn from "../../../..//components/buttons/ActionBtn";
import FlatIcon from "../../../..//components/FlatIcon";
import TextInputField from "../../../..//components/inputs/TextInputField";
import ReactQuillField from "../../../..//components/inputs/ReactQuillField";
import { procedureRates } from "../../../..//libs/procedureRates";
import { caseCodes } from "../../../..//libs/caseCodes";
import { formatCurrency } from "../../../..//libs/helpers";
import { react, useState } from "react";
import CaseDetails from "./CaseDetails";

const uniq_id = uuidv4();
const AddPrescription = ({
	prescribeItems,
	selectedItems = [],
	setSelectedItems,
	setProcedure,
	setDiagnosis,
	items = [],
	setItems,
	loading,
}) => {
	const [selectedProcedure, setSelectedProcedure] = useState(null);
	const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

	const addNewSelectedItem = () => {
		setSelectedItems((prevItems) => [
			...prevItems,
			{
				id: uuidv4(),
				item: null,
				quantity: 0,
			},
		]);
	};

	const removeSelectedItem = (id) => {
		setSelectedItems((prevItems) =>
			prevItems.filter((item) => item.id != id)
		);
	};
	const updateItemInSelected = (id, data) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						inventory_id: data?.inventory?.id,
						item: data?.item,
					};
				}
				return item;
			})
		);
	};
	const updateItemQty = (id, qty) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					console.log("updateItemQty ==", item, id, qty);
					return {
						...item,
						quantity: qty,
					};
				} else {
					return item;
				}
			})
		);
	};
	const updateItemSig = (id, text) => {
		setSelectedItems((items) =>
			items.map((item) => {
				if (item.id == id) {
					return {
						...item,
						notes: text,
					};
				}
				return item;
			})
		);
	};

	return (
		<>
			<div className="flex flex-col w-full gap-4 pb-2">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<div className="flex flex-col gap-5 border p-5 rounded-xl">
						<div className="">
							<h4 className="text-md text-indigo-800  font-bold mb-4">
								Add Diagnosis
							</h4>
							<span className="text-slate-500 text-sm">
								Select diagnosis
							</span>
							<ReactSelectInputField
								isClearable={true}
								// isLoading={
								// 	isSelectorLoading
								// }
								inputClassName=" "
								value={selectedDiagnosis?.CASE_CODE}
								onChangeGetData={(data) => {
									if (setDiagnosis) {
										setDiagnosis(data?.value);
									}
									setSelectedDiagnosis(data?.item);
								}}
								placeholder={`Select Diagnosis`}
								options={caseCodes?.map((item) => ({
									value: item?.CASE_CODE,
									label: item?.CASE_DESCRIPTION,
									item: item,
								}))}
							/>
						</div>
						{selectedDiagnosis ? (
							<CaseDetails
								selectedCase={selectedDiagnosis}
								title="Diagnosis Details"
							/>
						) : (
							""
						)}
					</div>
					<div className="flex flex-col gap-5 border p-5 rounded-xl">
						<div className="">
							<h4 className="text-md text-indigo-800  font-bold mb-4">
								Add Procedure Rendered
							</h4>
							<span className="text-slate-500 text-sm">
								Select procedure
							</span>
							<ReactSelectInputField
								isClearable={true}
								// isLoading={
								// 	isSelectorLoading
								// }
								inputClassName=" "
								value={selectedProcedure?.CASE_CODE}
								onChangeGetData={(data) => {
									// updateItemInSelected(
									// 	selectedItem?.id,
									// 	data
									// );
									setSelectedProcedure(data?.item);
									if (setProcedure) {
										setProcedure(data?.value);
									}
								}}
								placeholder={`Select Procedure`}
								options={procedureRates?.map((item) => ({
									value: item?.CASE_CODE,
									label: item?.CASE_DESCRIPTION,
									item: item,
								}))}
							/>
						</div>
						{selectedProcedure ? (
							<CaseDetails
								selectedCase={selectedProcedure}
								title="Procedure Details"
							/>
						) : (
							""
						)}
					</div>
				</div>
				<div className="p-5 rounded-xl flex flex-col border">
					<div>
						<h4 className="text-md text-indigo-800  font-bold mb-0">
							Add Prescription
						</h4>
						<span className="text-slate-500 text-sm">
							Select items to add prescription to patient
						</span>
					</div>
					<div className="flex flex-col">
						<div className="table">
							<table className="mb-5">
								<thead>
									<tr>
										<td className="font-medium">
											Item Information
										</td>
										{/* <td className="text-center">Unit</td> */}
										{/* <td className="text-center">Stock</td> */}
										<td className="text-center">Qty</td>
										<td className="text-center w-[100px]">
											Action
										</td>
									</tr>
								</thead>
								<tbody>
									{selectedItems?.map((selectedItem) => {
										return (
											<>
												<tr
													key={`selectedItem-${selectedItem?.id}`}
												>
													<td className="w-3/5">
														<ReactSelectInputField
															isClearable={true}
															// isLoading={
															// 	isSelectorLoading
															// }
															inputClassName=" "
															value={
																selectedItem
																	?.item?.id
															}
															onChangeGetData={(
																data
															) => {
																console.log(
																	"data",
																	data
																);
																updateItemInSelected(
																	selectedItem?.id,
																	data
																);
															}}
															label="Select Item"
															placeholder={`Select Item`}
															options={items?.map(
																(item) => ({
																	label: item?.name,
																	value: item?.id,
																	description:
																		(
																			<div className="flex flex-col">
																				<span>
																					CODE:{" "}
																					{
																						item?.code
																					}
																				</span>
																				<span>
																					DESCRIPTION:{" "}
																					{
																						item?.name
																					}
																				</span>
																			</div>
																		),
																	item: item,
																})
															)}
														/>
														<div className="flex items-center gap-4 p-4 divide-x">
															<div className="flex flex-col mt-2">
																<span className="font-bold mb-1">
																	Item Code
																</span>
																<span>
																	{
																		selectedItem
																			?.item
																			?.code
																	}
																</span>
															</div>
															<div className="flex flex-col mt-2 pl-4">
																<span className="font-bold mb-1">
																	Item
																	Description
																</span>
																<span>
																	{
																		selectedItem
																			?.item
																			?.description
																	}
																</span>
															</div>
														</div>
													</td>

													{/* <td className="text-center">
														{
															selectedItem?.item
																?.item
																?.unit_measurement
														}
													</td> */}
													{/* <td className="text-center">
													{
														selectedItem?.item
															?.quantity
													}
												</td> */}

													<td className="w-[88px] text-center">
														<TextInputField
															inputClassName="text-center !py-0 pl-1 !pr-0 h-10 !rounded"
															defaultValue={1}
															type="number"
															placeholder="QTY"
															onChange={(e) => {
																updateItemQty(
																	selectedItem?.id,
																	e.target
																		.value
																);
															}}
														/>
													</td>
													<td>
														<div className="flex items-center justify-center gap-2">
															<ActionBtn
																type="danger"
																size="sm"
																onClick={() => {
																	removeSelectedItem(
																		selectedItem?.id
																	);
																}}
															>
																<FlatIcon icon="rr-trash" />
																Remove
															</ActionBtn>
														</div>
													</td>
												</tr>
												<tr>
													<td
														colSpan={6}
														className="!pb-6"
													>
														<ReactQuillField
															className="bg-white"
															placeholder="Sig.:"
															onChange={(val) => {
																console.log(
																	"onChange sig",
																	val
																);
																updateItemSig(
																	selectedItem?.id,
																	val
																);
																// updateNotes(
																// 	data,
																// 	val
																// );
															}}
														/>
													</td>
												</tr>
											</>
										);
									})}
									<tr>
										<td
											colSpan={9999}
											className="text-center"
										>
											<div className="flex items-center justify-center">
												<ActionBtn
													className="px-4 !rounded-2xl"
													type="secondary"
													size="md"
													onClick={addNewSelectedItem}
												>
													<FlatIcon icon="rr-square-plus" />
													Click to add more items
												</ActionBtn>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							{selectedItems?.length == 0 ? (
								<p className="my-4 text-red-700 text-center">
									Please select items to add prescription.
								</p>
							) : (
								""
							)}
							<ActionBtn
								className="px-4 !rounded- mx-auto w-2/3"
								type="primary-dark"
								// size="lg"
								disabled={selectedItems?.lengtd == 0}
								loading={loading}
								onClick={() => {
									prescribeItems();
								}}
							>
								<FlatIcon
									icon="rr-file-prescription"
									className="mr-2 text-xl"
								/>
								Submit Prescription
							</ActionBtn>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddPrescription;
