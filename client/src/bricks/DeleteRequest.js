import {useState} from "react";

function DeleteRequest (){

    const [requestCallDelete,setRequestCallDelete] = useState({
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
            setRequestCallDelete({ state: "error", error: responseJson });
        } else {
            setRequestCallDelete({ state: "success", data: responseJson });
        }
    });
}
export default DeleteRequest