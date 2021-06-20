import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "./context";
import logo from "./bank.png"
function Home(){
    return (
      <Card
        txtcolor="black"
        header="BadBank The Bank You Can trust"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src={logo} className="img-fluid" alt="Responsive image"/>)}
      />    
    );  
  }
  export default Home;