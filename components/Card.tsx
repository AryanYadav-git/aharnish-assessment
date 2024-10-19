"use client"

import Amortization from "./Amortization";
import LoanEst from "./LoanEst";

const Card = ({calculatedEmi, loanDetails}: any) => {
  const {amount, duration, interest, startDate} = loanDetails;
  const totalLoanPayments = (calculatedEmi * duration) ;
  const totalInterestPayments = (totalLoanPayments-amount).toFixed(2);
  const payoffDate ={
    month: 0,
    year: ""
  }
  const years = duration/12;
  payoffDate.year = (Number.parseInt(startDate.substring(0,4))+years).toFixed(0);
  payoffDate.month = (Number.parseInt(startDate.substring(5,7)) + (duration % 12)) % 12;

  const loanEst: LoanEstParams = {
    calculatedEmi,
    amount,
    totalLoanPayments,
    totalInterestPayments,
    payoffDate
  }
  return (
    <div className="flex flex-col col-span-2 gap-2">
      <LoanEst {...loanEst}/>
      <Amortization calculatedEmi={calculatedEmi} loanDetails={loanDetails}/>
    </div>
  )
}

export default Card