import { PanInfo, Reorder, motion, useDragControls } from "framer-motion";
import { useStoreMarkersStore } from "../store";
import { useState } from "react";
import ContentDragBtn from "./ContentDragBtn";
import ContentItem from "./ContentItem";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();

  const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 아이템 드래그 상태

  const [te, setTe] = useState(false);
  const [te2, setTe2] = useState(false);

  const onPointerDown = () => {
    setIsMotion(false); // 부모 모션 비활성화
    // setIsTest(true);
  };

  const onDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    const offset = info.offset;
    console.log("offset", offset);

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

  const dragControls = useDragControls();

  const onDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // const offset = info.offset;
    // // console.log("offset", offset);
    // // console.log("info", info);
    // const x = Math.abs(offset.x);
    // const y = Math.abs(offset.y);
    // setTe(Math.abs(info.offset.x) > Math.abs(info.offset.y));
    // if (x > y) {
    //   console.log("가로 모션");
    // }
    // if (y > x) {
    //   console.log("세로모션");
    // }
  };

  return (
    <Reorder.Group
      axis="y"
      values={storeMarkers}
      onReorder={setStoreMarkers}
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
            // dragListener={te ? false : true}
            // dragListener={te ? true : false}
            dragListener={false}
            dragControls={dragControls}
          >
            <motion.div
              className="content-item"
              // drag={te2 ? false : "x"}
              drag={"x"}
              // dragListener={te ? true : false}
              // dragListener={te ? false : true}
              dragConstraints={{ left: -100, right: 0 }}
              onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
              initial={{ x: 0 }}
              dragMomentum={false}
              onDrag={(e, info) => onDrag(e, info)}
              // animate={{ x: 0 }}
              // whileDrag={{ scale: 1.05 }}
              // transition={{ type: "spring", stiffness: 300 }}
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
              {/* <ContentItem item={item} /> */}
            </motion.div>

            {!isItemDragged && (
              <div className="dnd-btn">
                <ContentDragBtn dragControls={dragControls} />
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
