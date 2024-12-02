import { motion, Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { useStoreMarkersStore } from "../store";
import ContentDeleteBtn from "./ContentDeleteBtn";
import ContentDragBtn from "./ContentDragBtn";
import ContentItem from "./ContentItem";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장
  const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 매장 요소 드래그 상태
  const [isItemDrag, setIsItemDrag] = useState(true);

  const onPointerDown = () => {
    setIsMotion(false); // 부모 모션 비활성화
  };

  const onDragStart = (id: string) => {
    setDraggedItems((prev) => new Set(prev).add(id));
  };

  const onDragEnd = (e: any, info: any, id: string) => {
    // setIsMotion(true); // 부모 모션 활성화

    if (info.offset.x < -300) {
      // 왼쪽으로 300px 이상 밀렸을 때 삭제 버튼 노출된 상태로 고정
      setDraggedItems((prev) => new Set(prev).add(id));
    } else {
      setDraggedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(id); // 밀리지 않으면 드래그 상태에서 제거
        return updated;
      });
    }
  };

  const dragControls = useDragControls();

  return (
    <div className="sheet-content-wrap">
      <Reorder.Group axis="y" values={storeMarkers} onReorder={setStoreMarkers}>
        {storeMarkers.map((item) => {
          const isItemDragged = draggedItems.has(item.id);
          console.log("draggedItems", draggedItems.has(item.id));

          return (
            <Reorder.Item
              key={item.id}
              value={item}
              dragListener={false}
              dragControls={dragControls}
            >
              <motion.div
                className="sheet-content"
                // drag={"x"}
                drag={isItemDrag ? "x" : false}
                dragMomentum={false} // 모션 밀림 방지
                dragConstraints={{ left: -300, right: 0 }} // 왼쪽으로 최대 300px까지 드래그 가능
                onPointerDown={onPointerDown} // 드래그 시작 시 부모 모션 비활성화
                onDragStart={() => onDragStart(item.id)}
                onDragEnd={(e, info) => onDragEnd(e, info, item.id)} // 드래그 끝났을 때 부모 모션 활성화
              >
                <ContentItem item={item} />

                {!isItemDragged && (
                  <div className="dnd-btn">
                    <ContentDragBtn
                      dragControls={dragControls}
                      setIsItemDrag={setIsItemDrag}
                    />
                  </div>
                )}

                {isItemDragged && (
                  <ContentDeleteBtn
                    isItemDragged={isItemDragged}
                    item={item.id}
                  />
                )}
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

export default BottomSheetContents;