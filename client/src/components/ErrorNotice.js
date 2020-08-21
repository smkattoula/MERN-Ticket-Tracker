import React from "react";

export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>{props.message}</span>
    </div>
  );
}
