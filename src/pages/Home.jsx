import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [anime, setAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "anime"));
      setAnime(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    load();
  }, []);

  const filtered = anime.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? (a.tags || []).includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(anime.flatMap(a => a.tags || []))];

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Anime Library</h1>

      <a
        href="/add"
        style={{
          display: "inline-block",
          padding: "10px 15px",
          background: "#00aaff",
          color: "black",
          borderRadius: "8px",
          fontWeight: "bold",
          marginBottom: "20px",
          textDecoration: "none",
        }}
      >
        + Add Anime
      </a>

      <input
        type="text"
        placeholder="Search anime..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "300px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "20px",
          outline: "none",
          display: "block",
        }}
      />

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #666",
              background: selectedTag === tag ? "#00aaff" : "transparent",
              color: selectedTag === tag ? "black" : "white",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filtered.map(a => (
          <div
            key={a.id}
            style={{
              width: "200px",
              padding: "5px",
              borderRadius: "10px",
              transition: "0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img src={a.thumbnail} width="200" style={{ borderRadius: "10px" }} />

            <h3 style={{ marginTop: "10px" }}>{a.title}</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
              {(a.tags || []).map(tag => (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  style={{
                    fontSize: "12px",
                    padding: "3px 8px",
                    background: selectedTag === tag ? "#00aaff" : "#333",
                    borderRadius: "12px",
                    border: "1px solid #555",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a href={`/watch?id=${a.youtubeId}`} style={{ color: "skyblue" }}>
              Watch →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
