import { useParams } from "react-router-dom";

const PurchaseDetail = () => {

    const {id} = useParams();

    return (
        <div>
            Purchase Detail - {id}
        </div>
    )
}

export default PurchaseDetail;