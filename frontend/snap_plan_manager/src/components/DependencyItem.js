import React, {Component} from 'react';
import './DependencyItem.css';

class DependencyItem extends Component{
    render(){
        const {text, checked, id, onToggle_dep, id_parent} = this.props;

        return(
            <div className="dep-item">
                <div className="toggle" onClick={(e) => {
                e.stopPropagation(); //Stop the diffusion of events. It makes only run onRemove, not onToggle
                onToggle_dep(id, id_parent)}
                }><input type="checkbox" className="togglecheck"></input></div>
                
                <div className={`plan-text ${checked ? 'checked': ''}`}>
                    <div>{text}</div>
                </div>
            </div>
        );
    }
}

export default DependencyItem;