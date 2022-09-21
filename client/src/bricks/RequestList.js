import {useEffect, useState} from "react";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import Request from './Request'

function RequestList(){

    const [requestListLoadCall, setRequestListLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {

        fetch(`http://localhost:3000/request/list`, {
            method: "GET",
            headers:{
                'Authorization': 'Bearer '+'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestListLoadCall({ state: "error", error: responseJson });
            } else {
                setRequestListLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getChild() {
        switch (requestListLoadCall.state) {
            case "pending":
                return (
                    <div className={""}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <>
                        <Request requestList={requestListLoadCall.data} />
                    </>
                );
            case "error":
                return (
                    <div className={""}>
                        <div>Nepodařilo se načíst data o žádostech.</div>
                        <br />
                        <pre>{JSON.stringify(requestListLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return getChild();
}

export default RequestList