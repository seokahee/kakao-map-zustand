// import { useEffect, useRef, useState } from "react";
// import { useStoreMarkersStore } from "../../store/store";
// import ContentDragBtn from "./ContentDragBtn";

// function BottomSheetContents() {
//   const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장
//   const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 각 항목에 대한 ref
//   const [isDragging, setIsDragging] = useState(false); // 드래그 상태
//   const [startX, setStartX] = useState(0); // 드래그 시작 위치

//   const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
//     setStartX(e.clientX); // 드래그 시작 위치
//     setIsDragging(true); // 드래그 상태 활성화

//     const img = new Image();
//     img.src = ""; // 투명한 이미지로 드래그 그림자 제거
//     e.dataTransfer.setDragImage(img, 0, 0);
//   };

//   const handleDrag = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
//     if (!isDragging) return;

//     const dragItem = contentRefs.current[itemId];
//     if (dragItem) {
//       dragItem.style.transform = `translateX(-18rem) `; // 최대 드래그 범위
//     }
//     Object.keys(contentRefs.current).forEach((id) => {
//       if (id !== itemId && contentRefs.current[id]) {
//         contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
//       }
//     });
//   };

//   const handleDragEnd = (
//     e: React.DragEvent<HTMLDivElement>,
//     itemId: string
//   ) => {
//     const moveX = e.clientX - startX; // 현재 위치와 시작 위치의 차이
//     const element = contentRefs.current[itemId];
//     if (moveX < -200) {
//       element!.style.transform = `translateX(-18rem)`;
//     } else {
//       element!.style.transform = `translateX(-0)`;
//     }

//     setIsDragging(false);
//   };

//   return (
//     <div className="sheet-content-wrap">
//       {storeMarkers.map((item) => (
//         <div
//           key={item.id}
//           className="sheet-content"
//           ref={(el) => (contentRefs.current[item.id] = el)} // 개별 항목에 ref 설정
//           draggable="true"
//           onDragStart={(e) => handleDragStart(e)} // 드래그 시작
//           onDrag={(e) => handleDrag(e, item.id)} // 드래그 중
//           onDragEnd={(e) => handleDragEnd(e, item.id)} // 드래그 종료
//         >
//           <div className="content-item">
//             <img
//               src="https://i.pinimg.com/originals/35/e4/8e/35e48e469aa636b91a82704da2944670.gif"
//               alt="매장 임시 이미지"
//             />
//             <div className="content-txt">
//               <div>{item.storeName}</div>
//               <div>{item.machine}</div>
//               <div>{item.address}</div>
//             </div>
//           </div>

//           <img
//             className="delete-btn"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
//             alt="삭제"
//           />

//           {/* <ContentDragBtn /> */}
//           <div className="index-change-btn">인덱스 변경은 여기를 잡으세요</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default BottomSheetContents;

// import { useEffect, useRef, useState } from "react";
// import { StorePositionsType } from "../../types/kakaoMap"; // StorePositionsType import
// import { miniData } from "../../temp/data"; // miniData import
// import { Reorder } from "framer-motion";

// function BottomSheetContents() {
//   const [storeMarkers, setStoreMarkers] =
//     useState<StorePositionsType[]>(miniData);
//   const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggingIndexBtn, setDraggingIndexBtn] = useState(false); // Y축 드래그 여부

//   const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

//   const handleDragStart = (
//     e: React.DragEvent<HTMLDivElement>,
//     id: string,
//     isIndexBtn: boolean
//   ) => {
//     setDraggingItemId(id);
//     setStartX(e.clientX);
//     setStartY(e.clientY);
//     setIsDragging(true);
//     setDraggingIndexBtn(isIndexBtn); // Y축 드래그 여부 설정

//     const img = new Image();
//     img.src = ""; // 투명한 이미지로 드래그 그림자 제거
//     e.dataTransfer.setDragImage(img, 0, 0);
//   };

//   const handleDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
//     if (!isDragging) return;

//     const dragItem = contentRefs.current[id];
//     if (dragItem) {
//       const moveX = e.clientX - startX; // X축 차이
//       const moveY = e.clientY - startY; // Y축 차이

//       const limitedMoveX = Math.min(moveX, 185);

//       // X축 드래그는 X축으로만 처리
//       if (!draggingIndexBtn && Math.abs(moveX) > Math.abs(moveY)) {
//         dragItem.style.transform = `translateX(${limitedMoveX}px)`; // X축만 이동
//       }

//       // Y축 드래그는 index-change-btn에서만 처리
//       if (draggingIndexBtn && Math.abs(moveY) > Math.abs(moveX)) {
//         dragItem.style.transform = `translateY(${moveY}px);  opacity: 0.5`; // Y축만 이동
//       }
//     }

//     contentRefs.current[id]?.classList.add("dragging");

//     Object.keys(contentRefs.current).forEach((id) => {
//       if (id !== draggingItemId && contentRefs.current[id]) {
//         contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
//       }
//     });
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
//     e.preventDefault();

//     if (draggingItemId === id) return;

//     const draggedIndex = storeMarkers.findIndex(
//       (item) => item.id === draggingItemId
//     );

//     const targetIndex = storeMarkers.findIndex((item) => item.id === id);

//     if (draggedIndex === targetIndex) return; // 같은 인덱스일 경우 변경하지 않음

//     const newMarkers = [...storeMarkers];
//     const [removed] = newMarkers.splice(draggedIndex, 1); // 드래그된 아이템 제거
//     newMarkers.splice(targetIndex, 0, removed); // 새 위치에 삽입
//     setStoreMarkers(newMarkers); // 순서 변경 후 상태 업데이트
//   };

//   const handleDragEnd = (
//     e: React.DragEvent<HTMLDivElement>,
//     itemId: string
//   ) => {
//     const moveX = e.clientX - startX; // 현재 위치와 시작 위치의 차이
//     const element = contentRefs.current[itemId];
//     if (element) {
//       if (moveX < -100) {
//         element.style.transform = `translateX(-18rem)`; // 이동 범위 설정
//       } else {
//         element.style.transform = `translateX(0)`; // 원위치
//       }
//     }
//     setIsDragging(false); // 드래그 종료 상태 설정
//     setDraggingItemId(null); // 드래그 종료 후 상태 초기화
//   };

//   console.log("draggingIndexBtn", draggingIndexBtn);

//   return (
//     <div className="sheet-content-wrap">
//       {storeMarkers.map((item) => (
//         <div
//           key={item.id}
//           className="sheet-content"
//           ref={(el) => (contentRefs.current[item.id] = el)} // 개별 항목에 ref 설정
//           draggable="true"
//           onDragStart={(e) => handleDragStart(e, item.id, false)} // X축 드래그
//           onDrag={(e) => handleDrag(e, item.id)} // 드래그 중
//           onDragEnd={(e) => handleDragEnd(e, item.id)} // 드래그 종료
//         >
//           <div className="content-item">
//             <img
//               src="https://i.pinimg.com/originals/35/e4/8e/35e48e469aa636b91a82704da2944670.gif"
//               alt="매장 임시 이미지"
//             />
//             <div className="content-txt">
//               <div>{item.storeName}</div>
//               <div>{item.machine}</div>
//               <div>{item.address}</div>
//             </div>
//           </div>

//           <img
//             className="delete-btn"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
//             alt="삭제"
//           />

//           <div
//             className="index-change-btn"
//             aria-label="Drag to reorder"
//             onDragOver={(e) => handleDragOver(e, item.id)} // 드래그 중에 순서 변경
//             style={{
//               opacity: draggingIndexBtn ? 0.5 : 1, // Y축 드래그일 때 opacity를 0.5로 설정
//             }}
//           >
//             인덱스 변경은 여기를 잡으세요
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default BottomSheetContents;

// 왼쪽 레프트
// 오른쪽 라이트
// 인덱스변경 시 왼쪽 오른쪽 리무브

import { useEffect, useRef, useState } from "react";
import { StorePositionsType } from "../../types/kakaoMap"; // StorePositionsType import
import { miniData } from "../../temp/data"; // miniData import
import { Reorder } from "framer-motion";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents() {
  const [storeMarkers, setStoreMarkers] =
    useState<StorePositionsType[]>(miniData);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggingItemId(id);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);

    const img = new Image();
    img.src = ""; // 투명한 이미지로 드래그 그림자 제거
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    if (!isDragging) return;

    const dragItem = contentRefs.current[id];
    if (dragItem) {
      const moveX = e.clientX - startX; // X축 차이
      const moveY = e.clientY - startY; // Y축 차이

      // X축 드래그는 X축으로만 처리
      if (Math.abs(moveX) > Math.abs(moveY)) {
        dragItem.style.transform = `translateX(${Math.min(moveX, 185)}px)`; // X축만 이동
      }

      // Y축 드래그는 index-change-btn에서만 처리
      if (Math.abs(moveY) > Math.abs(moveX)) {
        dragItem.style.transform = `translateY(${moveY}px);`; // Y축만 이동
      }
    }

    contentRefs.current[id]?.classList.add("dragging");

    Object.keys(contentRefs.current).forEach((id) => {
      if (id !== draggingItemId && contentRefs.current[id]) {
        contentRefs.current[id]!.style.transform = "translateX(0)"; // 다른 항목들은 원위치로 돌림
      }
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();

    if (draggingItemId === id) return;

    const draggedIndex = storeMarkers.findIndex(
      (item) => item.id === draggingItemId
    );

    const targetIndex = storeMarkers.findIndex((item) => item.id === id);

    if (draggedIndex === targetIndex) return; // 같은 인덱스일 경우 변경하지 않음

    const newMarkers = [...storeMarkers];
    const [removed] = newMarkers.splice(draggedIndex, 1); // 드래그된 아이템 제거
    newMarkers.splice(targetIndex, 0, removed); // 새 위치에 삽입
    setStoreMarkers(newMarkers); // 순서 변경 후 상태 업데이트
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: string
  ) => {
    const moveX = e.clientX - startX; // 현재 위치와 시작 위치의 차이
    const element = contentRefs.current[itemId];
    if (element) {
      if (moveX < -100) {
        element.style.transform = `translateX(-18rem)`; // 이동 범위 설정
      } else {
        element.style.transform = `translateX(0)`; // 원위치
      }
    }
    setIsDragging(false); // 드래그 종료 상태 설정
    setDraggingItemId(null); // 드래그 종료 후 상태 초기화
  };

  return (
    <div className="sheet-content-wrap">
      {storeMarkers.map((item) => (
        <div
          key={item.id}
          className="sheet-content"
          ref={(el) => (contentRefs.current[item.id] = el)} // 개별 항목에 ref 설정
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item.id)} // X축 드래그
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

          <div
            className="index-change-btn"
            onDragOver={(e) => handleDragOver(e, item.id)} // 드래그 중에 순서 변경
          >
            <ContentDragBtn />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomSheetContents;
