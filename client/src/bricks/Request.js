import styles from './requestList.module.css'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import RequestInfoForm from "./RequestInfoForm";
import {useEffect, useState} from "react";
import EvaluateRequest from "./EvaluateRequest";


function Request(props) {


    const [ok,setOk] = useState(false)

    let i = 0;

    const checkBoxMap = new Map()

    props.requestList.map((request) => {
        checkBoxMap.set(request.id,false)
    })
    const handleCheck = (id) => {
        checkBoxMap.set(id,(!checkBoxMap.get(id)))
        setOk(!ok)
       // console.log(checkBoxMap)

    }

    const checkBoxList = [];



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
                    {props.requestList.map((request) => {

                       // console.log(checkBoxMap.get(request.id))
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
                                    <RequestInfoForm id={request.id} onRefres={props.onRefresh}/>
                                </td>

                            </tr>

                        )
                    })
                    }

                    </tbody>
                </table>
                <footer style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>
                    {
                        props.requestList.map((request) => {
                           // console.log(checkBoxMap.get(request.id))
                            if (checkBoxMap.get(request.id)){
                                checkBoxList.push(request.id)
                            }

                        })
                    }
                    <EvaluateRequest id={checkBoxList}></EvaluateRequest>
                </footer>
            </div>
        </div>

    )
}

export default Request