import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { useStoreMarkersStore } from "../store/store";

export const useSheetContent = () => {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장 데이터
  const [dragStartX, setDragStartX] = useState(0); // X축 드래그
  const [dragStartY, setDragStartY] = useState(false); // Y축 드래그

  const sortableRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // 각 아이템을 참조

  useEffect(() => {
    if (sortableRef.current) {
      const sortable = new Sortable(sortableRef.current, {
        onStart(e) {
          setDragStartY(true);

          Object.values(contentRefs.current).forEach((ref) => {
            if (ref) {
              ref.classList.remove("left", "right", "btn-hidden");
            }
          });
        },
        onEnd(e) {
          const newStoreMarkers = [...storeMarkers];
          const movedItem = newStoreMarkers.splice(e.oldIndex as number, 1)[0];
          newStoreMarkers.splice(e.newIndex as number, 0, movedItem);

          setDragStartY(false);
          setStoreMarkers(newStoreMarkers);
        },
        handle: ".index-change-btn",
        animation: 150,
        ghostClass: "drag-y",
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [storeMarkers]);

  const handleDragStart = (e: any, id: string) => {
    if (dragStartY) return;

    const item = contentRefs.current[id];

    if (item) {
      item.classList.add("btn-hidden");

      if (e.clientX) {
        setDragStartX(e.clientX);
      } else {
        const positionX = (e.changedTouches && e.changedTouches[0]) || e;
        setDragStartX(positionX.clientX);
      }
    }
  };

  const handleDragEnd = (e: any, id: string) => {
    if (dragStartY) return;

    const item = contentRefs.current[id];
    let moveX = 0;

    if (item) {
      if (e.clientX) {
        moveX = e.clientX - dragStartX;
      } else {
        const positionX = (e.changedTouches && e.changedTouches[0]) || e;
        moveX = positionX.clientX - dragStartX;
      }

      if (moveX < -50) {
        Object.values(contentRefs.current).forEach((ref) => {
          if (ref && ref.classList.contains("left")) {
            ref.classList.add("right");
            ref.classList.remove("left", "btn-hidden");
          }
        });

        item.classList.add("left");
        item.classList.remove("right");
      } else if (!dragStartY) {
        item.classList.add("right");
        item.classList.remove("left", "btn-hidden");
      }
    }
  };

  return {
    handleDragStart,
    handleDragEnd,
    storeMarkers,
    sortableRef,
    contentRefs,
    dragStartY,
  };
};
