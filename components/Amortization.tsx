"use client"

import { useEffect, useState } from 'react';

const AmortizationSchedule = ({ calculatedEmi, loanDetails }: any) => {
  const { amount, duration, interest, startDate } = loanDetails;
  const [schedule, setSchedule] = useState([]);

  const generateSchedule = () => {
    let balance = amount;
    let monthlyInterestRate = interest / 100 / 12;
    let tempSchedule = [];

    for (let month = 1; month <= duration; month++) {
      let interestPayment = balance * monthlyInterestRate;
      let principalPayment = calculatedEmi - interestPayment;
      balance -= principalPayment;

      const paymentDetails = {
        paymentDate: getPaymentDate(startDate, month),
        emi: calculatedEmi,
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        balance: balance.toFixed(2),
      };

      tempSchedule.push(paymentDetails);

      if (balance < 0) {
        break;
      }
    }

    setSchedule(tempSchedule);
  };

  const getPaymentDate = (startDate: any, monthOffset: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthOffset - 1);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  useEffect(() => {
    generateSchedule();
  })
  return (
    <div>
      {schedule.map((item) => (
        <div className="">
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
};

export default AmortizationSchedule;
