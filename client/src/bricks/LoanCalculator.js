import React, {useEffect, useState, useContext} from 'react';
import {Form, Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserProvider";
import styles from "../css/LoanCalculator.module.css"


/*  od částky vyšší než 200 000 skákat po 5000, mezery mezi částky po 3 nulách a let že není potřeba počt let vidět, počet msíců a sjednat půjčku tlačítko atraktivnější*/
function LoanCalculator() {
  const navigate = useNavigate();
  const { collectDataFromCalculator } = useContext(UserContext);

  // Initial values
  const minAmount = 5000;
  const maxAmount = 1200000;
  const minnumOfMonths = 6;
  const maxnumOfMonths = 60;
  const [show, setShow] = useState(false)

  // Sliders
    const [amountSlider, setAmountSlider] = useState(minAmount)
    const [numofMonthsSlider, setNumOfMonthsSlider] = useState(minnumOfMonths)


    // states for results
    const [results, setResults] = useState({})

    // Fetch method for calculation

    
    useEffect(() => {
        async function calculate() {
          
            const payload = {
                amount: amountSlider,
                numOfMonths: numofMonthsSlider
            }
           
            const res = await fetch('http://localhost:3000/request/calculate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            setResults(data)
        }

        calculate();
      
    }, [amountSlider, numofMonthsSlider])

    const handleSubmit = () => {
        collectDataFromCalculator(amountSlider, numofMonthsSlider, results)
    }


    return (

        <Container className={styles.card}>
        <div>
            <div>
                <h1 className={styles.header}>Kalkulačka</h1>
            </div>
            <Container className={styles.container}>
                <Form.Group>
                    <Form.Label>Výše úvěru: </Form.Label>
                    <div className={styles.loan}> {amountSlider.toLocaleString()} Kč</div>
                    <Form.Range
                        min={minAmount}
                        max={maxAmount}
                        step= {amountSlider < 200000 ? "1000" : "5000"}
                        value={amountSlider}
                        onChange={e => setAmountSlider(Number(e.target.value))}
                        className={styles.sliders}
                        required/>

                  <Form.Label>Zadejte výši částky ručně: </Form.Label>
                   <Form.Control
                    type="number"
                        min={minAmount}
                        max={maxAmount}
                        step= {amountSlider < 200000 ? "1000" : "5000"}
                        value={amountSlider}
                        onChange={e => setAmountSlider(Number(e.target.value))}
                        required/>
                    
                            <Col className={styles.loanMinimum}>Minimální výše půjčky: {minAmount.toLocaleString()} Kč</Col>
                            <Col className={styles.loanMinimum}>Maximální výše půjčky: {maxAmount.toLocaleString()} Kč</Col>     
                </Form.Group>
            </Container>
            
                <Form.Group>
                    <Form.Label>Doba splácení: </Form.Label>
                    <div className={styles.loan}>{numofMonthsSlider} měsíců</div>
                    <Form.Range
                        min={minnumOfMonths}
                        max={maxnumOfMonths}
                        value={numofMonthsSlider}
                        onChange={(e) => {
                            setNumOfMonthsSlider(Number(e.target.value));
                        }}
                        required/>

                <Form.Label>Zadejte počet měsíců ručně: </Form.Label>
                <Form.Control
                    type="number"
                    min={minnumOfMonths}
                    max={maxnumOfMonths}
                    value={numofMonthsSlider}
                    onChange={e => setNumOfMonthsSlider(Number(e.target.value))}
                        required/>
                    
                            <Col className={styles.loanMinimum}>Minimální počet měsíců: {minnumOfMonths}</Col>
                            <Col className={styles.loanMinimum}>Maximální počet měsíců: {maxnumOfMonths}</Col>
                       
                </Form.Group>
                <Button onClick={() => setShow(!show)} className={styles.button}>
               {show === true ? "Schovat výsledky" : "Ukázat výsledky"}
            </Button>
           
             
        {show && <div>
                    <div>Měsíční splátka: {results.monthlyPayment.toLocaleString()} Kč</div>
                    <div>Úrok: {results.yearlyInterest}%</div>
                    <div>RPSN: {results.RPSN}%</div>

                    <div>Fixní poplatek (od 200 0000 Kč výše): {results.fixedFee.toLocaleString()} Kč</div>
                    <div className={styles.summary}>Celková částka ke splacení: {results.overallAmount.toLocaleString()} Kč</div>
                   
                    <Button className={styles.button} 
                            onClick={() => {
                                handleSubmit();
                                navigate("../requestForm")}
                            }
                    >Odeslat</Button>
                </div>}
                
           

    
            
        </div>
        </Container>
    )
}



export default LoanCalculator;