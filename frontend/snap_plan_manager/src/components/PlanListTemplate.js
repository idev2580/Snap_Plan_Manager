import React from 'react'
import './PlanListTemplate.css'

/*Function -style*/
const PlanListTemplate = ({form, children}) => {
    return (
        <main className="plan-list-template">
            <div className="title">
                Plans
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="plans-wrapper">
                {children}
            </section>
        </main>

    );
}

export default PlanListTemplate