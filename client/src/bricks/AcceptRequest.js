import {useState} from "react";

function AcceptRequest(){

    const [requestCallAccept,setRequestCallAccept] = useState({
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
            setRequestCallAccept({ state: "error", error: responseJson });
        } else {
            setRequestCallAccept({ state: "success", data: responseJson });
        }
    });
}
export default AcceptRequest