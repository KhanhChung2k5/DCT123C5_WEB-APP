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
        <div onclick="productManage.deleteProductCart(event, '${this.id}')" class="close-items-cart">X</div>
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
    renderCartPayment(){
        return `
        <div class="check-product-items" >
                        <img src="${this.linkImg}" alt="">
                        <div class="name-id-check-items">
                            <div class="name-check-items">${this.name}</div>
                            <div class="id-check-items">${this.id}</div>
                        </div>
                        
                    </div>
        `
    }
    renderBillProduct(){
        return `
        <div class="group-product-content-bill">
                                    <div class="name-product-body-bill">${this.name}</div>
                                    <div class="id-product-body-bill">${this.id}</div>
                                    <div class="price-product-body-bill">${this.calculateDiscountedPrice()}</div>
                                </div>
        `
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
        let sumAfterDiscount = 0;
        let couponCode = Domquery("#input-coupons").value;
        
        this.productCart.forEach(product => {
            productQuantity++;
            sum += (parseFloat(product.price.replace(/,/g, ''))) * ((100 - product.discount) / 100);
            
            
        });

        if (couponCode === "NGUYENQUOCHUY") {
            sumAfterDiscount =sum*0.2;  // Apply 30% discount
        }
         sumforbill=sum;
         sumAfterDiscountForBill=sumAfterDiscount
         finalBill=sum-sumAfterDiscount+12000;
        Domquery("#product-quantity-value").innerHTML = productQuantity;
        Domquery("#total-value-amount").innerHTML = sum.toLocaleString('vi-VN');
        Domquery("#discount-amount-value").innerHTML = (sumAfterDiscount).toLocaleString('vi-VN');
        if(sum!==0){
            Domquery("#final-total-amount").innerHTML = (sum - sumAfterDiscount+12000).toLocaleString('vi-VN');

        }else{
            Domquery("#final-total-amount").innerHTML =0;
            finalBill=0;
        }
    }
    deleteProductCart(event, id) {
        event.stopPropagation();
        this.productCart = this.productCart.filter(product => product.id !== id);
        console.log("Giỏ hàng sau khi xóa sản phẩm:", this.productCart); // Thêm dòng này
        this.generateProductCart();
        this.total();
    }
    generatePaymentCart(){
        let container = Domquery("#check-product")
        container.innerHTML="";
        this.productCart.forEach(element =>{
            container.innerHTML+=element.renderCartPayment()
        })
    }
    generateProductBill(){
        console.log(3)
        let container=Domquery("#group-product-body-bill");
        container.innerHTML=""
        this.productCart.forEach(element =>{
            container.innerHTML+=element.renderBillProduct()
        })
    }

}
Domquery("#input-coupons").addEventListener("input", ()=>{
    productManage.total()
    
})
let finalBill
let sumforbill;
let sumAfterDiscountForBill;


// Domquery("#input-coupons").addEventListener("input", () => {
//     let couponCode = Domquery("#input-coupons").value;
//         let sum = 0;
//         let sumAfterDiscount=0
//         // Tính lại tổng giá trị của giỏ hàng
//         productManage.productCart.forEach(product => {
//             sum += (parseFloat(product.price.replace(/,/g, ''))) * ((100 - product.discount) / 100);
//         });
//         sumAfterDiscount=sum;
//         // Kiểm tra mã giảm giá và áp dụng giảm giá nếu đúng mã
//         if (couponCode === "NGUYENQUOCHUY") {
//             sum *= 0.7;  // Giảm 30%
//         }else{
//             sum*=1;
//         }
//         sumAfterDiscount=sumAfterDiscount-sum
//         sumAfterDiscountForBill=sumAfterDiscount
//         finalBill=sum;
//         // Cập nhật giá trị tổng cộng sau khi áp dụng giảm giá
//         Domquery("#final-total-amount").innerHTML = sum.toLocaleString('vi-VN');
//         Domquery("#discount-amount-value").innerHTML = sumAfterDiscount.toLocaleString('vi-VN');
// });
function Domquery(infor) {
    return document.querySelector(infor);
}
Domquery("#shipping-fee-value").innerHTML="12.000"
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
            showToast("Hãy đăng nhập để thêm vào giỏ hàng nhé",0 )
        } else {
            let productId = productElement.getAttribute('data-id');
            console.log(`Thêm sản phẩm với ID: ${productId} vào giỏ hàng`);
            let product = products.find(p => p.id === productId);
            if (product) {
                console.log(cart.length);
                productManage.productCart.push(product);
                console.log(`Giỏ hàng hiện tại:`, productManage.productCart);
                productManage.generateProductCart();
                productManage.total();
            }
        }
    } else if (targetElement.closest('[data-id]')) {
        let productElement = targetElement.closest('[data-id]');
        if (!isHaveAnAccount) {
            showToast("Hãy đăng nhập trước khi mua hàng nhé",0 )
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
    new Account("Huy", "Nguyen", "", "", "abc05122005", "0767699085")
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
        showToast("Bạn đã đăng kí thành công, hãy đăng nhập nhé",1 )
    } else {
        
        showToast("Thông tin không hợp lệ. Vui lòng kiểm tra lại.",0 )
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
        showToast("Đăng nhập thành công",1 )
        showLoader(1000)
        setTimeout(()=>{
            Domquery("#main-shop").style.display = "block";
            Domquery("#log-in").style.display = "none"
        },1000)
        isHaveAnAccount = true;
        if (isHaveAnAccount === true) {
            inputInforUser()
        }
    } else {
        showToast("Sai tài khoản hoặc mật khẩu",0 )
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
    productManage.generatePaymentCart()
    Domquery("#total-bill").innerHTML=finalBill.toLocaleString('vi-VN')
    Domquery("#price-later").innerHTML=sumforbill.toLocaleString('vi-VN')
    
    Domquery("#price-discount-later").innerHTML=sumAfterDiscountForBill.toLocaleString('vi-VN')
    Domquery("#input-name-bill").setAttribute("value", `${firstName} ${lastName}`)
    
    Domquery("#input-phone-bill").setAttribute("value", `${phoneNumber}`)
    productManage.generateProductBill()
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
        productManage.total()
        if(productManage.productCart.length===0){
            showToast("not find any item",0)
        }
    } else {
        showToast("Hãy đăng nhập trước khi mua hàng nhé",0 )
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
function showToast(message, type) {
    // Tạo phần tử toast mới
    var toast = document.createElement('div');
    toast.className = 'toast';

    if (type === 1) {
        toast.classList.add('complete');
        toast.innerHTML = `
            <div class="icon-complete">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                    <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                </svg>
            </div>
            <div class="content-warning">${message}</div>
        `;
    } else {
        toast.innerHTML = `
            <div class="icon-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FBD8A5" width="40px" height="40px" viewBox="0 0 24 24">
                    <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-3H11V16h2Zm0-4H11V6h2Z"></path>
                </svg>
            </div>
            <div class="content-warning">${message}</div>
        `;
    }

    
    var toastContainer = document.getElementById('toastContainer');
    toastContainer.appendChild(toast);

    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10); 

    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 500); 
    }, 2500); 
}
Domquery("#pay-now").addEventListener("click", ()=>{

    Domquery("#overlay").style.display="flex"
    Domquery("#check-box").style.display="flex"
    Domquery("#main-text-checking").innerHTML = "";
    let inputNameBill=Domquery("#input-name-bill").value
    let inputAddressBill=Domquery("#input-address-bill").value
    let inputPhoneBill=Domquery("#input-phone-bill").value
    let inputBankAccountNumber = Domquery("#bank-account-number").value;

    
    
    
    let inputExpiryDate=Domquery("#expiry-date").value
    let inputCvv=Domquery("#cvv").value
    let colorRed="#d1565e"
    
    let isValid=true;
    let containerName
    function createValidationMessage(label, message, isTrue, time){
        setTimeout(()=>{
            containerName=document.createElement("div");
        containerName.className="check-input"
        Domquery("#main-text-checking").appendChild(containerName)
        if(isTrue===true){
            containerName.innerHTML=`
            <p>${label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
            </svg>
        `
        showToast(message, 1)
        }
        else{
            containerName.innerHTML=`
            <p>${label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 24.959 68.04 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 40.081 -40.081 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 L 27.081 67.161 C 26.495 67.747 25.727 68.04 24.959 68.04 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${colorRed}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
	<path d="M 65.04 68.04 c -0.768 0 -1.535 -0.293 -2.121 -0.879 L 22.838 27.081 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 40.081 40.081 c 1.172 1.171 1.172 3.071 0 4.242 C 66.575 67.747 65.808 68.04 65.04 68.04 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${colorRed}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
	<path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 6 C 23.495 6 6 23.495 6 45 s 17.495 39 39 39 s 39 -17.495 39 -39 S 66.505 6 45 6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${colorRed}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>
        `
        showToast(message, 0)
        }
        },time)

    }
    
    if (inputNameBill.trim() === "") {
        isValid = false;
        createValidationMessage("Tên: ","Tên không thể để trống.", false,1000)
    }else{
        createValidationMessage("Tên: ","complete", true,1000)
    }

    if (inputAddressBill.trim() === "") {
        isValid = false;
        
        createValidationMessage("Địa chỉ","Địa chỉ không thể để trống", false,2000)
    }else{
        
        createValidationMessage("Địa chỉ","complete", true,2000)
    }

    // Validate phone number
    let phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(inputPhoneBill)) {
        isValid = false;
        
        createValidationMessage("Số điện thoại","Số điện thoại phải có 10s số bắt đầu bằng 0.", false,3000)
    }else{
        
        createValidationMessage("Số điện thoại","complete", true,3000)
    }

    // Validate bank account number
    let bankAccountRegex = /^\d{16}$/;
    if (!bankAccountRegex.test(inputBankAccountNumber)) {
        isValid = false;
        
        createValidationMessage("Số tài khoản","Số tài khoản phải đủ 16 số.", false,4000)
    }else{
        
        createValidationMessage("Số tài khoản","complete", true,4000)
    }

    // Validate expiry date
    let expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(inputExpiryDate)) {
        isValid = false;
        
        createValidationMessage("Ngày hết hạn","ngày hết hạn có dạng xx/xx", false,5000)
    }else{
        
        createValidationMessage("Ngày hết hạn","complete", true,5000)
    }

    // Validate CVV
    let cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(inputCvv)) {
        isValid = false;
        
        createValidationMessage("Số bảo mật","Số bảo mật đủ 3 số", false,6000)
    }else{
        
        createValidationMessage("Số bảo mật","complete", true,6000)
    }
    
    if (isValid) {
        setTimeout(() => {
            Domquery("#check-box").style.backgroundColor = "#f0fff4";
            Domquery("#check-box").style.borderColor = "#4CAF50";
            Domquery("#statusValid").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                    <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                    <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                </svg>
            `;
            Domquery("#statusValid").classList.add("shake-wrong");
        }, 6000);
    } else {
        setTimeout(() => {
            Domquery("#check-box").style.backgroundColor = "#e6c8c8";
            Domquery("#check-box").style.borderColor = "#B21514";
            Domquery("#statusValid").innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve">
                    <defs></defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 24.959 68.04 c -0.768 0 -1.536 -0.293 -2.121 -0.879 c -1.172 -1.171 -1.172 -3.071 0 -4.242 l 40.081 -40.081 c 1.172 -1.172 3.07 -1.172 4.242 0 c 1.172 1.171 1.172 3.071 0 4.242 L 27.081 67.161 C 26.495 67.747 25.727 68.04 24.959 68.04 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #B21514; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                        <path d="M 65.04 68.04 c -0.768 0 -1.535 -0.293 -2.121 -0.879 L 22.838 27.081 c -1.172 -1.171 -1.172 -3.071 0 -4.242 c 1.171 -1.172 3.071 -1.172 4.242 0 l 40.081 40.081 c 1.172 1.171 1.172 3.071 0 4.242 C 66.575 67.747 65.808 68.04 65.04 68.04 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #B21514; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                        <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 6 C 23.495 6 6 23.495 6 45 s 17.495 39 39 39 s 39 -17.495 39 -39 S 66.505 6 45 6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: #B21514; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                    </g>
                </svg>
            `;
            Domquery("#statusValid").classList.add("shake-wrong");
        }, 6000);
    }
    Domquery("#statusValid").classList.remove("shake-wrong");
    Domquery("#check-box").style.backgroundColor="#FFF9F1"
    Domquery("#check-box").style.borderColor="#FEE8C5"
    Domquery("#statusValid").innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" fill="#FBD8A5" width="40px" height="40px" viewBox="0 0 24 24">
    <path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-3H11V16h2Zm0-4H11V6h2Z"></path>
</svg>
            `
    setTimeout(()=>{
        if(isValid){

            Domquery("#check-box").style.display="none"
            Domquery("#thank-you-letter").style.display="flex"
        }else{
            Domquery("#check-box").style.display="none"
            Domquery("#overlay").style.display="none"
        }
        

        
    },10000)
})
Domquery("#close-thank-leter").addEventListener("click", ()=>{
    Domquery("#thank-you-letter").style.display="none"
    Domquery("#overlay").style.display="none"
    Domquery("#bill").style.display="none"
    Domquery("#main-shop").style.display="block"
})
const slides = document.querySelector('.slides');
let interval;



function stopSlider() {
  clearInterval(interval);
}




stopSlider();

