import { useRouter } from 'next/router';
import { use } from 'react';


const userPage: React.FC = () => {
    const router = useRouter();
    const { userId } = router.query;
    return (
        <div className="container mx-auto px-4 py-4 border">
            <h1>Purchase Order</h1>
            <p>
            Purchase Order ID: {userId}
            </p>
        </div>
    );
}

export default userPage;