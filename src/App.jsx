import { useState, useEffect } from "react";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Business Website");
  const [budget, setBudget] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email, service, budget, date: new Date().toLocaleDateString() });
    setName("");
    setEmail("");
    setBudget("");
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", maxWidth: "500px", margin: "0 auto", borderTop: "4px solid #e0a04f" }}>
      <h2 style={{ color: "#1a1a2e", marginBottom: "20px" }}>New Lead</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Email *</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Service</label>
          <select value={service} onChange={(e) => setService(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }}>
            <option>Business Website</option>
            <option>Landing Page</option>
            <option>Portfolio Site</option>
            <option>SEO Optimization</option>
          </select>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#444" }}>Budget ($)</label>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="500" style={{ width: "100%", padding: "10px", border: "1px solid #ddd", fontSize: "16px" }} />
        </div>
        <button type="submit" style={{ backgroundColor: "#e0a04f", color: "white", border: "none", padding: "14px 30px", fontSize: "16px", cursor: "pointer", width: "100%" }}>
          Add Lead
        </button>
      </form>
    </div>
  );
}

function LeadCard({ lead, index, onDelete }) {
  const [status, setStatus] = useState(lead.status || "New");

  return (
    <div style={{ backgroundColor: "white", padding: "20px", margin: "10px", borderLeft: "4px solid #e0a04f", minWidth: "250px", maxWidth: "300px" }}>
      <h3 style={{ color: "#1a1a2e" }}>Lead #{index + 1}</h3>
      <p><strong>Name:</strong> {lead.name}</p>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Service:</strong> {lead.service}</p>
      <p><strong>Budget:</strong> ${lead.budget}</p>
      <p style={{ color: "#aaa", fontSize: "12px" }}>Added: {lead.date}</p>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: "100%", padding: "8px", marginTop: "10px", border: "1px solid #ddd" }}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>In Discussion</option>
        <option>Closed</option>
      </select>
      <button onClick={onDelete} style={{ backgroundColor: "red", color: "white", border: "none", padding: "8px 16px", marginTop: "10px", cursor: "pointer" }}>
        Delete
      </button>
    </div>
  );
}

function App() {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("rdw-leads");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("rdw-leads", JSON.stringify(leads));
  }, [leads]);

  function handleNewLead(lead) {
    setLeads([...leads, lead]);
  }

  function handleDelete(index) {
    setLeads(leads.filter((_, i) => i !== index));
  }

  const totalBudget = leads.reduce((sum, lead) => sum + (parseFloat(lead.budget) || 0), 0);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#1a1a2e", fontSize: "36px" }}>RichProMedia</h1>
        <p style={{ color: "#e0a04f" }}>Client Lead Tracker</p>
        {leads.length > 0 && (
          <div style={{ marginTop: "20px", backgroundColor: "#1a1a2e", color: "white", padding: "15px 30px", display: "inline-block" }}>
            <span style={{ marginRight: "30px" }}>Total Leads: {leads.length}</span>
            <span style={{ color: "#e0a04f" }}>Pipeline Value: ${totalBudget}</span>
          </div>
        )}
      </div>

      <ContactForm onSubmit={handleNewLead} />

      {leads.length > 0 && (
        <div style={{ marginTop: "50px" }}>
          <h2 style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "20px" }}>Active Leads</h2>
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