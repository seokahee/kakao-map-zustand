import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Sortable from "sortablejs";
import { useStoreMarkersStore } from "../../store/store";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents() {
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
      // const clientX = getClientX(e);
      const clientX = e.clientX;
      const positionX = (e.changedTouches && e.changedTouches[0]) || e;

      item.classList.add("btn-hidden");

      if (clientX) {
        setDragStartX(clientX);
      } else {
        setDragStartX(positionX.clientX);
      }
      // setDragStartX(positionX || clientX);
    }
  };

  const handleDragEnd = (e: any, id: string) => {
    if (dragStartY) return;

    const item = contentRefs.current[id];
    if (item) {
      // const clientX = getClientX(e);
      const clientX = e.clientX;
      const positionX = (e.changedTouches && e.changedTouches[0]) || e;

      // const moveX = positionX - dragStartX;
      // const moveX = positionX || clientX - dragStartX;
      const moveX1 = positionX.clientX - dragStartX;
      const moveX2 = clientX - dragStartX;

      console.log("dragStartX", dragStartX);
      console.log("positionX 끝", positionX.clientX);
      console.log("clientX 끝", clientX);
      // console.log("무브", moveX);
      console.log("positionX 무브", moveX1);
      console.log("clientX 무브", moveX2);

      if (moveX1 || moveX2 < -50) {
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

  return (
    <div className="sheet-content-wrap " ref={sortableRef}>
      {storeMarkers.map((item) => {
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
            <div className="index-change-btn">{<ContentDragBtn />}</div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;
