"use client";

import { useState } from "react";

import {
	useGetLedgerTracker,
	useUpdateLedger,
} from "@/actions/Query/ledger_Query/request";
import DocumentUploadStep from "@/components/module/DocumentUploadStep";
import SenderInfoStep from "@/components/module/InfoStep";
import ReviewStep from "@/components/module/ReviewStep";
import Success from "@/components/shared/modal/SuccessModal";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/storehooks";
import { type LedgerType } from "@/types/ledger";

export default function LedgerScreen() {
	const [currentStep, setCurrentStep] = useState(1);
	const [ledgerData, setLedgerData] = useState<Partial<LedgerType>>({
		letters: [],
		attachments: [],
		sender_name: "",
		sender_phone_number: "",
		sender_email: "",
		carrier_person_first_name: "",
		carrier_person_middle_name: "",
		carrier_phone_number: "",
		document_date: "",
		ledger_subject: "",
		ledger_description: "",
		tracking_number: "",
		ledger_status: "PENDING", // Assuming PENDING is a valid default status
		recipient_name: "",
		recipient_phone_number: "",
		job_title: "",
		department: "",
		sector: "",
		received_at: "",
		priority: "LOW", // Assuming LOW is a valid default priority
		metadata_title: "",
		metadata_content: "",
		metadata_author: "",
		metadata_dateCreated: "",
		metadata_lastModified: "",
		metadata_keywords: "",
		metadata_tags: "",
		metadata_file_type: "",
		metadata_language: "",
		metadata_confidentiality: "PUBLIC", // Assuming PUBLIC is a valid default confidentiality
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [enable, setEnable] = useState(false);
	const ledger = useAppSelector((state) => state.ledger.ledgerSlice);

	const totalSteps = 3;

	const updateLedgerData = (newData: Partial<LedgerType>) => {
		setLedgerData((prevData) => ({ ...prevData, ...newData }));
	};

	const handleNext = () => {
		setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
	};

	const handleSubmit = () => {
		// Here you would typically send the final data to your backend
		console.log("Final submission:", ledgerData);
		setIsDialogOpen(true);
		// Reset the form or navigate to a success page
	};
	const { data: trackerPdf, isSuccess } = useGetLedgerTracker(
		ledger?.id,
		enable
	);

	const { mutate: UpdateLedger } = useUpdateLedger();
	const handleSuccessAction = async () => {
		setEnable(true);
		toast({
			title: "Success",
			description: "Succesfuly downloaded.",
			variant: "default",
		});

		const {
			id,
			attachments,
			letters,
			metadata_confidentiality,
			metadata_language,
			received_at,
			...sendData
		} = ledgerData;

		console.log(
			"send remove data",
			id,
			attachments,
			letters,
			metadata_confidentiality,
			metadata_language,
			received_at
		);

		await UpdateLedger(
			{
				ledger_id: ledger?.id,
				SendData: sendData,
			},
			{
				onSuccess: async () => {
					if (isSuccess) {
						const printWindow = window.open(
							`${process.env.NEXT_PUBLIC_API_BASE_URL}${trackerPdf}`
						);
						if (printWindow) {
							printWindow.onload = () => {
								printWindow.print();
							};
						}
					}
				},
			}
		);
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8 max-w-6xl ">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Letter Submission Form
				</h1>
				<Progress value={(currentStep / totalSteps) * 100} className="mb-6" />
				<div className="bg-background shadow-md rounded-lg p-6">
					{currentStep === 1 && (
						<DocumentUploadStep
							data={ledgerData}
							updateData={updateLedgerData}
							onNext={handleNext}
						/>
					)}
					{currentStep === 2 && (
						<SenderInfoStep
							data={ledgerData}
							updateData={updateLedgerData}
							onNext={handleNext}
							onBack={handleBack}
						/>
					)}

					{currentStep === 3 && (
						<ReviewStep
							data={ledgerData}
							onSubmit={handleSubmit}
							onBack={handleBack}
						/>
					)}
				</div>
				<Toaster />
			</div>
			<Success
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				message="Your operation was successful! Download your Letter Tracker"
				actionLabel="Download Tracker"
				onAction={handleSuccessAction}
			/>
		</>
	);
}
