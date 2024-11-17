class Customer {
    constructor(id, username, password, emailAddress, phoneNumber, accountCreationDate, accountStatus) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.accountCreationDate = accountCreationDate;
        this.accountStatus = accountStatus;
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
    
}

class User {
    constructor(id, name, password, mail, phoneNumber, dateSignUp, kind, status, action) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.mail = mail;
        this.phoneNumber = phoneNumber;
        this.dateSignUp = dateSignUp;
        this.kind = kind;
        this.status = status;
        
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
    new User('001', 'John Doe', 'password123', 'john.doe@example.com', '1234567890', '2022-01-15', 'customer', 'active'),
    new User('002', 'Jane Smith', 'password456', 'jane.smith@example.com', '0987654321', '2023-03-22', 'employee', 'inactive'),
    new User('003', 'Alice Johnson', 'password789', 'alice.johnson@example.com', '1122334455', '2023-07-30', 'customer', 'active'),
    new User('004', 'Bob Brown', 'password321', 'bob.brown@example.com', '5566778899', '2021-11-12', 'employee', 'active'),
    new User('005', 'Charlie Davis', 'password654', 'charlie.davis@example.com', '6677889900', '2020-05-18', 'customer', 'inactive')
];

const customers = users.filter(user => user.kind === 'customer');
const employees = users.filter(user => user.kind === 'employee');

class ProductManage{
    constructor(listProduct){
        this.listProduct= listProduct;


    }
    renderProduct() {
        let serial = 0;
        const boxItems = Domquery("#box-items");
        boxItems.innerHTML = ''; // Clear previous content
        this.listProduct.forEach(element => {
            serial++;
            boxItems.innerHTML += element.renderProduct(serial);
        });
    }
    deleteProduct(id) {
        this.listProduct = this.listProduct.filter(product => product.id !== id);
        this.renderProduct(); 
        isnullList(this.listProduct)
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
class UserManage{
    constructor(listUser){
        this.listUser=listUser;
    }
    
    renderUser(){
        let serial = 0;
        const boxItems = Domquery("#box-items");
        boxItems.innerHTML = '';
        this.listUser.forEach(element => {
            serial++;
            boxItems.innerHTML += element.renderUser(serial);
        });
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
    new Product('A1B', 'https://via.placeholder.com/150', 'Product 1', 100, 10, 'Electronics'),
    new Product('C23D', 'https://via.placeholder.com/150', 'Product 2', 150, 15, 'Electronics'),
    new Product('E4F', 'https://via.placeholder.com/150', 'Product 3', 200, 20, 'Home Appliances'),
    new Product('G56H', 'https://via.placeholder.com/150', 'Product 4', 250, 25, 'Furniture'),
    // new Product('I7J', 'https://via.placeholder.com/150', 'Product 5', 300, 30, 'Sports'),
    // new Product('K89L', 'https://via.placeholder.com/150', 'Product 6', 350, 35, 'Toys'),
    // new Product('M0N', 'https://via.placeholder.com/150', 'Product 7', 400, 40, 'Books'),
    // new Product('O12P', 'https://via.placeholder.com/150', 'Product 8', 450, 45, 'Clothing'),
    // new Product('Q34R', 'https://via.placeholder.com/150', 'Product 9', 500, 50, 'Footwear'),
    // new Product('S5T', 'https://via.placeholder.com/150', 'Product 10', 550, 55, 'Accessories')
];
let newListProduct = new ProductManage(products)
let newListUser= new UserManage(users)
let customerManager = new UserManage(customers);
let employeeManager = new UserManage(employees);

Domquery("#product-management").addEventListener("click", ()=>{
    newListProduct.renderProduct()
})
Domquery("#user-management").addEventListener("click", ()=>{
    newListUser.renderUser()
})
document.querySelector("#customer-check").addEventListener("click", () => {
    customerManager.renderUser();
});

document.querySelector("#employee-check").addEventListener("click", () => {
    employeeManager.renderUser();
});
