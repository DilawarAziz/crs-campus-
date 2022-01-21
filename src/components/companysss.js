import {
  onValue,
  getDatabase,
  ref,
  query,
  orderByChild,
  update,
} from "firebase/database";
import app from "./firebase";
import { useState, useEffect } from "react";
import React from "react";
import Compdetail from "./compsssdetail";
import { setNestedObjectValues } from "formik";
export default function Companys(props) {
  const [comapany, setcompany] = useState([]);
  const [comapanydata, setcompanydata] = useState([]);
  const db = getDatabase(app);

  onValue(ref(db, "users/" + props.useruid + "/userdata"), (snapshot) => {
    if (snapshot.val()) {
      console.log(snapshot.val()?.blocked);
    }
  });
  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      if (snapshot.val()) {
        let obj = Object.entries(snapshot.val());
        let filter = obj.filter((v, i) => v[1].userdata?.rule === "comapany");
        setcompany(filter);
      }
    });
  }, []);

  let senddata = (v) => {
    setcompanydata(v);
  };

  let blockuser = (v) => {
    if (v[1].userdata?.blocked === "block") {
      update(ref(db, "users/" + v[0] + "/userdata/"), {
        blocked: "unblock",
      });
    } else {
      update(ref(db, "users/" + v[0] + "/userdata/"), {
        blocked: "block",
      });
    }
  };
  return (
    <>
      <div className="companysmain">
        <div className="companyheading">
          <h5 style={{ padding: "7px" }}>Companys</h5>
          <div style={{ display: "flex", paddingRight: "5px" }}>
            {props.useruid === "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
              <h4 style={{ padding: "7px" }}>Block</h4>
            )}
            <h4 style={{ padding: "7px" }}>Details</h4>
          </div>
        </div>
        {comapany.map((v, i) => (
          <div key={i} className="company">
            <h3>{v[1].userdata.name}</h3>
            {comapanydata && <Compdetail data={comapanydata} />}
            <div style={{ display: "flex" }}>
              {props.useruid === "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
                <button
                  style={{ marginRight: "23px" }}
                  onClick={() => blockuser(v)}
                  className="companydetailbtn"
                >
                  {v[1].userdata?.blocked === "block" ? "Unblock" : "Block"}
                </button>
              )}
              <button
                type="button"
                onClick={() => senddata(v[1].userdata)}
                style={{ marginRight: "23px" }}
                data-toggle="modal"
                data-target="#exampleModalCenter"
                className="companydetailbtn"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
