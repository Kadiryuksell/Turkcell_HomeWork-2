document.addEventListener("DOMContentLoaded", () => {
    const insCards = document.querySelectorAll(".ins-card");
    let previousCard = null;

    insCards.forEach((card) => {
        initializeCard(card);
    });

    document.addEventListener('keydown', handleKeyboardInput);

    function initializeCard(card) {
        const selectButton = card.querySelector('button');
        const price = card.querySelector('.ins-card-price');
        const newPrice = createDiscountedPrice(price);

        card.addEventListener('mouseover', () => {
            applyDiscountPrice(price, newPrice,card);
        });

        card.addEventListener('mouseout', () => {
            removeDiscountPrice(price, newPrice);
        });

        selectButton.addEventListener('click', () => {
            handleCardSelection(card);
        });
    }

    function createDiscountedPrice(price) {
        const priceAmount = Math.floor(price.innerHTML / 2);
        const newPrice = document.createElement('p');
        newPrice.classList.add('ins-card-price');
        newPrice.innerHTML = `${priceAmount} <sup>%50</sup>`;
        return newPrice;
    }

    function applyDiscountPrice(price, newPrice,card) {
        price.classList.add("price-line-through");
        const footerPrice = card.querySelector(".ins-card-footer-price p:nth-child(2)");
        footerPrice.appendChild(newPrice);
        
    }

    function removeDiscountPrice(price, newPrice) {
        price.classList.remove("price-line-through");
            newPrice.remove();
    }

    function handleKeyboardInput(event) {

        const key = event.key;
        if (key >= '1' && key <= '6') {
            const index = parseInt(key) - 1;
            if (index >= 0 && index < insCards.length) {
                handleCardSelection(insCards[index]);
            }
        }
    }

    function handleCardSelection(card) {
        const selectButton = card.querySelector('button');

        if (previousCard && previousCard !== card) {
            deselectCard(previousCard);
        }

        if (previousCard === card) {
            deselectCard(card);
            previousCard = null;
        } else {
            selectCard(card);
            previousCard = card;
        }
    }

    function selectCard(card) {
        card.classList.add("ins-card-green");
        card.querySelector('button').innerText = 'Seçildi';
    }

    function deselectCard(card) {
        card.classList.remove("ins-card-green");
        card.querySelector('button').innerText = 'Seç';
    }
});
