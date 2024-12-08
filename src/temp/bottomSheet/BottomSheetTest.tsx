import { useEffect, useRef, useState } from "react";
import { miniData } from "../data";
import "./sheet.css";

function BottomSheetTest() {
  const [testState] = useState(miniData);
  const [initial, setInitial] = useState(window.innerHeight - 50); // 바텀시트 초기값
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부 확인

  const startY = useRef(0); // 드래그 시작 위치 설정
  const sheetPosition = useRef(initial); // 바텀시트 이전 값 저장

  const minPosition = useRef(window.innerHeight * 0.1); // 상단 제한
  const maxPosition = useRef(window.innerHeight - 50); // 하단 제한

  // 화면 크기 변경 감지
  useEffect(() => {
    const updatePositions = () => {
      setInitial(window.innerHeight - 50);
    };

    // 초기 화면 크기 및 크기 변경 시 갱신
    updatePositions();
    window.addEventListener("resize", updatePositions);
  }, []);

  // 마우스 클릭 또는 터치
  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    startY.current = e.clientY || e.touches?.[0].clientY;
    sheetPosition.current = initial; // 드래그 시작 시 현재 위치 저장
  };

  // 드래그 시 바텀시트 이동 거리 추적 후 바텀시트 이동
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const currentY = e.clientY || e.touches?.[0].clientY; // 이동 시 바텀시트 위치 추적
    // const delta = currentY - startY.current; // 이동 후 마우스 위치 - 드래그 시작 위치 = 이동거리
    // const newPosition = sheetPosition.current + delta; // 바텀시트 시작 위치 + 이동거리

    const newPosition = sheetPosition.current + (currentY - startY.current);
    // 바텀시트 시작 위치 + (드래그 후 마우스 위치 - 드래그 시작 마우스 위치) = 바텀시트 현재 위치
    // 현재 바텀시트에 마우스 이동거리를 더해 바텀시트 위치 계산

    setInitial(
      Math.min(Math.max(newPosition, minPosition.current), maxPosition.current)
    );
    // 바텀 시트 위치 제한을 위해 Math.max(newPosition, minPosition) 바텀시트 현재 위치 , 상단 위치 비교 후 큰 값 반환
    // Math.min(Max 값, maxPosition.current) 반환된 값과 바텀시트 하단 값 비교 후 작은 값 반환
  };

  // 드래그 종료
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);

      // 바텀시트가 3/1 이상 접히면 초기 위치로 이동, 아니면 현재 위치 유지
      setInitial(
        initial > window.innerHeight * (2 / 3) ? maxPosition.current : initial
      );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove} // 마우스 이동
      onMouseUp={handleMouseUp} // 드래그 종료
      onMouseLeave={handleMouseUp} // 드래그 중 마우스가 화면을 벗어날 때 드래그 종료
      onTouchMove={handleMouseMove} // 터치 이동
      onTouchEnd={handleMouseUp} // 터치 종료
      className="bottom-sheet-wrap"
    >
      <div
        className="bottom-sheet"
        style={{
          transform: `translateY(${initial}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-in-out",
        }}
      >
        <div
          className="sheet-header"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown} // 헤더로 바텀시트 이동
        >
          <div className="sheet-handle"></div>
        </div>
        <div className="sheet-content">
          {testState.map((item) => (
            <div key={item.id} className="sheet-contents">
              <div>{item.storeName}</div>
              <div>{item.machine}</div>
              <div>{item.address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomSheetTest;
