import { useState} from "react";
import Button from "react-bootstrap/Button";

function EvaluateRequest(props) {


    const [requestCallReject, setRequestCallReject] = useState({
        state: "pending"
    });
    const [requestCallApprove, setRequestCallApprove] = useState({
        state: "pending"
    });

    function rejectRequest() {

        fetch(`http://localhost:3000/request/${props.id}/cancel`, {
            method: "PUT", headers: {
                Authorization: 'Bearer ' + 'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestCallReject({state: "error", error: responseJson});
            } else {
                setRequestCallReject({state: "success", data: responseJson});
            }
        });

        props.onRefresh()
    }

    function requestApprove() {

        fetch(`http://localhost:3000/request/${props.id}/approve`, {
            method: "PUT", headers: {
                Authorization: 'Bearer ' + 'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestCallApprove({state: "error", error: responseJson});
            } else {
                setRequestCallApprove({state: "success", data: responseJson});
            }
        });
        props.onRefresh()
    }

    return(
        <>
            <Button onClick={rejectRequest} variant="outline-danger me-auto">Zamítnout</Button>
            <Button onClick={requestApprove} variant="outline-success">Potvrdit</Button>
        </>
    )
}

export default EvaluateRequest