import React from'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    general:[
        {from: 'Nathalie', msg: 'hey'},
        {from: 'Bob', msg: 'hey'},
        {from: 'Julie', msg: 'hey'},
    ],

    topic2:[
        {from: 'Nathalie', msg: 'hey'},
        {from: 'Nathalie', msg: 'hey'},
        {from: 'Nathalie', msg: 'hey'},

    ]
}

function reducer ( state, action){
    const  {from , msg, topic } = action.payload;
    switch(action.type){
        case ('RECEIVE_MESSAGE'):
        
            return {
                ...state,
                [topic]:[
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
            default : return state;
    }
    

}



let socket;

function SendChatAction(value){

    socket.emit('chat message', value);
}

export default function Store(props){

    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket){
        socket = io(':3001')

        socket.on('chat message', function(msg){
            dispatch({type: 'RECEIVE_MESSAGE' , payload : msg})
          });
    }


    const user = 'nath' + Math.random(100).toFixed(2);

   


    return(
        <CTX.Provider value={{allChats, SendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}