import { useState } from 'react';
import './App.css'
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [data, setdata] = useState({})
  const [showdata, setShowdata] = useState(false)
  const onSubmit = data => {
    reset()
    let principal = parseFloat(data.principal);
    let rate = parseFloat(data.rate);
    let time = parseFloat(data.time);
    let rateInPercent = (rate / 100);
    let rateM = (1 + (rateInPercent / 4)) ** 4 - 1;
    rateM = (1 + rateM) ** (1 / 12) - 1;
    const simpleInterest = (principal * (1 + rateM) ** time) - principal;
    setShowdata(true)
    setdata({ ...data, simpleInterest });
  }
  return (
    <>
      <div className='p-2 mt-3 text-sm font-mono'>
        <h1 className='text-3xl'>Fixed Deposit Calculator</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3 mt-7'>

            <div className='flex gap-3 w-80 justify-between'><span>Principal: </span><input className='border border-slate-500 px-1 rounded-md outline-none' type='number' {...register("principal", { required: true })} /></div>

            <div className='flex w-80 justify-between gap-3'><span>Rate: </span><input className='border border-slate-500  px-1 rounded-md outline-none' type='number' step="any" {...register("rate", { required: true })} /></div>

            <div className='flex gap-3 w-80 justify-between'><span>Time(in months): </span><input className='border border-slate-500  px-1 rounded-md outline-none' type='number' {...register("time", { required: true })} /></div>

            <button className='bg-slate-200 cursor-pointer border border-black px-2 py-1 w-40 rounded-xl' type='submit'>Calculate</button>
          </div>
        </form>

        {showdata && <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-bold mt-4'>Result: </h1>
          <div className='text-md flex gap-2'> <span> Principal: </span>Rs.{data.principal}</div>
          <div className='text-md flex gap-2'> <span> Rate: </span>{data.rate}%</div>
          <div className='text-md flex gap-2'> <span> Time: </span>{data.time} months</div>
          <div className='text-md flex gap-2'> <span> Interest: </span>Rs.{data.simpleInterest.toFixed(2)}</div>
        </div>}


      </div >
    </>
  )
}

export default App
