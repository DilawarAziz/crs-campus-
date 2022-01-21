import React, { useState, useEffect } from "react";
import img from "../images/job1.jpg";
import {
  onValue,
  set,
  getDatabase,
  update,
  push,
  ref,
  query,
  orderByChild,
} from "firebase/database";
import app from "./firebase";
import userimg from "../images/userimg.png";
export default function Jobitems({
  data,
  setModalData,
  jobuseruid,
  alluserdata,
}) {
  const [bool, setbool] = useState();
  let arr45;
  const db = getDatabase(app);
  let arr2 = [data];

  let applyjob = () => {
    set(
      ref(
        db,
        "users/" +
          data.useruid +
          "/jobs/" +
          data.jobtitle +
          "/applicants/" +
          jobuseruid
      ),
      {
        jobuseruid,
      }
    );
  };

  let userimage = Object?.entries(alluserdata)
    .filter((v, i) => v[0] === data.useruid)
    .map((v, i) => v[1].userdata?.imageurl)[0];
  let blockjob = (v) => {
    if (v.blocked === "block") {
      update(ref(db, "users/" + v.useruid + "/jobs/" + v.jobtitle), {
        blocked: "unblock",
      });
    } else {
      update(ref(db, "users/" + v.useruid + "/jobs/" + v.jobtitle), {
        blocked: "block",
      });
    }
  };

  return (
    <div>
      <div className={data.length < 5 ? "dcard" : "card"}>
        <div className="card-img-top-pt">
          <img
            src={!data.image ? userimg : data.image}
            className="card-img-top"
            alt="img"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <h2 className="type">{data?.jobtype} </h2>
          {data?.blocked === "block" && <h2 className="type">Blocked </h2>}

          {data?.applicants &&
          Object.keys(data.applicants).filter((obj) => obj === jobuseruid)
            ?.length ? (
            <p className="type">Applied</p>
          ) : (
            ""
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{data.jobtitle}</h5>
          <p className="card-text">Salary : Rs/-{data.salary}</p>

          <div className="linkbtn">
            <button
              type="button"
              onClick={() => setModalData(data)}
              className="btn btn-primary companydetailbtn"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Details
            </button>
            {jobuseruid === "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
              <button
                onClick={() => blockjob(data)}
                className="btn btn-primary companydetailbtn"
              >
                {data.blocked === "block" ? "Unblock" : "Block"}
              </button>
            )}
            {jobuseruid != "0EbEh29GlRWoeeYgkRXaWhzUxIi1" && (
              <button
                disabled={data.blocked === "block" ? "disabled" : ""}
                onClick={applyjob}
                className="btn btn-primary companydetailbtn"
              >
                {data?.applicants &&
                Object.keys(data.applicants).filter((obj) => obj === jobuseruid)
                  .length
                  ? "Applied"
                  : "Apply"}
              </button>
            )}
            {/* // )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
