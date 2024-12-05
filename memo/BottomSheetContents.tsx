import { PanInfo, Reorder, motion, useDragControls } from "framer-motion";
import { useState } from "react";
import { useStoreMarkersStore } from "../store";
import ContentDragBtn from "./ContentDragBtn";

// 프레이머 모션 널 잊지않겠다
function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();
  const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 아이템 드래그 상태

  const onPointerDown = () => {
    setIsMotion(false); // 부모 모션 비활성화
  };

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    const offset = info.offset;

    // 왼쪽으로 100이상 드래그 시 요소 밀기
    if (offset.x < -100) {
      setDraggedItems((prev) => new Set(prev).add(id)); // 드래그된 항목 추적
    }
    // 오른쪽으로 드래그하면 원상복귀
    if (offset.x > 100) {
      setDraggedItems((prev) => {
        const updatedItems = new Set(prev);
        updatedItems.delete(id); // 드래그 끝나면 해당 아이템 삭제
        return updatedItems;
      });
    }
  };

  const handleDelete = (id: string) => {
    console.log("Deleted", id);
  };

  const dragControlsX = useDragControls();
  const dragControlsY = useDragControls();

  return (
    <Reorder.Group
      axis="y"
      values={storeMarkers}
      // onReorder={setStoreMarkers}
      onReorder={(newOrder) => {
        setStoreMarkers(newOrder);
        console.log("인덱스?");

        console.log("newOrder", newOrder);

        // setDraggedItems(new Set()); // 리오더 시 드래그 상태 초기화
      }}
      className="sheet-content-wrap"
      onPointerDown={onPointerDown}
    >
      {storeMarkers.map((item) => {
        const isItemDragged = draggedItems.has(item.id); // 해당 아이템이 드래그된 상태인지 체크

        return (
          <Reorder.Item
            key={item.id}
            value={item}
            className="sheet-content"
            dragListener={false}
            dragControls={dragControlsY} // 너가 원인이였던거같아
          >
            <motion.div
              dragControls={dragControlsX} // 너가 원인이였던거같아
              className="content-item"
              drag={"x"}
              dragConstraints={{ left: -100, right: 0 }}
              onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
              initial={{ x: 0 }}
              dragMomentum={false}
              onPointerDown={(e) => {
                dragControlsX.start(e);
                console.log("가로다ㅏㅏㅏㅏㅏㅏㅏㅏ");
              }}
            >
              <img
                src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                alt="Temporary image"
                className="store-img"
              />
              <div className="content-info">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </motion.div>

            {!isItemDragged && (
              <div className="dnd-btn">
                <ContentDragBtn dragControlsY={dragControlsY} />
              </div>
            )}

            <motion.div
              className="sheet-content-btn"
              initial={{ opacity: 0, x: "100%" }} // 기본적으로 숨겨진 버튼
              animate={{
                opacity: isItemDragged ? 1 : 0,
                x: isItemDragged ? 0 : "100%",
              }}
              transition={{ type: "tween", duration: 0.5 }} // 애니메이션 설정
              onClick={() => handleDelete(item.id)} // 삭제 버튼 클릭 시
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
                alt="삭제 임시 이미지"
              />
            </motion.div>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

export default BottomSheetContents;
