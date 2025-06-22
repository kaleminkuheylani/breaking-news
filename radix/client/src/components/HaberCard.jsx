const HaberCard = ({ title, summary }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "1rem",
      }}
    >
      <h4>{title}</h4>
      <p>{summary}</p>
    </div>
  );
};

export default HaberCard;
