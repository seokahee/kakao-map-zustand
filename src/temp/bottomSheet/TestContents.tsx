import { motion, useAnimation, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { miniData } from "../data";
import TestDragBtn from "./TestDragBtn";
import Draggable from "react-draggable";
function TestContents() {
  const [testState, setTestState] = useState(miniData); // 임시 데이터
  const [activeItem, setActiveItem] = useState<string | null>(null); // 현재 드래그 상태의 항목
  const [dragStartY, setDragStartY] = useState<boolean>(false); // 드래그 중 여부

  const sortableRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 각 아이템을 참조

  useEffect(() => {
    if (sortableRef.current) {
      const sortable = new Sortable(sortableRef.current, {
        onStart(e: any) {
          setDragStartY(true);
        },
        onEnd(e: any) {
          const newStoreMarkers = [...testState];
          const movedItem = newStoreMarkers.splice(e.oldIndex as number, 1)[0];
          newStoreMarkers.splice(e.newIndex as number, 0, movedItem);

          setTestState(newStoreMarkers);
          setActiveItem(null);
          setDragStartY(false);
        },
        handle: ".index-change-btn",
        animation: 150,
        ghostClass: "drag-y",
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [testState, activeItem]);

  const onDragStart = (e: any) => {
    if (e.dataTransfer) {
      const img = new Image();
      img.src = "";
      e.dataTransfer.setDragImage(img, 0, 0); // 드래그 잔상 제거
    }
  };

  const handleDragEnd = (info: any, id: string) => {
    if (info) {
      if (info.offset.x < -200) {
        setActiveItem(id);
      } else {
        setActiveItem(null);
        // contentRefs.current[id]!.style.transform = "translateX(0)";
      }
    } else {
      return;
    }
  };

  // const controls = useAnimation();

  return (
    <div className="sheet-content-wrap" ref={sortableRef}>
      {testState.map((item) => {
        return (
          <motion.div
            key={item.id}
            className="sheet-content"
            draggable
            drag={dragStartY ? false : "x"}
            dragMomentum={false}
            dragConstraints={{ left: -200, right: 0 }}
            animate={{ x: activeItem === item.id ? -200 : 0 }}
            onDragEnd={(e, info) => handleDragEnd(info, item.id)}
            onDragStart={onDragStart}
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
              style={{ opacity: activeItem === item.id ? 0 : 1 }}
            >
              <TestDragBtn />
            </div>

            <img
              className="delete-btn"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
              alt="삭제"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default TestContents;
