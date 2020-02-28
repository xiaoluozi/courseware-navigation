import React from "react";
import { Result } from "antd";

export default () => (
  <Result
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
);
