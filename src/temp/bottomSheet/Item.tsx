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
