const score = document.querySelector('.score'), 
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea');

car = document.createElement('div'); // создаем автомобиль
car.classList.add('car');

// start.onclick = function(){
//     start.classList.add('hide');
// };  это код делает текст невидимым


start.addEventListener('click', startGame)
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false, // если будет нажат ArrowUp, машина поедет быстрее
    ArrowDown: false, // если будет нажат ArrowUp, машина начнет замедляться
    ArrowRight: false, // если будет нажат ArrowUp, машина поедет правее
    ArrowLeft: false // если будет нажат ArrowUp, машина поедет левее
} // наш объект keys содержит значения 


const setting = {
    start: false,         // по умолчанию false, игра еще не началась. при запуске значение будет меняться
    score: 0,
    speed: 3,
    traffic: 3
};
// объект setting содержит стартовые параметры игры

function getQuantityElements(heightElement) { // функция определяет количество элеменотв, которое можно уместить на страницу
    return document.documentElement.clientHeight / heightElement +1; // document.documentElement.clientHeight- вычисляем высоту страницы и делим на высоту элемента. +1 на всякий случай
    // return чтобы вернуть значение в то место, где будем вызывать функцию
}

// console.log(getQuantityElements(200)); //показывает, сколько поместится элементов высотой 200px

function startGame(event){
    start.classList.add('hide');
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);

    }

    // цикл добавления машинок
    for(let i =0; i < getQuantityElements(100 * setting.traffic); i++){ // задаем плотность движения в зависимости от параметра traffic
    const enemy = document.createElement('div');
    enemy.classList.add('enemy'); // добавляем врагов
    enemy.y = -100 * setting.traffic * (i + 1); //т.к. i в первой итерации равно 0, добавим единицу
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px'; // чтобы браузер нас понял, пердадим еще и px
    enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat'; 
    gameArea.appendChild(enemy); // расположим автомобили на игровом пространстве
    }

    setting.start = true;    
    gameArea.appendChild(car) // вставить ребенка). Этим методом мы создаем объет car на странице
    setting.x = car.offsetLeft; // offsetLeft- значение, которое находится в css (125px) добавили свойство x в объект setting. 
                                //Значение setting.x мы можем получить только после того, как добавили автомобиль на страницу, тоесть после gameArea.appendChild(car)
    setting.y = car.offsetTop; 
    requestAnimationFrame(playGame); // указываем функцию, которая должна быть анимирована
}

function playGame(){    
    moveRoad();
    moveEnemy();
    if(setting.start) { // пока значенеи start истина, будет выполняться функция 
        if(keys.ArrowLeft && setting.x >0){
            setting.x -= setting.speed; //  х уменьшается на единицу пока зажата клавиша ArrowLeft
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth -car.offsetWidth)){
            setting.x +=setting.speed;
        }

        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }

        if(keys.ArrowUp && setting.y >0){
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px'; 
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame); // РЕКУРСИЯ. Функция вызывает сама себя. Чтобы игра не останавливалась, чтобы это было плавно. 
    } 
    
}

function startRun(){
    event.preventDefault(); //отменяет стандартные события браузера при нажатии кнопок на клавиатуре.
    // console.log(event.key); //при нажатии клавиатуры будем видеть, какую клавишу нажали 
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault(); //отменяет стандартные события браузера при нажатии кнопок на клавиатуре.
    // console.log(event.key); //при нажатии клавиатуры будем видеть, какую клавишу нажали 
    keys[event.key] = false;
}


function moveRoad(){ 
    let lines = document.querySelectorAll('.line'); //получили все линии
    lines.forEach(function(line)  {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight){ // чтобы линии появлялись посоянно
            line.y = -100; //чтобы линии не слипались
        }
    })
    }

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
    item.y += setting.speed / 2; // скорость автомобилей меньше нашей   
    item.style.top = item.y + 'px'; 
    
    if (item.y >= document.documentElement.clientHeight){
        item.y = -100 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'; // чтобы машины рандомно появлялись с верху
    }


});

}