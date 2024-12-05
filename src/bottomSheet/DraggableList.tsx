import { Reorder, motion } from "framer-motion";
import { useStoreMarkersStore } from "../store";
import { useState } from "react";
import { storePositions } from "../storeData";
import { StorePositionsType } from "../types/type";

function DraggableList() {
  // const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();

  const [storeMarkers, setStoreMarkers] =
    useState<StorePositionsType[]>(storePositions);

  const handleDelete = (id: string) => {
    console.log(`Deleted: ${id}`);
  };

  const test = (setStoreMarkers: any) => {
    console.log("작동?");
  };
  return (
    <Reorder.Group
      axis="y"
      values={storeMarkers}
      onReorder={() => test(setStoreMarkers)}
      className="sheet-content-wrap"
    >
      {storeMarkers.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          className="sheet-content"
          as={motion.div as any}
          drag="x"
          dragConstraints={{ left: -100, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.point.x < -50) {
              // 왼쪽으로 드래그 거리가 -50px 이상이면 삭제
              handleDelete(item.id);
            }
          }}
        >
          <motion.div
            className="content-item"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
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

          <motion.div
            className="delete-btn"
            style={{
              opacity: 0,
              pointerEvents: "none", // 기본적으로 클릭 불가
            }}
            animate={{
              opacity: 1,
              pointerEvents: "auto",
              transform: "translateX(0)",
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            onClick={() => handleDelete(item.id)}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
              alt="Delete"
            />
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default DraggableList;
