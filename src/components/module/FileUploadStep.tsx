"use client";

import { useCallback, useState } from "react";

import { File, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface FileUploadStepProps {
	onUpload: (files: File[]) => void;
}

export default function FileUploadStep({ onUpload }: FileUploadStepProps) {
	const [files, setFiles] = useState<File[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length + files.length > 2) {
				toast({
					title: "Error",
					description: "You can only upload a maximum of 2 files.",
					variant: "destructive",
				});
				return;
			}
			setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
		},
		[files]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".jpg", ".jpeg"],
		},
		maxSize: 5 * 1024 * 1024, // 5MB
		maxFiles: 2,
	});

	const removeFile = (fileToRemove: File) => {
		setFiles(files.filter((file) => file !== fileToRemove));
	};

	const handleSubmit = () => {
		if (files.length === 0) {
			toast({
				title: "Error",
				description: "Please upload at least one file.",
				variant: "destructive",
			});
			return;
		}
		setIsUploading(true);
		onUpload(files);
	};

	return (
		<div>
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
					isDragActive
						? "border-primary bg-primary/10"
						: "border-gray-300 hover:border-primary"
				}`}
			>
				<input {...getInputProps()} />
				<Upload className="mx-auto h-12 w-12 text-gray-400" />
				<p className="mt-2 text-sm text-gray-600">
					Drag &amp; drop files here, or click to select files
				</p>
				<p className="text-xs text-gray-500 mt-1">
					(Max 2 files, PDF or images up to 5MB each)
				</p>
			</div>

			{files.length > 0 && (
				<ul className="mt-4 space-y-2">
					{files.map((file) => (
						<li
							key={file.name}
							className="flex items-center justify-between bg-gray-100 p-2 rounded"
						>
							<div className="flex items-center">
								<File className="h-5 w-5 mr-2 text-gray-500" />
								<span className="text-sm truncate">{file.name}</span>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => removeFile(file)}
								className="text-red-500 hover:text-red-700"
							>
								<X className="h-4 w-4" />
							</Button>
						</li>
					))}
				</ul>
			)}

			<Button
				onClick={handleSubmit}
				disabled={isUploading}
				className="mt-4 w-full"
			>
				{isUploading ? "Processing OCR..." : "Submit Files"}
			</Button>
		</div>
	);
}
