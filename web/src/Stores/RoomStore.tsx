import { observable } from "mobx";

interface RoomStore {
  nickName: string;
  changeNickName: (data: string) => void;
}
const RoomStore = observable<RoomStore>({
  nickName: "",
  changeNickName(data: string) {
    this.nickName = data;
  },
});
export default RoomStore;
