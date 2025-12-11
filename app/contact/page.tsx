export default function Page() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>Contact</h1>
      <p>
        If you see a build warning about a vulnerable Next.js version, update
        Next.js in package.json immediately.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // ...existing code...
          // Minimal client-side placeholder — backend functionality is unchanged.
          alert("Thanks — this is a demo contact form.");
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <label>
            Name
            <input
              name="name"
              required
              style={{
                display: "block",
                width: "100%",
                padding: 8,
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              style={{
                display: "block",
                width: "100%",
                padding: 8,
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Message
            <textarea
              name="message"
              required
              style={{
                display: "block",
                width: "100%",
                padding: 8,
              }}
            />
          </label>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
