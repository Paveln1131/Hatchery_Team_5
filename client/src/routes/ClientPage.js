import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from "../UserProvider";

import styles from "../css/ClientPage.module.css"

export default function ClientPage() {
    const { calculatorData } = useContext(UserContext);
    console.log(calculatorData)
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

            <div className={styles.clientDataSection}>
                <span className={styles.sectionHeading}>Žadatel</span>
            </div>

            <div className={styles.clientData}>
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>Typ subjektu:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
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
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>Křestní jméno:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                    <h4>{clientData.data.name}</h4>
                </div>
            </div>

            <div className={styles.clientData}>
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>Příjmení:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                    <h4>{clientData.data.surname}</h4>
                </div>
            </div>

            { clientData.data.birthNum
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                            <h4>Rodné číslo:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                            <h4>{clientData.data.birthNum}</h4>
                        </div>
                    </div>
                :   null
            }
            { clientData.data.applicantType === ("OSVC" || "LEGAL_ENTITY") 
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                            <h4>IČO:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                            <h4>{clientData.data.IC}</h4>
                        </div>
                    </div>
                :   null
            }

            { clientData.data.nationality
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                            <h4>Státní příslušnost:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                            <h4>{clientData.data.nationality}</h4>
                        </div>
                    </div>
                :   null
            }

            <div className={styles.clientData}>
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>E-mail:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                    <h4>{clientData.data.email}</h4>
                </div>
            </div>

            { clientData.data.phone
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                            <h4>Telefon:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                            <h4>{clientData.data.phone}</h4>
                        </div>
                    </div>
                :   null
            }

            <div className={styles.clientDataSection}>
                <span className={styles.sectionHeading}>Adresa žadatele</span>
            </div>

            { clientData.data.address.street
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.primaryBg}`}>
                            <h4>Ulice:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.secondaryBg}`}>
                            <h4>{clientData.data.address.street}</h4>
                        </div>
                    </div>
                :   null
            }

            { clientData.data.address.descNumber
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.primaryBg}`}>
                            <h4>Číslo popisné:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.secondaryBg}`}>
                            <h4>{clientData.data.address.descNumber}</h4>
                        </div>
                    </div>
                :   null
            }

            { clientData.data.address.indicativeNumber
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.primaryBg}`}>
                            <h4>Číslo orientační:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.secondaryBg}`}>
                            <h4>{clientData.data.address.indicativeNumber}</h4>
                        </div>
                    </div>
                :   null
            }

            { clientData.data.address.city
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.primaryBg}`}>
                            <h4>Město:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.secondaryBg}`}>
                            <h4>{clientData.data.address.city}</h4>
                        </div>
                    </div>
                :   null
            }

            { clientData.data.address.postalCode
                ?   <div className={styles.clientData}>
                        <div className={`${styles.leftSide} ${styles.primaryBg}`}>
                            <h4>PSČ:</h4>
                        </div>
                        <div className={`${styles.rightSide} ${styles.secondaryBg}`}>
                            <h4>{clientData.data.address.postalCode}</h4>
                        </div>
                    </div>
                :   null
            }   

            <div className={styles.clientDataSection}>
                <span className={styles.sectionHeading}>Údaje o půjčce</span>
            </div>

            <div className={styles.clientData}>
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>Výše úvěru:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                    <h4>{clientData.data.amount} Kč</h4>
                </div>
            </div>

            <div className={styles.clientData}>
                <div className={`${styles.leftSide} ${styles.secondaryBg}`}>
                    <h4>Doba splácení:</h4>
                </div>
                <div className={`${styles.rightSide} ${styles.primaryBg}`}>
                    <h4>{clientData.data.numOfMonths} měsíců</h4>
                </div>
            </div>

            <div className={styles.clientDataSection}>
                <span className={styles.sectionHeading}>Stav žádosti</span>
            </div>

            { clientData.data.status === "PENDING"
                ? <div className={`${styles.statusBar} ${styles.pending}`}>Čeká na schválení</div>
                : null
            }
            { clientData.data.status === "APPROVED"
                ? <div className={`${styles.statusBar} ${styles.approved}`}>Schváleno</div>
                : null
            }
            { clientData.data.status === "CANCELLED "
                ? <div className={`${styles.statusBar} ${styles.cancelled}`}>Zamítnuto</div>
                : null
            }
            
        </div>
    )
}
