document.querySelector("#email").addEventListener("focus", ()=>{
    document.querySelector("#email-text").classList.add("effect-fly")
})
document.querySelector("#email").addEventListener("blur", () => {
    // Kiểm tra nếu input không có giá trị, nhãn sẽ quay lại
    if (!document.querySelector("#email").value) {
        document.querySelector("#email-text").classList.remove("effect-fly");
    }
});



document.querySelector("#password").addEventListener("focus", ()=>{
    document.querySelector("#password-text").classList.add("effect-fly")
})
document.querySelector("#password").addEventListener("blur", () => {
    // Kiểm tra nếu input không có giá trị, nhãn sẽ quay lại
    if (!document.querySelector("#password").value) {
        document.querySelector("#password-text").classList.remove("effect-fly");
    }
});
let closeEye=true;
document.querySelector("#container-close-eye").addEventListener("click", ()=>{
    console.log(closeEye)
    if(closeEye){
        closeEye=false
        document.querySelector("#password").type="text"
        document.querySelector("#container-close-eye").innerHTML=`
        <svg class="close-eye" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path d="M4.5 15.5C7.5 9 16.5 9 19.5 15.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.8162 12.1825L19.5 8.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 10.625V7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.18383 12.1825L4.5 8.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `
    }else{
        closeEye=true
        document.querySelector("#password").type="password"
        document.querySelector("#container-close-eye").innerHTML=`
        <svg class="close-eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Pro 6.0.0-alpha2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"></path></svg>
        `
    }
    
})
document.querySelector(".normal").addEventListener("click", ()=>{
    let trueAccount=false;
    let account=document.querySelector("#email").value;
    let password=document.querySelector("#password").value;
    if(account==="admin1"&&password==="123456789"){
        trueAccount=true;
    }
    if(trueAccount===true){
        window.location.assign("http://127.0.0.1:5501/admin.html")
    }else{
        showToast("Sai tài khoản hoặc mật khẩu", 0)
    }
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