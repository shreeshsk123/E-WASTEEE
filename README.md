# E-Waste Management Portfolio — Shreesh Khamkar

An editorial, cinematic single-page portfolio website for **Shreesh Khamkar** (`Roll No: 24101B0026`, `Class: INFT-B`) on the theme **E-Waste Management**.

Built with pure **HTML5**, **Vanilla CSS**, and **Vanilla JavaScript** (no heavy frameworks, zero runtime dependencies, completely static, mobile-responsive, and ready for 1-click deployment on Vercel).

---

## 📁 Project Structure

```text
├── index.html                 # Semantic single-page HTML structure
├── style.css                  # Editorial styling, design tokens & animations
├── script.js                  # Dynamic assignments renderer, count-up & modal viewer
├── assignments.js             # Data source for all coursework/assignments (read-only)
├── README.md                  # Instructions for customizations and deployment
└── assets/
    ├── shreesh.jpg            # Student profile portrait (animates in from top)
    ├── hero-bg.jpg            # Misty green forest background image
    ├── card-r.jpg             # Letter 'R' pillar image (Circuits & Refurbish)
    ├── card-e.jpg             # Letter 'E' pillar image (E-Waste Segregation)
    ├── card-u.jpg             # Letter 'U' pillar image (Upgrade & Repair)
    ├── card-s.jpg             # Letter 'S' pillar image (Sustainable Green Tech)
    └── assignments/           # Activity and assignment documents (PDF)
        ├── a1.pdf             # Activity 1: Pledge
        ├── a2.pdf             # Activity 2: Crossword
        ├── a3.pdf             # Activity 3: Quiz
        ├── a4.pdf             # Activity 4: C-footprint calculator
        ├── a5.pdf             # Activity 5: Video task
        ├── a6.pdf             # Activity 6: Device anatomy
        ├── a7.pdf             # Activity 7: Data analysis
        ├── a8.pdf             # Activity 8: Awareness campaign
        └── a9.pdf             # Activity 9: Green Hackathon
```

---

## 👤 1. How to Replace Your Photo

1. Prepare your photo in portrait orientation (JPEG or PNG).
2. Rename your photo file to `shreesh.jpg`.
3. Overwrite the file at `assets/shreesh.jpg`.
4. Refresh your browser! The photo automatically plays the top-drop bounce animation and sits statically in the right column of the About section.

---

## 📄 2. How to Add a New Assignment

All assignments are stored cleanly in [`assignments.js`](assignments.js). Visitors have read-only access (no login or editing UI).

To add an assignment:
1. Place your new assignment document (e.g. `a4.pdf`) in the `assets/assignments/` folder.
2. Open [`assignments.js`](assignments.js) in your text editor.
3. Add a new object inside the `assignments` array:

```javascript
{
  id: 4,
  number: "04",
  title: "Circular Electronics Policy Analysis",
  category: "Policy Brief",
  description: "A regulatory review of national Extended Producer Responsibility (EPR) mandates and compliance across electronics manufacturers.",
  date: "2026-10-24",
  file: "assets/assignments/a4.pdf"
}
```

Save the file and refresh your browser. The new card will automatically render in the grid with an in-page modal viewer!

---

## 🚀 3. How to Deploy to Vercel

Because this is a 100% static site with zero build steps, deploying to Vercel is instantaneous.

### Method A: Deploy via GitHub (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of E-Waste portfolio"
   ```
2. Push the repository to your GitHub account (`github.com/your-username/e-waste-portfolio`).
3. Visit [vercel.com](https://vercel.com) and log in.
4. Click **"Add New..."** -> **"Project"** and select your GitHub repository.
5. In the project settings:
   - **Framework Preset**: *Other*
   - **Build & Output Settings**: Leave default (no build command needed).
6. Click **Deploy**. Your portfolio will be live on a custom `.vercel.app` URL in seconds!

### Method B: Deploy via Vercel CLI
1. Open PowerShell or Terminal in this folder.
2. Run:
   ```bash
   npx vercel
   ```
3. Follow the quick prompts to link and deploy your site.

---

## ✨ Features Included

- **Reference Match**: Warm cream outer frame (`#FBF3E8`) with a massive pitch black (`#000000`) editorial card container.
- **Top Photo Drop-in Animation**: Shreesh's photo cascades in smoothly from the top of the viewport on page load with a natural settle curve, resting static on the right.
- **R-E-U-S Staggered 4-Card Row**: Replicates the staggered height portrait layout with large letters underneath, hover lift, and subtle 3D tilt.
- **Facts Count-Up**: Animated statistics triggered by IntersectionObserver.
- **In-Page PDF Viewer**: Modal preview window allowing visitors to inspect assignment files directly on the page or open them in a separate tab.
- **Prefers-Reduced-Motion**: Respects user accessibility preferences.
