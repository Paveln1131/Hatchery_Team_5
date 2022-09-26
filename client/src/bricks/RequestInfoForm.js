import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import styles from './requestList.module.css'
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function RequestInfoForm({id}){

    const [requestLoadCall, setRequestLoadCall] = useState({
        state: "pending"
    });

    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true)
    const handleCloseModal = () =>{
        setShow(false);
    }

    useEffect(() => {
        fetch(`http://localhost:3000/request/${id}`, {
            method: "GET",
            headers:{
                Authorization: 'Bearer '+'qdsMkMpb16'
            }
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRequestLoadCall({ state: "error", error: responseJson });
            } else {
                setRequestLoadCall({ state: "success", data: responseJson });
            }
        });
    }, []);


        switch (requestLoadCall.state) {
            case "pending":
                return (
                    <div>
                        <Icon size={2} path={mdiLoading} spin={true} />
                    </div>
                );
            case "success":
                return getModal()
            case "error":
                return (
                    <div>
                        <div>Nepodařilo se načíst data o žádostech.</div>
                        <br />
                        <pre>{JSON.stringify(requestLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }


    function getModal(){

        const request = requestLoadCall.data
        let isCompany = requestLoadCall.data.companyName != null
        let isIC = requestLoadCall.data.IC != null

        let dateOfCreation = new Date(request.created).toLocaleDateString('cz', {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        return (
            <>
                <Modal size={"lg"} show={isModalShown} onHide={handleCloseModal}>
                    <Form><Form/>
                        <Modal.Header>
                            <Modal.Title><p style={{margin:"0px"}} className={styles.section}>Informace o klientovi</p></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{display:"flex",justifyContent:"space-evenly"}} className={"row"}>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <span className={styles.main}>{isCompany ? "Název společnosti" : "Jméno žadatele"}</span>
                                        <br/>
                                        <span>{isCompany ? request.companyName : (request.name + " " + request.surname)}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>{isIC ? "IČO" : "Rodné číslo"}</span>
                                        <br/>
                                        <span>{isIC ? request.IC : request.birthNum}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Národnost</span>
                                        <br/>
                                        <span>{request.nationality}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>{isCompany ? "Právnická osoba" : (isIC ? "Podnikatel fyzická osoba" : "Fyzická osoba")}</span>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <br/>
                                </div>
                                <div className={"row"}>
                                    <div style={{maxWidth:"190px"}} className={"col"}>
                                        <span className={styles.main}>{isCompany ? "Jméno žadatele" : ""}</span>
                                        <br/>
                                        <span>{isCompany ? (request.name + " " + request.surname) : ""}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>{isCompany ? "Pozice žadatele" : ""}</span>
                                        <br/>
                                        <span>{isCompany ? (request.position) : ""}</span>
                                    </div>
                                </div>
                                <div style={{marginTop:"30px", marginBottom:"30px"}} className={"row"}>
                                    <p className={styles.section}>Kontaktní údaje</p>
                                </div>
                                <div className={"row"}>
                                    <div className={"col"}>
                                        <span className={styles.main}>Adresa</span>
                                        <br/>
                                        <span>{request.address.street + " " + request.address.descNumber + "/" + request.address.indicativeNumber + ", " + request.address.postalCode + " " + request.address.city}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Telefonní číslo</span>
                                        <br/>
                                        <span>{request.phone}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>E-mail</span>
                                        <br/>
                                        <span>{request.email}</span>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div style={{marginTop:"30px", marginBottom:"30px"}} className={"row"}>
                                        <p className={styles.section}>Informace o žádosti</p>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Typ žádosti</span>
                                        <br/>
                                        <span>{request.applicantType}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Vytvořena</span>
                                        <br/>
                                        <span>{dateOfCreation}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Výše půjčky</span>
                                        <br/>
                                        <span>{request.amount.toLocaleString() + " Kč"}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Počet splátek</span>
                                        <br/>
                                        <span>{request.numOfMonths}</span>
                                    </div>
                                    <div className={"col"}>
                                        <span className={styles.main}>Status</span>
                                        <br/>
                                        <span>{request.status}</span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                                <Button variant="outline-danger me-auto">Zamítnout</Button>
                                <Button variant="outline-success">Potvrdit</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Button onClick={handleShowModal} variant="outline-info">Info</Button>
            </>
        )

    }
}

export default RequestInfoForm