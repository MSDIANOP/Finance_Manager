import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

let URL="https://finance-manager-9edf8-default-rtdb.firebaseio.com/";
 
const Dashboard=()=>{
  const [totalIncome,setTotalIncome]=useState(0);
  const [totalExpenses,setTotalExpenses]=useState(0);
  const [savingGoal,setSavingGoal]=useEffect(1000);

useEffect(()=>{
//for Income
axios.get(`${URL}/income.json`).
then(res=>{
    const data=res.data;
    let income=0;
    if(data){
    for(let key in data){
        income+=data[key].amount || 0;
    }
}
    setTotalIncome(income);
})
.catch(err=>console.log("error in fetching income data:",err));

//for Expenses
axios.get(`${URL}/expenses.json`).
then(res=>{
    const data=res.data;
    let expenses=0;
    if(data){
    for(let key in data){
        expenses+=data[key].amount || 0;
    }
}
    setTotalExpenses(expenses);
})
.catch(err=>console.log("error in fetching expenses data:",err));


},[])
       
    const currentSavings=totalIncome-totalExpenses
return(
<div>
    <h2>Dashboard</h2>
    <p>Total Income: {totalIncome}</p>
    <p>Toatal Expenses: {totalExpenses}</p>
    <p>Current Savings: {currentSavings}</p>
    <p>Saving Goal: {((currentSavings/savingGoal)*100)}%</p>
</div>
);

}
export default Dashboard