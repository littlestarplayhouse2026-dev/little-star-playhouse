# Little Star Playhouse — Official Website

Official bilingual website for **Little Star Playhouse**, Janakpurdham, Nepal.

- **Official Tagline:** *A Safe Place for Little Stars to Shine*
- **Location:** Ward 4, Janakpurdham, Dhanusha, Nepal (near old Sanchaykosh Office, Kataiyachauri road)
- **Direct Phone:** `9709142797`
- **WhatsApp Helpline:** `9709142797`
- **Email:** `littlestarplayhouse2026@gmail.com`
- **Target Custom Domain:** `littlestarplayhouse.com.np`

---

## 🎨 Official Brand Identity & Colors

| Element | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Star** | Warm Yellow | `#FFC107` | Logo star, highlight icons, accents |
| **House** | Royal Blue | `#1976D2` | Main buttons, headings, navigation |
| **Grass / Base** | Leaf Green | `#8BC34A` | Badges, trust indicators, accents |
| **Playhouse (P, l)** | Green | `#4CAF50` | First letter group in "Playhouse" |
| **Playhouse (a, y)** | Blue | `#2196F3` | Second letter group in "Playhouse" |
| **Playhouse (h)** | Red | `#F44336` | Middle accent in "Playhouse" |
| **Playhouse (o, u)** | Light Green | `#8BC34A` | Fourth letter group in "Playhouse" |
| **Playhouse (s, e)** | Orange | `#FF9800` | Ending letter group in "Playhouse" |
| **Text / Tagline** | Dark Grey | `#555555` | Body copy, secondary text, tagline |

---

## 📁 Project Structure

```text
little-star-playhouse/
├── index.html       # Complete bilingual semantic webpage (English & Nepali)
├── styles.css       # Responsive styling with official brand color scheme
├── script.js        # Language toggle, admission enquiry WhatsApp/email, and photo lightbox
├── README.md        # Documentation, maintenance guide, and deployment instructions
└── images/          # Image assets & connected local photo folder
    ├── official-logo.jpg                  # Master print & official logo (1024x1024)
    ├── logo.png                           # Web logo cropped for hero, footer & cards
    ├── logo-icon.png                      # Header navigation brand icon
    ├── favicon.png                        # Web browser favicon (192x192)
    ├── nepali-new-year-2083-admission.jpg # Admission Open 2083 promotional poster
    ├── we-are-hiring-teacher.jpg          # Teacher recruitment notice poster
    └── playhouse-admission-poster.jpg     # Little Star celebration & admission poster
```

---

## 📷 Connecting & Adding Photos from Your Local Folder

Your local photo folder path is:
```text
C:\Users\Satish Kumar Karn\OneDrive\Desktop\website\little-star-playhouse\images
```

### How to Add New Photos to the Gallery:
1. **Copy your photo** into the `images/` directory (e.g. `images/sports-day.jpg`).
2. **Open [`index.html`](file:///c:/Users/Satish Kumar Karn/OneDrive/Desktop/website/little-star-playhouse/index.html)** in any text editor.
3. Locate `<div class="gallery-grid" id="galleryGrid">` (around line 230).
4. Add a new `<figure class="gallery-item">` block:
   ```html
   <figure class="gallery-item" data-img="images/your-photo.jpg" data-caption-en="Activity Name" data-caption-ne="क्रियाकलापको नाम">
     <div class="gallery-img-wrap">
       <img src="images/your-photo.jpg" alt="Activity Name" loading="lazy">
       <div class="gallery-overlay">
         <span class="gallery-zoom-icon">🔍</span>
         <span class="gallery-overlay-text" data-en="Click to Enlarge" data-ne="ठूलो आकारमा हेर्नुहोस्">Click to Enlarge</span>
       </div>
     </div>
     <figcaption>
       <strong data-en="Activity Title in English" data-ne="शीर्षक नेपालीमा">Activity Title</strong>
       <small data-en="Short English note" data-ne="छोटो विवरण">Short note</small>
     </figcaption>
   </figure>
   ```
5. **Live Preview Feature:** You can also click the **"📷 Preview Local Photo"** button directly on the website to choose and test any image from your computer before editing code!

---

## 📝 How to Update Notices & Admission Offers

All school notices are located in `<section class="section notices-section" id="notices">`:
- **Current Offers vs Expired Notices:** Always check the validity date (e.g. `2082 Chaitra 30` or `New Year 2083`).
- **Updating Deadlines:** Change the date inside `<span class="notice-date" data-en="..." data-ne="...">`.
- **Fees & Policies:** The site includes a transparent note advising parents to verify specific tuition fees directly with the office, ensuring accuracy.

---

## 📲 Interactive Admission Enquiry Form

The website includes a mobile-friendly enquiry form with two one-click submission channels:
1. **Send via WhatsApp:** Formats parent name, phone, child name, program, and visit notes into a structured WhatsApp message and opens `https://wa.me/9779709142797`.
2. **Send via Email:** Generates a pre-filled email to `littlestarplayhouse2026@gmail.com`.

---

## 🌐 Deploying to Vercel & Configuring `littlestarplayhouse.com.np`

### 1. Push Changes to GitHub
In PowerShell inside this project folder:
```powershell
git add .
git commit -m "Add official brand logo and complete website features"
git push origin main
```

### 2. Connect Repository to Vercel
1. Log in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click **"Add New" → "Project"**.
3. Select the `little-star-playhouse` repository and click **Import**.
4. Leave Framework as **Other** and click **Deploy**.
5. Vercel will provide an instant preview URL (e.g., `little-star-playhouse.vercel.app`).

### 3. Setup Custom Domain `littlestarplayhouse.com.np`
In Nepal, `.com.np` domains are registered free of charge through [register.com.np (Mercantile Communications)](https://register.com.np).

In your Vercel Project Dashboard:
1. Go to **Settings → Domains**.
2. Enter `littlestarplayhouse.com.np` and `www.littlestarplayhouse.com.np`.
3. Vercel will display the DNS records needed:
   - **Type A Record:**
     - Name: `@`
     - Value: `76.76.21.21`
   - **Type CNAME Record:**
     - Name: `www`
     - Value: `cname.vercel-dns.com`
4. Log in to [register.com.np](https://register.com.np), navigate to your domain management panel, and update your DNS records or Name Servers accordingly.
5. Vercel will automatically issue and renew a free SSL/TLS HTTPS certificate once DNS propagation completes (usually within 4–24 hours).

---

## 🌟 Local Development Preview

Simply double-click `index.html` or open it in any modern browser:
```powershell
Start-Process "index.html"
```
