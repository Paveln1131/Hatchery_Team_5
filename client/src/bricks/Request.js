import styles from './requestList.module.css'
import Form from 'react-bootstrap/Form';
import RequestInfoForm from "./RequestInfoForm";
import {useState} from "react";
import EvaluateRequest from "./EvaluateRequest";


function Request(props) {

    const [checkBoxMap,setCheckBoxMap] = useState({})

    let i = 0;


    const handleCheck = (id) => {
        let checkBoxMapCopy = {... checkBoxMap}
        checkBoxMapCopy[id] = !checkBoxMap[id]
        setCheckBoxMap(checkBoxMapCopy)

    }

    const isAllChecked = () => {
        let x = 0

        for (const [key, value] of Object.entries(checkBoxMap)) {
            if (!value){
                x++
            }
        }
        if (x > 0 || Object.keys(checkBoxMap).length === 0){
            return true
        }
        else return false
    }

    const handleCheckAll = () => {
        let checkBoxMapCopy = {... checkBoxMap}
        let x = 0

        for (const [key, value] of Object.entries(checkBoxMap)) {
            if (!value){
                x++
            }
        }
        if (isAllChecked()){
            props.requestList.forEach((request) => {
                    checkBoxMapCopy[request.id] = true
                }
            )
        }else {
            props.requestList.forEach((request) => {
                    checkBoxMapCopy[request.id] = false
                }
            )
        }


        setCheckBoxMap(checkBoxMapCopy)
    }

    return (
        <div className={styles.container}>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td scope="col" className={styles.appSelect}>
                            <Form>
                                <Form.Check aria-label="option 1" onChange={handleCheckAll} checked={!isAllChecked()}/>
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
                    {props.requestList.map((request) => {

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
                                        <Form.Check
                                            onClick={(e)=>{handleCheck(request.id)}}
                                            checked={checkBoxMap[request.id]}
                                            aria-label="option 1"/>
                                    </Form>
                                </th>
                                <td className={styles.appNumber}>{i}</td>
                                <td className={styles.appName}>{request.name + " " + request.surname}</td>
                                <td className={styles.appDate}>{dateOfCreation}</td>
                                <td className={styles.appNumOfMonths}>{request.numOfMonths}</td>
                                <td className={styles.appLoanAmount}>{request.amount.toLocaleString() + " Kč"}</td>
                                <td className={styles.appStatus}>{request.status}</td>
                                <td className={styles.appEdit}>
                                    <RequestInfoForm requestList={props.requestList} id={request.id} onRefres={props.onRefresh}/>
                                </td>

                            </tr>

                        )
                    })
                    }

                    </tbody>
                </table>
                <footer style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>

                    <EvaluateRequest requestList={props.requestList} checkBoxMap={checkBoxMap} RefreshRequestList={props.onRefresh}></EvaluateRequest>
                </footer>
            </div>
        </div>

    )
}

export default Request