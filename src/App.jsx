import { useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Business Website");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus("");

    emailjs.send(
      "service_5an9bcm",
      "template_252kzzv",
      {
        from_name: name,
        from_email: email,
        service: service,
        message: message,
      },
      "f9Dng_uDxGBzPQWX3"
    ).then(() => {
      setStatus("success");
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
    }).catch(() => {
      setStatus("error");
      setSending(false);
    });
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", padding: "60px 40px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#e0a04f", fontFamily: "Georgia, serif", fontSize: "42px", textAlign: "center", marginBottom: "10px" }}>
          RichProMedia
        </h1>
        <p style={{ color: "#888", textAlign: "center", marginBottom: "50px", fontSize: "18px" }}>
          Let's build something great together
        </p>

        <div style={{ backgroundColor: "#1a1a1a", padding: "40px", borderTop: "4px solid #e0a04f" }}>
          <h2 style={{ color: "#e2e8f0", marginBottom: "30px" }}>Get In Touch</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#888", marginBottom: "8px" }}>Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
                style={{ width: "100%", padding: "12px", backgroundColor: "#222", border: "1px solid #333", color: "white", fontSize: "16px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#888", marginBottom: "8px" }}>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@email.com"
                type="email"
                required
                style={{ width: "100%", padding: "12px", backgroundColor: "#222", border: "1px solid #333", color: "white", fontSize: "16px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#888", marginBottom: "8px" }}>Service Needed</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ width: "100%", padding: "12px", backgroundColor: "#222", border: "1px solid #333", color: "white", fontSize: "16px" }}
              >
                <option>Business Website</option>
                <option>Landing Page</option>
                <option>Portfolio Site</option>
                <option>SEO Optimization</option>
              </select>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "#888", marginBottom: "8px" }}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project..."
                required
                rows={5}
                style={{ width: "100%", padding: "12px", backgroundColor: "#222", border: "1px solid #333", color: "white", fontSize: "16px", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              style={{ width: "100%", padding: "16px", backgroundColor: "#e0a04f", color: "#0a0a0a", border: "none", fontSize: "18px", fontWeight: "bold", cursor: sending ? "not-allowed" : "pointer" }}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p style={{ color: "#2d8a4e", textAlign: "center", marginTop: "20px", fontSize: "18px" }}>
                ✅ Message sent! I'll get back to you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;