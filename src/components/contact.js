import "../App.css";

let Contact = () => {
  
  // console.log("asdf")
  
  return (
    <>
      <div className="contactmain">
        <form style={{ width: "100%" }}>
          <div className="contactchild">
            <div className="contactchild2">
              <h1 className="contactheading">CONTACT US</h1>

              <input className="contactinput" type="text" placeholder="Name" />
              <input className="contactinput" type="text" placeholder="Email" />
              <input
                className="contactinput"
                type="text"
                placeholder="Mobile"
              />

              <textarea
                id="w3review"
                placeholder="Enter your message Here"
                className="contactTextArea"
                name="w3review"
                rows="4"
                cols="50"
              ></textarea>
              <div style={{ width: "100%", text: "center", marginTop: "12px" }}>
                <button
                  style={{ width: "100%" }}
                  type="submit"
                  className=" loginbtn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* <img
              className="imgcontact"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3cTiqNwF0-7hM5Mb6vAJwWxDzMX8UMHTCKItIxoHQbYadOTuu-AfpkM81lBKHQ67IezY&usqp=CAU"
              alt="img"
            /> */}
          </div>
        </form>
      </div>
    </>
  );
};
export default Contact;
