import { useDraggable } from "@dnd-kit/core";
import { StorePositionsType } from "../../types/kakaoMap";
import IndexDragBtn from "./IndexDragBtn";

// dnd-kit
// 드래그 범위 적용 안됨, 드래그 속도 일정하지 않음
export default function Item({
  item,
  draggedPosition,
}: {
  item: StorePositionsType;
  draggedPosition: any;
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
  });
  return (
    <div
      key={item.id}
      className="sheet-content"
      ref={setNodeRef} // 드래그 가능한 영역에 ref 연결
      {...listeners} // 드래그 이벤트를 처리할 수 있도록 리스너 바인딩
      {...attributes} // 필요한 속성들을 연결
      style={{
        transform: draggedPosition[item.id]
          ? `translateX(${draggedPosition[item.id]}px)` // X축 이동 적용
          : "none",
      }}
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
      <div className="index-change-btn">
        <IndexDragBtn />
      </div>

      <img
        className="delete-btn"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
        alt="삭제"
      />
    </div>
  );
}

// 테스트 콘텐츠
// import React, { useState } from "react";
// import {
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { miniData } from "../data"; // 임시 데이터
// import Item from "./Item";

// const TestContents = () => {
//   const [testState, setTestState] = useState(miniData); // 임시 데이터
//   const [draggedPosition, setDraggedPosition] = useState<{
//     [key: string]: number;
//   }>({}); // 드래그 요소 위치 상태

//   // 드래그 센서 설정, 포인터는 마우스, 터치 모두 사용 가능하다
//   // distance 마우스 움직임 거리에 따라 드래드가 활성화된다. 현재 제약 20px이상 움직여야 드래그 활성화
//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 20 } })
//   );

//   // 드래그가 이동 중일 때 호출
//   const handleDragMove = (event: any) => {
//     const { active, delta } = event;
//     // console.log("active", active); // index number(1부터 시작)
//     // console.log("delta", delta); // 이동거리

//     // 드래그 속도
//     const dragSpeed = 0.05;

//     // 드래그 범위
//     const minDrag = 0;
//     const maxDrag = window.innerWidth * -0.1;

//     if (active) {
//       const dragX = delta.x * dragSpeed;

//       const boundedX = Math.max(maxDrag, Math.min(dragX, minDrag));

//       setDraggedPosition((prev) => ({
//         ...prev,
//         [active.id]: prev[active.id] ? prev[active.id] + boundedX : boundedX,
//       }));
//       // 드래그 요소 id(index)가 이전 id와 같으면 이전 요소에 이동거리를 추가 :  다르면 이동거리 설정
//     }
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       onDragMove={handleDragMove} // 수평 드래그 처리
//     >
//       {testState.map((item: any) => {
//         return (
//           <Item item={item} key={item.id} draggedPosition={draggedPosition} />
//         );
//       })}
//     </DndContext>
//   );
// };

// export default TestContents;
