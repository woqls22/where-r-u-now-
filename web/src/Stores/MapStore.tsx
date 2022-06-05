import { info } from "console";
import { observable } from "mobx";
import { LocationData, NaverMapData } from "../Utils/MapData";
import RoomStore, { LocationInfo } from "./RoomStore";
class Location {
  constructor(lat: number, lng: number) {}
}
interface MapStore {
  naverMap: any;
  deleteMarkerList: NaverMapData[];
  recievedMarkerList: LocationData[];
  renderedMarkerList: NaverMapData[];
  drawMarker: (nickName: string, lat: number, lng: number) => void;
}
const MapStore = observable<MapStore>({
  naverMap: new naver.maps.Map("naver_map", {
    center: new naver.maps.LatLng(37.359704, 127.105399),
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
    zoomControl: false,
    minZoom: 1,
    zoomControlOptions: {
      //줌 컨트롤의 옵션
      position: naver.maps.Position.TOP_RIGHT,
    },
  }),
  deleteMarkerList: [],
  recievedMarkerList: [],
  renderedMarkerList: [],
  //   - 마커 Drwa Sequence
  //     1. 위치 데이터 Consume
  //     2. renderedMarkerList에 해당 데이터가 있으면, 삭제
  //     3. 현재 데이터 naverMap에 렌더링
  //     4. renderedMarkerList에 추가
  drawMarker(nickName: string, lat: number, lng: number) {
    // renderedMarkerList에 해당 데이터 있을 경우 setMap(null), 배열에서 삭제
    this.renderedMarkerList.map((item: NaverMapData) => {
      if (item.nickName == nickName) {
        item.InfoWindow.setMap(null);
        item.Marker.setMap(null);
      }
    });

    // console.log(this.renderedMarkerList);
    // 새로운 마커 렌더링
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: this.naverMap,
      zIndex: 100,
    });
    var infowindow = new naver.maps.InfoWindow({
      disableAnchor: true,
      content: [
        `<div class="info-title">
                    <div>${nickName}</div>
                    </div>`,
      ].join(""),
    });
    marker.addListenerOnce("click", () => {
      infowindow.open(this.naverMap, marker);
    });
    //배열에서 해당 내용 삭제
    this.renderedMarkerList = this.renderedMarkerList.filter((data) => {
      return data.nickName != nickName;
    });
    this.renderedMarkerList.push(
      new NaverMapData(marker, infowindow, nickName)
    );
  },
});
export default MapStore;
