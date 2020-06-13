import React, {Component} from 'react';
import './PlanItem.css';
import DependencyItemList from './DependencyItemList';
import DependencyForm from './DependencyForm';

class PlanItem extends Component{
    render(){
        const {text, checked, id,dependencies,click, onToggle, Click_sig, onToggle_dep ,handleCreate_dep ,dep_input, handleChange_dep, handleKeyPress_dep} = this.props;
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
            <div className="plan-item-parent">
                <div className="plan-item" onClick={()=>Click_sig(id)}>
                <div className="toggle" onClick={(e) => {
                e.stopPropagation(); //Stop the diffusion of events. It makes only run onRemove, not onToggle
                onToggle(id)}
                }><input type="checkbox" className="togglecheck"></input></div>
                
                <div className={`plan-text ${checked ? 'checked': ''}`}>
                    <div>{text}</div>
                </div>
                </div>
                {
                    click&&(
                    <div className="dependency_ui">
                        <div className="dependency_add">
                            <DependencyForm
                                par_id = {id}
                                value={dep_input}
                                handleCreate_dep={handleCreate_dep}
                                handleChange_dep={handleChange_dep}
                                handleKeyPress_dep={handleKeyPress_dep}
                            ></DependencyForm>
                        </div>
                        <div className="dependency_list">
                            <DependencyItemList todos={dependencies} id_parent={id} onToggle_dep={onToggle_dep} ></DependencyItemList>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default PlanItem;