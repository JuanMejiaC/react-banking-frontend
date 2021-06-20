import React from 'react';
function Login(){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);  
    const userCtx = React.useContext(CurrentUserContext);
    const f = React.useContext(Funcion);
  
    function handleLogin(parent){
      console.log(name,email,password);
      const currentUser = ctx.users.find(element => element.email == parent.querySelector("#email").value &&
      element.password == parent.querySelector("#password").value)
      if(currentUser) {
        userCtx.user = currentUser.name;
        userCtx.balance = currentUser.balance;
        alert("Login Successful \n Welcome to BadBank")
        f.fff(true, userCtx);
      } else {
        alert("Sorry we could not authenticate your credentials\n Please tried again")
      }
      clearForm();
    }    
  
    function clearForm(){
      setEmail('');
      setPassword('');
    }
  
    return (
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={(  
                <>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={e => {handleLogin(e.target.parentNode)}}>Log In</button>
                </>
              )}
      />
    )
  }