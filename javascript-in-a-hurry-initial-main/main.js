
const galleryImages = [

    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },

    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },

    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
]
const weatherApiKey = "c6c63a1976629e2934ab7f334ee63022";
const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`
const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]

/********************MENU SECTION*****************/

function hendlerMenu() {
    document.querySelector("button#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("button#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//Weather Section
function weatherHendler() {


    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let url = weatherApiURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherApiKey);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const condition = data.weather[0].description;
                const location = data.name;
                const temperature = data.main.temp;
                console.log(condition, location, temperature)

                let celciusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`
                let fahrText = `The weather is ${condition} in ${location} and it's ${celciusToFahr(temperature).toFixed(1)}°F outside.`


                document.querySelector("p#weather").innerHTML = (celciusText);

                document.querySelector(".weather-group").addEventListener("click", function (e) {


                    /************TEMPERATURE TO SWITCH**************/

                    if (e.target.id == "celsius") {
                        document.querySelector("p#weather").innerHTML = (celciusText);
                    } else if (e.target.id == "fahr") {
                        document.querySelector("p#weather").innerHTML = (fahrText);
                    }
                });
            });
    });
}

/************************* Greeting section **************************/
function celciusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr
}
function greetingHendler() {
    let currentHour = new Date().getHours();
    let greetingText;

    if (currentHour < 12) {
        greetingText = "good morning";
    } else if (currentHour < 19) {
        greetingText = "Good afternoon!";
    } else if (currentHour < 24) {
        greetingText = "Good evening";
    } else {
        greetingText = "Welcome";
    }

    document.querySelector("h1#greeting").innerHTML = greetingText;


}

/**************Local time section**********/
function clockHendler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, 0);
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, 0);
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, 0);
    }, 1000);
}

//gallery section

function galleryHandler() {

    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;



    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;


        thumb.addEventListener("click", function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImg = galleryImages[selectedIndex];
            mainImage.src = selectedImg.src;
            mainImage.alt = selectedImg.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });

            e.target.dataset.selected = true;
        })
        thumbnails.appendChild(thumb);
    })
}

// PRODUCTS SECTION

function populateProducts(productList) {
    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";
    productList.forEach(function (product, index) {


        //Create the HTML element for the indivual product
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");

        //Create the product image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.title;

        //Create product details section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //Create product title , author , price-title and price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let PriceTitle = document.createElement("p");
        PriceTitle.classList.add("price-title");
        PriceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "free";


        //Append the product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(PriceTitle);
        productDetails.append(productPrice);

        //Add child HTML element of the products
        productElm.append(productImage);
        productElm.append(productDetails);

        //Add complete individual product to the secttion product section 
        productsSection.append(productElm)
    });
}

function productsHandler() {

    let freeProducts = products.filter(item => !item.price || item.price <= 0);
    let paidProducst = products.filter(item => item.price > 0);

    populateProducts(products);

    let totalProducts = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducst.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;





    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function (e) {
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducst);
        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
        console.log(e.target.id);
    });
}
//Footer Section
function footerHendler() {
    ;
    let currentYear = new Date().getFullYear();

    document.querySelector("footer").textContent = `© ${currentYear} all rights reserved`

}






//PAGE LOAD

hendlerMenu();
greetingHendler();
weatherHendler()
clockHendler();
galleryHandler();
productsHandler();
footerHendler();