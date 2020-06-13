import React, {Component} from 'react'
import PlanItem from './PlanItem'


class PlanItemList extends Component{
    render(){
        const{todos, onToggle, Click_sig, onToggle_dep, dep_input, handleCreate_dep, handleChange_dep, handleKeyPress_dep} = this.props;

        const planlist = todos.map(
            ({id,text,checked,click,dependencies})=>(
            <PlanItem 
            id={id}
            text={text}
            checked={checked}
            dependencies={dependencies}
            click = {click}

            onToggle={onToggle}
            Click_sig={Click_sig}
            onToggle_dep={onToggle_dep}
            key={id}

            dep_input={dep_input}
            handleCreate_dep={handleCreate_dep}
            handleChange_dep={handleChange_dep}
            handleKeyPress_dep={handleKeyPress_dep}
            ></PlanItem>
            )
        );
        return(
            <div>
                {planlist}
            </div>
        );
    }
}

export default PlanItemList;