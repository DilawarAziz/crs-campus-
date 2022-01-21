import React from "react";

export default function Alert(props) {
  // console.log(props)
  return (
    <div>
      {props.alert1.msg && (
        <div
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 10px 0px 10px",
            alignItems: "center",
          }}
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <p>
            {" "}
            <strong>{props.alert1.msg}</strong> {props.alert1.type}
          </p>
          <button
            onClick={() => props.alertdiv()}
            style={{ backgroundColor: "yellow", border: "none" }}
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span style={{ width: "35px", height: "30px" }} aria-hidden="true">
              &times;
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
