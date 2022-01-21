import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Alert from "./alert";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { ImPointDown } from "react-icons/im";
import {
  onValue,
  getDatabase,
  ref,
  query,
  orderByChild,
  update,
} from "firebase/database";
import app from "./firebase";
import { useFormik } from "formik";
import { LoginForm } from "./validation";
function Login() {
  const [spiner, setspiner] = useState(false);
  const [subbool, setsubbool] = useState(false);
  const [blocked, setblocked] = useState(false);

  const [alert, setalert] = useState({
    msg: false,
    type: false,
  });

  const db = getDatabase(app);

  let showalert = (m, t) => {
    setalert({
      msg: m,
      type: t,
    });
  };

  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginForm,

    onSubmit: (values, event) => {
      const { email, password } = values;
      setspiner(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          onValue(
            ref(db, "users/" + userCredential.user.uid + "/userdata"),
            (snapshot) => {
              if (snapshot.val().blocked === "block") {
                console.log(snapshot.val()?.blocked);
                signOut(auth)
                  .then(() => {
                    history.push("/Login");
                  })
                  .catch((error) => {
                  showalert(error);
                  });
                showalert("you are blocked","...!");

                setspiner(false);
              } else if (snapshot.val()?.admin === "admin") {
                history.push("/jobs");
              } else {
                history.push("/Profile");
              }
            }
          );
        })
        .catch((error) => {
          const errorMessage = error.message;
          showalert("Invalid Crediential","...!");
          setspiner(false);
          setsubbool(true);
        });
    },
  });
  let alertdiv = () => {
    setalert({
      msg: false,
      type: false,
    });
  };
  return (
    <div>
      <Alert alertdiv={alertdiv} className="alert" alert1={alert} />
      <div className="login1">
        <div className="loginchild1" style={{ maxHeight: "600px" }}>
          <form onSubmit={formik.handleSubmit} className="loginchild2">
            <h1 className="contactheading">LOGIN</h1>
            {/* <ImPointDown color="royalblue" size={"50px"} /> */}
            <div className="ptcontinput">
              <div className="icon-pt">
                <MdEmail className="input-icon" />

                <input
                  
                  autoFocus
                  {...formik.getFieldProps("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  placeholder="Enter your Email"
                  name="email"
                  type="email"
                  className="form-login"
                  maxLength={"40"}
                />
              </div>
            </div>
            <div className="ptcontinput">
              {formik.errors.email && formik.touched.email && (
                <p className="errormsg">{formik.errors.email}</p>
              )}

              <div className="icon-pt">
                <RiLockPasswordFill className="input-icon" />

                <input
                  
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  className="form-login"
                  maxLength={"40"}
                  {...formik.getFieldProps("password")}
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                />
              </div>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="errormsg">{formik.errors.password}</p>
            )}
            <button
              style={{ marginTop: "26px" }}
              type="submit"
              className="bg-primary loginbtn"
              disabled={spiner ? true : false}
            >
              {spiner ? (
                <Loader type="Bars" color="white" height={30} width={50} />
              ) : (
                " LOGIN"
              )}
            </button>
            <p style={{ color: "black" }}>
              Dont Have An Account?{" "}
              <i
                onClick={() => history.push("/Signup")}
                style={{ color: "orangered", cursor: "pointer" }}
              >
                {" "}
                Create Account{" "}
              </i>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
