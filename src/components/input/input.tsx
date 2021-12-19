import React, { useCallback } from "react";

import "./style.scss";

export type inputProps = {
  value: string;
  onChange: (value: string) => void;
};
const Input: React.FC<inputProps> = ({ value, onChange }) => {
  const handelChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange]
  );

  return (
    <input
      className="input input-group_input"
      value={value}
      placeholder="Введите название организации"
      onChange={handelChange}
    ></input>
  );
};

export default React.memo(Input);
