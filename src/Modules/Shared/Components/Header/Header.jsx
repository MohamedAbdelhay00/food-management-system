import React from "react";

import adImg from '../../../../imgs/Group 48102098.png'
import "./Header.css";

export default function Header({ title, subTitle, description }) {
  return (
    <div className="Header rounded-4">
      <div className="row h-100 px-5 justify-content-between align-items-center">
        <div className="header-info col-md-5">
          <h2>
            {title}
            <span>
                {subTitle}
            </span>
          </h2>
          <p>
            {description}
          </p>
        </div>
        <div className="col-md-3 headerImg">
            <img src={adImg} className="w-100" alt="img"/>
        </div>
      </div>
    </div>
  );
}
