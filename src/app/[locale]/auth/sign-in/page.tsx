import { LoginForm } from "@/components/screen/auth/LoginForm";

type Props = {};

const SignInpage = (props: Props) => {
	return (
		<section className="flex flex-col gap-4 items-center justify-center">
			{/* <SigninScreen /> */}
			<LoginForm />

			<p className="max-w-2xl text-center">
				If you require any support, please contact our technical team
				<a
					className="text-blue-500 inline-block"
					href="https://www.gdop.gov.et/request-support
					"
				>
					(https://www.gdop.gov.et/request-support)
				</a>{" "}
				or +251118132191
			</p>
		</section>
	);
};

export default SignInpage;
