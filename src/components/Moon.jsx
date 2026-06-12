import "./Moon.css";

function Moon({ onDoubleClick }) {
  return (
    <div
      className="moon"
      onDoubleClick={onDoubleClick}
      style={{
        cursor: "pointer",
      }}
      title="🌙"
    ></div>
  );
}

export default Moon;