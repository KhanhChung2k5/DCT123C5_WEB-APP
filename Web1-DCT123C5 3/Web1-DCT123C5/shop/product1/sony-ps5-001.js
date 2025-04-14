let listImg=[
    "https://shopdunk.com/images/thumbs/0028431_sony-ps5-slim-may-choi-game-sony-playstation-5-slim-chinh-hang-sony-viet-nam.jpeg",
    "https://shopdunk.com/images/thumbs/0028432_sony-ps5-slim-may-choi-game-sony-playstation-5-slim-chinh-hang-sony-viet-nam.jpeg",
    "https://shopdunk.com/images/thumbs/0028434_sony-ps5-slim-may-choi-game-sony-playstation-5-slim-chinh-hang-sony-viet-nam.jpeg"
];  "https://shopdunk.com/images/thumbs/0028433_sony-ps5-slim-may-choi-game-sony-playstation-5-slim-chinh-hang-sony-viet-nam.jpeg"

listImg.forEach(i =>{
    let createImg=document.createElement("div");
    createImg.className="listImg";
    document.getElementById("image-carousel").appendChild(createImg);
    createImg.style.backgroundImage=`URL("${i}")`;

    createImg.addEventListener("click", () => {
        Domquery("#img").style.backgroundImage = `url(${i})`;
    });
})

const pricePerItem = 10000000;
    const discount = 33;

    function Domquery(infor){
        return document.querySelector(infor);
    }

    function updatePrices() {
        let getQuantity = Domquery("#quantity").value;

        let totalPrice = pricePerItem * getQuantity;
        let priceAfterToString = totalPrice.toLocaleString('vi-VN');
        let priceAfterDiscount = (totalPrice * ((100 - discount) / 100)).toLocaleString('vi-VN');

        Domquery("#priceBeforeDiscount").innerText = priceAfterToString;
        Domquery("#price").innerText = priceAfterDiscount;
    }
    updatePrices();
    Domquery("#quantity").addEventListener("input", updatePrices);