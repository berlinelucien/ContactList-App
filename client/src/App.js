import "./styles.css";
import "bulma/css/bulma.css";
import React from "react";
import Contacts from "./components/Contacts"


/** bulma documentation reference https://bulma.io/ */


function App() {
  
    return (

      <div className="container " style={{ height: "200vh" }}>
          <div className="notification">
           
            <h1
              className="title has-text-primary is-centered has-text-centered"
              style={{ marginTop: "30px" }}
            >
              Contacts
            </h1>
           <Contacts />
    
          </div>
        </div>

    );
  }

export default App;
