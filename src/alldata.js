import React from "react";
import { UserContext, Card } from "./context";
import { jsPDF } from "jspdf";

function AllData(){
    const ctx = React.useContext(UserContext);
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    function pdf () {
      // let allData = "Name         Email         Password\n";
      let allData = () =>{
        return (<table className="table table-danger">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {ctx.users.map((element, index) => {
              return (<tr className={`${index % 2 == 0? 'table-primary' : 'table-info'}`} key={index}>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.password}</td>
                      </tr>)
            })}
          </tbody>
        </table>)
      }

      doc.html(allData, {
        callback: function (doc) {
          doc.save();
        },
        x: 10,
        y: 10
     });
      // ctx.forEach(element => {
      //   allData += `${element.name}         `
      // });
      // doc.html(allData());
      // doc.save("alldata.pdf");
    }



    console.log(ctx);
    return (
      <Card
        bgcolor="primary"
        header="All Data"
        printbtn = {<button type="ok" className="btn btn-light" onClick={e => {pdf(e)}}>Download</button>}
        body={
          <table className="table table-danger">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
              </tr>
            </thead>
            <tbody>
              {ctx.users.map((element, index) => {
                return (<tr className={`${index % 2 == 0? 'table-primary' : 'table-info'}`} key={index}>
                          <td>{element.name}</td>
                          <td>{element.email}</td>
                          <td>{element.password}</td>
                        </tr>)
              })}
            </tbody>
          </table>
        }
      />
    )
  }

  export default AllData;