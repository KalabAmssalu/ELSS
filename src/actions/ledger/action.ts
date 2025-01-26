"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type APIResponseType } from "@/hooks/useToastMutation";
import { type LedgerType } from "@/types/ledger";

import getErrorMessage from "../getErrorMessage";

export const setLedger = async (
	formData: FormData
): Promise<APIResponseType> => {
	try {
		formData.forEach((value, key) => {
			console.log("key, value", key, value);
		});

		const response = await axiosInstance.post("ledgers/create/", formData, {
			headers: {
				"Content-Type": "multipart/form-data", // Ensure the correct content type
			},
		});
		console.log("response", response);

		return {
			ok: response.status >= 200 && response.status < 300,
			message: response.data?.message || "አዲስ መዝገብ በተሳካ ሁኔታ ፈጥረዋል!",
			data: response.data?.data,
		};
	} catch (error: any) {
		console.log("error", error);
		return { ok: false, message: getErrorMessage(error) };
	}
};

export const update_ledger = async ({
	ledger_id,
	SendData,
}: {
	ledger_id: string;
	SendData: Partial<LedgerType>;
}): Promise<APIResponseType> => {
	try {
		const response = await axiosInstance.post(
			`ledgers/${ledger_id}/update/`,
			SendData
		);
		return {
			ok: true,
			message: response.data?.message || "Create A letter",
			data: response.data,
		};
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
};

export async function get_tracker(ledger_id: string) {
	try {
		const response = await axiosInstance.post(`ledgers/${ledger_id}/pdf/`);
		return {
			ok: true,
			message: response.data?.message || "tracker downloaded",
			data: response.data,
		};
	} catch (error) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
