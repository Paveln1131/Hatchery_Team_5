import {useEffect, useState} from "react";

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


    console.log(requestListLoadCall.state)

    return <div>kkk</div>
}

export default RequestList