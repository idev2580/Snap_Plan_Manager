import React from 'react';
import PlanListTemplate from './components/PlanListTemplate';
import snap_logo from './Snap_Plan_Manager_Logo_192.png';
import './App.css';
import Form from './components/Form'
import PlanItemList from './components/PlanItemList';
import DependencyItemList from './components/DependencyItemList';
import LoginPopup from './components/LoginPopup';
import axios from 'axios'

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
    //Below vars are FrontEnd-BackEnd Share Variables
    username:"NotLoggedOn",
    //Recent_Removed is Only-Get variable
    recent_removed:[],
    //Todos is Get-Send but not always match with backend's
    todos: [],

    //Below vars are Only-FrontEnd-Use-Variables
    login:false,
    loginpopup:false,
    input: '',
    rec_cands:[],
    show_rec:false,
    ID_input:'',
    PW_input:''
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
    let toadd={
      id: this.id++,
      text: text_get,
      checked: false,
      dependencies: pdependencies,
      click:false,
      dep_id:(pdependencies.length+10),
      dep_input:""
    }
    this.setState({
      input: '',
      todos: todos.concat(toadd),
      show_rec:false
    })
    if(this.state.login){
      this.request_add_todo(this.state.username,{id:toadd.id, text:toadd.text, dependencies:toadd.dependencies})//dep_todo tobeadded
    }
    console.log("text_get : ",text_get)
  }
  form_handleClick=(e)=>{
    let {input,todos,recent_removed,rec_cands,show_rec} = this.state;
    this.request_recent_removed(this.state.username).then((res)=>{
      console.log("RES.DATA:",res.data)
      this.setState({
      recent_removed : res.data,
      show_rec:!show_rec,
      rec_cands:recent_removed.map((rec)=><li><p className="suggests" onClick={()=>{this.form_suggestClick(rec.text,rec.dependencies)}}>{rec.text}</p></li>)
    })})
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
      console.log("Add... ID:",this.id)
      let toadd = {
        id: this.id++,
        text: input,
        checked: false,
        dependencies: [],
        click:false,
        dep_id:0,
        dep_input:""
      }
      this.setState({
        input: '', //Clear Input
        todos: todos.concat(toadd),
        show_rec:false
    })
    if(this.state.login){
      this.request_add_todo(this.state.username,{id:toadd.id, text:toadd.text, dependencies:[]})//dep_todo tobeadded
    }
    }
  };
  handleKeyPress_dep =(parent_id,e)=>{
    if(e.key === 'Enter'){
      this.handleCreate_dep(parent_id);
    }
  }
  handleCreate_dep=(parent_id)=>{
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === parent_id)
    const selected = todos[index]

    if (selected.dep_input == ""){
      alert("Input is empty!");
    //console.log("Input is empty!")
    }
    else{
      let toadd = {
        id: selected.dep_id++,
        text: selected.dep_input,
        checked:false
      }
      const updateDependencies = selected.dependencies.concat(
        toadd
      );
      console.log("UpdateDep : ", updateDependencies)

      const updateTodos = [...todos];
      updateTodos[index]={
        ...selected,
        dependencies:updateDependencies,
        dep_input:""
      }

      this.setState({
        todos:  updateTodos,
      })
      if(this.state.login){
        this.request_add_todo_dep(this.state.username, parent_id, {id:toadd.id, text:toadd.text})//dep_todo tobeadded
      }
    }
    console.log("Excuted handleCreate_dep")
  }
  handleChange_dep =(parent_id,e)=>{
    const {todos} = this.state;
    const index = todos.findIndex(todo => todo.id === parent_id)
    const selected = todos[index]

    const updateTodos = [...todos];
      updateTodos[index]={
        ...selected,
        dep_input:e.target.value
      }

    this.setState({
      todos:updateTodos
    });
  }
  handleChange_ID = (e) =>{
    this.setState({
      ID_input: e.target.value // input 의 다음 바뀔 값
    });
  }
  handleChange_PW = (e) =>{
    this.setState({
      PW_input: e.target.value // input 의 다음 바뀔 값
    });
  }
  handleKeyPress_Login = (e) =>{
    if(e.key === 'Enter'){
      this.handleLogin(this.state.ID_input,this.state.PW_input)
    }
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
      if(this.state.login){
        if(!(this.state.todos[index].checked)){
          console.log("remove_todo")
          this.request_del_todo(this.state.username,id)
        }
        else{
          console.log("add_todo")
          this.request_add_todo(this.state.username,{id:selected.id, text:selected.text, dependencies:selected.dependencies})
        }
      }
      
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
    if(!this.state.todos[parent_index].dependencies[obj_index].checked){
      console.log("remove_dep")
      this.request_del_todo_dep(this.state.username,parent_id,id)
    }
    else{
      this.request_add_todo_dep(this.state.username,parent_id,{id:obj.id, text:obj.text})
    }
    
    //console.log("onToggle-dep")
  }
  //For Data Save/Load Request(connect with backend)
  request_del_todo=(user_id,id)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/todosremove", 
      data:{
        username:user_id,
        type:1,
        id:id
      }
    })
  }
  request_del_todo_dep=(user_id,par_id,dep_id)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/todosremove", 
      data:{
        username:user_id,
        type:2,
        parent_id:par_id,
        id:dep_id
      }
    })
  }
  request_add_todo=(user_id,todoobj)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/todos", 
      data:{
        username:user_id,
        type:1,
        todo:todoobj
      }
    })
  }
  request_add_todo_dep=(user_id,par_id,dep_todo)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/todos", 
      data:{
        username:user_id,
        type:2,
        parent_id:par_id,
        todo:dep_todo
      }
    })
  }
  request_login=(uname, pw)=>{
      return new Promise (function(resolve,reject){
          console.log("ID:",uname,"/PW:",pw)
          resolve(axios({
            method:'post',
            url:"http://ssal.sparcs.org:40000/login", 
            data:{id:uname, pw:pw}
          })
          )}
      )
}

  request_signup=(uname,pw)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/signup", 
      data:{
        id:uname,
        pw:pw
      }
    })
  }

  request_recent_removed=(uname)=>{
    return axios({
      method:'post',
      url:"http://ssal.sparcs.org:40000/todoshistory", 
      data:{
        username:uname
      }
    })
  }
  //Login, Signup, Logout
  handleIDClick=()=>{
    if(this.state.login){
      this.handleLogout()
    }
    else{
      this.handleLoginPopup()
    }
  }
  handleSignup=(uname,pw)=>{
    console.log("Signup Process")
    this.request_signup(uname,pw)
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
  handleLoginPopup=()=>{
    const {loginpopup} = this.state;
    this.setState({
      loginpopup:!loginpopup
    });
  }

  handleLogin=(uname,pw)=>{
    console.log("Clicked Login Button.")
    this.request_login(uname,pw).then((get)=>{
      //console.log("Loginbool",get.data.loginbool)
      console.log({username:uname})
      //Originally, this must be "GET" Requst , however, get method of Axios was too unstable.
      //So, replaced with 'POST' Request.
        axios({
          method:'post',
          url:"http://ssal.sparcs.org:40000/todosget", 
          data:{username:uname, pw:pw}
        }).then((todos)=>{
        if (get.data.loginbool){
          this.setState({
            login:true,
            username:uname,
            todos:todos.data.todos,
            loginpopup:false,
          })
          this.id=todos.data.id
          console.log(this.state.id)
          console.log("Todos", this.state.todos)
        }
      }
      )
      .catch(
          this.setState({
          login:false,
          username:"NotLoggedIn",
          todos:[],
          loginpopup:true
        })
        )  
      }
    )
  }

  /* Render */
  render(){
    /* Input Form(Create New Item) */
    const {input, show_rec, rec_cands, todos, username, loginpopup, ID_input, PW_input} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      form_handleClick,
      handleCreate_dep,
      handleChange_dep,
      handleKeyPress_dep,
      handleIDClick,

      handleChange_ID,
      handleChange_PW,
      handleKeyPress_Login,
      handleLogin,
      handleSignup,

      onToggle,
      Click_sig,
      onToggle_dep
    } = this;

  return (
    <div>
      <ul className="TopBar">
        <li className="Logo"><a href='./App.js'><img className="LogoImg" src="./Snap_Plan_Manager_Logo_192.png" alt="(Snap Plan Manager Logo)" height="42px">
          </img></a> SnapPlanner</li>
        <li><div className="username_btn" onClick={handleIDClick}>{username+"(Login/Logout)"}</div></li>
      </ul>
      {
      loginpopup&&<LoginPopup className = "login-popup"
        id_input={ID_input}
        pw_input={PW_input}
        onChange_ID={handleChange_ID}
        onChange_PW={handleChange_PW}
        onKeyPress={handleKeyPress_Login}
        handlelogin={handleLogin}
        handleSignup={handleSignup}
      ></LoginPopup>
      }
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
