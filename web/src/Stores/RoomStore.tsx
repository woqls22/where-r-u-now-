import { observable } from "mobx";
import { LocationData, NaverMapData } from "../Utils/MapData";
export class LocationInfo {
  constructor(public lat: number, public lng: number) {}
}
interface RoomStore {
  nickName: string;
  location: LocationInfo;
  changeNickName: (data: string) => void;
}
const RoomStore = observable<RoomStore>({
  nickName: "",
  location: new LocationInfo(37.3595704, 127.105399),
  changeNickName(data: string) {
    this.nickName = data;
  },
});
export default RoomStore;
