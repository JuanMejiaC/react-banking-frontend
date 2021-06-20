import React from "react";
import { CurrentUserContext, Card } from "./context";
function Balance(){
    const userCtx = React.useContext(CurrentUserContext);
    return (
      <Card
        bgcolor="primary"
        header="Balance"
        // status={}
        body={(<h1>{userCtx.balance}</h1>)}
      />
    )
  }
  export default Balance;