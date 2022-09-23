import React, {useEffect, useState} from 'react';
import {Form, Button, Col } from "react-bootstrap";


function LoanCalculator() {

  // Initial values
  const minAmount = 5000;
  const maxAmount = 1200000;
  const minnumOfMonths = 6;
  const maxnumOfMonths = 60;
  const [show, setShow] = useState(false)

  // Sliders
    const [amountSlider, setAmountSlider] = useState(minAmount)
    const [numofMonthsSlider, setNumOfMonthsSlider] = useState(minnumOfMonths)


    // state for results
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



    return (
        <div>
                <Form.Group>
                    <Form.Label>Výše úvěru: </Form.Label>
                    <div> {Math.floor(amountSlider)} Kč</div>
                    <Form.Range
                        min={minAmount}
                        max={maxAmount}
                        step= "1000"
                        value={amountSlider}
                        onChange={e => setAmountSlider(Number(e.target.value))}
                        required/>

                  <Form.Label>Zadejte výši částky ručně: </Form.Label>
                   <Form.Control
                    type="number"
                        min={minAmount}
                        max={maxAmount}
                        step= "1000"
                        value={amountSlider}
                        onChange={e => setAmountSlider(Number(e.target.value))}
                        required/>
                    
                            <Col>Minimální výše půjčky: {minAmount} Kč</Col>
                            <Col>Maximální výše půjčky: {maxAmount} Kč</Col>     
                </Form.Group>
            
            
                <Form.Group>
                    <Form.Label>Doba splácení: </Form.Label>
                    <div>Počet let: {Math.floor(numofMonthsSlider / 12)}  Počet měsíců: {numofMonthsSlider % 12}</div>
                    <Form.Range
                        min={minnumOfMonths}
                        max={maxnumOfMonths}
                        value={numofMonthsSlider}
                        onChange={e => setNumOfMonthsSlider(Number(e.target.value))}
                        required/>

                <Form.Label>Zadejte počet měsíců ručně: </Form.Label>
                <Form.Control
                    type="number"
                    min={minnumOfMonths}
                    max={maxnumOfMonths}
                    value={numofMonthsSlider}
                    onChange={e => setNumOfMonthsSlider(Number(e.target.value))}
                        required/>
                    
                            <Col>Minimální počet měsíců: {minnumOfMonths}</Col>
                            <Col>Maximální počet let: {maxnumOfMonths / 12}</Col>
                       
                </Form.Group>
                <Button onClick={() => setShow(!show)}>
               {show === true ? "Schovat výsledky" : "Ukázat výsledky"}
            </Button>
           
             
        {show && <div>
                    <div>Měsíční splátka: {results.monthlyPayment} Kč</div>
                    <div>Úrok: {results.yearlyInterest}%</div>
                    <div>RPSN: {results.RPSN}%</div>
                    <div>Celková částka ke splacení {results.overallAmount} Kč</div>
                    <div>Fixní poplatek (od 200 0000 Kč výše): {results.fixedFee} Kč</div>
                    <Button>
                        Odeslat
                    </Button>
                </div>}
                
           

    
            
        </div>

    )
}



export default LoanCalculator;


