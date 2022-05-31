import React, { useContext, useEffect, useState } from "react";
import "../styles/welcome.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory } from "react-router";
import { BlackTextField } from "../Component/BlackTextField";
import RoomStore from "../Stores/RoomStore";
import MapStore from "../Stores/MapStore";
export default function WelcomePage(): JSX.Element {
  const history = useHistory();
  const [nickName, setNickName] = useState("");

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  useEffect(() => {
    // 지도 정보 초기화
    MapStore.deleteMarkerList = [];
    MapStore.recievedMarkerList = [];
  });
  const makeRoom = () => {
    // 임시링크 생성
    let tempLink = uuidv4();
    RoomStore.changeNickName(nickName);
    history.push(`/rooms/${tempLink}`);
  };
  const changeNickName = (event: any) => {
    setNickName(event.target.value);
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
            placeholder="닉네임을 입력하세요(최소 2글자 이상)"
            fullWidth={true}
            onChange={(e: any) => changeNickName(e)}
            style={{ marginBottom: 20 }}
          />
          <BlackButton
            variant="contained"
            fullWidth={true}
            onClick={makeRoom}
            disabled={nickName.length == 0}
          >
            방 만들기
          </BlackButton>
        </div>
      </div>
    </>
  );
}
