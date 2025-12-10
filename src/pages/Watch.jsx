export default function Watch() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    return (
      <h2 style={{ color: "red", padding: "20px" }}>
        No video ID provided.
      </h2>
    );
  }

  return (
    <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
        style={{ borderRadius: "10px", maxWidth: "900px" }}
      />
    </div>
  );
}
