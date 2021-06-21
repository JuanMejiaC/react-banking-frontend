import React from 'react';
import { UserContext, Card } from './context';
import { keyCodes, formatToCurrency } from './helperfunctions';
function Deposit(){
    const [cash, setCash]       = React.useState('');
    const [check, setCheck] = React.useState('');
    const [blnce, setBlnce] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [okbutton, setokButton] = React.useState(false);
    const ctx = React.useContext(UserContext);

    
    function handleInputOnKeyDown(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
        alert("Please use number pad")
        
      }
    }

    function handleInputOnKeyUp(e, txtId) {
      console.log(e.keyCode);
      if (e.keyCode == 109) {
        alert("Should be a positive number");
        e.currentTarget.value = '';
        clearForm(txtId);
      } else if (e.keyCode == 110 ) {
        alert("Plese start entering the amount");
        clearForm(txtId);
        e.currentTarget.value = '';
      }else if (keyCodes(e.keyCode)) { 
        parseFloat(e.currentTarget.value) >= 0? setokButton(true) : clearForm(txtId);
      } else {
        alert("Should be a number");
        clearForm(txtId);
      }
    }
  
    function handleDeposit(parent){
      let balance = 0.0;
      let currentUser;
      let cashT = parseFloat(parent.querySelector("#cash").value);
      let checkT = parseFloat(parent.querySelector("#check").value);
      balance += !isNaN(cashT)? cashT : 0.0;
      balance += !isNaN(checkT)? checkT : 0.0;
      if(balance < 0) {
        alert("Amount Cannot be negative");
      } else{
      
        currentUser = ctx.users.find(element => 
          element.name == parent.querySelector("#select").value
      );
      currentUser.balance = parseFloat(currentUser.balance).toFixed(2) + balance;
      setBlnce(currentUser.balance.toFixed(2));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    }
      balance = 0;
      clearForm("both");
    }
  
    function clearForm(txtId){
      
      if(txtId == "cash") {
        console.log("cash")
        setCash('');
        if(check == "") {
          setokButton(false);
          console.log("check")
        }
      }
  
      if(txtId == "check") {
        setCheck('');
        if(cash == "") {
          setokButton(false);
        }
      }
  
      if(txtId == "both") {
          setCash('');
          setCheck('');
          setokButton(false);
      }
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
     
      switch(txtId) {
        case "cash":

          // }
          setCash(formatToCurrency(val));
          // console.log(`parse float ${parseFloat(parseFloat(val).toFixed(2) / 100).toFixed(2)}`);
          break;
        case "check":
          setCheck(formatToCurrency(val));
          break
        default:
          break;
      }
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
      if((parseFloat(cash) > 0 || parseFloat(check) > 0) || parseFloat(val) > 0 ) {
        
        setokButton(true);
      } else {
        setokButton(false);
      }
  
    }
  
    return (
      <Card
        bgcolor="primary"
        header="Deposit"
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
                </select><br/>
                {
                  show?
                  <>
                  Balance<br/>
                  <h1><span className="badge bg-info">{blnce}</span></h1>
                  {success? <h1><span className="badge bg-success">Success</span></h1> : <></>}
                  <br/>
                  Cash Deposit<br/>
                  <input type="text" inputMode="numeric" className="form-control" id="cash" min="0" step="0.01" placeholder="Enter Amount" value={cash} onChange={e => handleTxtOnchange(e.currentTarget.value, "cash")} onKeyDown={e => handleInputOnKeyDown(e)} onKeyUp={e => handleInputOnKeyUp(e, "cash")}/><br/>
                  Check Depostit<br/>
                  <input type="text" inputMode="numeric" className="form-control" id="check" min="0.00" step="0.01" placeholder="Enter Amount" value={check} onChange={e => handleTxtOnchange(e.currentTarget.value, "check")} onKeyDown={e => handleInputOnKeyDown(e)} onKeyUp={e => handleInputOnKeyUp(e, "check")}/><br/>
                  <button type="submit" className="btn btn-light" disabled = {!okbutton? "disabled": ""} onClick={e => {handleDeposit(e.target.parentNode)}}>Ok</button>
                  </>
                  :<></>
                }
                </>
              )}
      />
    )
  }
  export default Deposit;