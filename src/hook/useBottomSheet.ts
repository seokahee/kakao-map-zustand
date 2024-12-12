import { useEffect, useRef, useState } from "react";
import { BottomEventTypes } from "../types/bottomSheet";

export const useBottomSheet = () => {
  const [initialHeight, setInitialHeight] = useState(window.innerHeight * 0.9);
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부 확인

  const startY = useRef(0); // 드래그 시작 위치
  const sheetPosition = useRef(initialHeight); // 바텀시트 이전 값 저장

  const minPosition = useRef(window.innerHeight * 0.1); // 상단 제한
  const maxPosition = useRef(window.innerHeight * 0.9); // 하단 제한

  // 화면 크기 변경에 따른 초기 바텀시트 위치 업데이트
  useEffect(() => {
    const updatePosition = () => {
      const newHeight = window.innerHeight;
      minPosition.current = newHeight * 0.1; // 상단 제한 갱신
      maxPosition.current = newHeight * 0.9; // 하단 제한 갱신

      setInitialHeight(newHeight * 0.5); // 바텀시트 초기값 갱신
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  console.log("sheetPosition", sheetPosition.current);
  console.log("maxPosition", maxPosition.current);

  // 바텀시트 이동 값 추출
  const getClientY = ({ e }: BottomEventTypes): number => {
    // 이벤트 객체에 clientY 존재 여부 확인 후  터치 이벤트 타입 적용
    return "clientY" in e
      ? e.clientY // 마우스 이벤트
      : e.touches[0].clientY; // 터치 이벤트
  };

  // 마우스 클릭 또는 터치
  const handleMoveStart = ({ e }: BottomEventTypes) => {
    setIsDragging(true);

    const clientY = getClientY({ e });
    startY.current = clientY;
    sheetPosition.current = initialHeight; // 드래그 시작 시 위치 저장
  };

  // 바텀시트 이동
  const handleMouseMove = ({ e }: BottomEventTypes) => {
    if (!isDragging) return;

    const clientY = getClientY({ e });

    // 이동 후 Y 값 - 초기 Y 값 + 이전 바텀시트 Y 값 = 바텀시트 이동 값
    const newPosition = clientY - startY.current + sheetPosition.current;

    // 바텀시트 위치 제한을 위해 이동 후 Y값과 최소 값 비교 후 큰 값 반환 > 최대 값과 비교 후 작은 값 반환 후 상태 변경
    setInitialHeight(
      Math.min(Math.max(newPosition, minPosition.current), maxPosition.current)
    );
  };

  // 이동 종료
  const handleMoveEnd = () => {
    if (isDragging) {
      setIsDragging(false);

      setInitialHeight(
        initialHeight > window.innerHeight * (2 / 3)
          ? maxPosition.current
          : initialHeight
      );
    }
  };

  return {
    initialHeight,
    isDragging,
    handleMoveStart,
    handleMouseMove,
    handleMoveEnd,
  };
};

// 펼친상태 , 닫힌상태 구분해서 이전 상태 유지하는 방법 찾기
