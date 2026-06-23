// GANTI USERNAME INI DENGAN USERNAME GITHUB KAMU
// Contoh: const GITHUB_USERNAME = "nabilapermatasari";
const GITHUB_USERNAME = "ganti-username-github";

const fallbackRepos = [
  {
    name: "portfolio-automation",
    description: "Template portofolio untuk menampilkan profil, pengalaman, dan projek otomasi.",
    language: "HTML/CSS/JS",
    html_url: "#",
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: "stm32-servo-pwm",
    description: "Dokumentasi projek pengaturan sudut motor servo menggunakan STM32F4 dan PWM.",
    language: "C/C++",
    html_url: "#",
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: "pid-motor-dc-matlab",
    description: "Simulasi kontrol kecepatan motor DC menggunakan PID pada MATLAB.",
    language: "MATLAB",
    html_url: "#",
    stargazers_count: 0,
    forks_count: 0
  }
];

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const repoGrid = document.querySelector("#repoGrid");
const githubProfile = document.querySelector("#githubProfile");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !match);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute("id");
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  });
}, { rootMargin: "-42% 0px -50% 0px" });

sections.forEach((section) => navObserver.observe(section));

function renderRepos(repos, isFallback = false) {
  repoGrid.innerHTML = "";

  repos.slice(0, 6).forEach((repo) => {
    const repoCard = document.createElement("article");
    repoCard.className = "repo-card reveal visible";

    const repoLink = repo.html_url || "#";
    const safeDescription = repo.description || "Repository GitHub publik.";
    const language = repo.language || "Project";

    repoCard.innerHTML = `
      <h3><a href="${repoLink}" target="_blank" rel="noreferrer">${repo.name} ↗</a></h3>
      <p>${safeDescription}</p>
      <small>${language}</small>
      <div class="repo-meta">
        <span>★ ${repo.stargazers_count ?? 0}</span>
        <span>⑂ ${repo.forks_count ?? 0}</span>
        ${isFallback ? "<span>Demo data</span>" : ""}
      </div>
    `;

    repoGrid.appendChild(repoCard);
  });
}

async function loadGithubRepos() {
  const usernameStillDefault = !GITHUB_USERNAME || GITHUB_USERNAME.includes("ganti");

  if (usernameStillDefault) {
    githubProfile.href = "https://github.com/";
    renderRepos(fallbackRepos, true);
    return;
  }

  githubProfile.href = `https://github.com/${GITHUB_USERNAME}`;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error("GitHub repository tidak ditemukan.");

    const repos = await response.json();
    renderRepos(repos.length ? repos : fallbackRepos, repos.length === 0);
  } catch (error) {
    console.warn(error.message);
    renderRepos(fallbackRepos, true);
  }
}

loadGithubRepos();
