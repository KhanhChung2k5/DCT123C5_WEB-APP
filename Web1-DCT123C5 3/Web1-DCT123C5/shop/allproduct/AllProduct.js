// Lớp Product để tạo các đối tượng sản phẩm
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

    getPrice() {
        let priceAfterConvert = parseFloat(this.price.replace(/,/g, ''));
        let priceAfterDiscount = (priceAfterConvert * ((100 - this.discount) / 100)).toLocaleString('vi-VN');
        return priceAfterDiscount;
    }

    render() {
        return `
        <div data-id="${this.id}" data-name="${this.name}" data-link-img="${this.linkImg}" data-link-web="${this.linkWeb}" data-kind="${this.kind}" data-status="${this.status}" data-price="${this.price}" data-discount="${this.discount}" data-special="${this.special}" class="product-item">
                <div class="box-img"><img src="${this.linkImg}" alt="${this.name}"></div>
                <h2 class="name-product">${this.name}</h2>
                <p>${this.id}</p>
                <div class="box-price">
                    <p class="discounted-price">${this.getPrice()}đ</p>
                    <del>${this.price}đ</del>
                </div>
                <button class="add-shopping-cart">Thêm vào giỏ hàng</button>
            </div>
        `;
    }
}

// Hàm chuyển đổi chuỗi giá thành số
function convertPrice(price) {
    return parseFloat(price.replace(/,/g, ''));
}

// Thuật toán Selection Sort nâng cấp
function selectionSort(arr, current) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (current === 0) {
                // Sắp xếp tăng dần
                if (convertPrice(arr[j].getPrice()) < convertPrice(arr[targetIndex].getPrice())) {
                    targetIndex = j;
                }
            } else if (current === 1) {
                // Sắp xếp giảm dần
                if (convertPrice(arr[j].getPrice()) > convertPrice(arr[targetIndex].getPrice())) {
                    targetIndex = j;
                }
            }
        }

        // Hoán đổi phần tử tại targetIndex với phần tử tại vị trí i
        if (targetIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[targetIndex];
            arr[targetIndex] = temp;
        }
    }

    return arr;
}

// Hàm chọn phần tử DOM
function Domquery(infor) {
    return document.querySelector(infor);
}

// Class ProductManage để quản lý danh sách sản phẩm
class ProductManage {
    constructor(listProduct) {
        this.listProduct = listProduct;
    }

    render() {
        Domquery("#product-list").innerHTML = ''; // Đặt lại nội dung trước khi thêm mới
        this.listProduct.forEach(element => {
            Domquery("#product-list").innerHTML += element.render();
        });
    }

    active() {
        this.listProduct.forEach(element => {
            let productElement = Domquery(`[data-id="${element.id}"]`);
            if (productElement) {
                productElement.addEventListener("click", () => {
                    if (element.linkWeb) {
                        window.location = element.linkWeb;
                    }
                });
            }
        });
    }

    priceAscending() { // Từ thấp đến cao
        this.listProduct = selectionSort(this.listProduct, 0);
        this.render();
        this.active();
    }

    priceDescending() { // Từ cao đến thấp
        this.listProduct = selectionSort(this.listProduct, 1);
        this.render();
        this.active();
    }

    filterByKind(kind) {
        let filteredProducts = this.listProduct.filter(product => product.kind === kind);
        let filteredProductManage = new ProductManage(filteredProducts);
        filteredProductManage.render();
        filteredProductManage.active();
    }
}

// Khởi tạo danh sách sản phẩm
let products = [
    new Product("Máy chơi game PlayStation 5 Slim", "sony-ps5-001", "https://store.sony.com.vn/cdn/shop/files/PS5_2xDSWC_D_BNDL_RNDR_LT_PROD_RGB_ETCK_240206_medium.png?v=1712287416", "", "ps5", true, "10,000,000", 33, true),
    new Product("Bộ máy chơi game PS5 hai tay cầm", "sony-ps5-002", "https://store.sony.com.vn/cdn/shop/files/PS5_D_SA_RNDR_RT_RGB_E32_240125_medium.png?v=1711962851", "", "ps5", true, "15,000,000", 53, true),
    new Product("PlayStation®5 Digital Edition Console NBA", "sony-ps5-003", "https://media.direct.playstation.com/is/image/sierialto/PS5-digital-2k25bundle-Hero-1-US?$Background_Large$", "", "ps5", false, "12,000,000", 53, false),
    new Product("Microsoft Xbox One Elite - Series 2 Black", "microsoft-xbox-001", "https://hanoicomputercdn.com/media/product/62305_tay_cam_choi_game_khong_day_microsoft_xbox_one_elite_series_2_black_0001.jpg", "", "xbox", true, "3,799,000", 53, false),
    new Product("Đĩa PS5 Until Dawn", "sony-game-001", "https://store.sony.com.vn/cdn/shop/files/PS5_UD_STE_PKSHT_LT_RGB_EN_APAC_240710_medium.jpg?v=1728620192", "", "game", true, "1,799,000", 23, true),

    new Product("Playstation 5 Pro Console – 30th Anniversary Limited Edition","sony-ps5-003", "https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/%20ps5_pro_30th/play_station_5_pro_console_00-700x700.jpg", "", "ps5", true, "21,800,000", 15, true),
    new Product("PlayStation 5 Pro/ PS5 Pro Disc Bundle - KOREA - BH 3 Tháng", "sony-ps5-004", "https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/ps5_pro/combo_ps5_disc_00-700x700.jpg", "", "ps5", true, "24,000,000", 12, true),
    new Product("DualSense - PS5 Wireless Game Controller", "sony-ps5-005", "https://haloshop.vn/image/cache/catalog/products/phu-kien-game/sony-playstation/dualsense-ps5-00-700x700.jpg", "", "ps5", false, "22,000,000", 24, false),
    new Product("Xbox Series S 1TB - Black", "microsoft-xbox-002", "https://haloshop.vn/image/cache/catalog/products/may-game/microsoft-xbox/xbox-series-s-black-43-700x700.jpg", "", "xbox", true, "11,799,000", 23, false),
    new Product("Xbox Series Wireless Controller - Sky Cipher", "microsoft-xbox-003", "https://haloshop.vn/image/cache/catalog/products/microsoft/Xbox-controller/xbox_series_wireless_controller_sky_cipher_00-700x700.jpg", "", "game", true, "1,799,000", 10, true),


];

// Khởi tạo ProductManage và render danh sách sản phẩm
let newProduct = new ProductManage(products);
newProduct.render();
newProduct.active();

// Xử lý sự kiện thay đổi lựa chọn trong dropdown
document.getElementById('chose-filter-box').addEventListener('change', function() {
    if (this.value === "price-ascending") {
        newProduct.priceAscending();
    } else if (this.value === "price-descending") {
        newProduct.priceDescending();
    } else if (this.value === "all") {
        newProduct = new ProductManage(products); // Reset lại danh sách sản phẩm ban đầu
        newProduct.render();
        newProduct.active();
    } else if (this.value === "Game") {
        newProduct.filterByKind('game');
    }
    else if (this.value === "Playstation") {
        newProduct.filterByKind('ps5');
    }
    else if (this.value === "Xbox") {
        newProduct.filterByKind('xbox');
    }
});
