class Product {
    constructor(name, id, linkImg, linkWeb, kind, status, price, discount, special) {
        this.name = name;
        this.id = id;
        this.linkImg = linkImg;
        this.linkWeb = linkWeb;
        this.kind = kind;
        this.status = status;
        this.price = price;
        this.discount = discount;
        this.special = special;
    }
    calculateDiscountedPrice() {
        let priceAfterConvert = parseFloat(this.price.replace(/,/g, ''));
        let priceAfterDiscount = (priceAfterConvert * ((100 - this.discount) / 100)).toLocaleString('vi-VN');
        return priceAfterDiscount;
    }
    renderSpecial() {
        return `<article data-id="${this.id}" class="special-product-item">
        <section>
            <img src="${this.linkImg}" alt="Sản Phẩm Giảm Giá 1">
        </section>
        <h2>${this.name}</h2>
        <strong>${this.calculateDiscountedPrice()} VND</strong>
        <div>
            <del>${this.price} VND</del>  
            <p>-${this.discount}%</p>
        </div>
        <button onclick="${this.id}">Thêm vào giỏ hàng</button>  
    </article>`;
    }

    renderNomal() {
        return `<div data-id="${this.id}" class="product-item">
        <div class="discount">
        <div>Giảm giá</div>
        <div>${this.discount}%</div>
        </div>
        <section>
            <img src="${this.linkImg}" alt="Sản Phẩm 1">
        </section>
        <h3>${this.name}</h3>
        <h6 id="idProduct">${this.id}</h6>
        <strong>${this.calculateDiscountedPrice()} VND</strong>
        <div class="price-item">
            <del>${this.price} VND</del>
        </div>
        <button onclick="${this.id}">Thêm vào giỏ hàng</button>  
    </div>`;
    }
    
    renderCart() {
        return `
    <div class="items-cart" data-id="${this.id}">
        <div onclick="productManage.DeleteProductCart('${this.id}')" class="close-items-cart">X</div>
        <div class="left-product-cart">
            <img class="img-product-cart" src="${this.linkImg}" alt="">
            <div class="information-product-cart">
                <div class="name-product-cart">${this.name}</div>
                <div class="kind-product-card">${this.kind}</div>
                <div class="price">${this.calculateDiscountedPrice()} VND</div>
            </div>
        </div>
    </div>
    `;
    }
    
}

class ProductManage {
    constructor(products, productCart) {
        this.products = products;
        this.productCart = productCart;
    }

    getProductsByKind(kind) {
        return this.products.filter(product => product.kind === kind);
    }

    getProductsBySpecial(special) {
        return this.products.filter(product => product.special === special);
    }

    generate() {
        let container = Domquery("#products-list-special");
        container.innerHTML = '';

        this.getProductsBySpecial(true).forEach(product => {
            container.innerHTML += product.renderSpecial();
        });
    }

    generateSonyPlaystation() {
        let containerSonyPlaytation = Domquery("#product-list-sony");
        containerSonyPlaytation.innerHTML = '';
        let containerMicrosoftPlaytation = Domquery("#product-list-microsoft");
        containerMicrosoftPlaytation.innerHTML = '';

        this.getProductsByKind("xbox").forEach(product => {
            containerMicrosoftPlaytation.innerHTML += product.renderNomal();
        });

        this.getProductsByKind("ps5").forEach(product => {
            containerSonyPlaytation.innerHTML += product.renderNomal();
        });
    }

    generateProductCart() {
        let container = Domquery("#product-cart-container");
        container.innerHTML = '';
        
        this.productCart.forEach(product => {
            container.innerHTML += product.renderCart();
        });
    }
    
    total() {
        let productQuantity = 0;
        let sum = 0;
    
        this.productCart.forEach(product => {
            productQuantity++;
            sum += (parseFloat(product.price.replace(/,/g, ''))) * ((100 - product.discount) / 100);
            Domquery("#product-quantity-value").innerHTML = productQuantity;
        });
    
        // Cập nhật giá trị tổng cộng ban đầu (chưa giảm giá)
        Domquery("#total-value-amount").innerHTML = sum.toLocaleString('vi-VN');
    }
    DeleteProductCart(id) {
        // this.productCart = this.productCart.filter(product => product.id !== id);
        // productCart.render();
        // productCart.total();
        console.log(id)
    }

}
Domquery("#input-coupons").addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        let couponCode = Domquery("#input-coupons").value;
        let sum = 0;
        let sumAfterDiscount=0
        // Tính lại tổng giá trị của giỏ hàng
        productManage.productCart.forEach(product => {
            sum += (parseFloat(product.price.replace(/,/g, ''))) * ((100 - product.discount) / 100);
        });
        sumAfterDiscount=sum;
        // Kiểm tra mã giảm giá và áp dụng giảm giá nếu đúng mã
        if (couponCode === "NGUYENQUOCHUY") {
            sum *= 0.7;  // Giảm 30%
        }
        sumAfterDiscount=sumAfterDiscount-sum
        // Cập nhật giá trị tổng cộng sau khi áp dụng giảm giá
        Domquery("#total-value-amount").innerHTML = sum.toLocaleString('vi-VN');
        Domquery("#discount-amount-value").innerHTML = sumAfterDiscount.toLocaleString('vi-VN');
    }
});
function Domquery(infor) {
    return document.querySelector(infor);
}
function startCountdown(seconds) {
    let timerElement = document.getElementById('timer');
    let remainingTime = seconds;

    function updateTimer() {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        // Định dạng hiển thị phút và giây
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = `Thời gian còn lại ${minutes + ':' + seconds}`;

        if (remainingTime > 0) {
            remainingTime--;
        } else {
            clearInterval(countdownInterval);
            timerElement.textContent = "Countdown Finished!";
        }
    }

    updateTimer(); // Hiển thị ngay lập tức thời gian ban đầu
    let countdownInterval = setInterval(updateTimer, 1000);
}
let products = [
    new Product("Máy chơi game PlayStation 5 Slim", "sony-ps5-001", "https://store.sony.com.vn/cdn/shop/files/PS5_2xDSWC_D_BNDL_RNDR_LT_PROD_RGB_ETCK_240206_medium.png?v=1712287416", "", "ps5", true, "10,000,000", 33, true),
    new Product("Bộ máy chơi game PS5 hai tay cầm", "sony-ps5-002", "https://store.sony.com.vn/cdn/shop/files/PS5_D_SA_RNDR_RT_RGB_E32_240125_medium.png?v=1711962851", "", "ps5", true, "15,000,000", 53, true),
    new Product("PlayStation®5 Digital Edition Console NBA", "sony-ps5-003", "https://media.direct.playstation.com/is/image/sierialto/PS5-digital-2k25bundle-Hero-1-US?$Background_Large$", "", "ps5", false, "12,000,000", 53, false),
    new Product("Microsoft Xbox One Elite - Series 2 Black", "microsoft-xbox-001", "https://hanoicomputercdn.com/media/product/62305_tay_cam_choi_game_khong_day_microsoft_xbox_one_elite_series_2_black_0001.jpg", "", "xbox", true, "3,799,000", 53, false),
    new Product("Đĩa PS5 Until Dawn", "sony-game-001", "https://store.sony.com.vn/cdn/shop/files/PS5_UD_STE_PKSHT_LT_RGB_EN_APAC_240710_medium.jpg?v=1728620192", "", "game", true, "1,799,000", 23, true),
];
let cart = [];
let productManage = new ProductManage(products, cart);

productManage.generate();
productManage.generateSonyPlaystation();
startCountdown(3000);

let countDown = Domquery("#count-down");
document.addEventListener('click', function (event) {
    let targetElement = event.target;

    if (targetElement.tagName === 'BUTTON' && targetElement.textContent === 'Thêm vào giỏ hàng') {
        event.stopPropagation();
        let productElement = targetElement.closest('[data-id]');

        if (!isHaveAnAccount) {
            alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
        } else {
            let productId = productElement.getAttribute('data-id');
            console.log(`Thêm sản phẩm với ID: ${productId} vào giỏ hàng`);
            let product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                console.log(`Giỏ hàng hiện tại:`, cart);
                productManage.generateProductCart();
                productManage.total();
            }
        }
    } else if (targetElement.closest('[data-id]')) {
        let productElement = targetElement.closest('[data-id]');
        if (!isHaveAnAccount) {
            alert("Bạn cần đăng nhập để mua hàng.");
        } else {
            let productId = productElement.getAttribute('data-id');
            console.log(`Mua sản phẩm với ID: ${productId}`);
        }
    }
});



// Domquery("#support-chat").addEventListener("click", ()=>{
//     let createChatBox=document.createElement("div");
//     createChatBox.id="ChatBox";
//     Domquery("body").appendChild(createChatBox);
//     Domquery("#support-chat").style.display="none"
// })
class Account {
    constructor(firstName, lastName, userName, passWord, email, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.passWord = passWord;
        this.email = email;
        this.phoneNumber = phoneNumber;


    }
}
class ManageAccount {
    constructor(listAccount) {
        this.listAccount = listAccount
    }

    addAccount(account) {
        this.listAccount.push(account);
    }

    findAccount(userName, passWord) {
        let found = false;
        this.listAccount.forEach(account => {
            if (account.userName === userName && account.passWord === passWord) {
                found = true;
            }
        });
        return found;
    }
}
let firstName, lastName, userName, passWord, email, phoneNumber, rePass;
let isTrueFirstName = false;
let isTrueLastName = false;
let isTrueUserName = false;
let isTruePassWord = false;
let isTrueRePass = false;
let isTrueEmail = false;
let isTruePhoneNumber = false;
let newAccount = [
    new Account("Huy", "Nguyen", "NemCua", "Nemmcuaa11", "abc05122005", "0767699085")
]
let manageAccount = new ManageAccount(newAccount);

let isHaveAnAccount = false;
// let isHaveAnAcoount=false;
Domquery("#create-account").addEventListener("click", () => {
    event.preventDefault();

    // Gán giá trị từ form sử dụng Domquery
    firstName = Domquery("#first-name").value;
    lastName = Domquery("#last-name").value;
    userName = Domquery("#accountUser").value;
    passWord = Domquery("#password").value;
    rePass = Domquery("#re-pass").value;
    email = Domquery("#email").value;
    phoneNumber = Domquery("#phone-number").value;

    // Kiểm tra hợp lệ của các trường dữ liệu
    isTrueFirstName = firstName.trim() !== "";
    isTrueLastName = lastName.trim() !== "";
    isTrueUserName = userName.trim() !== "";
    isTruePassWord = passWord.trim() !== "" && passWord.length >= 8;
    isTrueRePass = rePass.trim() === passWord;
    isTrueEmail = email.trim() !== "" && email.includes("@");
    isTruePhoneNumber = phoneNumber.trim() !== "";

    // Đặt hoặc bỏ lớp 'error' cho các trường không hợp lệ
    Domquery("#first-name").classList.toggle("error", !isTrueFirstName);
    Domquery("#last-name").classList.toggle("error", !isTrueLastName);
    Domquery("#accountUser").classList.toggle("error", !isTrueUserName);
    Domquery("#password").classList.toggle("error", !isTruePassWord);
    Domquery("#re-pass").classList.toggle("error", !isTrueRePass);
    Domquery("#email").classList.toggle("error", !isTrueEmail);
    Domquery("#phone-number").classList.toggle("error", !isTruePhoneNumber);

    // Nếu tất cả các trường hợp lệ, thêm tài khoản vào danh sách
    if (isTrueFirstName && isTrueLastName && isTrueUserName && isTruePassWord && isTrueRePass && isTrueEmail && isTruePhoneNumber) {
        newAccount = new Account(firstName, lastName, userName, passWord, email, phoneNumber);
        manageAccount.addAccount(newAccount);
        console.log(manageAccount.listAccount);
    } else {
        console.log("Thông tin không hợp lệ. Vui lòng kiểm tra lại.");
    }
})

Domquery("#enter-log-in").addEventListener('click', () => {
    Domquery("#sign-up").style.display = "none"
    Domquery("#log-in").style.display = "flex"
})
Domquery("#enter-sign-up").addEventListener('click', () => {
    Domquery("#sign-up").style.display = "flex"
    Domquery("#log-in").style.display = "none"
})
Domquery("#login-account").addEventListener('click', () => {
    event.preventDefault()
    let userName = Domquery("#login-accountUser").value;
    let passWord = Domquery("#login-password").value;
    if (manageAccount.findAccount(userName, passWord)) {
        Domquery("#main-shop").style.display = "block";

        Domquery("#log-in").style.display = "none"
        isHaveAnAccount = true;
        if (isHaveAnAccount === true) {

            inputInforUser()

        }
    } else {
        alert("sai maat khau hoac tai khoan")
    }

})

function backhome() {
    Domquery("#main-shop").style.display = "block"
    Domquery("#my-information").style.display = "none"
}
Domquery("#account").addEventListener("click", () => {
    if (isHaveAnAccount === false) {
        let boxIsAccount = document.createElement("div");
        boxIsAccount.id = "boxIsAccount";
        Domquery("body").appendChild(boxIsAccount)
        boxIsAccount.innerHTML = `
    <div id="avatar">
        <div id="avatar-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 16 16" fill="none">
                            <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"/>
                            <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"/>
                            </svg>  
        </div>
    </div>
    <div class="account-button" id="create-new-account">Đăng kí</div>
    <div class="account-button" id="have-an-account">Đăng nhập</div>
    <div class="account-button" id="late">Lần sau nhé!!</div>
    `
    }
    else {
        Domquery("#main-shop").style.display = "none"
        Domquery("#my-information").style.display = "flex"

    }
})
Domquery("#enter-pay").addEventListener("click", () => {
    showLoader(timeLoader)
})
document.body.addEventListener("click", (event) => {
    if (event.target.id === "create-new-account") {
        Domquery("#main-shop").style.display = "none";
        Domquery("#boxIsAccount").remove();
        Domquery("#sign-up").style.display = "flex"
    } else if (event.target.id === "have-an-account") {
        Domquery("#main-shop").style.display = "none";
        Domquery("#boxIsAccount").remove();
        Domquery("#log-in").style.display = "flex"
    } else if (event.target.id === "late") {
        Domquery("#boxIsAccount").remove();
    }
});

function inputInforUser() {
    Domquery("#input-user-name").innerHTML = `${userName}`
    Domquery("#input-name").innerHTML = `${firstName} ${lastName}`
    Domquery("#input-email").innerHTML = `${email}`
    Domquery("#input-phone-number").innerHTML = `${phoneNumber}`
    Domquery("#name-information").innerHTML = `${firstName} ${lastName}`
}

function changeAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = Domquery('#avatar-information');
            const mainAvatar = Domquery('#account')
            imagePreview.style.backgroundImage = `url(${e.target.result})`;
            imagePreview.style.backgroundSize = 'cover';
            imagePreview.style.backgroundPosition = 'center';
            imagePreview.style.display = 'block';

            mainAvatar.style.backgroundImage = `url(${e.target.result})`;
            mainAvatar.style.backgroundSize = 'cover';
            mainAvatar.style.backgroundPosition = 'center';
            mainAvatar.style.display = 'block';
            mainAvatar.innerHTML = ""
        };
        reader.readAsDataURL(file);
    }
}
let timeLoader = 2000;
function showLoader(timeLoader) {
    const loader = Domquery('#loader');
    loader.style.display = 'block';

    setTimeout(function () {
        hideLoader();
    }, timeLoader);
}
function hideLoader() {
    const loader = Domquery('#loader');
    loader.style.display = 'none';
}
Domquery("#shop-bag").addEventListener("click", () => {
    if (isHaveAnAccount) {
        Domquery("#main-shop").style.display = "none"
        Domquery("#cart").style.display = "flex"
    } else {
        alert("hay dang nhap truoc khi vao gio hang nhe!!")
    }
})
Domquery("#enter-pay").addEventListener("click", () => {

    setTimeout(() => {
        Domquery("#cart").style.display = "none"
        Domquery("#bill").style.display = "flex"
    }, timeLoader)
})
Domquery("#back-home-cart").addEventListener("click", () => {
    Domquery("#cart").style.display = "none"
    Domquery("#main-shop").style.display = "block"
})
Domquery("#back-home-bill").addEventListener("click", () => {
    Domquery("#main-shop").style.display = "block"
    Domquery("#bill").style.display = "none"
})

