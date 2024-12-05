import { motion, PanInfo, useAnimation, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { useStoreMarkersStore } from "../store";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();
  const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 아이템 드래그 상태
  // const [dragStart, setDragStart] = useState(false);

  const sortableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sortableRef.current) {
      const sortable = new Sortable(sortableRef.current, {
        onEnd(e) {
          const newStoreMarkers = [...storeMarkers];
          const movedItem = newStoreMarkers.splice(e.oldIndex as number, 1)[0];
          newStoreMarkers.splice(e.newIndex as number, 0, movedItem);
          setStoreMarkers(newStoreMarkers);
        },
        handle: ".dnd-btn",
        animation: 150,
        ghostClass: "blue-background-class",
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [storeMarkers, setStoreMarkers]);

  const onPointerDown = () => {
    setIsMotion(false); // 부모 모션 비활성화
  };

  const onDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    const offset = info.offset;
    if (offset.x < -10) {
      setDraggedItems((prev) => new Set(prev).add(id)); // 드래그된 항목 추적
    }
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
    if (offset.x > 0 || offset.x > -100) {
      setDraggedItems((prev) => {
        const updatedItems = new Set(prev);
        updatedItems.delete(id); // 드래그 끝나면 해당 아이템 삭제
        return updatedItems;
      });

      controls.start({
        x: 0, // 원위치로 되돌리기
      });
    }
    //
    //
    //
    //  휴지통 꺼내면 기존꺼 다 집어넣는 작업중
    if (draggedItems.size > 1) {
      setDraggedItems((prev) => {
        const newItems = new Set([id]); // 마지막 드래그된 항목만 남기기

        // prev와 newItems를 비교하여 prev에 있는 항목 중 newItems에 포함되지 않은 항목을 원위치 처리
        prev.forEach((item) => {
          if (!newItems.has(item)) {
            // 해당 항목을 원위치로 되돌리기
            controls.start({
              x: 0, // 원위치
            });
          }
        });

        // 마지막 드래그된 항목만 새로운 Set에 추가
        return newItems;
      });
    }
    //
    //
    // \
    //
  };

  const handleDelete = (id: string) => {
    console.log(`Deleted: ${id}`);
  };
  const dragControlsX = useDragControls();
  const controls = useAnimation(); // 애니메이션 컨트롤러

  console.log("draggedItems", draggedItems);

  return (
    <div
      className="sheet-content-wrap"
      ref={sortableRef}
      onPointerDown={onPointerDown}
    >
      {storeMarkers.map((item) => {
        const isDragged = draggedItems.has(item.id); // 드래그된 항목 확인
        return (
          <motion.div
            key={item.id}
            className="sheet-content"
            drag={"x"}
            dragConstraints={{ left: -100, right: 0 }}
            onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
            dragMomentum={false}
            dragControls={dragControlsX}
            onPointerDown={(e) => {
              dragControlsX.start(e);
              console.log("가로다ㅏㅏㅏㅏㅏㅏㅏㅏ");
            }}
            onDrag={(e, info) => onDrag(e, info, item.id)}
            animate={controls}
          >
            <div className="content-item">
              <img
                src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                alt="매장 임시 이미지 부리부리"
                className="store-img"
              />
              <div className="content-info">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </div>

            <div
              className="dnd-btn"
              draggable="true"
              style={{
                opacity: isDragged ? 0 : 1,
                cursor: "grab",
                position: "absolute",
                right: "40px",
              }}
            >
              <ContentDragBtn />
            </div>

            <div className="delete-btn" onClick={() => handleDelete(item.id)}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
                alt="삭제버튼 임시 이미지 휴지통"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;
