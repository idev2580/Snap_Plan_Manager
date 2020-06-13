import React, {Component} from 'react'
import DependencyItem from './DependencyItem'

class DependencyItemList extends Component{
    render(){
        const{todos, onToggle_dep, id_parent } = this.props;

        const dependencylist = todos.map(
            ({id,text,checked})=>(
            <DependencyItem 
            id={id}
            text={text}
            checked={checked}
            id_parent = {id_parent}

            onToggle_dep={onToggle_dep}
            key={id}
            ></DependencyItem>
            )
        );
        return(
            <div>
                {dependencylist}
            </div>
        );
    }
}

export default DependencyItemList;