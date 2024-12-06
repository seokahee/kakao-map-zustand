import { motion, PanInfo, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { useStoreMarkersStore } from "../../store/store";
import ContentDragBtn from "./ContentDragBtn";
import { gsap } from "gsap";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();
  const [draggedItems, setDraggedItem] = useState<Set<string>>(new Set());
  const [resetAnimation, setResetAnimation] = useState(false);

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
        direction: "horizontal",
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
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    const offset = info.offset;
    if (offset.x < -10) {
      // setDraggedItem((prev) => new Set(prev).add(id));
    }
  };

  // const onDragStart = (
  //   _: MouseEvent | TouchEvent | PointerEvent,
  //   info: PanInfo,
  //   id: string
  // ) => {
  //   const target = document.getElementsByClassName("left");
  //   console.log("onDragStart");
  //   console.log(target[0]?.id + " / " + id);

  //   // id = 내가 지금 선택한거
  //   // target.id = 내가 선택한거 외

  //   if (target[0]?.id !== id) {
  //     target[0]?.classList.remove("left");
  //   }
  // };

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    id: string
  ) => {
    const offset = info.offset;

    console.log(offset);
    console.log(id);

    const target = document.getElementById(id);

    console.log(target);

    if (offset.x < -100) {
      const leftTarget = document.getElementsByClassName("left");
      const tar = document.getElementById(`${leftTarget[0]?.id}`);

      console.log(`leftTarget`);
      console.log(tar);

      console.log(leftTarget);
      if (leftTarget[0]?.id !== id) {
        leftTarget[0]?.classList.remove("left");
        gsap.to(tar, { transform: "unset" });
      }

      target?.classList.add("left");

      return;

      // setDraggedItem((prev) => {
      //   const newDraggedItems = new Set([id]); // 마지막 드래그된 항목만 추가
      //   return newDraggedItems;
      // });
    } else {
      target?.classList.remove("left");
      return;

      // setDraggedItem((prev) => {
      //   const removeItem = new Set(prev);
      //   removeItem.delete(id);
      //   return removeItem;
      // });
    }

    // // 드래그가 끝난 후 애니메이션 리셋

    // setResetAnimation(true);

    // setTimeout(() => {
    //   setResetAnimation(false); // 리셋 상태 초기화
    // }, 300); // 애니메이션이 끝나는 시간 후 리셋
  };

  const handleDelete = (id: string) => {
    console.log(`Deleted: ${id}`);
  };
  const dragControlsX = useDragControls();

  // const getAnimation = (isDragged: boolean) => {
  //   if (isDragged) return {}; // 드래그된 항목은 애니메이션을 적용하지 않음
  //   if (resetAnimation) return { x: -1 };
  // };

  return (
    <div
      className="sheet-content-wrap"
      ref={sortableRef}
      onPointerDown={onPointerDown}
    >
      {storeMarkers.map((item) => {
        // const isDragged = draggedItems.has(item.id);
        const isDragged = false;
        return (
          <motion.div
            key={item.id}
            id={item.id}
            item-id={item.id}
            className="sheet-content"
            drag={"x"}
            dragConstraints={{ left: -100, right: 0 }}
            onDragEnd={(_, info) => onDragEnd(_, info, item.id)}
            // onDragStart={(_, info) => onDragStart(_, info, item.id)}
            dragMomentum={false}
            dragControls={dragControlsX}
            onPointerDown={(e) => dragControlsX.start(e)}
            onDrag={(_, info) => onDrag(_, info, item.id)}
            // animate={resetAnimation ? { x: 0 } : {}}
            // animate={getAnimation(isDragged)}
          >
            <div className="content-item">
              <img
                src="https://cdn2.ppomppu.co.kr/zboard/data3/2019/0215/20190215184854_iltcawdu.gif"
                alt="매장 임시 이미지"
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
