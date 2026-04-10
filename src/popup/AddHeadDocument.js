import $ from "jquery";
import IssuedGoods from "../popup/IssuedGoods";
import PopupCloseButton from "../components/PopupCloseButton";

export default function AddHeadDocument(props) {
  const close = () => {
    props.changeVisibility(false);
  };

  if (!props.show) {
    return;
  } else {
    $("#addHeader").css("display", "none");
  }

  return (
    <div className="popup-overlay add" id="add-overlay">
      <div className="popup-content add wms-popup-shell">
        <div className="popup-header add wms-popup-header">
          <PopupCloseButton onClick={close} />
        </div>
        <div className="popup-body add wms-listing-head-form">
          <IssuedGoods
            order={props.order ?? true}
            close={close}
            type={props.type}
            render={props.render}
            refreshListingAfterOrder={props.refreshListingAfterOrder}
          />
        </div>
      </div>
    </div>
  );
}
