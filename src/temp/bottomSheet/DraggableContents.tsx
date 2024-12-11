import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import Sortable from "sortablejs";
import { miniData } from "../data";
import IndexDragBtn from "./IndexDragBtn";
import "./sheet.css";

function DraggableContents() {
  const [testState, setTestState] = useState(miniData); // 임시 데이터
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
          const newStoreMarkers = [...testState];
          const movedItem = newStoreMarkers.splice(e.oldIndex as number, 1)[0];
          newStoreMarkers.splice(e.newIndex as number, 0, movedItem);

          setDragStartY(false);
          setTestState(newStoreMarkers);
        },
        handle: ".index-change-btn",
        animation: 150,
        ghostClass: "drag-y",
      });

      return () => {
        sortable.destroy();
      };
    }
  }, [testState]);

  const getClientX = (e: DraggableEvent) => {
    let clientX = 0;

    if ("clientX" in e) {
      clientX = e.clientX;
    } else if ("e.touches || changedTouches)" in e) {
      clientX = e.touches[0].clientX | e.changedTouches[0].clientX;
    }
    return clientX;
  };

  const handleDragStart = (e: DraggableEvent, id: string) => {
    if (dragStartY) return;

    const clientX = getClientX(e);
    const item = contentRefs.current[id];

    console.log("드래그 시작", clientX);

    if (!item) return;
    item.classList.add("btn-hidden");

    setDragStartX(clientX);
  };

  const handleDragEnd = (e: DraggableEvent, id: string) => {
    console.log("드래그 끝 이벤트에서 타겟을 뒤져라", e);

    if (dragStartY) return;

    const clientX = getClientX(e);
    const moveX = clientX - dragStartX;
    const item = contentRefs.current[id];

    console.log("드래그 끝", clientX);

    if (!item) return;

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
  };

  return (
    <div className="sheet-content-wrap" ref={sortableRef}>
      {testState.map((item) => {
        return (
          <div
            key={item.id}
            className="sheet-content"
            ref={(el) => (contentRefs.current[item.id] = el)}
          >
            <Draggable
              cancel=".cancel"
              axis={dragStartY ? undefined : "x"}
              handle=".handle"
              position={{ x: 0, y: 0 }}
              bounds={{ left: -200, right: 0 }}
              onStart={(e) => {
                handleDragStart(e, item.id);
              }}
              onStop={(e) => {
                handleDragEnd(e, item.id);
              }}
            >
              <div className="handle">
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

                <img
                  className="delete-btn"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
                  alt="삭제"
                />
              </div>
            </Draggable>
            <div className="index-change-btn">{<IndexDragBtn />}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DraggableContents;
