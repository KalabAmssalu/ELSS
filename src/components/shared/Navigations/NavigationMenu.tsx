"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationMap = [
	{
		label: "Home",
		route: "/dashboard/home",
		alternateRoutes: ["/en-US/dashboard/home", "/am/dashboard/home"],
	},
	{
		label: "Send Letter",
		route: "/dashboard/ledger",
		alternateRoutes: ["/en-US/dashboard/ledger", "/am/dashboard/ledger"],
	},

	// Add more navigation items here as needed
];

export function NavigationMenuConf() {
	const path = usePathname();

	const isActive = (route: string, alternateRoutes: string[] = []) =>
		path?.startsWith(route) || alternateRoutes.some((r) => path?.startsWith(r));

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navigationMap.map(({ label, route, alternateRoutes }) => (
					<NavigationMenuItem key={route}>
						<Link href={route as `/${string}`} legacyBehavior passHref>
							<NavigationMenuLink className="bg-transparent">
								<Button
									className={cn(
										isActive(route, alternateRoutes) && "border-b-4",
										"hover:border-b-4 hover:bg-transparent font-bold w-[300px] hover rounded-none"
									)}
									variant={"ghost"}
								>
									{label}
								</Button>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
