import React, { useState } from "react";

export default function Editpromodal({ data }) {
 
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
                {data.name}
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
              
            Email :  {data.email}
            </div>
            <div className="modal-footer">
             Address : {data.Address}
            </div>
            <div className="modal-footer">
             City : {data.City}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
