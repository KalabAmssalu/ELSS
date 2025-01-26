// export interface ledgerType {
// 	sender_name?: String;
// 	sender_phone_number?: String;
// 	sender_email?: String;
// 	carrier_person_first_name?: string;
// 	carrier_person_middle_name?: string;
// 	carrier_phone_number?: string;
// 	letters?: File[];
// 	attachments?: File[];
// 	ledger_subject?: string;
// 	// tracking_number?: string;
// 	// ledger_status?:
// 	// 	| "PENDING"
// 	// 	| "IN_REVIEW"
// 	// 	| "APPROVED"
// 	// 	| "DELIVERED"
// 	// 	| "ARCHIVED";

// 	recipient_name?: string;
// 	recipient_phone_number?: string;
// 	job_title?: string;
// 	department?: string;
// 	received_at?: string; //automatic when the form is filled
// 	priority?: "LOW" | "MEDIUM" | "HIGH";

// 	metadata_keywords?: string;
// 	metadata_tags?: string;
// 	metadata_fileType?: string;

// 	metadata_confidentiality?:
// 		| "PUBLIC"
// 		| "INTERNAL"
// 		| "CONFIDENTIAL"
// 		| "RESTRICTED";
// }

export interface LedgerType {
	id: string;
	letters?: File[];
	attachments?: File[];
	sender_name?: string;
	sender_phone_number?: string;
	sender_email?: string;
	carrier_person_first_name?: string;
	carrier_person_middle_name?: string;
	carrier_phone_number?: string;
	document_date?: string;
	ledger_subject?: string;
	ledger_description?: string;
	tracking_number?: string;
	ledger_status?:
		| "PENDING"
		| "IN_REVIEW"
		| "APPROVED"
		| "DELIVERED"
		| "ARCHIVED";
	recipient_name?: string;
	recipient_phone_number?: string;
	job_title?: string;
	department?: string;
	sector?: string;
	received_at?: string;
	priority?: "LOW" | "MEDIUM" | "HIGH";
	metadata_title?: string;
	metadata_content?: string;
	metadata_author?: string;
	metadata_dateCreated?: string;
	metadata_lastModified?: string;
	metadata_keywords?: string;
	metadata_tags?: string;
	metadata_file_type?: string;
	metadata_language?: string;
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED";
}
