"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
	type ICredentials,
	get_user,
	signIn,
	signOut,
} from "@/actions/auth/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { ClearCurrentUser, SetCurrentUser } from "@/lib/store/redux/usersSlice";

export const useLogout = () => {
	const router = useRouter(); // Initialize the router
	const dispatch = useAppDispatch();
	return useMutation({
		mutationKey: ["signOut"],
		mutationFn: signOut,
		onMutate: () => {
			toast.dismiss();
			toast.loading("በመውጣት ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("Logout... 👋🏾BYE!");

			dispatch(ClearCurrentUser());
			router.push("/auth/sign-in" as `/${string}`);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});
};
export const useFetchMe = (enable: boolean) => {
	const dispatch = useAppDispatch();
	return useQuery({
		queryKey: ["getme"],
		queryFn: async () => {
			try {
				const data = await get_user();
				dispatch(SetCurrentUser(data));
				return data;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: enable,
	});
};
export const useSignIn = () => {
	const queryClient = useQueryClient();

	const router = useRouter();

	return useToastMutation<ICredentials>(
		"signIn",
		signIn,
		"ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
		{
			onSuccess: (variables) => {
				toast.success("logged in successfully");
				router.push("/home" as `/${string}`);
				queryClient.invalidateQueries({ queryKey: ["getme"] });
			},
		}
	);
};
