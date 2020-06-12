import React, {Component} from 'react'
import PlanItem from './PlanItem'

class PlanItemList extends Component{
    render(){
        const{todos, onToggle, Click_sig} = this.props;

        const planlist = todos.map(
            ({id,text,checked})=>(
            <PlanItem 
            id={id}
            text={text}
            checked={checked}
            onToggle={onToggle}
            Click_sig={Click_sig}
            key={id}
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