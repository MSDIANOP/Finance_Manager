import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

let URL="https://finance-manager-9edf8-default-rtdb.firebaseio.com/";
 
const Income=()=>{
    let obj={
        amount:"",
        description:"",
        date:""
    }
    const[income,setIncome]=useState([]);
    const [newIncome,setNewIncome]=useState(obj)

    useEffect(()=>{
        axios.get(`${URL}/income.json`).
        then(res=>{
            const data=res.data;
            const incomeList=[];
            for(let key in data){
                incomeList.push({...data[key], id:key});
            }
            setIncome(incomeList);
        })
        .catch(err=>console.log(err));
    },[]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${URL}/income.json`,newIncome)
        .then(()=>{
            setIncome([...income,newIncome]
            )
            setNewIncome(obj);
        })
        .catch(err=>console.log(err));
    }


    return (
        <div>
            <h2>Add Income</h2>
            <form onSubmit={handleSubmit}>
            <input  type="number" 
            value={newIncome.amount}
           onChange={e=>{
            setNewIncome({...newIncome,description:e.target.value})
           }}
           placeholder="Description"
            />
            <input type="date"
            value={newIncome.date}
            onChange={e=>
            setNewIncome({...newIncome,date:e.target.value})    
            }
            />
            <button type="submit">Add Income</button>
            </form>
            
            <h2>Income List</h2>
            <ul>
               {income.map((ele)=>{
                <li>{ele.amount}-{ele.description}({ele.date})</li>
               })}
            </ul>
            
        </div>
    )
}
export default Income