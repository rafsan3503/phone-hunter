// fetch data 
const loadPhones = (value,dataInput) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataInput))
}

// display phones 
const displayPhones = (phones, dataInput) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if (phones.length === 0) {
        toggle(true, 'error');
    }
    else (
        toggle(false, 'error')
    )
    if (dataInput && phones.length > 10) {
        phones = phones.slice(0, 10)
        toggle(true, 'show-all');
    }
    else {
        toggle(false, 'show-all');
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto p-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
    });
    toggle(false, 'spinner');
};

const showDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => modalBody(data.data))
}

const modalBody = information => {
    const modalTitle = document.getElementById('modalTitle')
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
};

document.getElementById('src-btn').addEventListener('click', function () {
    processSearch(10);
});

document.getElementById('showall-btn').addEventListener('click', function () {
    processSearch();
})

const processSearch = (dataInput) => {
    toggle(true, 'spinner');
    const inputField = document.getElementById('input-field');
    const value = inputField.value;
    loadPhones(value,dataInput);
}

const toggle = (isTrue,Id) => {
    const element = document.getElementById(Id);
    if (isTrue) {
        element.classList.remove('d-none');
    }
    else {
        element.classList.add('d-none')
    }
};

var el = document.getElementById("input-field");
el.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        processSearch(10);
    }
});

// loadPhones();