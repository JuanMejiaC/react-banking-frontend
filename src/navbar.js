import React from 'react';
// import bootstrap from 'bootstrap'
function NavBar(){
    //   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    //   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //   return new bootstrap.Tooltip(tooltipTriggerEl)
    
    // })
    const [active, setActive] = React.useState('');

    const handleHasChange = () => {
      setActive(window.location.hash);
    }

    const handlePageLoad = () => {
      setActive(window.location.hash);
    }

    window.addEventListener('load', handlePageLoad);
    window.addEventListener('hashchange', handleHasChange);

      return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className= {`navbar-brand ${active == '#/'? 'active' : ''}`} href="#/">BadBank</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-aouto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${active == '#/CreateAccount/'? 'active' : ''}`} aria-current="page" data-toggle="tooltip" title="Create New Accounts" href="#/CreateAccount/">Create Account</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#/login/">Login</a>
              </li> */}
              <li className={`nav-item `}>
                <a className={`nav-link ${active == '#/deposit/'? 'active' : ''}`} aria-current="page" data-toggle="tooltip" title="Make a Check or Cash Deposit" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${active == '#/withdraw/'? 'active' : ''}`} aria-current="page" data-toggle="tooltip" title="Get Cash Back" href="#/withdraw/">Withdraw</a>
              </li>
              {/* <li className="nav-item">
                <a className={`nav-link ${active == '#/balance/'? 'active' : ''}`} aria-current="page" data-toggle="tooltip" title="Check you balance" href="#/balance/">Balance</a>
              </li> */}
              <li className="nav-item">
                <a className={`nav-link ${active == '#/alldata/'? 'active' : ''}`} aria-current="page" data-toggle="tooltip" title="See al the accounts" href="#/alldata/">AllData</a>
              </li>          
            </ul>
          </div>
          </div>
        </nav>
      );
    }

    export default NavBar;