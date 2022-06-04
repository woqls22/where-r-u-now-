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
  refreshMarker: (divName: string) => void;
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
  refreshMarker(divName) {
    this.deleteMarkerList.map((value) => {
      var marker = value.Marker;
      var info = value.InfoWindow;
      marker.setMap(null);
      info.setMap(null);
    });
    this.deleteMarkerList = [];
    // marker fetch
    this.recievedMarkerList = [
      new LocationData(RoomStore.nickName, 37.3526104, 127.105399),
      new LocationData("hello2", 37.3826504, 127.115399),
      new LocationData("hello3", 37.3626204, 127.100399),
    ];
    // this.calculateCenter(divName);
    //marker Add
    this.recievedMarkerList.map((value) => {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          value.latitude + Math.random() / 2000,
          value.longitude - Math.random() / 2000
        ),
        map: this.naverMap,
        zIndex: 100,
      });
      var infowindow = new naver.maps.InfoWindow({
        disableAnchor: true,
        content: [
          `<div class="info-title">
                    <div>${value.nickName}</div>
                    </div>`,
        ].join(""),
      });
      marker.addListenerOnce("click", () => {
        infowindow.open(this.naverMap, marker);
      });
      // assign Delete MarkerList
      this.deleteMarkerList = [
        ...this.deleteMarkerList,
        // new NaverMapData(marker, infowindow,),
      ];
    });
    // calculateCenter
  },
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

    console.log(this.renderedMarkerList);
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
