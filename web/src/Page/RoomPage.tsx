import React, { useEffect, useState } from "react";
import "../styles/welcome.css";
import "../styles/room.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory, useParams } from "react-router";
import { Alert, Snackbar } from "@mui/material";
export default function RoomPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

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
      alert("복사하기가 지원되지 않는 브라우저입니다.");
    }
  };
  useEffect(() => {}, [id]);
  if (id) {
    return (
      <>
        <div className="container">
          <div className="map">
            <div>지도가 들어갑니다</div>
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
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            링크가 복사되었습니다! 친구에게 공유해보세요!
          </Alert>
        </Snackbar>
      </>
    );
  }
  return <>Nothing</>;
}
