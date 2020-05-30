import React from 'react'
import './Form.css'


/* 
value       : contents of input
onCreate    : the function which will be executed when button clicked.
onChange    : the function which will be executed when the input field is changing.
=> This feature will be used to make core feature of Snap Plan Manager(Weekly frequent work recommendation)
onKeyPress  : the function which will be executed when key is pressed.(To make "Enter key" = "Button Click")
*/

const Form=({value, onChange, onCreate, onKeyPress}) => {
    return(
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
            <div className="create-button" onClick={onCreate}>
                Create
            </div>
        </div>
    )
}

export default Form;