import React from "react";
import "../styles/welcome.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory } from "react-router";
export default function WelcomePage() {
  const history = useHistory();
  const makeRoom = () => {
    // 임시링크 생성
    let tempLink = "3";
    history.push(`/rooms/${tempLink}`);
  };
  return (
    <>
      <div className="container">
        <div className="welcome_text_a">만나기 30분전</div>
        <div className="welcome_text_b">지금 어디야? 다같이 공유해요!</div>
        <div className="img_item" />
        <div className="make_room">
          <BlackButton variant="contained" fullWidth={true} onClick={makeRoom}>
            방 만들기
          </BlackButton>
        </div>
      </div>
    </>
  );
}
