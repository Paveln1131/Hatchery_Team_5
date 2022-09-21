import {useEffect, useState} from "react";
import styles from "../css/classroom.module.css";
import Icon from "@mdi/react";

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
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return (
                    <>
                        <StudentList classroom={classroomLoadCall.data} />
                    </>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br />
                        <pre>{JSON.stringify(classroomLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return getChild();
}

export default RequestList