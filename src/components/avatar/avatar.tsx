import React from "react";

import "./style.scss";
//import logo from "./logo.png";
type AvatarProps = {
  letter: string;
  src?: string;
  alt?: string;
};
const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  return (
    <div className="icon-container  ">
      {src && <img className="icon-content_img" src={src} alt={alt}></img>}
      {!src && <p className="icon_content_txt">{letter}</p>}
    </div>
  );
};

export default React.memo(Avatar);
