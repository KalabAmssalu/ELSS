import Image from "next/image";
import { useState } from "react";

import DocumentViewer, {
	DocViewerRenderers,
	type IDocument,
} from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FileDisplayProps {
	files: File[];
	initialIndex: number;
}
interface ActiveDocument {
	uri: string;
	fileName: string;
	fileType: string;
}
function FileDisplay({ files, initialIndex }: FileDisplayProps) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [activeDocument, setActiveDocument] = useState<ActiveDocument>({
		uri: URL.createObjectURL(files[initialIndex]),
		fileName: files[initialIndex].name,
		fileType: files[initialIndex].type,
	});

	const currentFile = files[currentIndex];
	const fileExtension = currentFile.name.split(".").pop()?.toLowerCase();
	const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
		fileExtension || ""
	);

	const handleNext = () => {
		if (currentIndex < files.length - 1) {
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			setActiveDocument({
				uri: URL.createObjectURL(files[nextIndex]),
				fileName: files[nextIndex].name,
				fileType: files[nextIndex].type,
			});
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			const prevIndex = currentIndex - 1;
			setCurrentIndex(prevIndex);
			setActiveDocument({
				uri: URL.createObjectURL(files[prevIndex]),
				fileName: files[prevIndex].name,
				fileType: files[prevIndex].type,
			});
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			{isImage ? (
				<Image
					src={activeDocument.uri}
					alt={activeDocument.fileName}
					width={600}
					height={600}
					className="object-contain w-full h-auto sm:w-96 lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[520px]"
				/>
			) : (
				<DocumentViewer
					documents={files.map((file) => ({
						uri: URL.createObjectURL(file),
						fileName: file.name,
						fileType: file.type,
					}))}
					activeDocument={activeDocument}
					onDocumentChange={(document: IDocument) =>
						setActiveDocument({
							uri: document.uri,
							fileName: document.fileName || "Unknown File",
							fileType: document.fileType || "Unknown Type",
						})
					}
					theme={{
						primary: "#5296d8",
						secondary: "#ffffff",
						tertiary: "#5296d899",
						textPrimary: "#ffffff",
						textSecondary: "#5296d8",
						textTertiary: "#00000099",
						disableThemeScrollbar: false,
					}}
					style={{ width: 500, height: 700 }}
					pluginRenderers={DocViewerRenderers}
				/>
			)}

			<div className="flex justify-between w-full items-center bg-background mt-4">
				<button
					onClick={handlePrev}
					disabled={currentIndex === 0}
					className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
				>
					<ChevronLeft size={20} className="text-muted" />
				</button>
				<p className="text-center text-lg font-semibold">{currentFile.name}</p>
				<button
					onClick={handleNext}
					disabled={currentIndex === files.length - 1}
					className="flex rounded-full w-10 h-10 bg-primary items-center justify-center disabled:opacity-50"
				>
					<ChevronRight size={20} className="text-muted" />
				</button>
			</div>
		</div>
	);
}

export default function FileDisplayList({ files }: { files: File[] }) {
	return (
		<div className="space-y-4">
			{files.length > 0 ? (
				<FileDisplay files={files} initialIndex={0} />
			) : (
				<p>No files attached.</p>
			)}
		</div>
	);
}
