import { useState, useEffect } from "react";

function CurrencyCard({ title, amount, symbol }) {
  return (
    <div style={{
      backgroundColor: "white",
      padding: "30px",
      margin: "10px",
      minWidth: "200px",
      borderTop: "4px solid #e0a04f",
      textAlign: "center"
    }}>
      <p style={{ color: "#888", fontSize: "14px", marginBottom: "10px" }}>{title}</p>
      <h2 style={{ color: "#1a1a2e", fontSize: "36px" }}>{symbol}{amount}</h2>
    </div>
  );
}

function App() {
  const [rate, setRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setRate(data.rates.KES);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch exchange rate");
        setLoading(false);
      }
    }
    fetchRate();
  }, []);

  const kesAmount = rate ? (usdAmount * rate).toLocaleString() : "...";

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "60px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ color: "#1a1a2e", fontSize: "42px", fontFamily: "Georgia, serif" }}>
          USD → KES
        </h1>
        <p style={{ color: "#888", fontSize: "18px" }}>Live Exchange Rate</p>
        {rate && (
          <p style={{ color: "#e0a04f", fontSize: "16px", marginTop: "10px" }}>
            1 USD = {rate.toFixed(2)} KES
          </p>
        )}
      </div>

      {loading && <p style={{ textAlign: "center", color: "#888" }}>Fetching live rate...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <label style={{ display: "block", color: "#444", marginBottom: "10px", fontSize: "18px" }}>
              Enter USD Amount
            </label>
            <input
              type="number"
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              style={{ padding: "15px", fontSize: "24px", width: "200px", textAlign: "center", border: "2px solid #e0a04f" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <CurrencyCard title="US Dollars" amount={Number(usdAmount).toLocaleString()} symbol="$" />
            <CurrencyCard title="Kenyan Shillings" amount={kesAmount} symbol="KES " />
            <CurrencyCard title="British Pounds" amount={(usdAmount * (rate / 170)).toFixed(2)} symbol="£" />
            <CurrencyCard title="Euros" amount={(usdAmount * (rate / 140)).toFixed(2)} symbol="€" />
          </div>

          <div style={{ textAlign: "center", marginTop: "40px", padding: "20px", backgroundColor: "#1a1a2e", color: "white", maxWidth: "500px", margin: "40px auto 0" }}>
            <p style={{ color: "#888", marginBottom: "10px" }}>Monthly income of $4,000 USD =</p>
            <h2 style={{ color: "#e0a04f", fontSize: "32px" }}>
              KES {rate ? (4000 * rate).toLocaleString() : "..."} /month
            </h2>
            <p style={{ color: "#888", fontSize: "14px", marginTop: "10px" }}>Living like royalty in Kisumu 🇰🇪</p>
          </div>

          <div style={{ maxWidth: "500px", margin: "20px auto" }}>
            <h3 style={{ color: "#1a1a2e", marginBottom: "15px", textAlign: "center" }}>Kisumu Monthly Budget</h3>
            <div style={{ backgroundColor: "white", padding: "20px", borderLeft: "4px solid #e0a04f" }}>
              <p>🏠 Rent: KES {rate ? (250 * rate).toLocaleString() : "..."}</p>
              <p>🍽️ Food: KES {rate ? (150 * rate).toLocaleString() : "..."}</p>
              <p>🌐 Internet: KES {rate ? (40 * rate).toLocaleString() : "..."}</p>
              <p>🚗 Transport: KES {rate ? (60 * rate).toLocaleString() : "..."}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;