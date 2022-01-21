import React from "react";
import { onValue, update,getDatabase, ref, set } from "firebase/database";
import app from "./firebase";
import { useState, useEffect } from "react";
import Usercart from "./usercart";
import Studentdetail from "./studentdetail";
export default function Students(props) {
  const [students, setstudents] = useState([]);
  const [comapanydata, setcompanydata] = useState([]);
  const [bool, setbool] = useState()
  const db = getDatabase(app);
  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      if (snapshot.val()) {
        let obj = Object.entries(snapshot.val());
        let filter = obj.filter((v, i) => v[1].userdata?.rule === "student");
        setstudents(filter);
      }
    });
  }, []);
  let senddata = (v)=>{
    setcompanydata(v)
    
  }
  let blockuser = (v) => {
   
    console.log(v[1].userdata.blocked)
    if (v[1].userdata?.blocked==="block") {
      update(
        
        ref(db, "users/" + v[0]+"/userdata/"),
        {
          blocked:"unblock"
        }
        );
        
      }else{
      update(
        
        ref(db, "users/" + v[0]+"/userdata/"),
        {
          blocked:"block"
        }
        );
        
      
    }
    
  };
  console.log(bool,'bool')
  return (
    <div>
      <div className="companysmain">
        <div className="companyheading">
          <h4 style={{ padding: "7px" }}>Students</h4>
          <div style={{display:"flex",paddingRight:"5px" }}>
   { props.useruid==="0EbEh29GlRWoeeYgkRXaWhzUxIi1"&&   <h4 style={{ padding: "7px" }}>Block</h4>}
          <h4 style={{padding: "7px"  }}>Details</h4>
   </div>
        </div>
        {students.map((v, i) => (
          <div key={i} className="company">
            <h5 >{v[1].userdata.name}</h5>
            {comapanydata&&<Studentdetail data={comapanydata}/>}
          <div style={{display:"flex" }}>
            
          { props.useruid==="0EbEh29GlRWoeeYgkRXaWhzUxIi1"&&     <button style={{marginRight:"23px"}}  onClick={()=>blockuser(v)}   className="companydetailbtn">{v[1].userdata?.blocked==="block"?"Unblock":"Block"}</button>}
          <button type="button"style={{marginRight:"23px"}} onClick={()=>senddata(v[1].userdata)} className="companydetailbtn" data-toggle="modal" data-target="#exampleModalCenter" >Details</button>
        </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
