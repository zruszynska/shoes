const setEditModal = (productNumber) => {
 
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/shoe/${productNumber}`, false);
    xhttp.send();

    const shoe = JSON.parse(xhttp.responseText);

    const {
        brand,
        size,
        color,
        shoeType
    } = shoe;

    document.getElementById('productNumber').value = productNumber;
    document.getElementById('brand').value = brand;
    document.getElementById('size').value = size;
    document.getElementById('color').value = color;
    document.getElementById('shoeType').value = shoeType;
    console.log(shoe);

    // setting up the action url for the shoe
    document.getElementById('editForm').action = `http://localhost:3000/shoe/${productNumber}`;
}

const deleteshoe = (productNumber) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/shoe/${productNumber}`, false);
    xhttp.send();

    location.reload();
}

const loadshoes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/shoe", false);
    xhttp.send();
    const shoes = JSON.parse(xhttp.responseText);

    for (let shoe of shoes) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${shoe.brand}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${shoe.productNumber}</h6>

                        <div>Rozmiar: ${shoe.size}</div>
                        <div>Kolor: ${shoe.color}</div>
                        <div>Typ buta: ${shoe.shoeType}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteshoe(${shoe.productNumber})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editShoeModal" onClick="setEditModal(${shoe.productNumber})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        console.log(x);

        document.getElementById('shoes').innerHTML = document.getElementById('shoes').innerHTML + x;
    }

}

loadshoes();