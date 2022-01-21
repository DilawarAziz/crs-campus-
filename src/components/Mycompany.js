import React, { useState, useEffect } from "react";
import Addcompany from "./addjob";
import { onValue, remove, getDatabase, ref } from "firebase/database";
import data1 from "./data";
import img from "../images/job7.jpg";
import app from "./firebase";
import { MdDelete } from "react-icons/md";
import Myjobdetail from "./Myjobdetail";
import Applicantsdetail from "./Applicantsdetail";
import userimg from "../images/userimg.png";

export default function Mycompany({ useruid }) {
  const [image, setimage] = useState();
  const [comapany, setcompany] = useState([]);
  const db = getDatabase(app);
  const [modalData, setModalData] = useState();
  const [applicantData, setApplicantData] = useState();
  const [userkey, setuserkey] = useState();
  let deletejob = (v) => {
    const db = getDatabase(app);
    remove(ref(db, "users/" + useruid + "/jobs/" + v));
  };
  useEffect(() => {
    onValue(ref(db, "users/" + useruid + "/jobs"), (snapshot) => {
      if (snapshot.val()) {
        let obj = Object.entries(snapshot.val());
        setcompany(obj);
      }
      else{
        setcompany([])
      }
    });
    onValue(ref(db, "users/" + useruid + "/userdata"), (snapshot) => {
      setimage(snapshot.val()?.imageurl);
    });
  }, []);
  let getdata = (v) => {
    const dbRef = ref(
      db,
      "users/" + useruid + "/jobs/" + v.jobtitle + "/applicants"
    );
    let arr = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot?.key;
        const childData = childSnapshot.val();

        onValue(ref(db, "users/" + childKey), (snapshot) => {
          arr.push(snapshot.val().userdata);
          let arr2 = [snapshot.val().userdata];
        });
      });
      setuserkey(arr);
    });
  };

  console.log(comapany.length);

  return (
    <>
      <div>
        {modalData && <Myjobdetail data={modalData} />}
       <Applicantsdetail data={userkey} />

        <div className={comapany.length < 5 ? "dflex" : "jobsitems-main"}>
          {comapany?.map((v, i) => {
            return (
              <div key={i} className={comapany.length < 5 ? "dcard" : "card"}>
                <div className="card-img-top-pt">
                  <img src={v[1]?.image} className="card-img-top" alt="img" />
                </div>
                <div className="card-body">
                  <div className="card-title">
                    <MdDelete
                      onClick={() => deletejob(v[1].jobtitle)}
                      size={"23px"}
                      color={"red"}
                    />
                  </div>
                  <h5 style={{ textAlign: "center" }} className="card-title">
                    {v[1].jobtitle}
                  </h5>
                  <div className="linkbtn">
                    <button
                      type="button"
                      onClick={() => setModalData(v[1])}
                      className="btn btn-primary companydetailbtn"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => getdata(v[1])}
                      className="btn btn-primary companydetailbtn"
                      data-toggle="modal"
                      data-target="#exampleModalCenter1"
                    >
                      Applicants
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Addcompany />
      </div>
    </>
  );
}
