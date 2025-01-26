import type { ReactNode } from "react";

import TopNav from "@/components/shared/Navigations/TopNav";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

interface AuthLayoutProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<GeneralShell>
			<div className="w-full h-screen flex flex-col">
				<TopNav />
				{/* <Image
					src={IMAGES.logoOnly}
					alt="Tilla Logo"
					className="w-20 h-30 absolute top-4 left-4"
				/> */}
				<div className="flex-grow flex items-center justify-center">
					{children}
				</div>
				<footer className="bg-primary text-primary-foreground text-sm p-2 text-center">
					<p>
						@ 2025GC, E-Letter Submission Portal (ELSP) Minsitry of Innovation
						and Technology
					</p>
				</footer>
			</div>
		</GeneralShell>
	);
}
