"use client"
const Card = ({calculatedEmi, loanDetails}: any) => {
  const {amount, duration, interest, startDate} = loanDetails;
  const totalLoanPayments = calculatedEmi * duration ;
  const totalInterestPayments = (totalLoanPayments-amount).toFixed(2);
  const payoffDate ={
    month: 0,
    year: ""
  }
  const years = duration/12;
  payoffDate.year = (Number.parseInt(startDate.substring(0,4))+years).toFixed(0);
  payoffDate.month = (Number.parseInt(startDate.substring(5,7)) + (duration % 12)) % 12;

  return (
    <div className="flex flex-col gap-2">
      <p>Card: {calculatedEmi}</p>
      <p></p>Card: {totalLoanPayments}
      <p></p>Card: {totalInterestPayments}
      <p>{startDate}</p>
      <p></p>Card: {`${payoffDate.month} / ${payoffDate.year}`}
    </div>
  )
}

export default Card