import styles from './requestList.module.css'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import RequestInfoForm from "./RequestInfoForm";


function Request({requestList}) {

    let i = 0;


    return (
        <div className={styles.container}>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td scope="col" className={styles.appSelect}>
                            <Form>
                                <Form.Check aria-label="option 1"/>
                            </Form>
                        </td>
                        <td scope="col" className={styles.appNumber}>#</td>
                        <td scope="col" className={styles.appName}>Jméno žadatele</td>
                        <td scope="col" className={styles.appDate}>Vytvořena</td>
                        <td scope="col" className={styles.appNumOfMonths}>Počet splátek</td>
                        <td scope="col" className={styles.appLoanAmount}>Výše půjčky</td>
                        <td scope="col" className={styles.appStatus}>Status</td>
                        <td scope="col" className={styles.appEdit}></td>
                    </tr>
                    </thead>
                    <tbody>
                    {requestList.map((request) => {

                        let dateOfCreation = new Date(request.created).toLocaleDateString('cz', {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })
                        i++
                        return (
                            <tr key={request.id}>
                                <th scope="row">
                                    <Form>
                                        <Form.Check aria-label="option 1"/>
                                    </Form>
                                </th>
                                <td className={styles.appNumber}>{i}</td>
                                <td className={styles.appName}>{request.companyName ?? (request.name + " " + request.surname)}</td>
                                <td className={styles.appDate}>{dateOfCreation}</td>
                                <td className={styles.appNumOfMonths}>{request.numOfMonths}</td>
                                <td className={styles.appLoanAmount}>{request.amount}</td>
                                <td className={styles.appStatus}>{request.status}</td>
                                <td className={styles.appEdit}>
                                    <RequestInfoForm id={request.id}/>
                                </td>
                            </tr>

                        )
                    })
                    }

                    </tbody>
                </table>
                <div>
                    <Button variant="outline-success">Potvrdit</Button>
                    <Button variant="outline-danger">Zamítnout</Button>
                    <Button variant="danger">Smazat</Button>
                </div>
            </div>
        </div>

    )
}

export default Request