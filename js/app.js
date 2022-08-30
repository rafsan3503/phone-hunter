const loadPhone = async (searchValue) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
};

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    
    phoneContainer.textContent = '';
    const notFound = document.getElementById('not-found');
    const showAll = document.getElementById('show-all');
    if (phones.length > 10) {
        phones = phones.slice(0, 20);
        
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    console.log(phones.length)
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none');
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
                        <div class="card">
                            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">Brand: ${phone.brand}</p>
                            </div>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch();
})

const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const processSearch = () => {
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value;
    console.log(searchValue);
    loadPhone(searchValue);
}


document.getElementById('show-all').addEventListener('click', function () {
    
})
// loadPhone();