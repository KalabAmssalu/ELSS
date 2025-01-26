import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type CurrentUserType } from "@/types/user_module";

// Define the initial state based on the CurrentUserType
const initialState = {
	currentUser: {
		id: "",
		email: "",
		user_profile: {
			first_name_en: "",
			middle_name_en: "",
			last_name_en: "",
			first_name_am: "",
			middle_name_am: "",
			last_name_am: "",
			full_name_en: "",
			full_name_am: "",
			job_title: {
				id: "",
				title_en: "",
				title_am: "",
			},
			department: {
				id: "",
				department_name_en: "",
				department_name_am: "",
				abbreviation_en: "",
				abbreviation_am: "",
			},
			phone_number: 0,
		},
		users_permissions: {
			is_admin: false,
			is_staff: false,
		},
		user_settings: {
			is_2fa_enabled: false,
			is_verified: false,
		},
		user_preferences: {
			use_email: false,
			use_sms: false,
		},
	},
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		SetCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
			state.currentUser = action.payload;
		},
		ClearCurrentUser: (state) => {
			state.currentUser = initialState.currentUser; // Resets to initial state
		},
	},
});

export const { SetCurrentUser, ClearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
