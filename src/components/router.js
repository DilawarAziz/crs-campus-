import React from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import Header from "./Header";
import data1 from "./data";
import { onValue, getDatabase, ref, set } from "firebase/database";

import app from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./signup";
import { connect } from "react-redux";
import { foo } from "../container/action/action";
import { useHistory } from "react-router-dom";

import Profile from "./profile";
import Todo from "./jobs";
import Login from "./Login";
import Contact from "./contact";
import Loader from "react-loader-spinner";
import Companys from "./companysss";
import Students from "./studentsss";
import Mycompany from "./Mycompany";
import Jobs from "./jobs";
import Home from "./home";
import Pagenotfound from "./404";
function Roots(props) {
  const [data, setdata] = useState(data1);
  const [useruid, setuseruid] = useState(false);
  const [spiner, setspiner] = useState(true);
  const [rule, setrule] = useState(false);
  const [blocked, setblocked] = useState(false);
  const [blockuid, setblockuid] = useState();
  const db = getDatabase(app);
  
  const auth = getAuth();
  let history = useHistory();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      onValue(ref(db, "users/" + user?.uid + "/userdata"), (snapshot) => {
        if (user && snapshot.val().blocked === "unblock") {
          const uid = user.uid;
          props.foo(uid);

          setuseruid(uid);
          setspiner(false);
        } else {
          setuseruid(false);
          setspiner(false);
          console.log("null");
          signOut(auth)
            .then(() => {
              history.push("/Login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  }, []);
  if (spiner) {
    return (
      <div className="spinerpt">
        {" "}
        <Loader type="TailSpin" color="#00BFFF" height={300} width={200} />
      </div>
    );
  }
  return (
    <>
      <div>
        <Router>
          <div>
            {useruid && <Header token={useruid} />}

            <Switch>
              <Route
                path="/Signup"
                render={() => {
                  return useruid ? (
                    <Redirect to="/jobs" />
                  ) : (
                    <Signup useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                path="/home"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Home useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                path="/postjob"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Mycompany useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                path="/company"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Companys useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                exact
                path="/Profile"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Profile useruid={useruid} />
                  );
                }}
              />
              <Route
                exact
                path="/students"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Students useruid={useruid} />
                  );
                }}
              />

              <Route
                exact
                path="/jobs"
                render={() => {
                  return !useruid ? (
                    <Redirect to="/Login" />
                  ) : (
                    <Jobs useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                exact
                path="/Login"
                render={() => {
                  return useruid ? <Redirect to="/jobs" /> : <Login />;
                }}
              ></Route>
              <Route
                exact
                path="/"
                render={() => {
                  return useruid ? (
                    <Redirect to="/jobs" />
                  ) : (
                    <Redirect to="/Login" />
                  );
                }}
              ></Route>
              <Route component={Pagenotfound} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  reduxuid: state.useruid,
});
const mapDispatchToProps = (dispatch) => ({
  foo: (uid) => dispatch(foo(uid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Roots);
