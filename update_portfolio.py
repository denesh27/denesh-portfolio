import sys

with open("c:/Users/NITRO/Portfolio/portfolio.html", "r", encoding="utf-8") as f:
    text = f.read()

start_marker = '<span class="section-count">04 CASE FILES</span>'
end_marker = '        <!-- /proj-grid-bot -->'

start_idx = text.find(start_marker)
end_idx = text.find(end_marker) + len(end_marker)

replacement = """<span class="section-count">05 CASE FILES</span>
        </div>

        <div class="proj-grid fade-in">
          <!-- PROJECT 001: Mr Tasky -->
          <div class="proj-card">
            <div class="proj-header">
              <div>
                <div class="proj-index">CASE_FILE // PROJECT_001</div>
                <div class="proj-name">Mr. Tasky</div>
                <div class="proj-type">Service Listing Web Application</div>
              </div>
              <span class="stack-badge">PERN</span>
            </div>
            <div class="proj-stats">
              <div class="stat-cell">
                <span class="stat-val a">03</span>
                <span class="stat-key">USER ROLES</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">REST</span>
                <span class="stat-key">API PATTERN</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">RBAC</span>
                <span class="stat-key">SECURITY</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val g">IN-DEV</span>
                <span class="stat-key">STATUS</span>
              </div>
            </div>
            <div class="proj-arch">
              <div class="arch-label">// System Architecture</div>
              <div>CLIENT &nbsp; → [<span class="k">React</span> + Tailwind + DaisyUI]</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Dynamic map API (Geolocation)</span></div>
              <div>SERVER &nbsp; → [<span class="k">Node.js</span> + Express]</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ RESTful APIs</span></div>
              <div>DATA &nbsp;&nbsp;&nbsp; → [<span class="k">PostgreSQL</span>]</div>
            </div>
            <div class="proj-feat">
              <span class="feat-tag on">RBAC Auth</span>
              <span class="feat-tag on">Geolocation</span>
              <span class="feat-tag on">Real-time DB</span>
              <span class="feat-tag">REST API</span>
              <span class="feat-tag">Service Listings</span>
            </div>
            <div class="proj-links">
              <a href="#" class="pr">VIEW DB SCHEMA ↗</a>
              <a href="#">GITHUB ↗</a>
            </div>
          </div>

          <!-- PROJECT 002: Book4U -->
          <div class="proj-card">
            <div class="proj-header">
              <div>
                <div class="proj-index">CASE_FILE // PROJECT_002</div>
                <div class="proj-name">Book4U</div>
                <div class="proj-type">Event Management Web Application</div>
              </div>
              <span class="stack-badge">PHP/MYSQL</span>
            </div>
            <div class="proj-stats">
              <div class="stat-cell">
                <span class="stat-val a">Stripe</span>
                <span class="stat-key">PAYMENT</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">MVC</span>
                <span class="stat-key">ARCHITECTURE</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val b">Cloud</span>
                <span class="stat-key">HOSTING</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val g">LIVE</span>
                <span class="stat-key">INFINITYFREE</span>
              </div>
            </div>
            <div class="proj-arch">
              <div class="arch-label">// Core Workflow</div>
              <div>[01] <span class="k">User Registration</span> &nbsp;→ PHP Backend</div>
              <div>[02] <span class="k">Event Selection</span> &nbsp;&nbsp;→ MySQL Dynamic Fetch</div>
              <div>[03] <span class="k">Stripe Gateway</span> &nbsp;&nbsp;→ Secure Payment API</div>
              <div>[04] <span class="k">Confirmation</span> &nbsp;&nbsp;&nbsp;&nbsp;→ Automated Email Dispatch</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Hosted on InfinityFree Cloud Environment</span></div>
            </div>
            <div class="proj-feat">
              <span class="feat-tag on">Stripe Checkout</span>
              <span class="feat-tag on">Unit Testing</span>
              <span class="feat-tag on">Automated Mail</span>
              <span class="feat-tag">Event Booking</span>
            </div>
            <div class="proj-links">
              <a href="#" class="pr">VIEW DB SCHEMA ↗</a>
              <a href="#">OPEN LIVE SITE ↗</a>
              <a href="#">GITHUB ↗</a>
            </div>
          </div>

          <!-- PROJECT 003: Saviour -->
          <div class="proj-card">
            <div class="proj-header">
              <div>
                <div class="proj-index">CASE_FILE // PROJECT_003</div>
                <div class="proj-name">Saviour</div>
                <div class="proj-type">Healthcare Mobile Application</div>
              </div>
              <span class="stack-badge">UX/UI</span>
            </div>
            <div class="proj-stats">
              <div class="stat-cell">
                <span class="stat-val a">Hi-Fi</span>
                <span class="stat-key">PROTOTYPE</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">HCI</span>
                <span class="stat-key">PRINCIPLES</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">Map</span>
                <span class="stat-key">USER FLOWS</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val b">Figma</span>
                <span class="stat-key">PRIMARY TOOL</span>
              </div>
            </div>
            <div class="proj-arch">
              <div class="arch-label">// Application Features</div>
              <div>[01] <span class="k">SOS Dispatch</span> &nbsp;&nbsp;&nbsp;→ Emergency Tracking Flow</div>
              <div>[02] <span class="k">Live Locator</span> &nbsp;&nbsp;&nbsp;→ Real-Time Hospital Map</div>
              <div>[03] <span class="k">Dr. AI</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Symptom Checker UI</div>
              <div>[04] <span class="k">Appointments</span> &nbsp;&nbsp;&nbsp;→ Booking Management</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Compliant with HCI Guidelines</span></div>
            </div>
            <div class="proj-feat">
              <span class="feat-tag on">Wireframing</span>
              <span class="feat-tag on">Prototyping</span>
              <span class="feat-tag on">User Flows</span>
              <span class="feat-tag">Interface Design</span>
            </div>
            <div class="proj-links">
              <a href="#" class="pr">VIEW FIGMA FLOWS ↗</a>
              <a href="#">VIEW ARCHITECTURE DIAGRAM ↗</a>
            </div>
          </div>

          <!-- PROJECT 004: G.M.C Multimedia -->
          <div class="proj-card">
            <div class="proj-header">
              <div>
                <div class="proj-index">CASE_FILE // PROJECT_004</div>
                <div class="proj-name">G.M.C Multimedia Center</div>
                <div class="proj-type">Business Landing Page</div>
              </div>
              <span class="stack-badge" style="color:var(--green);border-color:var(--green)">LIVE SITE</span>
            </div>
            <div class="proj-stats">
              <div class="stat-cell">
                <span class="stat-val a">CSS</span>
                <span class="stat-key">STYLING</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">JS</span>
                <span class="stat-key">INTERACT</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">Git</span>
                <span class="stat-key">VCS</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val g">Netlify</span>
                <span class="stat-key">HOSTING</span>
              </div>
            </div>
            <div class="proj-arch">
              <div class="arch-label">// Deployment Pipeline</div>
              <div><span class="k">CODEBASE</span> &nbsp;→ HTML5 + CSS3 + Vanilla JS</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Commit & Push</span></div>
              <div><span class="k">GITHUB</span> &nbsp;&nbsp;&nbsp;→ Version Control Repository</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓ Webhook Trigger</span></div>
              <div><span class="k">NETLIFY</span> &nbsp;&nbsp;→ Automated CI/CD Build</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Global Edge CDN</span></div>
            </div>
            <div class="proj-feat">
              <span class="feat-tag on">Responsive Design</span>
              <span class="feat-tag on">DOM Manipulation</span>
              <span class="feat-tag">Landing Page</span>
            </div>
            <div class="proj-links">
              <a href="#" class="pr" style="color:var(--green)">OPEN LIVE SITE ↗</a>
              <a href="#">GITHUB ↗</a>
            </div>
          </div>

          <!-- PROJECT 005: Movie Listing -->
          <div class="proj-card span-2">
            <div class="proj-header">
              <div>
                <div class="proj-index">CASE_FILE // PROJECT_005</div>
                <div class="proj-name">Movie Listing</div>
                <div class="proj-type">React Application</div>
              </div>
              <span class="stack-badge" style="color:var(--green);border-color:var(--green)">LIVE SITE</span>
            </div>
            <div class="proj-stats">
              <div class="stat-cell">
                <span class="stat-val a">React</span>
                <span class="stat-key">FRONTEND</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">Hooks</span>
                <span class="stat-key">STATE MGT</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val">Fetch</span>
                <span class="stat-key">API DATA</span>
              </div>
              <div class="stat-cell">
                <span class="stat-val g">Netlify</span>
                <span class="stat-key">HOSTING</span>
              </div>
            </div>
            <div class="proj-arch">
              <div class="arch-label">// Component Matrix</div>
              <div><span class="k">&lt;App /&gt;</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Root State & Network Requests</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;↓ State Mapping</span></div>
              <div><span class="k">&lt;MovieGrid /&gt;</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Responsive Layout Container</div>
              <div><span class="d">&nbsp;&nbsp;&nbsp;↓ Props</span></div>
              <div><span class="k">&lt;MovieCard /&gt;</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ Poster, View Details, Hover State</div>
            </div>
            <div class="proj-feat">
              <span class="feat-tag on">React.js</span>
              <span class="feat-tag on">API Integration</span>
              <span class="feat-tag on">Netlify Deploy</span>
              <span class="feat-tag">Component UI</span>
            </div>
            <div class="proj-links">
              <a href="#" class="pr" style="color:var(--green)">OPEN LIVE SITE ↗</a>
              <a href="#">GITHUB ↗</a>
              <a href="#">VIEW DIAGRAMS ↗</a>
            </div>
          </div>"""

new_text = text[:start_idx] + replacement + text[end_idx:]

with open("c:/Users/NITRO/Portfolio/portfolio.html", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Update complete")
