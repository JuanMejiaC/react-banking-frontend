import{Route, Link, HashRouter}  from "react-router-dom";
import React from 'react';
const UserContext = React.createContext(null);
const CurrentUserContext = React.createContext(null);
const Funcion = React.createContext(null);
const Logged = React.createContext(null);

function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{maxWidth: props.maxWidth}}>
        <div className="card-header">{props.header}        {props.printbtn}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }

  export { Route, Link, HashRouter, UserContext, CurrentUserContext, Funcion, Logged, Card};