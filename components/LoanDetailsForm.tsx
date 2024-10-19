"use client"

    import { zodResolver } from "@hookform/resolvers/zod"
    import { useForm } from "react-hook-form"
    import { z } from "zod"
    
    import { Button } from "@/components/ui/button"
    import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form"
    import { Input } from "@/components/ui/input"
    
    const formSchema = z.object({
      amount: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      interest: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      time: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      date: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
    })
    

const LoanDetailsForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      interest:"",
      time:"",
      date:"",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 bg-[#f4eee6] p-8">
            <h1>Loan Details</h1>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="border-black w-72" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan term (months)</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} className="border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
    </div>
  )
}

export default LoanDetailsForm