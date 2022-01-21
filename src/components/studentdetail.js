import React, { useState } from "react";
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
export default function Studentdetail({ data }) {
  // let obj = Object.entries(data[1]);
  const [compdata, setcompdata] = useState(data);
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
                {/* <BiUserCircle className="input-icon" /> */}
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
            <div className="modal-body">
              {" "}
              <MdEmail color="#0072ff" size={"23px"} />
              EMAIL : {data.email}
            </div>
            <div className="modal-footer">
              {" "}
              <FaAddressCard color="#0072ff" size={"23px"} />
              ADDRESS : {data.Address}
            </div>
            <div className="modal-footer">
              {" "}
              <BsBookmarkStar color="#0072ff" size={"23px"} />
              CGPA : {data.cgpa}
            </div>
            <div className="modal-footer">
              {" "}
              <BiMessageSquareDetail color="#0072ff" size={"23px"} />
              BIO : {data.bio}
            </div>
            <div className="modal-footer">
              {" "}
              <MdEmail color="#0072ff" size={"23px"} />
              Education: {data.edjucation}
            </div>
            <div className="modal-footer">
              {" "}
              <GiSkills color="#0072ff" size={"23px"} />
              Skills: {data.skills}
            </div>
            <div className="modal-footer">
              {" "}
              <BsFillTelephoneForwardFill color="#0072ff" size={"23px"} />
              Phone : {data.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
