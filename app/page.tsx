"use client"
import Card from "@/components/Card";
import LoanDetailsForm from "@/components/LoanDetailsForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [calculatedEmi, setCalculatedEmi] = useState("");
  const [loanDetails, setLoanDetails] = useState({
    amount: 10000,
    interest: 10,
    duration: 60,
    startDate: "2024-10",
  });
  return (
    <div className="flex justify-center md:px-10 lg:px-40 ">
    <div className=" grid grid-cols-1 md:grid-cols-3 w-full py-12 h-full gap-4">
      <LoanDetailsForm  loanDetails={loanDetails} setLoanDetails={setLoanDetails} setCalculatedEmi={setCalculatedEmi}/>
      <Card loanDetails={loanDetails} calculatedEmi ={calculatedEmi}/>
    </div>
    </div>
  );
}
