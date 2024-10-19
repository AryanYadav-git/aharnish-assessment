import React from 'react'

// interface LoanEstParams {
//   calculatedEmi: any;
//   amount: any;
//   totalLoanPayments: number;
//   totalInterestPayments: string;
//   payoffDate: {
//       month: number;
//       year: string;
//   };
// }

const LoanEst = (loanEst: LoanEstParams) => {
  const { calculatedEmi, amount, totalLoanPayments, totalInterestPayments, payoffDate } = loanEst;
  return (
    <div className='grid grid-cols-1 w-full p-4 border gap-3'>
      <h1 className='font-bold mb-2'>Your loan estimate</h1>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <h2 className='text-lg'>Monthly Payment</h2>
          <p className='text-green-700 text-3xl'>{`$ ${calculatedEmi}`}</p>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className='flex w-full text-lg justify-between pb-2 border-zinc-400 border-b'>
            Total principal <span className='text-green-800 font-semibold'>{`$ ${amount}`}</span>
          </p>
          <p className='flex w-full text-lg justify-between pb-2 border-zinc-400 border-b'>
          Total loan payments <span className='text-green-800 font-semibold'>{`$ ${totalLoanPayments}`}</span>
          </p>
          <p className='flex w-full text-lg justify-between pb-2 border-zinc-400 border-b'>
          Total interest payments <span className='text-green-800 font-semibold'>{`$ ${totalInterestPayments}`}</span>
          </p>
          <p className='flex w-full text-lg justify-between pb-2 border-zinc-400 border-b'>
          Payoff date <span className='text-green-800 font-semibold'>{`${payoffDate.month}/${payoffDate.year}`}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoanEst