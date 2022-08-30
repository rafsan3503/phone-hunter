// fetch data and get data function

const loadPhones = (value,quantity) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data, quantity))
}

// display function

const displayPhones = (phones,quantity) => {
    // select container 
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // for error text 
    if (phones.length === 0) {
        toggleSpinner(true, 'error-text');
    }
    else {
        toggleSpinner(false, 'error-text')
    }

    // show 10 result 
    if (quantity && phones.length > 10) {
        phones = phones.slice(0, 10);
        toggleSpinner(true, 'showAll');
    }
    else {
        toggleSpinner(false, 'showAll');
    }

    // loop for get every elemet

    phones.forEach(phone => {
        console.log(phone)
        // create div for dynamic data 
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="col">
                <div class="card">
                    <img src="${phone.image}" class="card-img-top w-50 p-3 mx-auto" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <button onclick='showDetails("${phone.slug}")' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                    </div>
                </div>
        </div>
        `;

        // append child 
        phoneContainer.appendChild(div);
    });
    toggleSpinner(false,'spinner');
};

// show details on modal 
const showDetails = id => {
    console.log(id);
    // dynamic url 
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => makeCard(data.data))
}

// make modal dynamic 
const makeCard = information => {
    console.log(information)
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerText = information.name;
    const modalBody = document.getElementById('modal-body');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-75 mx-auto">
        <img src="${information.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title">${information.name}</h5>
            <p class="card-text">Main features: </p>
            <p>Storage: ${information.mainFeatures.storage}</p>
            <p>Display Size: ${information.mainFeatures.displaySize}</p>
            <p>Chipset: ${information.mainFeatures.chipSet}</p>
            <p>Memory: ${information.mainFeatures.memory}</p>

        </div>
    </div>
    `;
    modalBody.appendChild(div);
}

// src button active
document.getElementById('src-btn').addEventListener('click', function () {
    processSearch(10)
})

// for spinner 
const toggleSpinner = (isLoading,Id) => {
    const element = document.getElementById(Id);
    if (isLoading) {
        element.classList.remove('d-none')
    }
    else {
        element.classList.add('d-none')
    }
}

// make common function 
const processSearch = (quantity) => {
    toggleSpinner(true, 'spinner');
    const inputField = document.getElementById('inputField');
    const value = inputField.value;
    loadPhones(value,quantity);
}

// show all button

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

var el = document.getElementById("inputField");
el.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        processSearch(10);
    }
});
// loadPhones();
