import React, { useEffect, useState } from "react";
import "../styles/map.css";

export const Map = () => {
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const initMap = () => {
    setNaverMap(
      new naver.maps.Map("naver_map", {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
        zoomControl: true,
        minZoom: 6,
        zoomControlOptions: {
          //줌 컨트롤의 옵션
          position: naver.maps.Position.TOP_RIGHT,
        },
      })
    );
  };
  useEffect(() => {
    initMap();
  }, []);

  //지도 사이즈 관련 스타일
  const mapStyle = {
    width: "100%",
    height: "70vh",
  };
  return <div id="naver_map" style={mapStyle}></div>;
};
