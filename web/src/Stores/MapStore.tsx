import { observable } from "mobx";
import { LocationData, NaverMapData } from "../Utils/MapData";
import { LocationInfo } from "./RoomStore";
class Location {
  constructor(lat: number, lng: number) {}
}
interface MapStore {
  naverMap: any;
  deleteMarkerList: NaverMapData[];
  recievedMarkerList: LocationData[];
  refreshMarker: (divName: string) => void;
  calculateCenter: (divName: string) => void;
}
const RoomStore = observable<MapStore>({
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
  recievedMarkerList: [
    new LocationData("hello", 37.3526704, 127.105399),
    new LocationData("hello2", 37.3512615, 127.105122),
  ],
  calculateCenter(divName) {
    var lat = 0;
    var lng = 0;
    this.recievedMarkerList.map((val) => {
      lat += val.latitude;
      lng += val.longitude;
    });
    this.naverMap = new naver.maps.Map(divName, {
      center: new naver.maps.LatLng(
        lat / this.recievedMarkerList.length,
        lng / this.recievedMarkerList.length
      ),
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
    console.log(lat / this.recievedMarkerList.length);
  },
  refreshMarker(divName) {
    this.deleteMarkerList.map((value) => {
      var marker = value.Marker;
      var info = value.InfoWindow;
      marker.setMap(null);
      info.setMap(null);
    });
    this.deleteMarkerList = [];
    // marker fetch
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
        new NaverMapData(marker, infowindow),
      ];
    });
    // calculateCenter
  },
});
export default RoomStore;
