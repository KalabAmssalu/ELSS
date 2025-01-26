import LedgerScreen from "@/components/screen/ledger/LedgerScreen";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="bg-muted pb-20">
			<LedgerScreen />
		</div>
	);
};

export default page;
