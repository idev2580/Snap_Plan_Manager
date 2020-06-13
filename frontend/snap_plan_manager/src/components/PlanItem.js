import React, {Component} from 'react';
import './PlanItem.css';

class PlanItem extends Component{
    render(){
        const {text, checked, id,dependencies,click, onToggle, Click_sig} = this.props;
        /*
        Below <div className="plan-item" onClick={()=>onToggle(id)}>, in original example,
        there should be this code.

        <div className="remove" onClick={(e) => {
            e.stopPropagation(); //Stop the diffusion of events. It makes only run onRemove, not onToggle
            onRemove(id)}
        }>&times;</div>

        However, I wanted the program to auto-delete with just checking and refresh(Re-load data from database.)
        So, I just had to add the data delete in DB function for checking.
        */
        return(
            <div className="plan-item" onClick={()=>Click_sig(id)}>
                <div className="toggle" onClick={(e) => {
                e.stopPropagation(); //Stop the diffusion of events. It makes only run onRemove, not onToggle
                onToggle(id)}
                }><input type="checkbox" className="togglecheck"></input></div>
                
                <div className={`plan-text ${checked ? 'checked': ''}`}>
                    <div>{text}</div>
                </div>
                {
                    click&&(<div className="dependencies"></div>)
                }
                {
                    checked && (<div className="check-mark"></div>)
                }
            </div>
        );
    }
}

export default PlanItem;