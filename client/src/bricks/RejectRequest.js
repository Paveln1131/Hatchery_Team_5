import {useEffect, useState} from "react";

function RejectRequest() {

    const [requestCallReject,setRequestCallReject] = useState({
        state: "pending"
    });


        fetch(`http://localhost:3000/request/list`, {
            method: "GET",
            headers:{
                Authorization: 'Bearer '+'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestCallReject({ state: "error", error: responseJson });
            } else {
                setRequestCallReject({ state: "success", data: responseJson });
            }
        });


}

export default RejectRequest