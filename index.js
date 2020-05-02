

newArr = [];

//Берём данные с нашего сервера , записываем в новый массив и изменяем их стоимость в диапозоне от -5% до +5%
function getUserStocks() {
    return fetch(
        "https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks"
    ).then((res) => res.json())
        .then((data => {
            for (let item of data) newArr.push(item)
            newArr.filter(item => {

                item.purchasePrice = (item.purchasePrice - (item.purchasePrice * (Math.random() * (5 - (-5)) + (-5)) / 100)).toFixed(2)
                item.totalPrice = item.purchasePrice * item.amount
            })
        }))

}



//Функция удаления всех данных с нашего сервера
function deleteStocks() {
    for (let stock of newArr) {
        const id = stock.id;
        fetch(
            "https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks/" + id,
            {
                method: "DELETE",
            }
        );
    }
}

//Функция добавления данных в список акций
function addNewStock(obj) {
    fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/2/stocks", {
        method: "POST",
        body: JSON.stringify({
            code: obj.code,
            name: obj.name,
            purchasePrice: obj.purchasePrice,
            amount: obj.amount,
            totalPrice: obj.totalPrice,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}


// Запускаем приложение
function start (){
    getUserStocks().then(()=>deleteStocks()).then(()=>newArr.map(item=> addNewStock(item)))
}

//Функция удаления всех стоков
function deleteAll (){
    getUserStocks().then(()=>deleteStocks())
}

 
//Кнопка удаления и её ивент
const btn = document.querySelector('.delete-btn');
btn.addEventListener('click', deleteAll);

//Кнопка рандома и её ивент
const rbtn = document.querySelector('.random-btn');
rbtn.addEventListener('click', start);

//Кнопка изменения баланса и её ивент
const bbtn = document.querySelector('.balance-btn');
bbtn.addEventListener('click', setNewBalance)



//Функция запуска и записи значения инпута в баланс
function setNewBalance(){
const input = document.querySelector('.input')
changeBalance(input.value)

}
 //Функция смены баланса
function changeBalance(newSumm) {
    fetch("https://5e8da89e22d8cd0016a798db.mockapi.io/users/2", {
      method: "PUT",
      body: JSON.stringify({
        id: "2",
        name: "Team two",
        currentBalance: newSumm,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }