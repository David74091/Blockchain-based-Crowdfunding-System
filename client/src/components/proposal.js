import React from "react";

const proposal = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
        <div className="Logo jumbotron">
          <h3>區塊鏈募款平台</h3>
        </div>
      </nav>
      <h3 className="text-center">
        目標募款金額：<em id="message1"></em>
      </h3>
      <h3 className="text-center">
        目前已募金額：<em id="message2"></em>
      </h3>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: "10%" }}
          aria-valuenow="10"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          已募款金額
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div Name="col-xs-12">
          <input
            type="text"
            id="donate"
            placeholder="欲捐款數額"
            className="form-control"
          />
        </div>
        <div className="col-xs-4">
          <button type="button" className="btn btn-primary" id="send">
            捐款
          </button>
        </div>
      </div>
    </div>
  );
};

export default proposal;
