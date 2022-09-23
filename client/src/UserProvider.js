import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [authorization, setAuthorization] = useState({ role: []});
    const [calculatorData, setCalculatorData] = useState({
        amount: "",
        numOfMonths: "",
        monthlyPayment: "",
        yearlyInterest: "",
        RPSN: "",
        overallAmount: "",
        fixedFee: ""
    })

    const collectDataFromCalculator = (amount, numOfMonths, results) => {
        const newCalculatorData = {...calculatorData};
        newCalculatorData.amount = amount;
        newCalculatorData.numOfMonths = numOfMonths;
        newCalculatorData.monthlyPayment = results.monthlyPayment;
        newCalculatorData.yearlyInterest = results.yearlyInterest;
        newCalculatorData.RPSN = results.RPSN;
        newCalculatorData.overallAmount = results.overallAmount;
        newCalculatorData.fixedFee = results.fixedFee;

        setCalculatorData({newCalculatorData})
    }

    const toggleAuthorization = (auth) => {
        setAuthorization(auth)
    }

    const value = {
        authorization,
        toggleAuthorization,
        calculatorData,
        collectDataFromCalculator
    }

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;