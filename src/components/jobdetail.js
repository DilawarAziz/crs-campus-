import React, { useState } from "react";

export default function Mycompdetail({ data }) {
  // let obj = Object.entries(data[1]);
// console.log(data)
  // const [compdata, setcompdata] = useState(data);
  console.log("Data in modal",data)
  // setcompdata(data)
  return (
    <div>
     

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {data.jobtitle}
              </h5>
              <button
                type="button"
                className="close crossbtn1"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="crossbtn1" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
            Description :  {data.jobdescription}
            </div>
            <div className="modal-footer">
             Type : {data.jobtype}
            </div>
            <div className="modal-footer">
             Salary : {data.salary}
            </div>
            <div className="modal-footer">
             Edjucation Requires : {data.edjucation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
