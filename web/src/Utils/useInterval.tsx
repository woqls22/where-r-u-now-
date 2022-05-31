import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number) {
  //최근에 들어온 callBack을 저장 (ref)

  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback; //callback이 바뀔때 마다 ref 업데이트
  }, [callback]);

  useEffect(() => {
    function excuteCallback() {
      savedCallback.current;
    }
    if (delay != null) {
      let id = setInterval(excuteCallback, delay); // delay에 맞추어 Interval새로 실행
      return () => clearInterval(id); // unmount될 때 clearInterval
    }
  }, [delay]);
}
