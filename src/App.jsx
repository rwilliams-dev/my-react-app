import { useState } from "react";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Business Website");
  const [budget, setBudget] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, email, service, budget });
    setName("");
    setEmail("");
    setBudget("");
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>Get a Free Quote</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Service Needed</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }}
          >
            <option>Business Website</option>
            <option>Landing Page</option>
            <option>Portfolio Site</option>
            <option>SEO Optimization</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Budget ($)</label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="500"
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }}
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: "#e0a04f", color: "white", border: "none", padding: "14px 30px", fontSize: "16px", cursor: "pointer", width: "100%" }}
        >
          Send Quote Request
        </button>
      </form>
    </div>
  );
}

function LeadCard({ lead, index, onDelete }) {
  return (
    <div style={{ backgroundColor: "white", padding: "20px", margin: "10px", borderLeft: "4px solid #e0a04f", minWidth: "250px" }}>
      <h3 style={{ color: "#1a1a2e" }}>Lead #{index + 1}</h3>
      <p><strong>Name:</strong> {lead.name}</p>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Service:</strong> {lead.service}</p>
      <p><strong>Budget:</strong> ${lead.budget}</p>
      <button
  onClick={onDelete}
  style={{ backgroundColor: "red", color: "white", border: "none", padding: "8px 16px", marginTop: "10px", cursor: "pointer" }}
>
  Delete Lead
</button>
    </div>
  );
}

function App() {
  const [leads, setLeads] = useState([]);

  function handleNewLead(lead) {
    setLeads([...leads, lead]);
  }
  function handleDelete(index) {
  setLeads(leads.filter((_, i) => i !== index));
}

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "10px" }}>
        RichProMedia
      </h1>
      <p style={{ textAlign: "center", color: "#e0a04f", marginBottom: "40px" }}>
        Client Lead Tracker
      </p>

      <ContactForm onSubmit={handleNewLead} />

      {leads.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <h2 style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "20px" }}>
            Leads ({leads.length})
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {leads.map((lead, index) => (
              <LeadCard key={index} lead={lead} index={index} onDelete={() => handleDelete(index)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;