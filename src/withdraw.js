import React from 'react';
import { UserContext, Card } from './context';
import { keyCodes, formatToCurrency } from './helperfunctions';
function  Withdraw(){
    const [cash, setCash]       = React.useState('');
    // const [check, setCheck] = React.useState('');
    const [blnce, setBlnce] = React.useState(0);
    const [show, setShow] = React.useState(false)
    const [success, setSuccess] = React.useState(false);
    const [withdrawbutton, setWithDrawButton] = React.useState(false);
    const ctx = React.useContext(UserContext);
  
    function handleInputOnKeyDown(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
        alert("Please use number pad");
      }
    }
    
    function handleInputOnKeyUp(e, txtId) {
      if (e.keyCode == 109) {
        alert("Should be a positive number");
        e.currentTarget.value = '';
        clearForm(txtId);
      } else if (e.keyCode == 110 ) {
        alert("Plese start entering the amount");
        clearForm(txtId);
        e.currentTarget.value = '';
      }else if (keyCodes(e.keyCode)) { 
        parseFloat(e.currentTarget.value) >= 0? setWithDrawButton(true) : clearForm(txtId);
      } else {
        alert("Should be a number");
        clearForm(txtId);
      }
    }
  
    function handleWithdraw(parent){
      let balance = 0.0;
      let currentUser;
      let witdrawal = parseFloat(parent.querySelector("#withdraw").value);
      balance = !isNaN(witdrawal)? witdrawal : 0.0;
      // balance += !isNaN(checkT)? checkT : 0;
      // console.log(balance);
      if(balance < 0) {
        alert("Amount Cannot be negative");
      } else if (blnce < witdrawal){
        alert("Insufficient funds");
      }else{
      
        currentUser = ctx.users.find(element => 
          element.name == parent.querySelector("#select").value
      );
      currentUser.balance = currentUser.balance.toFixed(2) - balance;
      console.log(currentUser.balance);
      console.log(ctx);
      setBlnce(currentUser.balance.toFixed(2));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    }
      
      balance = 0;
      clearForm();
      setWithDrawButton();
    }
  
    function clearForm(txtId){
     setCash('') ;
    }
  
    const handleSelectChange = (e) => {
      if(e.currentTarget.value == "Select User") {
        setShow(false);
        return;
      }
      ctx.users.find(element => {if(element.name == e.currentTarget.value)setBlnce(element.balance.toFixed(2))});
      setShow(true);
    }
  
    function handleTxtOnchange (val, txtId) {
      // if (val.slice(val.indexOf("."), -1).length > 2) { //this is good TODO: i need to handle de decimal point at handleDeposit
      //   val = val.slice(0, (val.indexOf(".") + 3));
      //   alert("No more than 2 decimal");
      // }
      setCash(formatToCurrency(val));
      if(!val) {
        clearForm(txtId);
        
      }
      if(parseFloat(val) < 0) {
        alert("Should not be negative");
        clearForm(txtId);
        return;
      }
      if(parseFloat(val) == 0) {
        clearForm(txtId);
        return;
      }
      if(parseFloat(val) > 0 ) {
        
        setWithDrawButton(true);
      } else {
        setWithDrawButton(false);
      }
  
    }
  
    return (
      <Card
        bgcolor="primary"
        header="Withdraw"
        // status={status}
        body={(
                <>
                Select User<br/>
                <select className="form-select form-select-sm" aria-label=".form-select-sm" id="select" onChange={handleSelectChange}>
                  <option value="Select User">Select User</option>
                  {ctx.users.map((element, index) => 
                      <option value={element.name} key={index}>{element.name}</option>
                    )
                  }
                </select><br/><br/>
                {
                  show?
                  <>
                  Balance<br/>
                  <h1><span className="badge bg-info">{blnce}</span></h1>
                  {success? <h1><span className="badge bg-success">Success</span></h1> : <></>}
                  <br/>
                  Withdraw Amount<br/>
                  <input type="text" inputMode="numeric" className="form-control" id="withdraw" min="0" step=".01" placeholder="Enter Amount" value={cash} onChange={e => handleTxtOnchange(e.currentTarget.value)} onKeyDown={e => handleInputOnKeyDown(e)} onKeyUp={e => handleInputOnKeyUp(e)}/><br/>
                  <button type="submit" className="btn btn-light" disabled = {!withdrawbutton? "disabled": ""} onClick={e => {handleWithdraw(e.target.parentNode)}}>Withdraw</button>
                  </>
                  :<></>
                }
                </>
              )}
      />
    )
  }
  export default  Withdraw;