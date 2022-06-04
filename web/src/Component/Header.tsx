import React from "react";
import { useHistory } from "react-router";
import "../styles/header.css";
export default function Header() {
  const history = useHistory();
  return (
    <>
      <div
        className="header"
        // onClick={() => {
        //   history.push("/");
        // }}
      >
        그래서 지금 어디야?
      </div>
    </>
  );
}
