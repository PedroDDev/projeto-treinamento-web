const botoes = document.querySelectorAll(".trailer-button");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".close-modal");
const video = document.getElementById("video");

const menuItems = document.querySelectorAll('.menu a');

window.onload = function () {
    fetch('localhost:8080/gedaiflix-api/cards')
        .then(async (data) => {
            const response = await data.json();
            console.log({response});  
        })
        .catch((error) => {
            console.log(error)
            alert('error ao retornar dados.')
        })
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};

function scrollToSection(event) {
    event.preventDefault();
    const element = event.target.getAttribute('href');
    const section = document.querySelector(element).offsetTop - 40;

    window.scroll({
        top: section,
        behavior: "smooth",
    })

    // smoothScrollTo(0, section, 700);
}

menuItems.forEach(item => {
    item.addEventListener("click", scrollToSection);
})

function alternateModalStatus() {
    modal.classList.toggle("open");
};

// Adiciona evento de clique a cada botão
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        alternateModalStatus();
        const modalAlvo = botao.getAttribute("data-modal");

        if (modalAlvo === "modal1") {
            video.setAttribute("src", "https://www.youtube.com/embed/IBcwY3BrQtA");
        } else if (modalAlvo === "modal2") {
            video.setAttribute("src", "https://www.youtube.com/embed/zcpygp8QKN8");
        } else if (modalAlvo === "modal3") {
            video.setAttribute("src", "https://www.youtube.com/embed/h5KJPq4X71Q");
        } else if (modalAlvo === "modal4") {
            video.setAttribute("src", "https://www.youtube.com/embed/Q8b09bE1iGQ");
        } else if (modalAlvo === "modal5") {
            video.setAttribute("src", "https://www.youtube.com/embed/Y34C-ZPoWVQ");
        } else if (modalAlvo === "modal6") {
            video.setAttribute("src", "https://www.youtube.com/embed/T0_ttlBLd9g");
        } else if (modalAlvo === "modal7") {
            video.setAttribute("src", "https://www.youtube.com/embed/4r0287tUEgk");
        } else if (modalAlvo === "modal8") {
            video.setAttribute("src", "https://www.youtube.com/embed/-di3XYRxyHY");
        } else if (modalAlvo === "modal9") {
            video.setAttribute("src", "https://www.youtube.com/embed/jiRTfUYOHCs");
        }
    });
});

closeModalButton.addEventListener("click", () => {
    alternateModalStatus();
    video.setAttribute("src", "");
});
