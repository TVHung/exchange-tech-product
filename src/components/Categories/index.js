import React from "react";
import "./_categories.scss";

export default function Categories() {
  const goCategory = (id) => {
    window.location.href = `/search?&category=${id}`;
  };
  return (
    <div className="cagoriesContainer">
      <h3>Khám phá danh mục</h3>
      <div className="row">
        <div className="col-4 category-item" onClick={() => goCategory(1)}>
          <div className="card">
            <div className="card-body row">
              <div className="logo-icon col-12">
                <i className="fas fa-mobile-alt fa-3x"></i>
              </div>
              <div className="logo-icon col-12">
                <p className="card-title">Mobile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 category-item" onClick={() => goCategory(2)}>
          <div className="card">
            <div className="card-body row">
              <div className="logo-icon col-12">
                <i className="fas fa-laptop fa-3x"></i>
              </div>
              <div className="logo-icon col-12">
                <p className="card-title">Laptop</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 category-item" onClick={() => goCategory(3)}>
          <div className="card">
            <div className="card-body row">
              <div className="logo-icon col-12">
                <i className="fas fa-desktop fa-3x"></i>
              </div>
              <div className="logo-icon col-12">
                <p className="card-title">PC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
