"use client"
import Card from "@/components/Card";
import LoanDetailsForm from "@/components/LoanDetailsForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [calculatedEmi, setCalculatedEmi] = useState("");
  const [loanDetails, setLoanDetails] = useState({
    amount: 0,
    interest: 0,
    duration: 0,
    startDate: "",
  });
  return (
    <div className="flex items-center justify-center h-full gap-4">
      <LoanDetailsForm loanDetails={loanDetails} setLoanDetails={setLoanDetails} setCalculatedEmi={setCalculatedEmi}/>
      <Card loanDetails={loanDetails} calculatedEmi ={calculatedEmi}/>
    </div>
  );
}
