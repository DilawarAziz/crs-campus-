import { React, useState, useEffect } from "react";
import Jobitems from "./job-items";
import { onValue, getDatabase, ref } from "firebase/database";
import app from "./firebase";
import Mycompdetail from "./jobdetail";

import data1 from "./data";
import Slider from "./slider";
export default function Jobs(props) {
  const [data, setdata] = useState(data1);
  const db = getDatabase(app);
  const [jobs, setjobs] = useState([]);
  const [applyjobdata, setapplyjobs] = useState();
  const [modalData, setModalData] = useState();
  const [alluserdata, setalluserdata] = useState()
  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      setalluserdata(snapshot.val())
      if (snapshot.val()) {
        let obj = Object.entries(snapshot.val());
        let obj1 = obj.filter((v, i) => v[1].jobs);
        let arr = [];
        Object.values(obj1).map((v) => {
          Object.values(v[1].jobs).map((va) => arr.push(va));
        });
       
        setjobs(arr);
      }
    });
  }, []);

console.log(jobs.length);
  return (
    <div>
        {modalData && <Mycompdetail data={modalData} />}
      <div className={jobs.length<5?"dflex":"jobsitems-main"}>

        {jobs.map((v, i) => {
          return <Jobitems alluserdata={alluserdata} jobuseruid={props.useruid}  key={i} data={v} setModalData={setModalData} />;
        })}
      </div>
    </div>
  );
}
