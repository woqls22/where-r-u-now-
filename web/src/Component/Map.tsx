import { CircularProgress } from "@mui/material";
import { randomInt, randomUUID } from "crypto";
import { useObserver } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { clearInterval } from "timers";
import MapStore from "../Stores/MapStore";
import RoomStore, { LocationInfo } from "../Stores/RoomStore";
import "../styles/map.css";
import { rootURL } from "../Utils/Constants";
import { LocationData, NaverMapData } from "../Utils/MapData";
import useInterval from "../Utils/useInterval";
import { SpringAxios } from "../Utils/Utils";
import { BlackButton } from "./BlackButton";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const Map = (props: any) => {
  const uuid = props.id;
  const history = useHistory();
  const connectWebSocket = () => {
    const SOCKET_URL = `${rootURL}/ws/location/`;
    let sockJS = new SockJS(SOCKET_URL);
    let stompClient = Stomp.over(sockJS);
    stompClient.debug = () => {};
    // console.log("webSocket Connect Attemp");
    stompClient.connect({}, () => {
      //   console.log("websocket connected : /ws/location");
      //   console.log("subscribe Attemped : /topic/" + uuid);
      stompClient.subscribe("/topic/" + uuid, (data) => {
        // data : uuid@nickName@lat@lon
        let body = data.body.toString().split("@");
        let uuid = body[0];
        let nickName = body[1];
        let lat = body[2];
        let lng = body[3];
        // console.log(uuid, nickName, lat, lng);
        MapStore.drawMarker(nickName, Number(lat), Number(lng));
      });
    });
  };
  const publishCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const lat = position.coords.latitude + Math.random() / 10000;
        const lon = position.coords.longitude + Math.random() / 10000;
        // post currentLocation
        SpringAxios.post(
          `${rootURL}/api/kafka/?location=${RoomStore.roomId}@${RoomStore.nickName}@${lat}@${lon}`
        );
      });
    }
  };
  // const test = setInterval(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: any) => {
  //       const lat = position.coords.latitude + Math.random() / 10000;
  //       const lon = position.coords.longitude + Math.random() / 10000;
  //       // post currentLocation
  //       SpringAxios.post(
  //         `${rootURL}/api/kafka/?location=${RoomStore.roomId}@${RoomStore.nickName}@${lat}@${lon}`
  //       );
  //     });
  //   }
  // }, 4000);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // post currentLocation
          SpringAxios.post(
            `${rootURL}/kafka?location=${RoomStore.roomId}@${RoomStore.nickName}@${lat}@${lon}`
          );
          MapStore.naverMap = new naver.maps.Map("naver_map_div", {
            center: new naver.maps.LatLng(lat, lon),
            scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: false,
            minZoom: 1,
            zoomControlOptions: {
              //줌 컨트롤의 옵션
              position: naver.maps.Position.TOP_RIGHT,
            },
          });
        },
        () => {
          //geolocation Fail
          alert("UnSecure Environment : Cannot Use Geolocation API");
          history.goBack();
        }
      );
    }
    setTimeout(function produce() {
      publishCurrentLocation();
      setTimeout(produce, 2000);
    }, 2000);
    connectWebSocket();
    // return () => {
    //   clearInterval(test);
    // };
  }, []);

  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: "100%",
    height: "70vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };
  return useObserver(() => {
    return (
      <>
        <div id="naver_map_div" style={mapStyle}>
          <div>
            <CircularProgress />
          </div>
        </div>
      </>
    );
  });
};
