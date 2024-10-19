"use client"

import { Input } from "./ui/input";
import { useEffect, useState } from 'react';
import { Label } from "./ui/label";

const LoanDetailsForm = ({setCalculatedEmi, loanDetails, setLoanDetails}: any) => {
  const calculateEmi = (amount: number, interest: number, duration: number) => {
    const monthlyRate = (interest / 100) / 12;
    const payment = 
      (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);
      return payment.toFixed(2);
  }

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    //@ts-ignore
    await setLoanDetails(prevDetails  => ({
      ...prevDetails,
      [name]: value
    }));
  };

  useEffect(()=> {
    const { amount, interest, duration } = loanDetails;
    const emi = calculateEmi(amount, interest, duration);
    setCalculatedEmi(emi);
  }, [loanDetails])

  return (
    <div className="p-8 bg-[#f4eee6] flex flex-col gap-4">
      <h1 className="font-semibold text-lg mb-2">Loan details</h1>

      <div>
        <Label htmlFor="amount">Loan Amount</Label>
        <Input 
          className="border-black" 
          id="amount" 
          name="amount" 
          value={`${loanDetails.amount}`} 
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="interest">Interest Rate</Label>
        <Input 
          className="border-black" 
          id="interest" 
          name="interest" 
          value={loanDetails.interest} 
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="duration">Loan Term (months)</Label>
        <Input 
          className="border-black w-72" 
          id="duration" 
          name="duration" 
          value={loanDetails.duration} 
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="startDate">Start Date</Label>
        <input type="month" className="border-black border p-1 rounded-md bg-inherit" 
          id="startDate" 
          name="startDate" 
          value={loanDetails.startDate} 
          onChange={handleChange} />
      </div>
    </div>
  );
};

export default LoanDetailsForm;
