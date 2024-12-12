import Draggable from "react-draggable";
import { useSheetContent } from "../../hook/useSheetContent";
import ContentDragBtn from "./ContentDragBtn";

function BottomSheetContents() {
  const {
    handleDragStart,
    handleDragEnd,
    storeMarkers,
    sortableRef,
    contentRefs,
    dragStartY,
    loading,
  } = useSheetContent();

  return (
    <div className="sheet-content-wrap " ref={sortableRef}>
      {loading ? (
        <div className="loading-img">
          <img
            src="https://devtalk.kakao.com/uploads/default/original/2X/8/8d3426581b592b46157de64b919d4378b504d346.gif"
            alt="로딩중인 라이언"
          />
        </div>
      ) : (
        storeMarkers.map((item) => {
          return (
            <div
              key={item.id}
              className="sheet-content"
              ref={(el) => (contentRefs.current[item.id] = el)}
            >
              <Draggable
                axis={dragStartY ? undefined : "x"}
                handle=".handle"
                position={{ x: 0, y: 0 }}
                bounds={{ left: -window.innerWidth * 0.2, right: 0 }}
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
        })
      )}
    </div>
  );
}

export default BottomSheetContents;
