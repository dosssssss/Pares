import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Karinderya POS Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() =>
            navigate("/pos")
          }
        >
          POS
        </button>

        <button
  onClick={() => {
    console.log("Categories clicked");
    navigate("/categories");
  }}
>
  Categories
</button>

        <button
          onClick={() =>
            navigate("/menu-items")
          }
        >
          Menu Items
        </button>

        <button
          onClick={() =>
            navigate("/reports")
          }
        >
          Reports
        </button>
      </div>
    </div>
  );
}