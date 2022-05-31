import { CircularProgress } from "@mui/material";
import { randomInt, randomUUID } from "crypto";
import { useObserver } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import MapStore from "../Stores/MapStore";
import RoomStore, { LocationInfo } from "../Stores/RoomStore";
import "../styles/map.css";
import { LocationData, NaverMapData } from "../Utils/MapData";
import useInterval from "../Utils/useInterval";
import { BlackButton } from "./BlackButton";
export const Map = () => {
  setInterval(() => {
    MapStore.refreshMarker("naver_map_div");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const lat = position.coords.latitude + Math.random() / 200;
        const lon = position.coords.longitude + Math.random() / 300;
        // MapStore.recievedMarkerList.push(
        //   new LocationData("임시" + lat, lat, lon)
        // );
      });
    }
  }, 4000);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        MapStore.recievedMarkerList.push(
          new LocationData(RoomStore.nickName, lat, lon)
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
        MapStore.refreshMarker("naver_map_div");
      });
    }
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
