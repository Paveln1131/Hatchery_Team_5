import styles from './requestList.module.css'
import Button from "react-bootstrap/Button";


function Request({requestList}) {

    let i = 0;


    const formatDate = function(date) {
        return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " +  ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2) + ' ' + (date.getHours() < 12 ? 'AM' : 'PM');
    }


    return (
        <div>
            <div><p className={styles.title}>Správa žádostí</p></div>
            <div className={styles.container}>
                <table className="table">
                    <thead>
                    <tr>
                        <td scope="col" className={styles.appNumber}>#</td>
                        <td scope="col" className={styles.appName}>Jméno žadatele</td>
                        <td scope="col" className={styles.appDate}>Datum</td>
                        <td scope="col" className={styles.appNumOfMonths}>Počet splátek</td>
                        <td scope="col" className={styles.appLoanAmount}>Výše půjčky</td>
                        <td scope="col" className={styles.appStatus}>Status</td>
                        <td scope="col" className={styles.appEdit}></td>
                        <td scope="col" className={styles.appDelete}></td>



                    </tr>
                    </thead>
                    <tbody>
                    {requestList.map((request) => {
                        let dateOfCreation = new Date(request.created).toLocaleDateString('cz', {year:"numeric", month:"short", day:"numeric"})
                        i++
                        return (
                            <tr>
                                <th scope="row" className={styles.appNumber}>{i}</th>
                                <td className={styles.appName}>{request.name +" "+request.surname}</td>
                                <td className={styles.appDate}>{dateOfCreation}</td>
                                <td className={styles.appNumOfMonths}>{request.numOfMonths}</td>
                                <td className={styles.appLoanAmount}>{request.amount}</td>
                                <td className={styles.appStatus}>{request.status}</td>
                                <td className={styles.appEdit}>
                                    <Button variant="outline-warning">Smazat</Button>
                                </td>
                                <td className={styles.appDelete}>
                                    <Button variant="outline-danger">Upravit</Button>
                                </td>


                            </tr>

                        )
                    })
                    }

                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default Request