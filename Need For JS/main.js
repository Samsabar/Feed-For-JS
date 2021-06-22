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
    speed: 3
};
// объект setting содержит стартовые параметры игры

function startGame(event){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car) // вставить ребенка). Этим методом мы создаем объет car на странице
    requestAnimationFrame(playGame); // указываем функцию, которая должна быть анимирована
}

function playGame(){
    console.log('Play game!'); 
    if(setting.start === true) { // пока значенеи start истина, будет выполняться функция 
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




// анимация в JS с помощью requestAnimationFrame