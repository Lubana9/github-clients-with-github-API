import React from "react";

import { Meta } from "@utils/Meta";

import "./style.scss";
type BtnProps = {
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  isLoading: Meta;
};
const Button: React.FC<BtnProps> = ({ onClick, children, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className="btn-search"
      disabled={isLoading === Meta.loading}
    >
      {children}
    </button>
  );
};

export default Button;
