import React from 'react';
import { UserContext, Card } from './context';
import keyCodes from './helperfunctions';
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
      let balance = 0.00;
      let currentUser;
      let cashT = parseFloat(parent.querySelector("#cash").value);
      let checkT = parseFloat(parent.querySelector("#check").value);
      balance += !isNaN(cashT)? cashT : 0;
      balance += !isNaN(checkT)? checkT : 0;
      // console.log(balance);
      if(balance < 0) {
        alert("Amount Cannot be negative");
      } else{
      
        currentUser = ctx.users.find(element => 
          element.name == parent.querySelector("#select").value
      );
      currentUser.balance = parseFloat(currentUser.balance) + parseFloat(balance);
      setBlnce(parseFloat(currentUser.balance).toFixed(2));
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
      ctx.users.find(element => {if(element.name == e.currentTarget.value)setBlnce(element.balance)});
      setShow(true);
    }
  
    function handleTxtOnchange (val, txtId) {
      // if (val.slice(val.indexOf("."), -1).length > 2) { //this is good TODO: i need to handle de decimal point at handleDeposit
      //   val = val.slice(0, (val.indexOf(".") + 3));
      //   alert("No more than 2 decimal");
      // }
      const formatToCurrency = (valToFormat) => {
        console.log("------------------------")
          // if(indexOfDot != -1 || indexOfDot == 1) {
            console.log(`dot product ${valToFormat}`);
            valToFormat = valToFormat.split("");
            console.log(`after split ${valToFormat}`);
            let letIndexOf = val.indexOf(".");
            console.log(`indexOf ${letIndexOf}`);
            if(letIndexOf >= 0) {
              
              valToFormat.splice(letIndexOf, 1);
              console.log(`after splice ${typeof valToFormat}`);
            }
            valToFormat = valToFormat.join("");
            console.log(`after join ${valToFormat}`);
            return parseFloat(parseFloat(valToFormat) / 100).toFixed(2);
      }
  
      switch(txtId) {
        case "cash":

          // }
          setCash(formatToCurrency(val));
          console.log(`parse float ${parseFloat(parseFloat(val).toFixed(2) / 100).toFixed(2)}`);
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
    function setCursorAtTheEnd(end){
      var len = end.value.length;
              
            // Mostly for Web Browsers
            if (end.setSelectionRange) {
                end.focus();
                end.setSelectionRange(len, len);
            } else if (end.createTextRange) {
                var t = end.createTextRange();
                t.collapse(true);
                t.moveEnd('character', len);
                t.moveStart('character', len);
                t.select();
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
                  <input type="text" inputMode="numeric" className="form-control" id="cash" min="0" step="0.01" placeholder="Enter Amount" value={cash} onChange={e => handleTxtOnchange(e.currentTarget.value, "cash")} onFocus={e => setCursorAtTheEnd(e.currentTarget)} onKeyDown={e => handleInputOnKeyDown(e)} onKeyUp={e => handleInputOnKeyUp(e, "cash")}/><br/>
                  Check Depostit<br/>
                  <input type="text" inputMode="numeric" className="form-control" id="check" min="0.00" step=".01" placeholder="Enter Amount" value={check} onChange={e => handleTxtOnchange(e.currentTarget.value, "check")} onKeyUp={e => handleInputOnKeyUp(e, "check")}/><br/>
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