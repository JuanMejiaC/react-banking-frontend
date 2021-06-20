
// import logo from './logo.svg';
import './App.css';
import { Route, Link, HashRouter, UserContext, CurrentUserContext, Funcion, Logged, Card} from './context';

import NavBar from './navbar';
import AllData from './alldata';
import Home from './home';
import CreateAccount from './createaccount';
import Withdraw from './withdraw';
import Balance from './balance'
import Deposit from './deposit'
let i = '/';
function App() {
  const handleHashChange = () => {
  }
  window.addEventListener('hashchange', handleHashChange);
  return (
    <HashRouter>
      <UserContext.Provider value={{users:[{name:'John Doe',email:'john@mit.edu',password:'secret',balance:100}]}}>
        <NavBar active={i}/>
        <div className="container d-flex justify-content-center"style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/deposit/" component={Deposit}/>
          <Route path="/withdraw/" component={Withdraw}/>
          <Route path="/balance/" component={Balance}/>
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
