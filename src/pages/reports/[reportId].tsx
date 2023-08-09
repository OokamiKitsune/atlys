import { useRouter } from 'next/router';


const ReportPage: React.FC = () => {
    const router = useRouter();
    const { reportId } = router.query;
    return (
        <div className="container mx-auto px-4 py-4 border">
            <h1>Purchase Order</h1>
            <p>
            Purchase Order ID: {reportId}
            </p>
        </div>
    );
}

export default ReportPage;