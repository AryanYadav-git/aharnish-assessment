"use client";

import { Input } from "./ui/input";
import { useEffect, useState } from 'react';
import { Label } from "./ui/label";
import * as z from "zod";

const loanDetailsSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1").max(1000000, "Amount cannot exceed $1,000,000"),
  interest: z.number().min(1, "Interest rate must be at least 1%").max(100, "Interest rate cannot exceed 100%"),
  duration: z.number().min(1, "Duration must be at least 1 month").max(360, "Duration cannot exceed 360 months"),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date format"),
});

const LoanDetailsForm = ({ setCalculatedEmi, loanDetails, setLoanDetails }: any) => {
  const [errors, setErrors]: any = useState({});

  const calculateEmi = (amount: number, interest: number, duration: number) => {
    const monthlyRate = (interest / 100) / 12;
    const payment = 
      (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);
    return payment.toFixed(2);
  };

  const validateForm = (name: string, value: any) => {
    const parsedData = {
      ...loanDetails,
      [name]: value,
    };

    const result = loanDetailsSchema.safeParse(parsedData);

    if (!result.success) {
      const errorMessages: any = {};
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages);
    } else {
      setErrors({});
    }
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    const numericValue = name === "startDate" ? value : Number(value);

    validateForm(name, numericValue);

    await setLoanDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: numericValue,
    }));
  };

  useEffect(() => {
    const { amount, interest, duration } = loanDetails;
    if (amount > 0 && interest > 0 && duration > 0 && Object.keys(errors).length === 0) {
      const emi = calculateEmi(amount, interest, duration);
      setCalculatedEmi(emi);
    }
  }, [loanDetails, errors]);

  return (
    <div className="p-6 pb-12 bg-[#f4eee6] col-span-1 flex flex-col h-fit gap-4 w-full">
      <h1 className="font-semibold text-lg mb-2">Loan details</h1>
      <div>
        <Label htmlFor="amount">Loan Amount</Label>
        <Input
          className={`${errors['amount'] ? 'border-red-500 bg-red-100' : 'border-black'}`} // Apply error style if invalid
          id="amount"
          name="amount"
          value={loanDetails.amount}
          onChange={handleChange}
        />
        {errors['amount'] && <p className="text-red-500 text-sm mt-1">{errors['amount']}</p>}
      </div>
      <div>
        <Label htmlFor="interest">Interest Rate</Label>
        <Input
          className={`${errors['interest'] ? 'border-red-500 bg-red-100' : 'border-black'}`}
          id="interest"
          name="interest"
          value={loanDetails.interest}
          onChange={handleChange}
          maxLength={2}
        />
        {errors['interest'] && <p className="text-red-500 text-sm mt-1">{errors['interest']}</p>}
      </div>
      <div>
        <Label htmlFor="duration">Loan Term (months)</Label>
        <Input
          className={`${errors['duration'] ? 'border-red-500 bg-red-100' : 'border-black'}`}
          id="duration"
          name="duration"
          value={loanDetails.duration}
          onChange={handleChange}
        />
        {errors['duration'] && <p className="text-red-500 text-sm mt-1">{errors['duration']}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="startDate">Start Date</Label>
        <input
          type="month"
          className={`${errors['startDate'] ? 'border-red-500 bg-red-100' : 'border-black'} border p-1 rounded-md bg-inherit`}
          id="startDate"
          name="startDate"
          value={loanDetails.startDate}
          onChange={handleChange}
        />
        {errors['startDate'] && <p className="text-red-500 text-sm mt-1">{errors['startDate']}</p>}
      </div>
    </div>
  );
};

export default LoanDetailsForm;
