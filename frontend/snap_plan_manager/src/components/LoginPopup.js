import React from 'react';
import './LoginPopup.css';

class LoginPopup extends React.Component{
    render(){
        const {id_input, pw_input, handlelogin, handleSignup, onChange_ID, onChange_PW , onKeyPress} = this.props;
        return(
        <div className="login-popup-box">
            <h2>Login</h2>
            <p>Login to use save/load feature.</p>
            <div className="id">
                <p>ID </p><input value={id_input} onChange={onChange_ID} onKeyPress={onKeyPress}/>
            </div>
            <div className="pw">
                <p>PW</p><input type="password" value={pw_input} onChange={onChange_PW} onKeyPress={onKeyPress}/>
            </div>
            <div className="buttons">
                <p onClick={(e)=>handlelogin(id_input,pw_input)}>Login</p><p onClick={(e)=>handleSignup(id_input,pw_input)}>Signup</p>
            </div>
        </div>);
    }
}

export default LoginPopup ;