class Customer {
    constructor(id, username, password, emailAddress, phoneNumber, accountCreationDate, accountStatus, avatar, order, bought) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.accountCreationDate = accountCreationDate;
        this.accountStatus = accountStatus;
        this.avatar=avatar;
        this.order=order;
        this.bought=bought;
    }
}

class Product {
    constructor(id, img, name, price, discount, type){
        this.id = id;
        this.img = img;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.type = type;
    }

    renderProduct(serial) {
        return `
        <div class="items">
            <input type="checkbox">
            <div class="serial">${serial}</div>
            <div class="id-items">${this.id}</div>
            <div class="img"><img src="${this.img}" alt="${this.name}"></div>
            <div class="name">${this.name}</div>
            <div class="price">${this.price}</div>
            <div class="discount">${this.discount}</div>
            <div class="priceDiscount">${Math.round(this.price * ((100-this.discount)/100))}</div>
            <div class="type">${this.type}</div>
            <div class="function">
                <div class="edit">Edit</div>
                <div class="delete" onclick="deleteProduct('${this.id}')">Delete</div>
            </div>
        </div>
        `;
    }
    renderProductBought(){
       return `
       <div class="items">
       <img src="${this.img}" alt="">
       <span>${this.name}</span>
       <span>${this.id}</span>
       <span>${this.price}</span>
   </div>
       ` 
    }
    
}

class User {
    constructor(id, name, password, mail, phoneNumber, dateSignUp, kind, status, bag, bought) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.dateSignUp = dateSignUp;
        this.kind = kind;
        this.status = status;
        this.bag=bag;
        this.bought=bought;
    }
    renderUser(serial) {
        return `
        <div class="user">
            <input type="checkbox">
            <div class="serial">${serial}</div>
            <div class="id">${this.id}</div>
            <div class="name">${this.name}</div>
            <div class="mail">${this.mail}</div>
            <div class="phoneNumber">${this.phoneNumber}</div>
            <div class="dateSignUp">${this.dateSignUp}</div>
            <div class="kind">${this.kind}</div>
            <div class="status">${this.status}</div>
            <div class="function">
                <div class="edit">Edit</div>
                <div class="delete" onclick="deleteCustomer('${this.id}')">Delete</div>
            </div>
        </div>
        `;
    }
    
    
}

const users = [
    new User('001', 'John Doe', 'password123', 'john.doe@example.com', '1234567890', '2022-01-15', 'customer', 'active', ["PS5GAME04", "PS5DISK11"], ["PS5STAND17"]),
    new User('002', 'Jane Smith', 'password456', 'jane.smith@example.com', '0987654321', '2023-03-22', 'employee', 'inactive', [], []),
    new User('003', 'Alice Johnson', 'password789', 'alice.johnson@example.com', '1122334455', '2023-07-30', 'customer', 'active', ["XBOXGAME05", "XBOXCTRL02"], ["XBOXSTAND18"]),
    new User('004', 'Bob Brown', 'password321', 'bob.brown@example.com', '5566778899', '2021-11-12', 'employee', 'active', [], []),
    new User('005', 'Charlie Davis', 'password654', 'charlie.davis@example.com', '6677889900', '2020-05-18', 'customer', 'inactive', ["GAMECD13", "GAMECD19"], ["GAMECD08"]),
    new User('006', 'Daniel White', 'password987', 'daniel.white@example.com', '9988776655', '2023-08-05', 'customer', 'active', ["PS5CTRL01", "PS5HEAD20"], ["PS5CHARGER09"]),
    new User('007', 'Emma Green', 'password321', 'emma.green@example.com', '2233445566', '2022-09-25', 'customer', 'inactive', ["XBOXHEADSET07", "XBOXCHARGER10"], ["XBOXCAM15"]),
    new User('008', 'Sophia Blue', 'password123', 'sophia.blue@example.com', '3344556677', '2021-12-10', 'customer', 'active', ["GAMECD16", "GAMECD03"], ["GAMECD30"]),
    new User('009', 'Oliver Black', 'password456', 'oliver.black@example.com', '4455667788', '2022-02-19', 'customer', 'active', ["PS5HEADSET06", "PS5CAM14"], ["PS5STAND17"]),
    new User('010', 'Liam White', 'password654', 'liam.white@example.com', '5566778899', '2023-05-25', 'employee', 'active', [], []),
    new User('011', 'Noah Brown', 'password321', 'noah.brown@example.com', '6677889900', '2021-07-18', 'customer', 'inactive', ["XBOXGAME05", "XBOXHEADSET07"], ["XBOXSTAND18"]),
    new User('012', 'Isabella Green', 'password987', 'isabella.green@example.com', '7788990011', '2022-11-30', 'customer', 'active', ["GAMECD13", "GAMECD16"], ["GAMECD19"]),
    new User('013', 'Mia Red', 'password321', 'mia.red@example.com', '8899001122', '2023-03-14', 'customer', 'inactive', ["PS5DISK11", "PS5CTRL01"], ["PS5HEAD20"]),
    new User('014', 'Ethan Blue', 'password123', 'ethan.blue@example.com', '9900112233', '2022-06-28', 'employee', 'inactive', [], []),
    new User('015', 'Ava Black', 'password456', 'ava.black@example.com', '0011223344', '2023-09-12', 'customer', 'active', ["XBOXCTRL12", "XBOXGAME05"], ["XBOXSTAND18"]),
    new User('016', 'Sophia Green', 'password654', 'sophia.green@example.com', '1122334455', '2021-04-23', 'employee', 'active', [], []),
    new User('017', 'Amelia White', 'password321', 'amelia.white@example.com', '2233445566', '2022-08-05', 'customer', 'inactive', ["GAMECD08", "GAMECD13"], ["GAMECD03"]),
    new User('018', 'Logan Black', 'password987', 'logan.black@example.com', '3344556677', '2023-02-17', 'customer', 'active', ["PS5HEAD20", "PS5CHARGER09"], ["PS5CAM14"]),
    new User('019', 'Ella Brown', 'password321', 'ella.brown@example.com', '4455667788', '2022-10-10', 'customer', 'inactive', ["XBOXGAME05", "XBOXCTRL12"], ["XBOXSTAND18"]),
    new User('020', 'Lucas Red', 'password123', 'lucas.red@example.com', '5566778899', '2023-01-05', 'employee', 'active', [], []),
];

const customers = users.filter(user => user.kind === 'customer');
const employees = users.filter(user => user.kind === 'employee');

class ProductManage {
    constructor(listProduct) {
        this.originalListProduct = listProduct.slice(); // Lưu bản sao của danh sách gốc
        this.listProduct = listProduct.slice(); // Khởi tạo listProduct với bản sao
    }

    renderProduct(products = null) {
        let serial = 0;
        const boxItems = Domquery("#box-items");
        boxItems.innerHTML = ''; // Xóa nội dung trước đó
        const productList = products || this.listProduct; // Sử dụng danh sách được cung cấp hoặc listProduct
        productList.forEach(element => {
            serial++;
            boxItems.innerHTML += element.renderProduct(serial);
        });
    }

    deleteProduct(id) {
        // Xóa sản phẩm khỏi cả danh sách gốc và danh sách hiện tại
        this.originalListProduct = this.originalListProduct.filter(product => product.id !== id);
        this.listProduct = this.listProduct.filter(product => product.id !== id);
        this.renderProduct(); 
        isnullList(this.listProduct);
    }

    findProduct(query) {
        if (!query) {
            // Nếu chuỗi tìm kiếm rỗng, trả về danh sách gốc
            return this.originalListProduct.slice();
        }
        if (query.startsWith('#')) {
            // Tìm kiếm theo id
            let id = query.substring(1);
            return this.originalListProduct.filter(product => product.id.toString() === id);
        } else {
            // Tìm kiếm theo tên
            return this.originalListProduct.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
        }
    }
    addproduct(product){
        this.originalListProduct.push(product);
    this.listProduct.push(product);

    
    this.renderProduct();
    }
}
function isnullList(list){
    if (list.length === 0) {
            
        Domquery("#box-items").innerHTML=`
        <div class="box-empty">
        <img class="img-empty" src="e96797d2fe1b4963a0ed04418522d96b_preview_rev_1.png">
        <div>Không còn gì trong danh sach</div>
    </div>
        `
    }
}
class UserManage {
    constructor(listUser) {
        this.originalListUser = listUser.slice(); // Lưu bản sao của danh sách gốc
        this.listUser = listUser.slice(); // Khởi tạo listUser với bản sao
    }

    renderUser(users = null) {
        let serial = 0;
        const boxItems = Domquery("#box-items");
        boxItems.innerHTML = '';
        const userList = users || this.listUser; // Sử dụng danh sách được cung cấp hoặc listUser
        userList.forEach(element => {
            serial++;
            boxItems.innerHTML += element.renderUser(serial);
        });
    }

    deleteCustomer(id) {
        // Xóa người dùng khỏi cả danh sách gốc và danh sách hiện tại
        this.originalListUser = this.originalListUser.filter(user => user.id !== id);
        this.listUser = this.listUser.filter(user => user.id !== id);
        this.renderUser();
        isnullList(this.listUser);
    }

    findUser(query) {
        if (!query) {
            // Nếu chuỗi tìm kiếm rỗng, trả về danh sách gốc
            return this.originalListUser.slice();
        }
        if (query.startsWith('#')) {
            // Tìm kiếm theo ID
            let id = query.substring(1);
            return this.originalListUser.filter(user => user.id.toString() === id);
        } else {
            // Tìm kiếm theo tên
            return this.originalListUser.filter(user =>
                user.name.toLowerCase().includes(query.toLowerCase())
            );
        }
    }
    checkProduct(){
        this.listUser.forEach(e =>{
            e.bag.forEach(a =>{
                console.log(a)
            })
        })
    }
}
function Domquery(elements){
    return document.querySelector(elements);
}

function deleteProduct(id) {
    
    warningFunction()
    
    Domquery("#no").addEventListener("click", () => {
        Domquery("#warning").remove();
    })
    Domquery("#yes").addEventListener("click", () => {
        Domquery("#warning").remove();
        showLoader();
        setTimeout(() => {
            newListProduct.deleteProduct(id);
        }, 0)
    })
    
}

function deleteCustomer(id) {
    
    warningFunction()
    
    Domquery("#no").addEventListener("click", () => {
        Domquery("#warning").remove();
    })
    Domquery("#yes").addEventListener("click", () => {
        Domquery("#warning").remove();
        showLoader();
        setTimeout(() => {
            newListUser.deleteCustomer(id);
        }, 0)
    })
    
}
function showLoader() {
    const loader = Domquery('#loader');
    loader.style.display = 'block';

    setTimeout(function () {
        hideLoader();
    },0);
}
function hideLoader() {
    const loader = Domquery('#loader');
    loader.style.display = 'none';
}
function warningFunction() {
    let warning = document.createElement("div")
    warning.id = "warning";
    Domquery("body").appendChild(warning);
    warning.innerHTML = `
        <div id="warning-box">
        <?xml version="1.0" ?><svg fill="#ba4e5b" baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M12,5.511c0.561,0,1.119,0.354,1.544,1.062l5.912,9.854C20.307,17.842,19.65,19,18,19H6c-1.65,0-2.307-1.159-1.456-2.573   l5.912-9.854C10.881,5.865,11.439,5.511,12,5.511 M12,3.511c-1.296,0-2.482,0.74-3.259,2.031l-5.912,9.856   c-0.786,1.309-0.872,2.705-0.235,3.83S4.473,21,6,21h12c1.527,0,2.77-0.646,3.406-1.771s0.551-2.521-0.235-3.83l-5.912-9.854   C14.482,4.251,13.296,3.511,12,3.511z"/></g><g><circle cx="12" cy="16" r="1.3"/></g><g><path d="M13.5,10c0-0.83-0.671-1.5-1.5-1.5s-1.5,0.67-1.5,1.5c0,0.199,0.041,0.389,0.111,0.562C11.165,11.938,12,14,12,14   s0.835-2.062,1.391-3.438C13.459,10.389,13.5,10.199,13.5,10z"/></g></svg>

            <div id="warning-text">Bạn có chắc là muốn xóa vĩnh viễn người dùng này không</div>
            <div id="warning-box-yesNo">
                
                <div id="no">Không</div>
                <div id="yes">Đồng ý</div>
            </div>
        </div>
    `
}

const products = [
new Product('PS5CTRL01', 'https://via.placeholder.com/150', 'Tay cầm chơi game PS5 DualSense', 70, 50, 'PS5'),
new Product('XBOXCTRL02', 'https://via.placeholder.com/150', 'Tay cầm không dây Xbox Series X', 65, 40, 'Xbox'),
new Product('GAMECD03', 'https://via.placeholder.com/150', 'Đĩa game Call of Duty: Modern Warfare', 60, 30, 'game'),
new Product('PS5GAME04', 'https://via.placeholder.com/150', 'Đĩa game Spider-Man: Miles Morales cho PS5', 50, 20, 'PS5'),
new Product('XBOXGAME05', 'https://via.placeholder.com/150', 'Đĩa game Halo Infinite cho Xbox', 55, 25, 'Xbox'),
new Product('PS5HEADSET06', 'https://via.placeholder.com/150', 'Tai nghe không dây Pulse 3D cho PS5', 100, 15, 'PS5'),
new Product('XBOXHEADSET07', 'https://via.placeholder.com/150', 'Tai nghe không dây Xbox Wireless Headset', 99, 10, 'Xbox'),
new Product('GAMECD08', 'https://via.placeholder.com/150', 'Đĩa game FIFA 23', 60, 35, 'game'),
new Product('PS5CHARGER09', 'https://via.placeholder.com/150', 'Đế sạc tay cầm PS5 DualSense', 30, 60, 'PS5'),
new Product('XBOXCHARGER10', 'https://via.placeholder.com/150', 'Bộ sạc tay cầm Xbox Play & Charge Kit', 25, 55, 'Xbox'),
new Product('PS5DISK11', 'https://via.placeholder.com/150', 'Đĩa game Demons Souls cho PS5', 70, 20, 'PS5'),
new Product('XBOXCTRL12', 'https://via.placeholder.com/150', 'Tay cầm Elite Series 2 cho Xbox', 150, 10, 'Xbox'),
new Product('GAMECD13', 'https://via.placeholder.com/150', 'Đĩa game The Witcher 3: Wild Hunt', 50, 30, 'game'),
new Product('PS5CAM14', 'https://via.placeholder.com/150', 'Camera HD cho PS5', 80, 15, 'PS5'),
new Product('XBOXCAM15', 'https://via.placeholder.com/150', 'Camera HD cho Xbox Series X', 80, 15, 'Xbox'),
new Product('GAMECD16', 'https://via.placeholder.com/150', 'Đĩa game FIFA 24', 60, 25, 'game'),
new Product('PS5STAND17', 'https://via.placeholder.com/150', 'Giá đỡ PS5 Vertical Stand', 40, 40, 'PS5'),
new Product('XBOXSTAND18', 'https://via.placeholder.com/150', 'Giá đỡ Xbox Series X Vertical Stand', 40, 40, 'Xbox'),
new Product('GAMECD19', 'https://via.placeholder.com/150', 'Đĩa game Assassin’s Creed Valhalla', 65, 20, 'game'),
new Product('PS5HEAD20', 'https://via.placeholder.com/150', 'Tai nghe không dây Sony Pulse 3D cho PS5', 120, 12, 'PS5'),
new Product('XBOXDISK21', 'https://via.placeholder.com/150', 'Đĩa game Gears 5 cho Xbox', 50, 20, 'Xbox'),
new Product('PS5CTRL22', 'https://via.placeholder.com/150', 'Tay cầm chơi game PS5 DualSense Cosmic Red', 75, 30, 'PS5'),
new Product('GAMECD23', 'https://via.placeholder.com/150', 'Đĩa game Red Dead Redemption 2', 55, 25, 'game'),
new Product('XBOXGAME24', 'https://via.placeholder.com/150', 'Đĩa game Forza Horizon 5 cho Xbox', 60, 15, 'Xbox'),
new Product('PS5GAME25', 'https://via.placeholder.com/150', 'Đĩa game Ratchet & Clank: Rift Apart cho PS5', 70, 20, 'PS5'),
new Product('XBOXHEADSET26', 'https://via.placeholder.com/150', 'Tai nghe không dây SteelSeries Arctis 9X cho Xbox', 120, 10, 'Xbox'),
new Product('GAMECD27', 'https://via.placeholder.com/150', 'Đĩa game Cyberpunk 2077', 40, 35, 'game'),
new Product('PS5CAM28', 'https://via.placeholder.com/150', 'Camera HD cho PS5 - Phiên bản màu đen', 85, 12, 'PS5'),
new Product('XBOXCTRL29', 'https://via.placeholder.com/150', 'Tay cầm không dây Xbox Series X - Phiên bản Elite', 155, 8, 'Xbox'),
new Product('GAMECD30', 'https://via.placeholder.com/150', 'Đĩa game Resident Evil Village', 60, 25, 'game'),
];



let newListProduct = new ProductManage(products)
let newListUser= new UserManage(users)
let customerManager = new UserManage(customers);
let employeeManager = new UserManage(employees);

customerManager.checkProduct()
Domquery("#product-management").addEventListener("click", ()=>{
    newListProduct.renderProduct()
    isnullList(newListProduct.listProduct)
    Domquery("#search-bar-product").style.display="flex"
    Domquery("#search-bar-user").style.display="none"
    Domquery("#container-shipping").style.display="none"
    Domquery("#content-main").style.display="block";
    Domquery("#fillter-main").style.display="none"
    Domquery("#add-product").style.display="flex"
    Domquery("#box-items").style.display="block"
    Domquery(".dash-board").style.display="none"
    Domquery(".box-order-items").style.display="none"
    if(Domquery("body").classList.contains("dark-body")){
        
        const boxItemsProduct=document.querySelectorAll(".items")
        boxItemsProduct.forEach(items =>{
            items.classList.add("dark-element")
        })
    }else{
        
    }
})
Domquery("#user-management").addEventListener("click", ()=>{
    newListUser.renderUser()
    isnullList(newListUser.listUser)
    Domquery("#search-bar-product").style.display="none"
    Domquery("#search-bar-user").style.display="flex"
    Domquery("#container-shipping").style.display="none"
    Domquery("#content-main").style.display="block";
    Domquery("#fillter-main").style.display="flex"
    Domquery("#add-product").style.display="none"
    Domquery(".dash-board").style.display="none"
    Domquery("#box-items").style.display="block"
    Domquery(".box-order-items").style.display="none"
    if(Domquery("body").classList.contains("dark-body")){
        
        const boxItems=document.querySelectorAll(".user")
        boxItems.forEach(items =>{
            items.classList.add("dark-element")
        })
    }else{
        
    }
})
document.querySelector("#customer-check").addEventListener("click", () => {
    customerManager.renderUser();
    
});

document.querySelector("#employee-check").addEventListener("click", () => {
    employeeManager.renderUser();
});
Domquery("#search-product").addEventListener("input", () => {
    let query = Domquery("#search-product").value;
    let results = newListProduct.findProduct(query);
    newListProduct.renderProduct(results);
});
Domquery("#search-user").addEventListener("input", () => {
    let query = Domquery("#search-user").value;
    let results = newListUser.findUser(query);
    newListUser.renderUser(results);
});
Domquery("#shiping").addEventListener('click', ()=>{
    Domquery("#container-shipping").style.display="block"
    // Domquery("#infor-user-container").style.display="none";
    Domquery("#content-main").style.display="none";
    Domquery("#fillter-main").style.display="none"
    Domquery(".dash-board").style.display="none"
})
Domquery("#dashborad").addEventListener("click", ()=>{
    Domquery("#container-shipping").style.display="none"
    Domquery("#content-main").style.display="none";
    Domquery(".dash-board").style.display="block"
    Domquery("#search-bar-user").style.display="none"
})
Domquery("#order-management").addEventListener("click", ()=>{
    Domquery("#box-items").style.display="none"
    Domquery("#content-main").style.display="block"
    Domquery(".box-order-items").style.display="block"
    Domquery(".dash-board").style.display="none"
    Domquery("#container-shipping").style.display="none"
    Domquery("#search-bar-user").style.display="none"
    Domquery("#search-bar-product").style.display="none"
    Domquery("#fillter-main").style.display="none"
    Domquery("#add-product").style.display="none"
    
})
///effect darklight
let isdark=true;
const toggleSwitch = Domquery('#theme-toggle');
let ischeck;
toggleSwitch.addEventListener('change', () => {
    ischeck=toggleSwitch.checked
    const items = document.querySelectorAll('.items-shipp');
    const boxItems=document.querySelectorAll(".user")
    const boxItemsProduct=document.querySelectorAll(".items")
  if (ischeck) {
    Domquery(".moon").classList.add("moon-effect")
    Domquery("#svg-moon").classList.add("moon-light")
    
    Domquery("body").classList.add("dark-body")
    Domquery("header").classList.add("dark-element")
    Domquery("#slide-bar").classList.add("dark-element")
    Domquery("main").classList.add("dark-element")
    items.forEach(items =>{
        items.classList.add('dark-theme-border');
    })
    Domquery("#bell").classList.add("dark-icon-svg")
    Domquery(".account").classList.add("dark-border")
    Domquery("#fillter-and-search").classList.add("dark-element")
    Domquery("#box-items").classList.add("dark-element")
    Domquery(".add-product").classList.add("dark-theme-for-element-overlay")
    boxItems.forEach(items =>{
        items.classList.add("dark-element")
    })
    boxItemsProduct.forEach(items =>{
        items.classList.add("dark-element")
    })
    isdark=true
  } else {
    Domquery(".moon").classList.remove("moon-effect")
    Domquery("#svg-moon").classList.remove("moon-light")

    Domquery("body").classList.remove("dark-body")
    Domquery("header").classList.remove("dark-element")
    Domquery("#slide-bar").classList.remove("dark-element")
    Domquery("main").classList.remove("dark-element")
    items.forEach(items =>{
        items.classList.remove('dark-theme-border');
    })
    Domquery("#bell").classList.remove("dark-icon-svg")
    Domquery(".account").classList.remove("dark-border")
    Domquery("#fillter-and-search").classList.remove("dark-element")
    Domquery("#box-items").classList.remove("dark-element")
    Domquery(".add-product").classList.remove("dark-theme-for-element-overlay")
    boxItems.forEach(items =>{
        items.classList.remove("dark-element")
    })
    boxItemsProduct.forEach(items =>{
        items.classList.remove("dark-element")
    })
    isdark=false;
  }
});
Domquery(".img-add-product").addEventListener("click", ()=>{
    Domquery("#fileInput").click()
})
Domquery("#fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const previewContainer = Domquery(".img-add-product");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewContainer.innerHTML = `<img id="img-preview" src="${e.target.result}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file);
    } else {
        previewContainer.innerHTML = '<p>No image uploaded</p>';
    }
});
Domquery(".closed").addEventListener("click", ()=>{
    Domquery(".add-product").style.display="none"
})
Domquery("#add-product").addEventListener("click", ()=>{
    Domquery(".add-product").style.display="flex"
})
Domquery(".enter-add-product").addEventListener("click" ,()=>{
    let name= Domquery("#name-new-product").value
    let id= Domquery("#id-new-product").value
    let price= Domquery("#price-new-product").value
    let kind= Domquery("#kind-new-product").value
    let discount= Domquery("#discount-new-product").value
    let img= "data:image/jpeg;base64,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";
    let newProduct = new Product(id, img, name, price, discount, kind);
    newListProduct.addproduct(newProduct)
    
})
class order{
    constructor(id, date, customer, status, time, total, numberItems) {
        this.id = id;
        this.date = date;
        this.customer = customer;
        this.status = status;
        this.time = time;
        this.total = total;
        this.numberItems = numberItems;
    }
    renderOrder() {
        
        return `
        <div class="items-child-order">
            <div id="id-order">${this.id}</div>
            <div id="date-order">${this.date}</div>
            <div id="nameCustomer-order">${this.customer}</div>
            
            <div>
            <div class="status-order status-order-${this.status}" id="status-order">${this.status}</div></div>
            <div id="time-order">${this.time}</div>
            <div id="total-order">${this.total}</div>
            <div id="number-items-order">${this.numberItems}</div>
        </div>
        `;
    }
}
class orderManage{
    constructor(listOrder){
        this.listOrder=listOrder;
    }
    generrate(){
        let box = Domquery(".box-order-items");
        this.listOrder.forEach(items =>{
            box.insertAdjacentHTML('beforeend',`${items.renderOrder()}`)
        })
    }
}
let orders = [
    new order("10001", "2024-12-01", "Alice Brown", "Processing", "10:00", 120.50, 4),
    new order("10002", "2024-12-02", "Bob Smith", "Delivered", "12:30", 250.75, 6),
    new order("10003", "2024-12-03", "Charlie Johnson", "Delivered", "14:15", 320.40, 8),
    new order("10004", "2024-12-04", "Diana Taylor", "Cancelled", "09:45", 0, 0),
    new order("10005", "2024-12-05", "Eve Williams", "Processing", "16:00", 180.90, 5),
    new order("10006", "2024-12-06", "Frank Carter", "Delivered", "11:00", 400.50, 10),
    new order("10007", "2024-12-07", "Grace Lee", "Delivered", "13:45", 100.20, 3),
    new order("10008", "2024-12-08", "Harry White", "Cancelled", "08:30", 0, 0),
    new order("10009", "2024-12-09", "Ivy Green", "Processing", "15:00", 220.75, 7),
    new order("10010", "2024-12-10", "Jack Black", "Delivered", "17:00", 150.00, 4)
];
let listOrder = new orderManage(orders);
listOrder.generrate()

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-items");
  
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        
        menuItems.forEach(menu => menu.classList.remove("highlight"));
        item.classList.add("highlight");
      });
    });
  });