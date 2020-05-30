import React, {Component} from 'react'
import PlanItem from './PlanItem'

class PlanItemList extends Component{
    render(){
        const{todos, onToggle, onRemove} = this.props;
        return(
            <div>
                <PlanItem text="REACT"/>
                <PlanItem text="SPARCS"/>
                <PlanItem text="JAVASCRIPT"/>
            </div>
        );
    }
}

export default PlanItemList;