import { CheckCircle } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SuccessProps {
	open: boolean;
	onClose: () => void;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
}

const Success: React.FC<SuccessProps> = ({
	open,
	onClose,
	message,
	actionLabel,
	onAction,
}) => {
	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Success</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex items-center space-x-3">
							<CheckCircle className="text-green-500 w-6 h-6" />
							<span className="text-green-800 font-medium">{message}</span>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
					{actionLabel && onAction && (
						<AlertDialogAction onClick={onAction}>
							{actionLabel}
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Success;
