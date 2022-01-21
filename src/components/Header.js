import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import img from "../images/todologo.jpg";
import { onValue, getDatabase, ref, set } from "firebase/database";
import app from "./firebase";
import { IoLogoBuffer } from "react-icons/io";
import { CgMenuBoxed } from "react-icons/cg";

function Navbar(props) {
  let history = useHistory();
  const [bool, setbool] = useState(true);
  const [togleicon, settogleicon] = useState(false);
  const [confirm, setconfirm] = useState(false);
  useEffect(() => {
    const db = getDatabase(app);
    onValue(ref(db, "users/" + props.token + "/userdata/rule"), (snapshot) => {
      if (snapshot.val() === "student") {
        setconfirm(snapshot.val());
      } else if (snapshot.val() === "comapany") {
        setconfirm(snapshot.val());
      }
    });
  }, []);
  console.log(confirm);
  let logout = () => {
    console.log("asdf");
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setbool(false);
        history.push("/Login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const [path, setpath] = useState({
    path1: "/jobs",
  });

  let alertuser = () => {
    if (!props.token) {
      alert("sign in First");
      setpath({ path1: "/Login" });
    } else {
      setpath({ path1: "/jobs" });
    }
  };

  return (
    <>
      <div className="back"></div>
      <div className={`${togleicon ? "navbar2" : "navbar1 bg-primary"} `}>
        <div className="logo">
          <h4
            className="logo"
            style={{ color: "white", margin: "0px", fontSize: "23px" }}
          >
            <IoLogoBuffer className="logo2" />
          </h4>
        </div>
        <div className={`${togleicon ? "span2" : "span"}`}>
          {props.token ? (
            <>
              {/* <Link  to="/home">
              <p className="logo">HOME</p>
            </Link> */}
              {/* {props.token === "0EbEh29GlRWoeeYgkRXaWhzUxIi1" || */}
              {/* (confirm && (/ */}
              {/* ))} */}
              {props.token !== "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
                <Link to="/Profile">
                  <p> PROFILE</p>
                </Link>
              )}
              {props.token === "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
                <>
                  <Link to="/students">
                    <p className="logo">STUDENTS</p>
                  </Link>
                  <Link to="/jobs">
                    <p className="logo">JOBS</p>
                  </Link>
                  <Link to="/company">
                    <p className="logo">COMPANY</p>
                  </Link>
                </>
              )}

              {confirm === "comapany" && (
                <>
                  <Link to="/postjob">
                    <p className="logo">POST JOB</p>
                  </Link>
                  <Link to="/students">
                    <p className="logo">STUDENTS</p>
                  </Link>
                </>
              )}

              {confirm === "student" && (
                <>
                  <Link to="/jobs">
                    <p className="logo">JOBS</p>
                  </Link>
                  <Link to="/company">
                    <p className="logo">COMPANY</p>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/Login">
                <p className="logo">LOGIN</p>
              </Link>
              <Link to="/Signup">
                <p className={`${!togleicon ? "sign3" : "sign2"}`}>SignUp</p>
              </Link>
            </>
          )}

          {props.token && (
            <Link onClick={logout} to="/Signup">
              <p className={`${!togleicon ? "sign3" : "sign2"}`}>LogOut</p>
            </Link>
          )}
        </div>
        <div className="humburgeiconprt">
          <CgMenuBoxed
            onClick={() => settogleicon(togleicon ? false : true)}
            className="humburgericon"
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
