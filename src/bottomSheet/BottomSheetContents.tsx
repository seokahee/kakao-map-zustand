import { useStoreMarkersStore } from "../store";
import { StorePositionsType } from "../types/type";

function BottomSheetContents() {
  const storeMarkers = useStoreMarkersStore((state) => state.storeMarkers); // 지도 영역에 포함되는 매장

  return (
    <div>
      {storeMarkers.map((item: StorePositionsType) => {
        return (
          <div key={item.id} className="sheet-content-wrap">
            <div className="content-body">
              <img
                src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                alt="부리부리 임시 이미지 "
                className="store-img"
              />
              <div className="content-info">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </div>

            {/* <div className="sheet-content-btn">여기에 버튼이 올거야</div> */}
          </div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;

// 마운트 시 최초 시작 지점 잡기
// 헤더 외 드래그 방지
// 콘텐츠 스크롤 처리
//  바텀에서 50px 쯤 됐을때 숨겨버리자
