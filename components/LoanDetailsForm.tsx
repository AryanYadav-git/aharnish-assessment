"use client"

import { Input } from "./ui/input";
import { useState } from 'react';
import { Label } from "./ui/label";

const LoanDetailsForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    amount: 0,
    interest: 0,
    duration: 0,
    startDate: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoanDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className="p-8 bg-[#f4eee6] flex flex-col gap-4">
      <h1 className="font-semibold text-lg mb-2">Loan details</h1>

      <div>
        <Label htmlFor="amount">Loan Amount</Label>
        <Input 
          className="border-black" 
          id="amount" 
          name="amount" 
          value={loanDetails.amount} 
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

      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input 
          className="border-black" 
          id="startDate" 
          name="startDate" 
          value={loanDetails.startDate} 
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LoanDetailsForm;
