window.onload = function () {
    fetch('https://projeto-treinamento-web-production.up.railway.app/gedaiflix-api/cards')
        .then(async (data) => {
            const response = await data.json();
            console.log({ response });

            const cards = document.querySelector(".episodes-container");

            response.forEach((cardData) => {
                const card = document.createElement("div");
                card.className = "card";

                const front = document.createElement("div");
                front.className = "front";

                const frontImg = document.createElement("img");
                frontImg.alt = cardData.name;
                frontImg.className = "card-image";
                frontImg.src = `data:image/jpg;base64,${cardData.image}`;

                front.appendChild(frontImg);
                card.appendChild(front);

                const back = document.createElement("div");
                back.className = "back";

                const backH2 = document.createElement("h2");
                backH2.textContent = cardData.name;

                back.appendChild(backH2);

                const backP = document.createElement("p");
                backP.textContent = cardData.desc;

                back.appendChild(backP);

                const backButton = document.createElement("button");
                backButton.className = "trailer-button";
                backButton.id = cardData.trailer;
                backButton.textContent = "Veja o trailer";

                back.appendChild(backButton);

                card.appendChild(back);

                cards.appendChild(card);
            })
        })
        .then(() => {
            const botoes = document.querySelectorAll(".trailer-button");
            const modal = document.querySelector(".modal");
            const closeModalButton = document.querySelector(".close-modal");
            const video = document.getElementById("video");

            console.log(botoes);

            function alternateModalStatus() {
                modal.classList.toggle("open");
            };

            // Adiciona evento de clique a cada botão
            botoes.forEach(botao => {
                botao.addEventListener("click", () => {
                    alternateModalStatus();
                    const modalAlvo = botao.getAttribute("id");
                    console.log(modalAlvo);
                    video.setAttribute("src", modalAlvo);
                });
            });

            closeModalButton.addEventListener("click", () => {
                alternateModalStatus();
                video.setAttribute("src", "");
            });
        })
        .catch((error) => {
            console.log(error)
            alert('error ao retornar dados.')
        })
}

const menuItems = document.querySelectorAll('.menu a');

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
    const section = document.querySelector(element).offsetTop - 50;

    // window.scroll({
    //     top: section,
    //     behavior: "smooth",
    // })

    smoothScrollTo(0, section, 1000);
}

menuItems.forEach(item => {
    item.addEventListener("click", scrollToSection);
})
