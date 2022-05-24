import React, { useState } from "react";
import "../styles/welcome.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory } from "react-router";
import { BlackTextField } from "../Component/BlackTextField";
export default function WelcomePage() {
  const history = useHistory();
  const [title, setTitle] = useState("null");
  const generateHashValue = () => {
    return title + new Date().getTime();
  };
  const makeRoom = () => {
    // 임시링크 생성
    let tempLink = generateHashValue();
    history.push(`/rooms/${tempLink}`);
  };
  const changeTitle = (event: any) => {
    setTitle(event.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="welcome_text_a">만나기 30분전</div>
        <div className="welcome_text_b">지금 어디야? 다같이 공유해요!</div>
        <div className="img_item" />
        {/* <div className="room_title_field"></div> */}
        <div className="make_room">
          <BlackTextField
            placeholder="방 제목을 입력하세요(최소 5글자 이상)"
            fullWidth={true}
            onChange={(e) => changeTitle(e)}
            style={{ marginBottom: 20 }}
          />
          <BlackButton
            variant="contained"
            fullWidth={true}
            onClick={makeRoom}
            disabled={title.length < 5}
          >
            방 만들기
          </BlackButton>
        </div>
      </div>
    </>
  );
}
