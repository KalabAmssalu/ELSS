import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { get_tracker, setLedger, update_ledger } from "@/actions/ledger/action";
import useToastMutation from "@/hooks/useToastMutation";

export const useAddLedger = () => {
	return useToastMutation<any>("addLedger", setLedger, "add file", {
		onSuccess: (data, variables) => {
			console.log("Ledger created successfully:", data.message);
			console.log("New Ledger Data:", variables);
		},
		onError: (error) => {
			console.error("Error creating ledger:", error);
		},
	});
};

export const useUpdateLedger = () => {
	return useToastMutation<any>("addLedger", update_ledger, "submit ledger", {
		onSuccess: (data, variables) => {
			console.log("Ledger created successfully:", data.message);
			console.log("New Ledger Data:", variables);
		},
		onError: (error) => {
			console.error("Error creating ledger:", error);
		},
	});
};

export const useGetLedgerTracker = (
	id: string | undefined,
	enable: boolean
) => {
	return useQuery({
		queryKey: ["getme"],
		queryFn: async () => {
			try {
				let data;
				if (id) {
					data = await get_tracker(id);
					return data.data;
				}
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: enable,
	});
};
