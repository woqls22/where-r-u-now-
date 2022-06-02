import React, { useEffect, useState } from "react";
import "../styles/welcome.css";
import "../styles/room.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory, useParams } from "react-router";
import { Alert, Snackbar } from "@mui/material";
import { useObserver } from "mobx-react";
import RoomStore from "../Stores/RoomStore";
import { BlackTextField } from "../Component/BlackTextField";
import { Map } from "../Component/Map";
export default function RoomPage(): JSX.Element {
  const [alertOpen, setAlertOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    RoomStore.roomId = id;
  });
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  const handleAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleCopy = (e: any) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          handleAlertOpen();
        })
        .catch(() => {
          alert("복사를 실패했어요. ");
        });
    } else {
      const $text = document.createElement("textarea");
      document.body.appendChild($text);
      $text.value = window.location.href;
      $text.select();
      document.execCommand("copy!!");
      document.body.removeChild($text);
      handleAlertOpen();
    }
  };
  const complete = () => {
    RoomStore.changeNickName(nickName);
  };
  const changeNickName = (e: any) => {
    setNickName(e.target.value);
  };
  return useObserver(() => {
    if (RoomStore.nickName.length == 0) {
      return (
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
              onClick={complete}
              disabled={nickName.length == 0}
            >
              닉네임 설정하기
            </BlackButton>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="container">
            <div className="map">
              {/* <div>지도가 들어갑니다</div>
              <div>serviceId : {id}</div>
              <div>닉네임 : {RoomStore.nickName}</div> */}
              <Map />
            </div>
            <div className="make_room">
              <BlackButton
                variant="contained"
                fullWidth={true}
                onClick={handleCopy}
              >
                링크 복사
              </BlackButton>
            </div>
          </div>
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleAlertClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              링크가 복사되었습니다!
              <br /> 친구에게 공유해보세요!
            </Alert>
          </Snackbar>
        </>
      );
    }
  });
}
