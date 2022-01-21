export default function Myjobdetail({ data }) {
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
                <span className="crossbtn1" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div
              style={{ maxHeight: "100px", wordBreak: "break-all" }}
              className="modal-body"
            >
              Description : {data.jobdescription}
            </div>
            <div className="modal-footer">Type : {data.jobtype}</div>
            <div className="modal-footer">Salary : {data.salary}</div>
            <div className="modal-footer">
              Edjucation Required : {data.edjucation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
