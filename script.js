/* =========================
   頁面區塊淡入動畫
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    },
    {
        threshold: 0.18
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================
   作品彈出視窗
========================= */

const modal = document.getElementById("project-modal");
const modalContent = document.getElementById("modal-content");
const closeModalButton = document.getElementById("close-modal");
const projectButtons = document.querySelectorAll(".project-button");

projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const projectName = button.dataset.project;

        modalContent.innerHTML = `
            <h2>${formatProjectName(projectName)}</h2>

            <p>
                Artwork information, installation views and detail images
                will be added here.
            </p>
        `;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    });
});

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

function formatProjectName(projectName) {
    return projectName
        .split("-")
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}


/* =========================
   首頁「辰」滾動淡出動畫
========================= */

const homeBackground = document.querySelector(".home-background");
const homeSection = document.querySelector(".home-section");

function updateHomeBackground() {
    if (!homeBackground || !homeSection) {
        return;
    }

    const homeHeight = homeSection.offsetHeight;
    const scrollAmount = window.scrollY;

    // 從首頁頂部開始淡出
    // 滾動首頁高度的 75% 時完全消失
    const progress = Math.min(
        Math.max(scrollAmount / (homeHeight * 0.75), 0),
        1
    );

    // 「辰」原本最深透明度是 0.36
    // 下滑時逐漸變成 0
    const opacity = 0.36 * (1 - progress);

    homeBackground.style.opacity = opacity;

    // 保持原本置中的位置，不再放大或移動
    homeBackground.style.transform = "translateX(-50%)";
}

window.addEventListener(
    "scroll",
    updateHomeBackground,
    {
        passive: true
    }
);

window.addEventListener("resize", updateHomeBackground);

// 頁面載入後先執行一次
updateHomeBackground();