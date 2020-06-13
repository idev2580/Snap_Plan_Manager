import React from 'react';
import PlanListTemplate from './components/PlanListTemplate';
import snap_logo from './Snap_Plan_Manager_Logo_192.png';
import './App.css';
import Form from './components/Form'
import PlanItemList from './components/PlanItemList';
//import LoginPopup from './components/LoginPopup';
const sec = require('./sha256.js');

/*
In the developing of this front-end, I refered many parts from below link.
https://velopert.com/3480

However, there are some differences between that and this front-end in design and list rendering.
*/

class App extends React.Component {

  id = 3
  //login, input, click(in todo), show_rec are variables which will not be used in Backend.
  state = {
    login:true,
    input: '',
    todos: [
      {id : 0, text : 'FreshmanPrj', checked:false, dependencies : [
        {id : 0, text : 'React', checked:true, dependencies: []},
        {id : 1, text : 'Express', checked:false, dependencies: []},
        {id : 2, text :'MongoDB', checked:false, dependencies: []}
      ], click:false},
      {id : 1, text : 'ChemExp Submit', checked:false, dependencies : [], click:false},
      {id : 2, text : 'Chem Note Submit', checked:true, dependencies : [], click:false}
    ],
    recent_removed:[
      {text : 'Physics Assignment', checked:false, dependencies : [], click:false}
    ],
    rec_cands:[],
    show_rec:false
  }

  /* Data Refresh */
  refresh
  /* Input Form(Create New Item) */
  handleKeyPress =(e)=>{
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }
  form_suggestClick=(text_get,pdependencies)=>{
    const {input, todos, show_rec} = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: text_get,
        checked: false,
        dependencies: pdependencies,
        click:false
      }),
      show_rec:false
    })
    console.log("text_get : ",text_get)
  }
  form_handleClick=(e)=>{
    let {input,todos,recent_removed,rec_cands,show_rec} = this.state;
    this.setState({
        show_rec:true,
        rec_cands:recent_removed.map((rec)=><li><p className="suggests" onClick={()=>{this.form_suggestClick(rec.text,rec.dependencies)}}>{rec.text}</p></li>)
      }
    )
    console.log("form_handleClick_todos:",todos)
    console.log("form_handleClick_Candidates:",recent_removed, rec_cands)
  }
  handleChange =(e)=>{
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }
  handleCreate =()=>{
    const {input, todos, show_rec} = this.state;
    if (input == ""){
      alert("Input is empty!");
    //console.log("Input is empty!")
    }
    else{
      this.setState({
        input: '', //Clear Input
        todos: todos.concat({
          id: this.id++,
          text: input,
          checked: false,
          dependencies: [],
          click:false
        }),
        show_rec:false
    })
    }
  };
  /* PlanItemList */
  onToggle=(id)=>{

  }
  Click_sig = (id) =>{

  }
  /* Render */
  render(){
    /* Input Form(Create New Item) */
    const {input, show_rec, rec_cands, todos} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      form_handleClick,

      onToggle,
      Click_sig
    } = this;

  return (
    <div>
      <ul className="TopBar">
        <li className="Logo"><a href='./App.js'><img className="LogoImg" src="./Snap_Plan_Manager_Logo_192.png" alt="(Snap Plan Manager Logo)" height="42px">
          </img></a> SnapPlanner</li>
        <li><a>Username</a></li>
      </ul>
      <PlanListTemplate form={
        <Form
          value={input}
          show_rec={show_rec}
          rec_cands={rec_cands}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          onClick={form_handleClick}
        />}>
          <PlanItemList todos={todos} onToggle = {onToggle} Click_sig={Click_sig}/>
      </PlanListTemplate>
    </div>
  );}
}

export default App;
