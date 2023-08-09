import { useRouter } from 'next/router';


const PurchaseOrderPage: React.FC = () => {
    const router = useRouter();
    const { purchaseOrderId } = router.query;
    return (
        <div className="container mx-auto px-4 py-4 border">
            <h1>Purchase Order</h1>
            <p>
            Purchase Order ID: {purchaseOrderId}
            </p>
        </div>
    );
}

export default PurchaseOrderPage;