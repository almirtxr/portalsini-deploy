// NewsletterSignup.jsx
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://portalsini-backend-deploy.fly.dev/api/subscribe/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setSubmitted(true);
  };

  return submitted ? (
    <p className="text-green-600">Inscrição concluída!</p>
  ) : (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, width: "100%", maxWidth: 400 }}>
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          flex: 1,
          padding: "0.75rem 1rem",
          border: "1.5px solid #BB1832",
          borderRadius: 6,
          fontSize: 16,
          outline: "none",
          transition: "border 0.2s",
        }}
        onFocus={e => e.target.style.border = "1.5px solid #a0152c"}
        onBlur={e => e.target.style.border = "1.5px solid #BB1832"}
      />
      <button
        type="submit"
        style={{
          background: "linear-gradient(90deg, #BB1832 60%, #a0152c 100%)",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(187,24,50,0.08)",
          transition: "background 0.2s",
        }}
      >
        Inscrever-se
      </button>
    </form>
  );
}
// This component allows users to subscribe to a newsletter by entering their email.