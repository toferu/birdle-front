import React from 'react'


interface InputProps {
    UserInput: string

}



export default function InputRow (props: InputProps) {

let InputArray = new Array(8)
 
//start with an empty array
//for each element in UserInput, create an element in the empty array with that element
//fill out the rest of the array with empty elements
InputArray = [...props.UserInput];
InputArray.length = 8;
// console.log(InputArray)

    return (

        <div className = 'row'>
                   { [...InputArray].map((element:string) => {
            return <div>{element}</div>
        })}
        </div>
    )

}