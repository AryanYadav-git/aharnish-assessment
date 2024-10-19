type LoanEstParams = {
  calculatedEmi: any;
  amount: any;
  totalLoanPayments: number;
  totalInterestPayments: string;
  payoffDate: {
      month: number;
      year: string;
  };
}