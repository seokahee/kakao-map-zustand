import { Reorder, useDragControls } from "framer-motion";
import { StorePositionsType } from "../types/type";

function ContentItem({ item }: { item: StorePositionsType }) {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      className="content-item "
      value={item}
      id={item.id}
      dragListener={false}
      dragControls={dragControls}
    >
      <img
        src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
        alt="부리부리 임시 이미지"
        className="store-img"
      />
      <div className="content-info">
        <div>{item.storeName}</div>
        <div>{item.machine}</div>
        <div>{item.address}</div>
      </div>
    </Reorder.Item>
  );
}

export default ContentItem;
