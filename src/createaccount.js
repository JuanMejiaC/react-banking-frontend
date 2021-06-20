import React from 'react';
import { UserContext, Card } from './context';
function CreateAccount(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [createbutton, setCreateButton] = React.useState(false);
    const [showpasstips, setShowPassTips] = React.useState(false);
    
    
    const [inname, setInName] = React.useState(false);
    const [inmail, setInMail] = React.useState(false);
    const [inpass, setInPass] = React.useState(false);

    const ctx = React.useContext(UserContext);



    function validatePassword(passwordToValidate) {

      const strongPassword = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}))/;


      
      if(passwordToValidate.match(strongPassword)) {
        return true;
      }
      return false;

    }


    function validateEmail(mail) {
      const mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (mail.match(mailformat)) {
        return true;
      }
      return false;
    }


    function validate(nam, emal, pass){
      let errorMessage = "";
      if (nam.length < 5) {
        setInName(true);
        errorMessage = "The Name should be more than 4 caracters\n";
      }
      if (!validateEmail(emal)) {
        setInMail(true);
        errorMessage += 
        "Please enter a valid email\n";
      }
      if(!validatePassword(pass)){
        setInPass(true);
        errorMessage += "The password must contain:\n" +
                          "1 lowercase alphabetical character a-z\n" +
                          "1 upercase alphabetical character A-Z\n" +
                          "1 numeric character 0-9\n" +
                          "1 special character: !@#$%&*^\n" +
                          "at least 8 character or longer";
      }
      console.log(errorMessage);
      if(errorMessage != "") {
        alert(errorMessage);
        return false;
      }
      return true;
    }

    function handleTxtOnchange (val, txtId) { 
      switch(txtId) {
        case "name":
          setName(val);
          setInName(false);
          break;
        case "email":
          setEmail(val);
          setInMail(false);
          break;
        case "password":
          setPassword(val);
          setInPass(false);
          setShowPassTips(false);
          break
        default:
          break;
      }
      if((name !== '' && txtId !== "name") || (email !== '' && txtId !== "email") || (password !== '' && txtId !== "password") || val !== '') {
        setCreateButton(true);
      }else {
        setCreateButton(false);
      }
    }

    function handleCreate(){
      if (!validate(name, email, password)) {
        return;
      }
      ctx.users.push({name,email,password,balance:0});
      setShow(false);
    }    
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
    function showPassTips(value) {
      if(!value) {
        setShowPassTips(true);
      }
    }
  
    return (
      <Card
        bgcolor="primary"
        header="New Account"
        status={status}
        body={show ? (  
          <>
          Name<br/>
          <input type="input" className={inname ? "form-control border-red" : "form-control"} id="name" placeholder="Enter name" value={name} onChange={e => handleTxtOnchange(e.currentTarget.value, 'name')} /><br/>
          Email address<br/>
          <input type="input" className={inmail ? "form-control border-red" : "form-control"} id="email" placeholder="Enter email" value={email} onChange={e => handleTxtOnchange(e.currentTarget.value, 'email')}/><br/>
          Password<br/>
          <input type="password" className={inpass ? "form-control border-red" : "form-control"} id="password" placeholder="Enter password" value={password} onChange={e => handleTxtOnchange(e.currentTarget.value, 'password')} onFocus={e => showPassTips(e.currentTarget.value)}/><br/>
          {showpasstips ? (<div style={{fontSize:10}}>The password must contain: <br/>
                          1 lowercase alphabetical character: a-z<br/>
                          1 upercase alphabetical character: A-Z"<br/>
                          1 numeric character: 0-9<br/>
                          1 special character: !@#$%&*^<br/>
                          at least 8 character or longer"</div>) : (<div></div>)}<br/>
          <button type="submit" className="btn btn-light" disabled = {!createbutton? "disabled": ""} onClick={handleCreate}>Create Account</button>
          </>
        ):(
          <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
          </>
              )}
      />
    )
  }
  export default CreateAccount;