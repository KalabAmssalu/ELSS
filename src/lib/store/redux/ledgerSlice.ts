import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type LedgerType } from "@/types/ledger";

// Define the initial state based on LedgerType
const initialState: { ledgerSlice: LedgerType | null } = {
	ledgerSlice: null, // You can initialize this with an empty object or null
};

const ledgerSlice = createSlice({
	name: "ledger",
	initialState,
	reducers: {
		SetLedgerSlice: (state, action: PayloadAction<LedgerType>) => {
			state.ledgerSlice = action.payload;
		},
		ClearLedgerSlice: (state) => {
			state.ledgerSlice = initialState.ledgerSlice; // Resets to initial state (null or empty object)
		},
	},
});

export const { SetLedgerSlice, ClearLedgerSlice } = ledgerSlice.actions;
export default ledgerSlice.reducer;
