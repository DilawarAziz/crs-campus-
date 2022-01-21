import React  from 'react'
import { getDatabase, } from "firebase/database";
import app from "./firebase";
import { useState ,useEffect} from "react";


export default function Usercart({data}) {
    const [userdata, setuserdata] = useState(false)
    const db = getDatabase(app);
    useEffect(() => {
     
 
        
        data.map((v)=>(
            setuserdata(v[1].userdata)
            // console.log(v)
            ))
    }, [])
                
    return (
        <>
     {userdata && <div>
            <div className="profiledata">
                <ul className="proul">
                  <h1 style={{ color: "black" }} className="proheading">
                    YOUR PROFILE
                  </h1>
                  <li>
                    {" "}
                    <h5 className="proheading2"> USERNAME:</h5>
                  <h5>
                    <u className="proheading3"> {userdata.name}</u>
                  </h5>
                  </li>

                  <li>
                    {" "}
                    <h5 className="proheading2">EMAIL:</h5>
                  <h5>
                    <u className="proheading3"> {userdata.email}</u>
                  </h5>
                  </li>
                  <li>
                    {" "}
                    <h5 className="proheading2">ADDRESS:</h5>
                  <h5>
                    <u className="proheading3"> {userdata.Address}</u>
                  </h5>
                  </li>
                  <li>
                    {" "}
                    <h5 className="proheading2">CITY:</h5>
                  <h5>
                    <u className="proheading3"> {userdata.City}</u>
                  </h5>
                  </li>
                </ul>
              </div>
        </div>}
        </>
    )
}
