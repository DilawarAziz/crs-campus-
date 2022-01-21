import React, { useState } from "react";
import app from "./firebase";
import { getDatabase, ref, update, push, set } from "firebase/database";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import userimg from "../images/userimg.png";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useFormik } from "formik";
import { JobPost } from "./validation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
function Addcompany(props) {
  const [bool, setbool] = useState(false);
  const [subbool, setsubbool] = useState(false);
  const [image, setimage] = useState();
  const [inputimg, setinputimg] = useState(false);

  const db = getDatabase(app);
  const [file, setfile] = useState();

  const formik = useFormik({
    initialValues: {
      jobtitle: "",
      jobdescription: "",
      jobtype: "",
      salary: "",
      edjucation: "",
      lastdate: "",
      Experience: "",
    },
    validationSchema: JobPost,

    onSubmit: (values, action) => {
      if (inputimg) {
        toggle();
      }
      setsubbool(true);
      let {
        jobtitle,
        jobdescription,
        lastdate,
        Experience,
        jobtype,
        salary,
        edjucation,
      } = values;

      const storage = getStorage();
      const metadata = {
        contentType: "image/jpeg",
      };
      let imgName = Math.random() * 2000 * 1223234;
      const storageRef = sRef(storage, "images/" + file?.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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

            if (downloadURL && inputimg) {
              action.resetForm();
              setimage(downloadURL);
              set(ref(db, "users/" + props.reduxuid + "/jobs/" + jobtitle), {
                jobtitle,
                jobdescription,
                jobtype,
                salary,
                lastdate,
                Experience,
                edjucation,
                image: downloadURL,
                useruid: props.reduxuid,
              });
            }
          });
        }
      );
    },
  });
  console.log(inputimg, subbool);
  let setdata = (e) => {
    e.preventDefault();
    toggle();
    sendfile();
    try {
      if (image) {
        set(ref(db, "users/" + props.reduxuid + "/jobs/" + job.jobtitle), {
          jobtitle,
          jobdescription,
          jobtype,
          salary,
          edjucation,
          image,
          useruid: props.reduxuid,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let toggle = () => {
    if (bool) {
      setbool(false);
    } else {
      setbool(true);
    }
  };

  let handlechange1 = (event) => {
    setfile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setinputimg({
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <>
      {!bool ? (
        <>
          <div className="ptl addbtn">
            <Fab onClick={toggle} className="bg-primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </>
      ) : (
        <div className="login1 ">
          <div className="loginchild">
            <h1 className="contactheading">Post Job</h1>
            <button onClick={toggle} className="crossbtn">
              X
            </button>
            <form
              onSubmit={formik.handleSubmit}
              className=" needs-validation loginchild2"
              noValidate
            >
              <div className="ptcontinputadd">
                <input
                  autoComplete="off"
                  maxLength={"40"}
                  placeholder="job title"
                  name="jobtitle"
                  onChange={formik.handleChange("jobtitle")}
                  {...formik.getFieldProps("jobtitle")}
                  value={formik.values.jobtitle}
                  
                  type="text"
                  className="form-login"
                  id="inputEmail3"
                />
              </div>
              {formik.errors.jobtitle && formik.touched.jobtitle && (
                <p className="errormsg">{formik.errors.jobtitle}</p>
              )}
              <div className="ptcontinputadd">
                <input
                  onChange={formik.handleChange("lastdate")}
                  {...formik.getFieldProps("lastdate")}
                  placeholder="Last Date*"
                  name="lastdate"
                  onFocus={(e) => (e.currentTarget.type = "date")}
                  onBlur={(e) => (e.currentTarget.type = "text")}
                  
                  value={formik.values.lastdate}
                  className="form-login"
                  id="inputbio"
                />
              </div>
              {formik.errors.lastdate && formik.touched.lastdate && (
                <p className="errormsg">{formik.errors.lastdate}</p>
              )}
              <div className="ptcontinputadd">
                <select
                  onChange={formik.handleChange("Experience")}
                  {...formik.getFieldProps("Experience")}
                  label="Experience"
                  className="form-login"
                  id="cars"
                  name="Experience"
                >
                  <option name="Experience1" value="Experience1">
                    Experience*
                  </option>
                  <option name="Begginer" value="Begginer">
                    Begginer
                  </option>
                  <option name="year1" value="year1">
                    1 year
                  </option>
                  <option name="year2" value="year2">
                    2 year
                  </option>
                  <option name="year3" value="year3">
                    3 year
                  </option>
                  <option name="year4" value="year4">
                    4 year
                  </option>
                  <option name="year5" value="year5">
                    5 year
                  </option>
                  <option name="year6" value="year6">
                    6 year
                  </option>
                  <option name="year7" value="year7">
                    7 year
                  </option>
                  <option name="year8" value="year8">
                    8 year
                  </option>
                </select>
              </div>
              {formik.errors.Experience && formik.touched.Experience && (
                <p className="errormsg">{formik.errors.Experience}</p>
              )}
              <div className="ptcontinputadd">
                <input
                  onChange={formik.handleChange("jobdescription")}
                  {...formik.getFieldProps("jobdescription")}
                  maxLength={"500"}
                  placeholder="Enter job description"
                  name="jobdescription"
                  
                  value={formik.values.jobdescription}
                  type="text"
                  className="form-login"
                  id="inputEmail4"
                />
              </div>

              {formik.errors.jobdescription &&
                formik.touched.jobdescription && (
                  <p className="errormsg">{formik.errors.jobdescription}</p>
                )}
              <div className="ptcontinputadd">
                <select
                  onChange={formik.handleChange("jobtype")}
                  {...formik.getFieldProps("jobtype")}
                  label="jobtype"
                  className="form-login"
                  id="jobtype"
                  name="jobtype"
                >
                  <option name="jobtype11">JobType*</option>

                  <option name="jobtype1" value="inter ship">
                    Intership
                  </option>
                  <option name="jobtype2" value="part time">
                    PartTime
                  </option>
                  <option name="jobtype3" value="full time">
                    FullTime
                  </option>
                </select>
              </div>
              {formik.errors.jobtype && formik.touched.jobtype && (
                <p className="errormsg">{formik.errors.jobtype}</p>
              )}
              <div className="ptcontinputadd">
                <input
                  onChange={formik.handleChange("salary")}
                  {...formik.getFieldProps("salary")}
                  name="salary"
                  maxLength={"40"}
                  
                  value={formik.values.salary}
                  type="number"
                  className="form-login"
                  id="inputAddress"
                  placeholder="salary"
                />
              </div>

              {formik.errors.salary && formik.touched.salary && (
                <p className="errormsg">{formik.errors.salary}</p>
              )}
              <div className="ptcontinputadd">
                <select
                  onChange={formik.handleChange("edjucation")}
                  {...formik.getFieldProps("edjucation")}
                  label="edjucation"
                  className="form-login"
                  id="edjucation"
                  name="edjucation"
                >
                  <option name="edjucation11">Edjucation*</option>

                  <option name="edjucation1" value="matriculated">
                    Matriculated
                  </option>
                  <option name="edjucation2" value="intermediate">
                    Intermediate
                  </option>
                  <option name="edjucation3" value="graduate">
                    Graduate
                  </option>
                  <option name="edjucation3" value="master's">
                    Master's
                  </option>
                </select>
              </div>

              {formik.errors.edjucation && formik.touched.edjucation && (
                <p className="errormsg">{formik.errors.edjucation}</p>
              )}
              <div
                className="ptcontinputfile"
                style={{
                  backgroundImage: `url(${
                    !inputimg?.image ? userimg : inputimg?.image
                  })`,
                }}
              >
                <label htmlFor="inputCity2" className="form-label-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera className="photocamra" />
                  </IconButton>
                </label>
                <input
                  onChange={handlechange1}
                  hidden
                  
                  type="file"
                  className="form-login"
                  id="inputCity2"
                />
              </div>
              {!inputimg && subbool && (
                <p className="errormsg" style={{ textAlign: "center" }}>
                  
                </p>
              )}
              <button type="submit" className=" loginbtn btn-primary">
                create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  reduxuid: state.useruid,
});
export default connect(mapStateToProps, null)(Addcompany);
