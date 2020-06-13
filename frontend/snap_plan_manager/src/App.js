import React from 'react';
import PlanListTemplate from './components/PlanListTemplate';
import snap_logo from './Snap_Plan_Manager_Logo_192.png';
import './App.css';
import Form from './components/Form'
import PlanItemList from './components/PlanItemList';
import DependencyItemList from './components/DependencyItemList';
//import LoginPopup from './components/LoginPopup';
const sec = require('./sha256.js');

/*
In the developing of this front-end, I refered many parts from below link.
https://velopert.com/3480

However, there are some differences between that and this front-end in design and list rendering.
*/

class App extends React.Component {

  id = 0
  //login, input, click(in todo), show_rec are variables which will not be used in Backend.
  state = {
    username:"NotLoggedOn",
    login:false,
    input: '',
    dep_input:'',
    todos: [],
    recent_removed:[],
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
          click:false,
          dep_id:0
        }),
        show_rec:false
    })
    }
  };
  handleKeyPress_dep =(parent_id,e)=>{
    if(e.key === 'Enter'){
      this.handleCreate_dep(parent_id);
    }
  }
  handleCreate_dep=(parent_id)=>{
    const {dep_input, todos} = this.state;
    const index = todos.findIndex(todo => todo.id === parent_id)
    const selected = todos[index]

    if (dep_input == ""){
      alert("Input is empty!");
    //console.log("Input is empty!")
    }
    else{
      const updateDependencies = selected.dependencies.concat(
        {
          id: selected.dep_id++,
          text: dep_input,
          checked:false
        }
      );
      console.log("UpdateDep : ", updateDependencies)

      const updateTodos = [...todos];
      updateTodos[index]={
        ...selected,
        dependencies:updateDependencies
      }

      this.setState({
        todos:  updateTodos,
        dep_input : ''
      })
    }
    console.log("Excuted handleCreate_dep")
  }
  handleChange_dep =(e)=>{
    this.setState({
      dep_input: e.target.value // input 의 다음 바뀔 값
    });
  }
  /* PlanItemList */
  onToggle=(id)=>{
      const {todos} = this.state;
      const index = todos.findIndex(todo => todo.id === id)
      const selected = todos[index]

      const updateTodos=[...todos];
      updateTodos[index] = {
        ...selected,
        checked: !selected.checked
      }
      this.setState({
          todos: updateTodos
      });
      
  }
  Click_sig = (id) =>{
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === id)
    const selected = todos[index]

    const updateTodos = [...todos];

    updateTodos[index] = {
      ...selected,
      click: !selected.click
    }
     this.setState({
       todos: updateTodos
     });
     console.log("Click_sig")
  }
  onToggle_dep=(id,parent_id)=>{
    const {todos} = this.state
    const parent_index = todos.findIndex(todo => todo.id === parent_id)
    const parent = todos[parent_index]

    const obj_index = parent.dependencies.findIndex(todo => todo.id === id)
    const obj = parent.dependencies[obj_index]

    const updateDependencies = [...parent.dependencies];
    updateDependencies[obj_index]={
      ...obj,
      checked: !obj.checked
    }

    const updateTodos = [...todos];
    updateTodos[parent_index]={
      ...parent,
      dependencies:updateDependencies
    }

    this.setState({
      todos:  updateTodos
    })
    //console.log("onToggle-dep")
  }
  //For Data Save/Load Request(connect with backend)
  request_del_todo=(user_id,id)=>{

  }
  request_del_todo_dep=(user_id,id,id_parent)=>{

  }
  request_get_todos=(user_id,)=>{

  }
  request_add_todo=(user_id,)=>{

  }
  request_add_todo_dep=(user_id,)=>{

  }
  request_login=(uname, pw)=>{

  }
  request_signup=(uname,pw)=>{

  }
  //Login, Signup, Logout
  handleIDClick=()=>{
    if(this.state.login){
      this.handleLogout()
    }
    else{
      this.handleLogin()
    }
  }
  handleLogout=()=>{
    this.id = 0
    this.setState({
      username:"NotLoggedOn",
      login:false,
      input:'',
      dep_input:'',
      todos:[],
      rec_cands:[],
      recent_removed:[],
      show_rec:false
    });
  }
  handleLogin=()=>{

  }

  /* Render */
  render(){
    /* Input Form(Create New Item) */
    const {input, show_rec, rec_cands, todos, dep_input, username} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      form_handleClick,
      handleCreate_dep,
      handleChange_dep,
      handleKeyPress_dep,
      handleIDClick,

      onToggle,
      Click_sig,
      onToggle_dep
    } = this;

  return (
    <div>
      <ul className="TopBar">
        <li className="Logo"><a href='./App.js'><img className="LogoImg" src="./Snap_Plan_Manager_Logo_192.png" alt="(Snap Plan Manager Logo)" height="42px">
          </img></a> SnapPlanner</li>
        <li><div className="username_btn" onClick={handleIDClick}>{username}</div></li>
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
          <PlanItemList 
            todos={todos} 
            onToggle = {onToggle} 
            Click_sig={Click_sig} 
            onToggle_dep={onToggle_dep}
            dep_input={dep_input}
            handleCreate_dep={handleCreate_dep}
            handleChange_dep={handleChange_dep}
            handleKeyPress_dep={handleKeyPress_dep}
          />
      </PlanListTemplate>
      <div className="other-info">
        <a href="https://github.com/Xxix2580/Snap_Plan_Manager" >Gihub Repository</a>
      </div>
    </div>
  );}
}

export default App;
