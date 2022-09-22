import styles from './requestList.module.css'


function Request({requestList}) {

    let i = 0;

    return (
        <div className={styles.container}>
            <table className="table">
                <thead>
                <p className={styles.title}>Správa žádostí</p>
                <tr>
                    <td scope="col" className={styles.appNumber}>#</td>
                    <td scope="col" className={styles.appName}>Jméno žadatele</td>
                    <td scope="col" className={styles.appEmail}>Datum</td>
                    <td scope="col" className={styles.appPhoneNumber}>Počet splátek</td>
                    <td scope="col" className={styles.appLoanAmount}>Výše půjčky</td>
                    <td scope="col" className={styles.appMonthPayment}>Status</td>
                    <td scope="col" className={styles.appDetail}>Detail</td>
                </tr>
                </thead>
                <tbody>
                {requestList.map((request) => {
                    i++
                    return (
                    <tr>
                        <th scope="row" className={styles.appNumber}>{i}</th>
                        <td className={styles.appName}>{request.name +" "+request.surname}</td>
                        <td className={styles.appPhoneNumber}>{request.numOfMonths}</td>
                        <td className={styles.appEmail}>{request.created}</td>
                        <td className={styles.appLoanAmount}>{request.amount}</td>
                        <td className={styles.appMonthPayment}>{request.status}</td>
                        <td></td>
                    </tr>

                    )
                })
                }

                </tbody>

            </table>
        </div>
    )
}

export default Request