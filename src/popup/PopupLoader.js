import Loader from "../loader/Loader";

export default function PopupLoader(props) {
  return (
    <div>
      <Loader visisble={props.visible} />
    </div>
  );
}
