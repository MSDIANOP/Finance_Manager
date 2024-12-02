import React from "react";
import {useState,useEffect} from "react";
import axios from "axios";

const URL="https://finance-manager-9edf8-default-rtdb.firebaseio.com/";

const Expense=()=>{
    let obj={
        amount:"",
        description:"",
        category:""
    }
    const[expenses,setExpenses]=useState([]);
    const[newExpenses,setNewExpenses]=useState(obj);

    useEffect(()=>{
        axios.get(`${URL}/expenses.json`)
        .then(res=>{
            const data=res.data;
            const expenseList=[];
            for(let key in data){
                expenseList.push({...data[key], id:key})
            }
            setExpenses(expenseList);
        })
        .catch(err=>console.log(err));

    },[]);

     const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${URL}/expenses.json`,newExpenses).
        then(()=>{
            setExpenses([...expenses,newExpenses]);
            setNewExpenses(obj);
        })
        .catch(err=>console.log(err))
        
     }
    return (
        <div>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="number"
                value={newExpenses.amount}
                onChange={e=>
                    setNewExpenses({...newExpenses,amount:e.target.value})
                }
                placeholder="Amount"
                />
               <input
               type="text"
               value={newExpenses.description}
               onChange={e=>
                setNewExpenses({...newExpenses,amount:e.target.value})
               }
               placeholder="Description"
               />

               <input
               type="text"
               value={newExpenses.category}
               onChange={e=>
                setNewExpenses({...newExpenses,category:e.target.value})
               }
               placeholder="Category"

               />

               <input
               type="Date"
               value={newExpenses.date}
               onChange={e=>
                setNewExpenses({...newExpenses,date:e.target.value})
               }
               />
               <button type="submit">Add Expenses</button>

            </form>
        </div>
    )
}

export default Expense