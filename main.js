const title = document.getElementById("title");
const price = document.getElementById("price");
const number = document.getElementById("number");
// const count = document.getElementById("count");
const paid = document.getElementById("paid");
const total = document.getElementById("total");
const date = document.getElementById("date");
const submit = document.getElementById("submit");
const dovis = document.getElementById("dovis");
let tmp;
let mod = "creat"
    //getTotal
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +number.value) - +paid.value;
        total.innerHTML = result + dovis.value;
        total.style.backgroundColor = "#040";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}
// $ or TL
function selected(value) {
    dovis.value = value;
}
let dataPro;

if (localStorage.proudects) {
    dataPro = JSON.parse(localStorage.proudects);
} else {
    dataPro = [];
}
//creat porudect

submit.onclick = function() {
        newPro = {
            title: title.value,
            number: number.value,
            price: price.value,
            paid: paid.value,
            date: date.value,
            total: total.innerHTML,
            // count: count.value,
        };
        if (title.value !== "" && price.value !== "") {
            if (mod === "creat") {
                dataPro.push(newPro);

            } else {
                dataPro[tmp] = newPro;
                mod = "creat";
                submit.innerHTML = "انشاء";
                dovis.style.display = "block";

            }
            scroll({
                top: 1000,
                behavior: "smooth"
            })
            clearData();
        }

        //count
        // if (newPro.count >= 0) {
        //     if (newPro.count > 1) {
        //         for (var i = 0; i < newPro.count; i++) {
        //             dataPro.push(newPro);

        //         }
        //     } else {
        // dataPro.push(newPro);
        //     }

        // }
        //save proudects localStorge

        localStorage.setItem("proudects", JSON.stringify(dataPro));

        showData();



    }
    //clearData
function clearData() {
    title.value = "";
    number.value = "";
    price.value = "";
    paid.value = "";
    date.value = "";
    total.innerHTML = "";
}


//showData
const tbody = document.getElementById("tbody");

function showData() {

    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        getTotal();

        table += `
        <tr>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].number + dovis.value}</td>
            <td>${dataPro[i].price +dovis.value}</td>
            <td>${dataPro[i].paid +dovis.value}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].date}</td>
            <td><button id="updet" onclick="updateData(${i})">تعديل</button></td>
            <td><button id="delete" onclick="deleteData(${i})">حذف</button></td>

        </tr>

        `


    }
    const deleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `
            <button onclick="deleteAllData()">حذف الكل (${dataPro.length})</button>
        `
    } else {
        deleteAll.innerHTML = "";
    }
    tbody.innerHTML = table;

}
showData()

//delete datd (single-all)
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.proudects = JSON.stringify(dataPro);
    showData()
}

function deleteAllData() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}




//update
function updateData(i) {
    title.value = dataPro[i].title;
    number.value = dataPro[i].number;
    price.value = dataPro[i].price;
    paid.value = dataPro[i].paid;
    date.value = dataPro[i].date;

    getTotal();
    mod = "update";
    dovis.style.display = "none";
    submit.innerHTML = "تعديل";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });

}
//search
const search = document.getElementById("search");

function searchBtn() {
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {

    let table = "";
    for (let i = 0; i < dataPro.length; i++) {

        if (dataPro[i].title.includes(value)) {
            table += `
        <tr>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].number + dovis.value}</td>
            <td>${dataPro[i].price +dovis.value}</td>
            <td>${dataPro[i].paid +dovis.value}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].date}</td>
            <td><button id="updet" onclick="updateData(${i})">تعديل</button></td>
            <td><button id="delete" onclick="deleteData(${i})">حذف</button></td>

        </tr>

        `
        }
    }
    tbody.innerHTML = table;

}
//clean Data