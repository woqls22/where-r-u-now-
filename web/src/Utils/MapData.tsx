export class LocationData {
  constructor(
    public nickName: string,
    public latitude: number,
    public longitude: number
  ) {}
}
export class NaverMapData {
  constructor(
    public Marker: naver.maps.Marker,
    public InfoWindow: naver.maps.InfoWindow,
    public nickName: string
  ) {}
}
