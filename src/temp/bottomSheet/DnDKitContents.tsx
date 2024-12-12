import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { miniData } from "../data"; // 임시 데이터
import Item from "./Item";
import "./sheet.css";

function DnDKitContents() {
  const [testState, setTestState] = useState(miniData); // 임시 데이터

  const [draggedPosition, setDraggedPosition] = useState<{
    [key: string]: number;
  }>({}); // 드래그 요소 위치 상태

  // 드래그 센서 설정, 포인터는 마우스, 터치 모두 사용 가능하다
  // distance 마우스 움직임 거리에 따라 드래드가 활성화된다. 현재 제약 20px이상 움직여야 드래그 활성화
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 20 } })
  );
  // 드래그가 이동 중일 때 호출
  const handleDragMove = (event: any) => {
    const { active, delta } = event;

    console.log("드래그");

    // console.log("active", active); // index number(1부터 시작)
    // console.log("delta", delta); // 이동거리
    // 드래그 속도
    const dragSpeed = 0.05;
    // 드래그 범위
    const minDrag = 0;
    const maxDrag = window.innerWidth * -0.1;
    if (active) {
      const dragX = delta.x * dragSpeed;
      const boundedX = Math.max(maxDrag, Math.min(dragX, minDrag));
      setDraggedPosition((prev) => ({
        ...prev,
        [active.id]: prev[active.id] ? prev[active.id] + boundedX : boundedX,
      }));
      // 드래그 요소 id(index)가 이전 id와 같으면 이전 요소에 이동거리를 추가 :  다르면 이동거리 설정
    }
  };
  return (
    <DndContext
      sensors={sensors}
      onDragMove={handleDragMove} // 수평 드래그 처리
    >
      {testState.map((item: any) => {
        return (
          <Item item={item} key={item.id} draggedPosition={draggedPosition} />
        );
      })}
    </DndContext>
  );
}

export default DnDKitContents;
