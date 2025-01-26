"use client";

import { useCallback, useState } from "react";

import { FileText, Image as ImageIcons, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { useAddLedger } from "@/actions/Query/ledger_Query/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { type LedgerType } from "@/types/ledger";

interface DocumentUploadStepProps {
	data: Partial<LedgerType>;
	updateData: (newData: Partial<LedgerType>) => void;
	onNext: () => void;
}

export default function DocumentUploadStep({
	data,
	updateData,
	onNext,
}: DocumentUploadStepProps) {
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileType: "letters" | "attachments") => {
			const validFiles = acceptedFiles.filter(
				(file) => file.size <= 5 * 1024 * 1024
			);
			const invalidFiles = acceptedFiles.filter(
				(file) => file.size > 5 * 1024 * 1024
			);

			if (invalidFiles.length) {
				toast({
					title: "Error",
					description: "Some files exceed the 5MB limit.",
					variant: "destructive",
				});
			}

			updateData({ [fileType]: [...(data[fileType] || []), ...validFiles] });
		},
		[data, updateData]
	);

	const {
		getRootProps: getLetterRootProps,
		getInputProps: getLetterInputProps,
	} = useDropzone({
		onDrop: (files) => onDrop(files, "letters"),
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
			"application/vnd.ms-excel": [".xls"],
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
				".xlsx",
			],
			"application/vnd.ms-powerpoint": [".ppt"],
			"application/vnd.openxmlformats-officedocument.presentationml.presentation":
				[".pptx"],
		},
		maxSize: 5 * 1024 * 1024,
	});

	const {
		getRootProps: getAttachmentRootProps,
		getInputProps: getAttachmentInputProps,
	} = useDropzone({
		onDrop: (files) => onDrop(files, "attachments"),
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
			"application/msword": [".doc"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
			"application/vnd.ms-excel": [".xls"],
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
				".xlsx",
			],
			"application/vnd.ms-powerpoint": [".ppt"],
			"application/vnd.openxmlformats-officedocument.presentationml.presentation":
				[".pptx"],
		},
		maxSize: 5 * 1024 * 1024,
	});

	const removeFile = (fileType: "letters" | "attachments", index: number) => {
		const updatedFiles = [...(data[fileType] || [])];
		updatedFiles.splice(index, 1);
		updateData({ [fileType]: updatedFiles });
	};

	const { mutate: SubmitFile } = useAddLedger();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!data.letters?.length) {
			toast({
				title: "Error",
				description: "Please upload at least one letter file.",
				variant: "destructive",
			});
			setIsUploading(false);
			return;
		}

		if (!data.metadata_language) {
			toast({
				title: "Error",
				description: "Please select a language.",
				variant: "destructive",
			});
			setIsUploading(false);
			return;
		}

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (value) {
				if (Array.isArray(value)) {
					value.forEach((file) => formData.append(key, file));
				} else {
					formData.append(key, value.toString());
				}
			}
		});
		setIsUploading(true);

		try {
			await SubmitFile(formData);
			// toast({
			// 	title: "Success",
			// 	description: "File Uplaoded successfully.",
			// });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to submit the form. Please try again.",
				variant: "destructive",
			});
		} finally {
			setTimeout(() => {
				onNext();
				setIsUploading(false);
			}, 10000);
			// setIsUploading(false);
		}
	};

	const getFileIcon = (file: File) => {
		const fileType = file.type.split("/")[0];
		return fileType === "image" ? (
			<ImageIcons className="h-5 w-5 mr-2 text-muted-foreground" />
		) : (
			<FileText className="h-5 w-5 mr-2 text-muted-foreground" />
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-3 gap-6 mb-4">
				<div>
					<Label htmlFor="received_at">Received Date</Label>
					<Input
						id="received_at"
						type="text"
						value={new Date().toISOString().split("T")[0]}
						onChange={(e) => updateData({ received_at: e.target.value })}
						required
						disabled
					/>
				</div>

				<div>
					<Label htmlFor="metadata_language">
						Language
						<span className="text-red-500 ml-2">*</span>
					</Label>
					<Select
						value={data.metadata_language || ""}
						onValueChange={(value) => updateData({ metadata_language: value })}
					>
						<SelectTrigger id="metadata_language" aria-required="true">
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="English">English</SelectItem>
							<SelectItem value="Amharic">Amharic</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor="metadata_confidentiality">Confidentiality</Label>
					<Select
						value={data.metadata_confidentiality || ""}
						onValueChange={(value) =>
							updateData({
								metadata_confidentiality:
									value as LedgerType["metadata_confidentiality"],
							})
						}
					>
						<SelectTrigger id="metadata_confidentiality">
							<SelectValue placeholder="Select confidentiality" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PUBLIC">Public</SelectItem>
							<SelectItem value="INTERNAL">Internal</SelectItem>
							<SelectItem value="CONFIDENTIAL">Confidential</SelectItem>
							<SelectItem value="RESTRICTED">Restricted</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold mb-2">
					Upload Letters
					<span className="text-red-500 ml-2">*</span>
				</h3>
				<div
					{...getLetterRootProps()}
					className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
					aria-label="Upload letters"
				>
					<input {...getLetterInputProps()} />
					<Upload className="mx-auto h-12 w-12" />
					<p className="mt-2 text-sm text-muted-foreground">
						Drag & drop letter files here, or click to select files
					</p>
					<p className="text-xs text-muted-foreground mt-1">
						(PDF or images up to 5MB each)
					</p>
				</div>
				{data.letters && data.letters.length > 0 && (
					<ul className="mt-4 space-y-2">
						{data.letters.map((file, index) => (
							<li
								key={file.name}
								className="flex items-center justify-between bg-muted/40 p-2 rounded"
								title={file.name}
							>
								<div className="flex items-center">
									{getFileIcon(file)}
									<span className="text-sm truncate" title={file.name}>
										{file.name.length > 20
											? `${file.name.slice(0, 20)}...`
											: file.name}
									</span>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeFile("letters", index)}
									className="text-red-500 hover:text-red-700"
								>
									<X className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>

			<div>
				<h3 className="text-lg font-semibold mb-2">Upload Attachments</h3>
				<div
					{...getAttachmentRootProps()}
					className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
					aria-label="Upload attachments"
				>
					<input {...getAttachmentInputProps()} />
					<Upload className="mx-auto h-12 w-12" />
					<p className="mt-2 text-sm text-muted-foreground">
						Drag & drop attachment files here, or click to select files
					</p>
					<p className="text-xs text-muted-foreground mt-1">
						(PDF or images up to 5MB each)
					</p>
				</div>
				{data.attachments && data.attachments.length > 0 && (
					<ul className="mt-4 space-y-2">
						{data.attachments.map((file, index) => (
							<li
								key={file.name}
								className="flex items-center justify-between bg-muted/40 p-2 rounded"
								title={file.name}
							>
								<div className="flex items-center">
									{getFileIcon(file)}
									<span className="text-sm truncate" title={file.name}>
										{file.name.length > 20
											? `${file.name.slice(0, 20)}...`
											: file.name}
									</span>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeFile("attachments", index)}
									className="text-red-500 hover:text-red-700"
								>
									<X className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="flex justify-end">
				<Button type="submit" className="px-8" disabled={isUploading}>
					{isUploading ? "Uploading..." : "Save and Next"}
				</Button>
			</div>
		</form>
	);
}
