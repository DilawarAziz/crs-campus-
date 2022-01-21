import { React, useState } from "react";
import { connect } from "react-redux";
import { Getimageurl } from "../container/action/action";
import userimg from "../images/userimg.png";
import { BsFillCalendar2DateFill } from "react-icons/bs";

import { useEffect } from "react";
import img from "../images/img.jpg";
import app from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import Loader from "react-loader-spinner";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import Editprofle from "./Editprofle";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { RiShieldUserFill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";

function Profile(props) {
  const [userdata, setuserdata] = useState([]);
  const [spiner, setspiner] = useState(true);
  const [bool, setbool] = useState(false);
  const [rule, setrule] = useState(false);

  const db = getDatabase(app);
  // console.log(props.useruid)
  useEffect(() => {
    onValue(ref(db, "users/" + props.useruid + "/userdata"), (snapshot) => {
      if (snapshot) {
        setspiner(false);
        setuserdata(snapshot.val());
      }
      if (snapshot.val()?.rule === "student") {
        setrule(true);
      } else {
        setrule(false);
      }
    });
  }, []);
  let toggle = () => {
    if (bool) {
      setbool(false);
    } else {
      setbool(true);
    }
  };
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
  return (
    <>
      {userdata && (
        <div className="profilemain">
          <div className="profilechild">
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="10 30 1440 420"
            >
              <path
                fill="#0099ff"
                fill-opacity="1"
                d="M0,256L21.8,229.3C43.6,203,87,149,131,106.7C174.5,64,218,32,262,53.3C305.5,75,349,149,393,165.3C436.4,181,480,139,524,106.7C567.3,75,611,53,655,85.3C698.2,117,742,203,785,234.7C829.1,267,873,245,916,208C960,171,1004,117,1047,128C1090.9,139,1135,213,1178,229.3C1221.8,245,1265,203,1309,160C1352.7,117,1396,75,1418,53.3L1440,32L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
              ></path>
            </svg>
            <img
              className="profileimg"
              src={!userdata.imageurl ? userimg : userdata.imageurl}
              alt="img"
            />

            {!bool ? (
              <>
                <div className="ptl">
                  <Fab onClick={toggle} color="primary" aria-label="edit">
                    <EditIcon />
                  </Fab>
                </div>
              </>
            ) : (
              <Editprofle
                imageurl={userdata.imageurl}
                useruid={props.useruid}
                toggle={toggle}
                userdata={userdata}
              />
            )}
            {/* <div className="imgparent"> */}

            {/* </div> */}
            {!spiner ? (
              <div className="profiledata">
                <ul className="proul">
                  <h1 style={{ color: "black" }} className="proheading">
                    {/* YOUR PROFILE */}
                    <h1 style={{ color: "royalblue" }}> {userdata.name}</h1>
                    <RiShieldUserFill color="royalblue" size={"40px"} />{" "}
                    {/* <div className="hr"></div> */}
                  </h1>
                  <li>
                    <h5 >
                      <BiUserCircle color="#0072ff" size={"23px"} />{" "}
                    </h5>
                    <h5 className="proheading2">
                       {userdata.name}
                    </h5>
                  </li>
                  {userdata?.website && (
                    <li>
                      <h5 >
                        <GiSkills size={"23px"} color="#0072ff" />
                      </h5>
                      <h5 className="proheading2">
                         {userdata?.website}
                      </h5>
                    </li>
                  )}

                  <li>
                    <h5 >
                      <MdEmail color="#0072ff" size={"23px"} />
                    </h5>
                    <h5 className="proheading2">
                       {userdata.email}
                    </h5>
                  </li>
                  <li>
                    <h5 >
                      <FaAddressCard color="#0072ff" size={"23px"} />
                    </h5>
                    <h5 className="proheading2">
                       {userdata.Address}
                    </h5>
                  </li>
                  <li>
                    <h5 >
                      <BsFillTelephoneForwardFill
                        size={"23px"}
                        color="#0072ff"
                      />
                    </h5>
                    <h5 className="proheading2">
                       +92{userdata.phone}
                    </h5>
                  </li>
                  {rule && (
                    <>
                      <li>
                        <h5 >
                          <BsFillCalendar2DateFill
                            size={"23px"}
                            color="#0072ff"
                          />
                        </h5>
                        <h5 className="proheading2">
                          {userdata.date}
                        </h5>
                      </li>
                      <li>
                        <h5>
                          <BsBookmarkStar size={"23px"} color="#0072ff" />
                        </h5>
                        <h5 className="proheading2">
                          {userdata.cgpa}
                        </h5>
                      </li>
                      <li>
                        <h5 >
                          <BiMessageSquareDetail
                            size={"23px"}
                            color="#0072ff"
                          />
                        </h5>
                        <h5 className="proheading2">
                          {userdata.bio}
                        </h5>
                      </li>
                      <li>
                        <h5 >
                          <GiSkills size={"23px"} color="#0072ff" />
                        </h5>
                        <h5 className="proheading2">
                          {userdata.skills}
                        </h5>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <div className="spinerpt1">
                <Loader type="Bars" color="#00BFFF" height={100} width={100} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  getimageurlredux: (imageurl) => dispatch(Getimageurl(imageurl)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
