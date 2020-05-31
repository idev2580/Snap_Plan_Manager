import React from 'react';
import PlanListTemplate from './components/PlanListTemplate';
import snap_logo from './Snap_Plan_Manager_Logo_192.png';
import './App.css';
import Form from './components/Form'
import PlanItemList from './components/PlanItemList';
//import LoginPopup from './components/LoginPopup';

/*
In the developing of this front-end, I refered many parts from below link.
https://velopert.com/3480

However, there are some differences between that and this front-end in design and list rendering.
*/

function App() {
  return (
    <div>
      <ul className="TopBar">
        <li className="Logo"><a href='./App.js'><img className="LogoImg" src="./Snap_Plan_Manager_Logo_192.png" alt="(Snap Plan Manager Logo)" height="42px">
          </img></a> SnapPlanner</li>
        <li><a>Username</a></li>
      </ul>
      <PlanListTemplate form={<Form/>}>
          <PlanItemList/>
      </PlanListTemplate>
    </div>
  );
}

export default App;
