"use client"

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AmortizationSchedule = ({ calculatedEmi, loanDetails }: any) => {
  const { amount, duration, interest, startDate } = loanDetails;
  const [schedule, setSchedule] = useState([{
    paymentDate: "",
    principalPayment: "",
    interestPayment: "",
    emi: 0,
    balance: 0,
  },

  ]);
  const [isOpen, setIsOpen] = useState(true);

  const generateSchedule = () => {
    let balance = amount;
    let monthlyInterestRate = interest / 100 / 12;
    let tempSchedule = [];

    for (let month = 1; month <= duration; month++) {
      let interestPayment = balance * monthlyInterestRate;
      let principalPayment = calculatedEmi - interestPayment;
      balance -= principalPayment;

      const paymentDetails = {
        month,
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

  useEffect(()=> {
    generateSchedule();
  }, [calculatedEmi, loanDetails]);

  return (
    <div className='border border-t-0'>
      <Button
        className="bg-inherit rounded-none shadow-none text-lg text-black h-14 font-semibold w-full hover:bg-[#eef7ff] "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <div className="flex w-full justify-between items-center ">
            Show amortization schedule
            <ChevronDown className="size-4" />
          </div>
        ) : (
          <div className="flex w-full justify-between items-center ">
            Hide amortization schedule
            <ChevronUp className="size-4 rotate-180" />
          </div>
        )}
      </Button>
      {isOpen && <div className="px-4 h-96 overflow-y-scroll">
      {schedule.length > 0 && (
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr className='grid grid-cols-5 border-b py-2'>
                <th className='flex'>Payment Date</th>
                <th className='flex'>EMI</th>
                <th className='flex'>Interest Payment</th>
                <th className='flex'>Principal Payment</th>
                <th className='flex'>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className='grid grid-cols-5 border-b py-2'>
                  <td className='flex'>{item.paymentDate}</td>
                  <td className='flex'>${item.emi}</td>
                  <td>${item.interestPayment}</td>
                  <td>${item.principalPayment}</td>
                  <td>${item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>}
    </div>
  );
};

export default AmortizationSchedule;
