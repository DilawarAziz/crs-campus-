import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { foo } from "../container/action/action";
import app from "./firebase";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
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
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { GiSkills } from "react-icons/gi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import userimg from "../images/userimg.png";
import { useFormik } from "formik";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateCompany,
  updateStudent,
} from "./validation";
function Editprofile(props) {
  const [spiner, setspiner] = useState(false);
  const [subbool, setsubbool] = useState(false);
  const [bool, setbool] = useState(false);
  const [file, setfile] = useState();
  const [inputimg, setinputimg] = useState();
  const [rule, setrule] = useState(false);
  const [imgprogress, setimgprogress] = useState();
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
  useEffect(() => {
    onValue(ref(db, "users/" + props.useruid + "/userdata"), (snapshot) => {
      if (snapshot.val().rule === "student") {
        console.log(snapshot.val().rule);
        setrule(true);
      } else {
        setrule(false);
      }
    });
  }, []);
  const db = getDatabase(app);

  let alertdiv = () => {
    setalert({
      msg: false,
      type: false,
    });
  };
  const Sendfile = () => {
    const storage = getStorage();

    console.log("filefu");
    const metadata = {
      contentType: "image/jpeg",
    };
    let imgName = Math.random() * 2000 * 1223234;
    const storageRef = sRef(storage, "images/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        console.log("Upload is " + progress + "% done");
        setimgprogress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          if (downloadURL) {
            update(ref(db, "users/" + props.useruid + "/userdata"), {
              imageurl: downloadURL,
            });
          }
        });
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      name: props.userdata?.name,
      Address: props.userdata?.Address,
      phone: props.userdata?.phone,
      edjucation: props.userdata?.edjucation,
      cgpa: props.userdata?.cgpa,
      skills: props.userdata?.skills,
      date: props.userdata?.date,
      bio: props.userdata?.bio,
      website: props.userdata?.website,
    },
    validationSchema: rule
      ? updateStudent
      : updateCompany,
    onSubmit: (values) => {
      setsubbool(true);
      let {
        name,
        Address,
        website,
        edjucation,
        phone,
        cgpa,
        date,
        bio,
        skills,
      } = values;
      if (rule && inputimg) {
        props.toggle();
        Sendfile();
        update(ref(db, "users/" + props.useruid + "/userdata"), {
          name,
          Address,
          phone,
          cgpa,
          date,
          bio,
          skills,
          edjucation,
        });
      } else if (!rule && inputimg) {
        props.toggle();
        Sendfile();
        update(ref(db, "users/" + props.useruid + "/userdata"), {
          name,
          Address,
          phone,
          website,
        });
      }
    },
  });

  let handlechange1 = (event) => {
    setfile(event.target.files[0]);
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setinputimg({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  console.log(formik.errors.file, formik.touched.file, formik.values.file);
  return (
    <>
      <div className="login">
        <div className="editchild">
          <ImCross onClick={props.toggle} className="crossbtn" />
          <form onSubmit={formik.handleSubmit} className=" loginchild2">
            {rule ? (
              <h1 className="contactheading">Edit Profile</h1>
            ) : (
              <h1 className="contactheading">Registration Form</h1>
            )}

            <div className="ptcontinput">
              <div className="icon-pt">
                <BiUserCircle className="input-icon" />
                <input
                  maxLength={"40"}
                  placeholder="Full Name*"
                  name="name"
                  {...formik.getFieldProps("name")}
                  onChange={formik.handleChange("name")}
                  value={formik.values.name}
                  
                  type="name"
                  className="form-login"
                  id="inputEmail3"
                />
              </div>
            </div>
            {formik.errors.name && formik.touched.name && (
              <p className="errormsg">{formik.errors.name}</p>
            )}
            <div className="ptcontinput">
              <div className="icon-pt">
                <BsFillTelephoneForwardFill className="input-icon" />
                <input
                  {...formik.getFieldProps("phone")}
                  onChange={formik.handleChange("phone")}
                  value={formik.values.phone}
                  placeholder="Phone*"
                  name="phone"
                  
                  type="number"
                  className="form-login"
                  id="inputphone"
                />
              </div>
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <p className="errormsg">{formik.errors.phone}</p>
            )}
            {!rule && (
              <div className="ptcontinput">
                <div className="icon-pt">
                  <GiSkills className="input-icon" />
                  <input
                    {...formik.getFieldProps("website")}
                    onChange={formik.handleChange("website")}
                    value={formik.values.website}
                    placeholder="Website*"
                    name="website"
                    
                    type="text"
                    className="form-login"
                    id="inputbio"
                  />
                </div>
              </div>
            )}
            {formik.errors.website && formik.touched.website && (
              <p className="errormsg">{formik.errors.website}</p>
            )}
            {rule && (
              <div className="ptcontinput">
                <div className="icon-pt">
                  <MdEmail className="input-icon" />
                  <input
                    {...formik.getFieldProps("edjucation")}
                    onChange={formik.handleChange("edjucation")}
                    value={formik.values.edjucation}
                    maxLength={"40"}
                    placeholder="Education*"
                    name="edjucation"
                    
                    type="edjucation"
                    className="form-login"
                    id="inputedjucation4"
                  />
                </div>
              </div>
            )}
            {rule && (
              <div className="ptcontinput">
                {formik.errors.edjucation && formik.touched.edjucation && (
                  <p className="errormsg">{formik.errors.edjucation}</p>
                )}
                <div className="icon-pt">
                  <BsBookmarkStar className="input-icon" />
                  <input
                    {...formik.getFieldProps("cgpa")}
                    onChange={formik.handleChange("cgpa")}
                    value={formik.values.cgpa}
                    placeholder="CGPA*"
                    name="cgpa"
                    
                    type="number"
                    className="form-login"
                    id="inputPassword4"
                  />
                </div>
              </div>
            )}
            {rule && (
              <div className="ptcontinput">
                {formik.errors.cgpa && formik.touched.cgpa && (
                  <p className="errormsg">{formik.errors.cgpa}</p>
                )}
                <div className="icon-pt">
                  <BiMessageSquareDetail className="input-icon" />
                  <input
                    {...formik.getFieldProps("bio")}
                    onChange={formik.handleChange("bio")}
                    value={formik.values.bio}
                    placeholder="BIO*"
                    name="bio"
                    
                    type="text"
                    className="form-login"
                    id="inputbio"
                  />
                </div>
              </div>
            )}
            {rule && (
              <div className="ptcontinput">
                {formik.errors.bio && formik.touched.bio && (
                  <p className="errormsg">{formik.errors.bio}</p>
                )}
                <div className="icon-pt">
                  <GiSkills className="input-icon" />
                  <input
                    {...formik.getFieldProps("skills")}
                    onChange={formik.handleChange("skills")}
                    value={formik.values.skills}
                    placeholder="SKILLS*"
                    name="skills"
                    
                    type="text"
                    className="form-login"
                    id="inputbio"
                  />
                </div>
              </div>
            )}
            {rule && (
              <div className="ptcontinput">
                {formik.errors.skills && formik.touched.skills && (
                  <p className="errormsg">{formik.errors.skills}</p>
                )}
                <div className="icon-pt">
                  <BsFillCalendar2DateFill className="input-icon" />
                  <input
                    placeholder="Date Of Birth*"
                    name="date"
                    onFocus={(e) => (e.currentTarget.type = "date")}
                    onBlur={(e) => (e.currentTarget.type = "text")}
                    {...formik.getFieldProps("date")}
                    onChange={formik.handleChange("date")}
                    value={formik.values.date}
                    
                    className="form-login"
                    id="inputbio"
                  />
                </div>
              </div>
            )}
            {formik.errors.date && formik.touched.date && (
              <p className="errormsg">{formik.errors.date}</p>
            )}

            <div className="ptcontinput">
              <div className="icon-pt">
                <FaAddressCard className="input-icon" />
                <input
                  {...formik.getFieldProps("Address")}
                  onChange={formik.handleChange("Address")}
                  value={formik.values.Address}
                  name="Address"
                  
                  type="text"
                  className="form-login"
                  id="inputAddress"
                  placeholder="Address*"
                />
              </div>
            </div>

            {formik.errors.Address && formik.touched.Address && (
              <p className="errormsg">{formik.errors.Address}</p>
            )}
            <div
              className="ptcontinputfile"
              style={{
                backgroundImage: `url(${
                  !inputimg?.image ? userimg : inputimg?.image
                })`,
              }}
            >
              <input
                onChange={handlechange1}
                hidden
                
                type="file"
                className="form-login"
                id="inputCity2"
                accept="image/*"
              />
              <label htmlFor="inputCity2" className="form-label-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera className="photocamra" />
                </IconButton>
              </label>
            </div>

            {!inputimg && subbool && (
              <p className="errormsg" style={{ textAlign: "center" }}>
                
              </p>
            )}
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className=" loginbtn btn-primary"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, null)(Editprofile);
