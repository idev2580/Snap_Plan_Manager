import React from 'react'
import './Form.css'

const DependencyForm=({par_id,value,handleCreate_dep,handleChange_dep, handleKeyPress_dep}) => {
    return(
        <div className="form_parent">
            <div className="form">
                <input value={value} onChange={(e)=>handleChange_dep(par_id,e)} onKeyPress={(e)=>handleKeyPress_dep(par_id,e)}/>
                <div className="create-button" onClick={()=>handleCreate_dep(par_id)} >
                    +
                </div>
            </div>
        </div>
    );
}

export default DependencyForm;