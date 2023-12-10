import appbutton from "./appbutton.css";

export default function AppButton(props) {
  return (
    <div>
      <button className="photoButton">{props.title}</button>
    </div>
  );
}
