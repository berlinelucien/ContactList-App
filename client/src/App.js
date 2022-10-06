import "./styles.css";
import "bulma/css/bulma.css";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
/** bulma documentation reference https://bulma.io/ */


function App() {
  
    return (
      <Router>
        <div className="container " style={{ height: "100vh" }}>
          <div className="notification">
           
            <h1
              className="title has-text-primary is-centered has-text-centered"
              style={{ marginTop: "30px" }}
            >
              Contacts
            </h1>
            <Route exact path="/" component={Contacts} />
            <Route path="/add" component={AddContact} />
          </div>
        </div>
      </Router>
    );
  }

export default App;
