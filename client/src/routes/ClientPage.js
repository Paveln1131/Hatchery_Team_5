import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from "../css/ClientPage.module.css"

export default function ClientPage() {
    const [clientData, setClientData] = useState({
        state: "pending",
    })

    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        fetch(`/request/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            console.log(responseJson);
            if (response.status >= 400) {
                setClientData({ state: "error", error: responseJson});        
            } else {
                setClientData({ state: "success", data: responseJson});
            }
        })
    }, [id])

    if (clientData.state === "pending") {
        return <h2>Načítá se stav Vaší žádosti...</h2>;
    }

    return (
        <div className={styles.wrapper}>
            <h2>Detail Vaší žádosti</h2>
            <div className={styles.inputSection}>
                <h3>Žadatel</h3>
            </div>
            <div className={styles.clientData}>
                <div className={styles.leftSide}>
                    <h4>Typ subjektu:</h4>
                </div>
                <div className={styles.rightSide}>
                    { clientData.data.applicantType === "INDIVIDUAL" 
                        ? <h4>Fyzická osoba</h4> 
                        : null
                    }
                    { clientData.data.applicantType === "OSVC" 
                        ? <h4>Podnikatel fyzická osoba</h4> 
                        : null
                    }
                    { clientData.data.applicantType === "LEGAL_ENTITY" 
                        ? <h4>Právnická osoba</h4> 
                        : null
                    }
                </div>
            </div>
            <div className={styles.clientData}>
                <div className={styles.leftSide}>
                    <h4>Křestní jméno:</h4>
                </div>
                <div className={styles.rightSide}>
                    <h4>{clientData.data.name}</h4>
                </div>
            </div>
            <div className={styles.clientData}>
                <div className={styles.leftSide}>
                    <h4>Příjmení:</h4>
                </div>
                <div className={styles.rightSide}>
                    <h4>{clientData.data.surname}</h4>
                </div>
            </div>
        </div>
    )
}
