import { PAST_ROLES } from "@/lib/nav-roles";

export function RoleStrip() {
  return (
    <section data-section="role-strip" style={{ padding: "48px 48px 24px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.6fr", gap: 48, alignItems: "start" }}>
        {/* CURRENTLY */}
        <div
          data-anim="fade-up"
          style={{
            position: "relative",
            padding: "24px 28px",
            border: "2px solid var(--ink)",
            background: "var(--paper)",
            boxShadow: "6px 6px 0 var(--accent)",
            transform: "rotate(-0.3deg)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 0 4px rgba(217,119,87,0.18)",
              }}
            />
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
              ━━ CURRENTLY
            </span>
          </div>
          <div className="display" style={{ fontSize: 30, lineHeight: 1.05 }}>
            Product Designer
          </div>
          <div className="serif" style={{ fontSize: 17, fontStyle: "italic", opacity: 0.75, marginTop: 2 }}>
            for{" "}
            <a href="https://www.loomly.com" className="role-strip-employer-link">
              Loomly
            </a>
            {", "}
            <a href="https://issuu.com" className="role-strip-employer-link">
              Issuu
            </a>
            {" & "}
            <a href="https://tractive.com" className="role-strip-employer-link">
              Tractive
            </a>
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", opacity: 0.7 }}>
              @
            </span>
            <a
              href="https://www.bendingspoons.com"
              className="display"
              style={{ fontSize: 22, borderBottom: "2px solid var(--accent)" }}
            >
              Bending Spoons
            </a>
          </div>
        </div>

        {/* PREVIOUSLY */}
        <div data-anim="fade-up" data-delay="0.2" style={{ position: "relative" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              opacity: 0.7,
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>━━ PREVIOUSLY</span>
          </div>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
            {PAST_ROLES.map((p, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 20,
                  alignItems: "start",
                  padding: "14px 0",
                  borderBottom: i === PAST_ROLES.length - 1 ? "none" : "1px solid var(--line)",
                }}
              >
                <span className="mono" style={{ fontSize: 12, letterSpacing: "0.18em", opacity: 0.55 }}>
                  {p.period}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="display" style={{ fontSize: 22, lineHeight: 1.1 }}>
                    {p.role}
                  </div>
                  <div className="serif role-strip-meta" style={{ fontSize: 14, fontStyle: "italic", marginTop: 4 }}>
                    {p.forClient ? (
                      <>
                        for{" "}
                        {p.forClientUrl ? (
                          <a href={p.forClientUrl} className="role-strip-employer-link">
                            {p.forClient}
                          </a>
                        ) : (
                          p.forClient
                        )}{" "}
                        @{" "}
                        <a href={p.orgUrl} className="role-strip-employer-link">
                          {p.org}
                        </a>
                      </>
                    ) : (
                      <>
                        @{" "}
                        <a href={p.orgUrl} className="role-strip-employer-link">
                          {p.org}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
