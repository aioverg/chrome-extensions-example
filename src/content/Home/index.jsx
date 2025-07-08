import React, { useRef, useState } from "react";
import "./index.scss";
import Ex from "@/content/Ex";

const Component = () => {
  const exRef = useRef(null);
  return (
    <div className="c-home">
      <div className="c-home-content-icon" onClick={() => exRef.current.open()}></div>
      <Ex ref={exRef} />
    </div>
  );
};

Component.displayName = "Home";
export default React.memo(Component);
