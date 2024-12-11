import { useRef, useState } from "react";
import { useStoreMarkersStore } from "../../store/store";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents() {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장 데이터
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null); // 드래그 중인 아이템 ID
  const [dragX, setDragX] = useState<{ [key: string]: number }>({}); // 각 아이템에 대해 드래그 위치 관리
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부 확인

  const positionL = useRef(0); // 오른쪽으로는 이동 불가, 즉, 0이 최대값
  const startX = useRef(0); // 드래그 시작 위치 설정
  const dragXPosition = useRef<{ [key: string]: number }>({}); // 드래그 이전 값 저장
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 매장id 기준 각 아이템 참조

  // 드래그 시작
  const handleDragStart = (e: any, id: string) => {
    setDraggingItemId(id);
    setIsDragging(true);

    startX.current = e.clientX || e.touches?.[0].clientX;

    dragXPosition.current[id] = dragX[id] || 0; // 드래그 시작 시 현재 위치 저장

    Object.keys(contentRefs.current).forEach((id) => {
      if (contentRefs.current[id]) {
        contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
      }
    });

    if (e.dataTransfer) {
      const img = new Image();
      img.src = "";
      e.dataTransfer.setDragImage(img, 0, 0); // 드래그 잔상 제거
    }
  };

  // const getClientX = (e: any): number => {
  //   // 마우스 이벤트와 터치 이벤트에 따라 clientX를 반환
  //   if (e.clientX !== undefined) {
  //     return e.clientX; // 마우스 이벤트
  //   } else if (e.touches?.[0]?.clientX !== undefined) {
  //     return e.touches[0].clientX; // 터치 이벤트 (touchstart, touchmove)
  //   } else if (e.changedTouches?.[0]?.clientX !== undefined) {
  //     return e.changedTouches[0].clientX; // 터치 이벤트 (touchend)
  //   }
  //   return 0; // 기본값
  // };
  //   const handleDragStart = (e: any, id: string) => {
  //     setDraggingItemId(id);
  //     setIsDragging(true);

  //     const currentX = getClientX(e); // 안전하게 clientX 가져오기
  //     startX.current = currentX;
  //     dragXPosition.current[id] = dragX[id] || 0; // 드래그 시작 시 현재 위치 저장

  //     console.log("startX.current ", currentX);

  //     Object.keys(contentRefs.current).forEach((id) => {
  //       if (contentRefs.current[id]) {
  //         contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
  //       }
  //     });

  //     // e.dataTransfer가 있는 경우에만 처리
  //     if (e.dataTransfer) {
  //       const img = new Image();
  //       img.src =
  //         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
  //         "AAAFCAYAAACNbyblAAAAHElEQVR42mP8/wcAAwAB/JP9EFwAAAABJRU5ErkJggg=="; // 투명한 이미지 base64
  //       e.dataTransfer.setDragImage(img, 0, 0); // 드래그 잔상 제거
  //     }
  //   };

  // 드래그 진행 중
  const handleDrag = (e: any, id: string) => {
    if (!isDragging || draggingItemId !== id) return;

    const currentX = e.clientX || e.touches?.[0].clientX;
    let newPosition = dragXPosition.current[id] + (currentX - startX.current);

    if (startX.current > 2000) {
      contentRefs.current[id]!.classList.add("drag-y");

      setDragX((prevState) => ({
        ...prevState,
        [id]: 0,
      }));
    } else {
      // 드래그 X 값이 -10% (왼쪽) 범위 안에서만 작동하도록 설정
      setDragX((prevState) => ({
        ...prevState,
        [id]: Math.max(
          Math.min(newPosition, positionL.current),
          -window.innerWidth * 0.1
        ),
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggingItemId === id) return;

    const draggedIndex = storeMarkers.findIndex(
      (item) => item.id === draggingItemId
    ); // 드래그 대상 아이템이 원래 있던 위치
    const targetIndex = storeMarkers.findIndex((item) => item.id === id); // 드래그 대상 아이템이 들어갈 위치

    if (draggedIndex === targetIndex) return; // 같은 인덱스일 경우 변경하지 않음

    const newMarkers = [...storeMarkers];
    const [removed] = newMarkers.splice(draggedIndex, 1); // 리스트에서 드래그된 아이템 제거
    newMarkers.splice(targetIndex, 0, removed); // 새 위치에 삽입
    setStoreMarkers(newMarkers);
  };

  // 드래그 종료
  const handleDragEnd = (e: any, id: string) => {
    if (isDragging) {
      const currentX = e.clientX || e.touches?.[0].clientX;
      let newPosition = dragXPosition.current[id] + (currentX - startX.current);

      if (newPosition < -300) {
        setDragX((prevState) => ({
          ...prevState,
          [id]: -window.innerWidth * 0.08,
        }));
      }
      contentRefs.current[id]!.classList.remove("drag-y");
      setIsDragging(false);
      setDraggingItemId(null);
    }
  };

  return (
    <div className="sheet-content-wrap">
      {storeMarkers.map((item) => (
        <div
          key={item.id}
          className="sheet-content"
          style={{ transform: `translateX(${dragX[item.id] || 0}px)` }}
          ref={(el) => (contentRefs.current[item.id] = el)} // 개별 항목에 ref 설정
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDrag={(e) => handleDrag(e, item.id)}
          onDragEnd={(e) => handleDragEnd(e, item.id)}
          onMouseDown={(e) => handleDragStart(e, item.id)}
          onMouseMove={(e) => handleDrag(e, item.id)}
          onMouseUp={(e) => handleDragEnd(e, item.id)}
          onTouchStart={(e) => handleDragStart(e, item.id)}
          onTouchMove={(e) => handleDrag(e, item.id)}
          onTouchEnd={(e) => handleDragEnd(e, item.id)}
        >
          <div className="content-item">
            <img
              src="https://i.pinimg.com/originals/35/e4/8e/35e48e469aa636b91a82704da2944670.gif"
              alt="매장 임시 이미지"
            />
            <div className="content-txt">
              <div>{item.storeName}</div>
              <div>{item.machine}</div>
              <div>{item.address}</div>
            </div>
          </div>

          <div
            className="index-change-btn"
            onDragOver={(e) => handleDragOver(e, item.id)}
          >
            <ContentDragBtn />
          </div>

          <img
            className="delete-btn"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
            alt="삭제"
          />
        </div>
      ))}
    </div>
  );
}

export default BottomSheetContents;
