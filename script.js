const wellcome = document.querySelector('.wellcome');
const play = document.querySelector('.play');
const timeElement = document.querySelector('.play__info__time span');
const numberElement = document.querySelector('.play__info__number span');
const overlay = document.querySelector('.overlay');
document.querySelector('.finish-model__play-again').onclick = () => {
    overlay.style.display = 'block';
    document.querySelector('.level-model').style.display = 'block';
    document.querySelector('.finish-model').style.display = 'none';

};
document.querySelectorAll('.level-model__choose__option').forEach((e) => {
    e.onclick = function () {
        const level = {
            hard: 1,
            medium: 2,
            easy: 3,
        };
        speed = level[this.classList[1]];
        overlay.style.display = 'none';
        document.querySelector('.level-model').style.display = 'none';
        startGame();
    };
});
document.querySelector('.wellcome__button').onclick = () => {
    wellcome.style.display = 'none';
    play.style.display = 'flex';
    overlay.style.display = 'block';
    document.querySelector('.level-model').style.display = 'block';
};
let speed;
let loop;
let currentNumber;
let h, m, s;
const luckyMoney = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
];
let luckyMoneyBtn = [];
for (let i = 0; i < luckyMoney.length; i++) {
    const btn = document.querySelector('.number-' + i);
    btn.onclick = function () {
        if (this.innerHTML == currentNumber) {
            currentNumber++;
            if (currentNumber - 1 == luckyMoney.length) {
                clearInterval(loop);
                speed = 0;
                document.querySelector('.finish-model').style.display = 'block';
                document.querySelector('.finish-model__time').innerHTML = ` ${h ? '0' + h + ':' : ''}${m < 10 ? '0' + m : m}:${
                    s < 10 ? '0' + s : s
                }`;
            }else{
                numberElement.innerHTML = currentNumber;
            }
        }
    };
    luckyMoneyBtn.push(btn);
}
function randomLuckyMoney() {
    for (let i = 0; i < luckyMoney.length; i++) {
        let r = Math.floor(Math.random() * luckyMoney.length);
        let temp = luckyMoney[i];
        luckyMoney[i] = luckyMoney[r];
        luckyMoney[r] = temp;
    }
    for (let i = 0; i < luckyMoney.length; i++) {
        luckyMoneyBtn[i].innerHTML = luckyMoney[i];
    }
}
randomLuckyMoney();
console.log(luckyMoney);
function startGame() {
    [h, m, s] = [0, 0, 0];
    currentNumber = 1;
    numberElement.innerHTML = currentNumber;
    loop = setInterval(() => {
        s += 1;
        if (s == 60) {
            m += 1;
            s = 0;
        }
        if (m == 60) {
            h += 1;
            m = 0;
        }
        if (s % speed == 0) randomLuckyMoney();
        const time = `${h ? '0' + h + ':' : ''}${m < 10 ? '0' + m : m}:${
            s < 10 ? '0' + s : s
        }`;
        timeElement.innerHTML = time;
    }, 1000);
}
