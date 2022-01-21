import React from 'react'
import img from '../images/email.png'
import { useHistory } from "react-router-dom";

function Pagenotfound() {
    let history = useHistory()
    return (
        <div>
          <div className="main_body">
 <div className="center_body">
  <h1>404</h1>
  <h2>PAGE NOT FOUND</h2>
  <p>The requested URl 404 was not found on this server thats all we know.</p>
  <a  onClick={() => history.goBack("/Signup")}> Go Back</a>
 </div>
</div>
        </div>
    )
}

export default Pagenotfound
