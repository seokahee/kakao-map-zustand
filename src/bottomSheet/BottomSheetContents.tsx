import { useStoreMarkersStore } from "../store";
import { StorePositionsType } from "../types/type";

function BottomSheetContents() {
  const storeMarkers = useStoreMarkersStore((state) => state.storeMarkers); // 지도 영역에 포함되는 매장

  return (
    <div>
      {storeMarkers.map((item: StorePositionsType) => {
        return (
          <div key={item.id} className="store-info">
            <img
              src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
              alt="부리부리 임시 이미지 "
              className="store-img"
            />
            <div>
              <div>{item.storeName}</div>
              <div>{item.machine}</div>
              <div>{item.address}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;
