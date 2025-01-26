"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { useFetchMe, useSignIn } from "@/actions/Query/auth_Query/request";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import the useSignIn hook

export function LoginForm() {
	const t = useTranslations("Login");
	const { mutate: signIn } = useSignIn(); // Use the signIn mutation
	const [enable, setEnable] = useState<boolean>(false);

	const { data: mydata } = useFetchMe(enable);
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		const data = {
			email,
			password,
		};

		signIn(data, {
			onSuccess: () => {
				setEnable(true);
			},
			onError: (error: any) => {
				console.error("Sign-in failed:", error);
				// Handle the error, e.g., show a toast notification
			},
		});
	};

	return (
		<Card className="mx-auto w-96 h-80">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">{t("loginTitle")}</CardTitle>
				<CardDescription>{t("loginPrompt")}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="grid gap-2">
					<div className="grid gap-2">
						<Label htmlFor="email">{t("email")}</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">{t("password")}</Label>
							<Button
								variant={"link"}
								size={"sm"}
								// onClick={() => router.push("/auth/forgot-password")}
								className="ml-auto p-0 inline-block text-sm underline"
							>
								{t("forgotPassword")}
							</Button>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						{t("login")}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
