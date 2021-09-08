import React,{createContext, useReducer} from 'react';
import  TrnsacReducer  from './TransacReducer';

const intialQuote=
[{id:1, quote:"cash"},
{id:2, quote:"book"}];

export const TrnsacContext=createContext(intialQuote);

export const TransacProvider = ({children})=>{
const [state,dispatch]=useReducer(TrnsacReducer,intialQuote);

//Add Action

function AddQuote(transaction){
   dispatch({
       type:'ADD_QUOTE',
       payload:{
id:transaction.id,
quote:transaction.quote,
authorname:transaction.authorname
       }
   });
}

    return(
    <TrnsacContext.Provider value={{
        transactions:state, AddQuote}}
    >
        {children}
    </TrnsacContext.Provider>
);
}