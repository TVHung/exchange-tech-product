import React from "react";
import "./_breadcrumb.scss";

export default function Breadcrumb({ arrLink }) {
  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {arrLink &&
            arrLink.map((data, index) => (
              <li
                key={index}
                className={
                  index < arrLink.length - 1
                    ? "breadcrumb-item btn-grad"
                    : "breadcrumb-item active btn-grad"
                }
                style={{
                  zIndex: 5 - index,
                  marginLeft: index === 0 ? 0 : -20,
                }}
              >
                <a href={data.direct}>{data.name}</a>
              </li>
            ))}
        </ol>
      </nav>
    </div>
  );
}
