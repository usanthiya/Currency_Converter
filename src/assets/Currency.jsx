import React, { useEffect } from 'react'
import {useState} from "react";
import axios from 'axios';
export const Currency = () => {
  const [amount,setAmount]=useState(1);
  const [fromcurrency,setFromCurrency]=useState("USD");
  const [tocurrency,setToCurrency]=useState("INR");
  const[convertedAmount,setconvertedAmount]=useState(null);
  const [exchangeRate,setexchangeRate]=useState(null);
  useEffect(()=>{
    const getexchangerate=async()=>{
        try{
            let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`;
            const res=await axios.get(url);
            setexchangeRate(res.data.rates[tocurrency]);
        }catch(error){
           console.error("Error fetching exchange rate: ",error)
        }
    }
    getexchangerate();
  },[fromcurrency,tocurrency]);

  useEffect(()=>{
      if(exchangeRate!==null){
        setconvertedAmount((amount * exchangeRate).toFixed(2));
      }
  },[amount, exchangeRate])

  const handleamount=(e)=>{
    let amount=parseFloat(e.target.value);
    setAmount(isNaN(amount)?0:amount);
  }

  const handleFromCurrency=(e)=>{ 
     setFromCurrency(e.target.value);
  };
  const handleToCurrency=(e)=>{ 
    setToCurrency(e.target.value);
 };
  return (
    <>
      <div className='currency'>
        <div className='body'></div>
        <div className="data">
            <h1>Currency Converter</h1>
            <div className='input-conatiner'>
                <label htmlFor='num'>Amount</label>
                <input id="num" type="number" value={amount} onChange={handleamount}/>
            </div>
            <div className='input-conatiner'>
              <label htmlFor='from curr' >From Currency</label>
                <select id="from curr" value={fromcurrency} onChange={handleFromCurrency}>
                    <option value="USD">USD - United States Dollars</option>
                    <option value="EUR">EUR - EURO</option>
                    <option value="GBP">GBP - BRitish Pound Streling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                </select>
            </div>
            <div className='input-conatiner'>
              <label htmlFor='to curr'>To Currency</label>
                <select id="to curr" value={tocurrency} onChange={handleToCurrency}>
                <option value="USD">USD - United States Dollars</option>
                    <option value="EUR">EUR - EURO</option>
                    <option value="GBP">GBP - BRitish Pound Streling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                </select>
            </div>
            <div className='output'>
                <p>{amount} {fromcurrency} is equal to {convertedAmount} {tocurrency}</p>
            </div>
        </div>
      </div>
    </>
  )
}
