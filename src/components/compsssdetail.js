import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GiSkills } from "react-icons/gi";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Compdetail({ data }) {
 
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
                <span className="crossbtn1" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>

            <div className="modal-footer">
              <BiUserCircle color="#0072ff" size={"23px"} />
              Name : {data.name}
            </div>
            <div className="modal-body">
              <MdEmail color="#0072ff" size={"23px"} />
              Email : {data.email}
            </div>
            <div className="modal-footer">
              <FaAddressCard color="#0072ff" size={"23px"} />
              Address : {data.Address}
            </div>
            <div className="modal-footer">
              <BsFillTelephoneForwardFill size={"23px"} color="#0072ff" />
              phone : {data.phone}
            </div>
            {data?.website && (
              <div className="modal-footer">
                <GiSkills className="input-icon" />
                Website : {data.website}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
