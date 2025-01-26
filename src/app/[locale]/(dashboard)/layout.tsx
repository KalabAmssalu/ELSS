import type { ReactNode } from "react";

import MainNav from "@/components/shared/Navigations/MainNav";
import { GeneralShell } from "@/components/shared/Wrappers/GeneralShell";

// Rest of your code remains the same... import type { ReactNode } from "react";

interface DashboardLayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<GeneralShell>
			<div className="flex flex-col min-h-screen">
				{/* Top Navigation */}
				<div className="sticky top-0 z-50">
					<MainNav />
				</div>
				{/* Main Content with Sidebar and Breadcrumbs */}
				<main>{children}</main>
			</div>
		</GeneralShell>
	);
}
