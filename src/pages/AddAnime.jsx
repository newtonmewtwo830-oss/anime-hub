import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// ⭐ Available Tags
const TAG_OPTIONS = [
  "Action", "Romance", "Comedy", "Fantasy", "Isekai",
  "Drama", "Horror", "Sci-Fi", "Adventure", "School",
  "Mystery", "Sports"
];

export default function AddAnime() {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ⭐ Toggle tags on/off
  const toggleTag = (tag) => {
    setTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // ⭐ Extract YouTube ID
  const extractYoutubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^#&?]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // ⭐ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId) {
      setError("Invalid YouTube link!");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    // Generate thumbnail automatically
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    try {
      await addDoc(collection(db, "anime"), {
        title,
        youtubeId,
        thumbnail,
        tags,
      });

      setSuccess("Anime added successfully!");
      setTitle("");
      setYoutubeUrl("");
      setTags([]);

    } catch (err) {
      console.error(err);
      setError("Could not add anime. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white", maxWidth: "700px", margin: "auto" }}>
      <h2>Add Anime</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        {/* ⭐ Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Anime title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #444" }}
          />
        </div>

        {/* ⭐ YouTube Link */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>YouTube Video Link</label>
          <input
            type="text"
            placeholder="Paste YouTube link..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #444" }}
          />
        </div>

        {/* ⭐ TAG SELECTOR */}
        <div>
          <h3>Select Tags</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "20px",
                  border: "1px solid #666",
                  background: tags.includes(tag) ? "#00aaff" : "transparent",
                  color: tags.includes(tag) ? "black" : "white",
                  cursor: "pointer"
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ⭐ Submit */}
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#0af",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            width: "150px"
          }}
        >
          Submit
        </button>

      </form>

      {/* ⭐ Error + Success Messages */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "lightgreen", marginTop: "10px" }}>{success}</p>}
    </div>
  );
}
