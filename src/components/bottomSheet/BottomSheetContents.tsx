import { useEffect, useRef, useState } from "react";
import { useStoreMarkersStore } from "../../store/store";
import Sortable from "sortablejs";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents() {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 각 항목에 대한 ref
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [startX, setStartX] = useState(0); // 드래그 시작 위치

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartX(e.clientX); // 드래그 시작 위치
    setIsDragging(true); // 드래그 상태 활성화

    const img = new Image();
    img.src = ""; // 투명한 이미지로 드래그 그림자 제거
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    if (!isDragging) return;

    const dragItem = contentRefs.current[itemId];
    if (dragItem) {
      dragItem.style.transform = `translateX(-18rem) `; // 최대 드래그 범위
    }
    Object.keys(contentRefs.current).forEach((id) => {
      if (id !== itemId && contentRefs.current[id]) {
        contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
      }
    });
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: string
  ) => {
    const moveX = e.clientX - startX; // 현재 위치와 시작 위치의 차이
    const element = contentRefs.current[itemId];
    if (moveX < -200) {
      element!.style.transform = `translateX(-18rem)`;
    } else {
      element!.style.transform = `translateX(-0)`;
    }

    setIsDragging(false);
  };

  return (
    <div className="sheet-content-wrap">
      {storeMarkers.map((item) => (
        <div
          key={item.id}
          className="sheet-content"
          ref={(el) => (contentRefs.current[item.id] = el)} // 개별 항목에 ref 설정
          draggable
          onDragStart={(e) => handleDragStart(e)} // 드래그 시작
          onDrag={(e) => handleDrag(e, item.id)} // 드래그 중
          onDragEnd={(e) => handleDragEnd(e, item.id)} // 드래그 종료
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

          <img
            className="delete-btn"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
            alt="삭제"
          />

          <ContentDragBtn />
        </div>
      ))}
    </div>
  );
}

export default BottomSheetContents;
