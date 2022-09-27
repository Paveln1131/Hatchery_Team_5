import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";

function EvaluateRequest(props) {


    const [requestCallReject, setRequestCallReject] = useState({
        state: "pending"
    });
    const [requestCallApprove, setRequestCallApprove] = useState({
        state: "pending"
    });

    function checkApplicationStatus(id) {
        console.log(props.requestList)
        let isPending = false
        props.requestList.forEach((request) => {
            if (request.id === id) {
                if (request.status === "PENDING") {
                    isPending = true
                }
            }
        })
        return isPending
    }

    async function rejectRequests() {
        if (props.id) {
            if (checkApplicationStatus(props.id)) {
                await rejectRequest(props.id)
            }else return <Alert key={"primary"} variant={"primary"}>
                This is a  alert—check it out!
            </Alert>
        } else {
            for (const [key, value] of Object.entries(props.checkBoxMap)) {
                if (value) {
                    if (checkApplicationStatus(key))
                    await rejectRequest(key)
                }
            }
        }

    }

    function rejectRequest(id) {

        console.log(id)
        let responsePromise = fetch(`http://localhost:3000/request/${id}/cancel`, {
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
        if (props.id) {
            props.onRefresh()
        } else props.RefreshRequestList()

        return responsePromise
    }


    async function approveRequests() {
        if (props.id) {
            if (checkApplicationStatus(props.id)) {
                await approveRequest(props.id)
            }
        } else {
            for (const [key, value] of Object.entries(props.checkBoxMap)) {
                if (value) {
                    if (checkApplicationStatus(key)){
                        await approveRequest(key)
                }
                }
            }
        }
    }

    function approveRequest(id) {

        let responsePromise = fetch(`http://localhost:3000/request/${id}/approve`, {
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
        if (props.id) {
            props.onRefresh()
        } else props.RefreshRequestList()

        return responsePromise
    }

    return (
        <>
            <Button onClick={rejectRequests} variant="outline-danger me-auto">Zamítnout</Button>
            <Button onClick={approveRequests} variant="outline-success">Potvrdit</Button>
        </>
    )
}

export default EvaluateRequest