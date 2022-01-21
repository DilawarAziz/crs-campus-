import { React, useState } from "react";
import { connect } from "react-redux";
import { foo } from "../container/action/action";
import app from "./firebase";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import img from "../images/unnamed.png";
import Alert from "./alert";
import * as yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { useFormik } from "formik";
import { SignUp } from "./validation";
function Signup() {
  const [spiner, setspiner] = useState(false);
  const [subbool, setsubbool] = useState(false);

  const [alert, setalert] = useState({
    msg: false,
    type: false,
  });
  let showalert = (m, t) => {
    setalert({
      msg: m,
      type: t,
    });
  };

  let history = useHistory();
  const db = getDatabase(app);
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      Address: "",
      phone: "",
      rule: "",
    },
    validationSchema: SignUpFormValidation,

    onSubmit: (values) => {
      console.log(values);
      let { rule, Address, name, phone, email, password } = values;
      console.log(rule, password, email, "values");
      const auth = getAuth();
      setspiner(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          let b = userCredential.user.uid;

         if (b==="0EbEh29GlRWoeeYgkRXaWhzUxIi1") {
          history.push("/jobs");
        } else {
          history.push("/Profile");
        }
          setsubbool(true);
          set(ref(db, "users/" + b + "/userdata"), {
            name: name,
            email: email,
            Address: Address,
            phone: phone,
            rule: rule,
            password,
            blocked: "unblock",
          });
        })
        .catch((error) => {
          setsubbool(true);
          const errorCode = error.code;
          const errorMessage = error.message;
          showalert(errorMessage, "....!");
          setspiner(false);
        });
      // } else {
      // history.push('/Signup')
      setspiner(false);
      setsubbool(true);

      // }
    },
  });

  let alertdiv = () => {
    setalert({
      msg: false,
      type: false,
    });
  };

  return (
    <>
      <Alert alertdiv={alertdiv} className="alert" alert1={alert} />
      <div className="login1">
        <div className="loginchild" style={{ height: "90%" }}>
          <form
            onSubmit={formik.handleSubmit}
            className=" needs-validation loginchild2"
          >
            <SiGnuprivacyguard color="red" size={"50px"} />
            <h1 className="contactheading">Register Here</h1>

            <div className="ptcontinput">
              <div className="icon-pt">
                <BiUserCircle className="input-icon" />
                <input
                  {...formik.getFieldProps("name")}
                  maxLength={"40"}
                  placeholder="Full Name*"
                  name="name"
                  onChange={formik.handleChange("name")}
                  
                  value={formik.values.name}
                  type="name"
                  className="form-login"
                  id="inputEmail3"
                />
              </div>
            </div>
            <div className="ptcontinput">
              {formik.errors.name && formik.touched.name && (
                <p className="errormsg">{formik.errors.name}</p>
              )}
              <div className="icon-pt">
                <MdEmail className="input-icon" />
                <input
                  maxLength={"40"}
                  {...formik.getFieldProps("email")}
                  placeholder="Email Address*"
                  name="email"
                  onChange={formik.handleChange("email")}
                  
                  value={formik.values.email}
                  type="email"
                  className="form-login"
                  id="inputEmail4"
                />
              </div>
            </div>
            <div className="ptcontinput">
              {formik.errors.email && formik.touched.email && (
                <p style={{ color: "red", marginLeft: "5px" }}>
                  {formik.errors.email}
                </p>
              )}
              <div className="icon-pt">
                <RiLockPasswordFill className="input-icon" />
                <input
                  {...formik.getFieldProps("password")}
                  maxLength={"40"}
                  placeholder="Password*"
                  name="password"
                  onChange={formik.handleChange("password")}
                  
                  value={formik.values.password}
                  type="password"
                  className="form-login"
                  id="inputPassword4"
                />
              </div>
            </div>
            <div className="ptcontinput">
              {formik.errors.password && formik.touched.password && (
                <p className="errormsg">{formik.errors.password}</p>
              )}
              <div className="icon-pt">
                <BsFillTelephoneForwardFill className="input-icon" />
                <input
                  placeholder="phone*"
                  maxLength={"40"}
                  name="phone"
                  {...formik.getFieldProps("phone")}
                  onChange={formik.handleChange("phone")}
                  
                  value={formik.values.phone}
                  type="number"
                  className="form-login"
                  id="inputphone"
                />
              </div>
            </div>
            <div className="ptcontinput">
              {formik.errors.phone && formik.touched.phone && (
                <p className="errormsg">{formik.errors.phone}</p>
              )}
              <div className="icon-pt">
                <FaAddressCard className="input-icon" />
                <input
                  name="Address"
                  maxLength={"40"}
                  {...formik.getFieldProps("Address")}
                  onChange={formik.handleChange("Address")}
                  value={formik.values.Address}
                  
                  type="text"
                  className="form-login"
                  id="inputAddress"
                  placeholder="Address*"
                />
              </div>
            </div>
            {formik.errors.Address && formik.touched.Address && (
              <p style={{ widht: "100%" }} className="errormsg">
                {formik.errors.Address}
              </p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                margin: "8px",
              }}
            >
              Register as :
              <div className="ptcontinputradio">
                <input
                  maxLength={"40"}
                  name="rule"
                  {...formik.getFieldProps("rule")}
                  onChange={formik.handleChange("rule")}
                  
                  value="comapany"
                  type="radio"
                  className="form-radio"
                  id="inputphone"
                />

                <h5 style={{ display: "inline" }}>Company</h5>
                {formik.errors.rule && formik.touched.rule && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.rule}
                  </p>
                )}
              </div>
              <div className="ptcontinputradio">
                <input
                  maxLength={"40"}
                  name="rule"
                  onChange={formik.handleChange("rule")}
                  
                  {...formik.getFieldProps("rule")}
                  value="student"
                  type="radio"
                  className="form-radio"
                  id="inputphone"
                />

                <h5 style={{ display: "inline" }}>Student</h5>
                {formik.errors.rule && formik.touched.rule && (
                  <p className="errormsg">{formik.errors.rule}</p>
                )}
              </div>
            </div>
            <div
              className="ptcontinput"
              style={{
                borderBottom: "none",
              }}
            >
              <button
                onSubmit={formik.handleSubmit}
                type="submit"
                className=" loginbtn btn-primary"
                disabled={spiner ? true : false}
              >
                {spiner ? (
                  <Loader type="Bars" color="white" height={30} width={50} />
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <p style={{ color: "black" }}>
              Already Have Account?{" "}
              <i
                style={{ color: "orangered", cursor: "pointer" }}
                onClick={() => history.push("/Login")}
              >
                Sign In{" "}
              </i>
            </p>
          </form>
          <div className="ptloginimg">
            <img className="loginimg1" src={img} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
  name: state.name,
});
const mapDispatchToProps = (dispatch) => ({
  foo: (user, bool) => dispatch(foo(user, bool)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
