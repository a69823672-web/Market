const PASSWORD = "4030";

const adminButton = document.getElementById("adminButton");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const closeAdmin = document.getElementById("closeAdmin");
const adminArea = document.getElementById("adminArea");

const productsBox = document.getElementById("products");

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");

const addProduct = document.getElementById("addProduct");

let currentCategory = "همه";

let products = JSON.parse(localStorage.getItem("cafeProducts")) || [

{
name:"اسپرسو",
price:"90000",
category:"قهوه",
image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600"
},

{
name:"لاته",
price:"120000",
category:"قهوه",
image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
},

{
name:"موهیتو",
price:"150000",
category:"نوشیدنی سرد",
image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600"
},

{
name:"چیز کیک",
price:"180000",
category:"کیک",
image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600"
}

];

function saveProducts(){

localStorage.setItem(
"cafeProducts",
JSON.stringify(products)
);

}

function renderProducts(){

productsBox.innerHTML="";

let list=products;

if(currentCategory!="همه"){

list=products.filter(p=>p.category===currentCategory);

}

list.forEach((product,index)=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${product.image}">

<div class="info">

<h3>${product.name}</h3>

<div class="category">
${product.category}
</div>

<div class="price">
${Number(product.price).toLocaleString()} تومان
</div>

<button
class="deleteBtn"
onclick="deleteProduct(${index})">

حذف محصول

</button>

</div>

`;

productsBox.appendChild(card);

});

}

renderProducts();
adminButton.onclick = () => {
    adminPanel.style.display = "flex";
};

closeAdmin.onclick = () => {
    adminPanel.style.display = "none";
};

loginBtn.onclick = () => {

    const pass = document.getElementById("loginPassword").value;

    if (pass === PASSWORD) {

        adminArea.style.display = "block";

        alert("ورود موفق");

    } else {

        alert("رمز اشتباه است");

    }

};

addProduct.onclick = () => {

    if (
        nameInput.value.trim() === "" ||
        priceInput.value.trim() === "" ||
        categoryInput.value.trim() === "" ||
        imageInput.value.trim() === ""
    ) {

        alert("تمام فیلدها را کامل کنید.");
        return;

    }

    products.push({

        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        image: imageInput.value

    });

    saveProducts();

    renderProducts();

    nameInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";
    imageInput.value = "";

    alert("محصول ثبت شد.");

};

function deleteProduct(index) {

    const pass = prompt("رمز حذف محصول را وارد کنید:");

    if (pass !== PASSWORD) {

        alert("رمز اشتباه است.");
        return;

    }

    products.splice(index, 1);

    saveProducts();

    renderProducts();

}

document.querySelectorAll(".cat").forEach(btn => {

    btn.onclick = () => {

        document
            .querySelectorAll(".cat")
            .forEach(c => c.classList.remove("active"));

        btn.classList.add("active");

        currentCategory = btn.dataset.cat;

        renderProducts();

    };

});

window.addEventListener("load", renderProducts);
