"use client";

import { useState } from "react";

import { Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type LedgerType } from "@/types/ledger";

import FileDisplayList from "./FileDisplay";

interface ReviewStepProps {
	data: Partial<LedgerType>;
	onSubmit: () => void;
	onBack: () => void;
}

export default function ReviewStep({
	data,
	onSubmit,
	onBack,
}: ReviewStepProps) {
	const [showletter, setShowLetter] = useState(true);
	const [showAttachement, setShowAttachement] = useState(false);

	const handleChangeShow = (value: string) => {
		if (value === "letter") {
			setShowLetter(true);
			setShowAttachement(false);
		} else if (value === "attachement") {
			setShowAttachement(true);
			setShowLetter(false);
		}
	};
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold text-center">Review Your Submission</h2>
			<div className="space-y-4">
				<div className="flex space-x-6">
					<div className="flex-1">
						<ReviewSection title="Sender Information">
							<p>Name: {data.sender_name}</p>
							<p>Phone: {data.sender_phone_number}</p>
							<p>Email: {data.sender_email}</p>
						</ReviewSection>
						<ReviewSection title="Carrier Information">
							<p>First Name: {data.carrier_person_first_name}</p>
							<p>Middle Name: {data.carrier_person_middle_name}</p>
							<p>Phone: {data.carrier_phone_number}</p>
						</ReviewSection>
						<ReviewSection title="Recipient Information">
							<p>Name: {data.recipient_name}</p>
							<p>Phone: {data.recipient_phone_number}</p>
							<p>Job Title: {data.job_title}</p>
							<p>Department: {data.department}</p>
							<p>Received At: {data.written_at}</p>
						</ReviewSection>
						<ReviewSection title="Ledger Details">
							<p>Subject: {data.ledger_subject}</p>
							<p>Keywords: {data.metadata_keywords}</p>
							<p>Language: {data.metadata_language}</p>
							<p>Confidentiality: {data.metadata_confidentiality}</p>
						</ReviewSection>
					</div>
					<div className="flex-1">
						<div className="flex-1">
							{showletter ? (
								<ReviewSection title="Documents">
									<FileDisplayList files={data.letters || []} />
								</ReviewSection>
							) : (
								<Button onClick={() => handleChangeShow("letter")}>
									Show Letter Preview
								</Button>
							)}
						</div>
						{data.attachments && data.attachments?.length > 0 && (
							<div className="flex-1">
								{showAttachement ? (
									<ReviewSection title="Documents">
										<FileDisplayList files={data.attachments || []} />
									</ReviewSection>
								) : (
									<div className="flex justify-end">
										<Button
											onClick={() => handleChangeShow("attachement")}
											size={"sm"}
										>
											<Paperclip size={15} className="mr-2" /> Show Attachement
											Preview
										</Button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<Button onClick={onSubmit} className="bg-green-500">
					Submit
				</Button>
			</div>
		</div>
	);
}

function ReviewSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<div className="bg-muted/40 p-4 rounded-md">{children}</div>
		</div>
	);
}
