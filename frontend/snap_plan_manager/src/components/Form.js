import React from 'react'
import './Form.css'


/* 
value       : contents of input
onCreate    : the function which will be executed when button clicked.
onChange    : the function which will be executed when the input field is changing.
=> This feature will be used to make core feature of Snap Plan Manager(Weekly frequent work recommendation)
onKeyPress  : the function which will be executed when key is pressed.(To make "Enter key" = "Button Click")
*/

/*Function - style*/
const Form=({value, show_rec,rec_cands, onChange, onCreate, onKeyPress, onClick}) => {
    return(
        <div className="form_parent">
            <div className="form">
                <input value={value} onChange={onChange} onKeyPress={onKeyPress} onClick={onClick}/>
                <div className="create-button" onClick={onCreate}>
                    +
                </div>
            </div>
            {
                show_rec && (<div className="suggest-candidates"><ul>{rec_cands}</ul></div> )
            }
        </div>
    );
}

export default Form;