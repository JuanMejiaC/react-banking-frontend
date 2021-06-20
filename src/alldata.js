import React from "react";
import { UserContext, Card } from "./context";
function AllData(){
    const ctx = React.useContext(UserContext);
    // const userCtx = React.useContext(CurrentUserContext);
    // let currentUser = ctx.users.find(element => element.name == userCtx.user);
    console.log(ctx);
    return (
      <Card
        bgcolor="primary"
        header="All Data"
        body={
          <table className="table table-danger">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Password</th>
              </tr>
            </thead>
            <tbody>
              {ctx.users.map((element, index) => {
                return (<tr className={`${index % 2 == 0? 'table-primary' : 'table-info'}`} key={index}>
                          <td>{element.email}</td>
                          <td>{element.name}</td>
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