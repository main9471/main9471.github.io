document.addEventListener("DOMContentLoaded", function() {
    fetch('menu.xml')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");

        populateMeals(xml);
        populateBeverages(xml);
        populateOtherBeverages(xml);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    function populateMeals(xml) {
        const meals = xml.getElementsByTagName('meals')[0].getElementsByTagName('item');
        const grid = document.getElementById('mealsGrid');
        
        for (let i = 0; i < meals.length; i++){
            const name = meals[i].getElementsByTagName('name')[0].textContent;
            const image = meals[i].getElementsByTagName('image')[0].textContent;
            const description = meals[i].getElementsByTagName('description')[0].textContent;
            const price = meals[i].getElementsByTagName('price')[0].textContent;

            const card = document.createElement('div');
            card.className = 'col-md-3 mb-4'; // 4 cards per row (12/3 = 4)
                card.innerHTML = `
                    <div class="card">
                        <h3 class="card-title">${name}</h3>
                        <img src="${image}" class="card-img" alt="${name}">
                            <div class="card-body">
                            <p class="card-text">${description}</p>
                            <p class="card-text">${price}</p>
                        </div>
                    </div>
                    `;
                    grid.appendChild(card);
                }
            }
})

        function populateBeverages(xml) {
            const beverages = xml.getElementsByTagName('beverages')[0].getElementsByTagName('item');
            const beveragesTableBody = document.querySelector('#beveragesTable tbody');


    for (let item of beverages) {
        const size = item.getElementsByTagName('size')[0].textContent;
        const description = item.getElementsByTagName('description')[0]?.textContent || '';
        const price = item.getElementsByTagName('price')[0].textContent;

        beveragesTableBody.innerHTML += `
            <tr>
                <td>${size}</td>
                <td>${price}</td>
            </tr>`;
    }
}

function populateOtherBeverages(xml) {
    const otherBeverages = xml.getElementsByTagName('otherBeverages')[0].getElementsByTagName('item');
    const otherBeveragesTableBody = document.querySelector('#otherBeveragesTable tbody');

    for (let item of otherBeverages) {
        const name = item.getElementsByTagName('name')[0].textContent;
        const price = item.getElementsByTagName('price')[0].textContent;

        otherBeveragesTableBody.innerHTML += `
            <tr>
                <td>${name}</td>
                <td>${price}</td>
            </tr>`;
    }
}
        