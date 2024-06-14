"use strict";

// Canva Effect


// Confetti Effect
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos

(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }

    return results;
}

window.addEventListener(
    "resize",
    function() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
Draw();

// Trigger Confetti Function
function triggerConfetti() {
    for (let i = 0; i < maxConfettis; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 1,
                angle: randomFromTo(0, 360),
                spread: randomFromTo(70, 100),
                origin: { x: 0.5, y: 0.5 },
                colors: [possibleColors[Math.floor(Math.random() * possibleColors.length)]]
            });
        }, i * 50);
    }
}




// let spanTime = document.querySelector("#time");
// let flipCount = document.querySelector("#flip-count");

// let flipped = false;
// let locked = false;
// let flipCounts = 0;
// let time = 30;
// let timerInterval;

// let clickedCards = [];

// let totalPairs = document.querySelectorAll(".card").length / 2;
// let matchedPairs = 0;

// var modal = document.getElementById("myModal");
// var modal1 = document.getElementById("myModal1");
// var closeButton = document.getElementById("closeModal");
// var ReplayButton = document.getElementById("ReplayModal");

// // closeButton.addEventListener("click", function(){
// //   window.location.reload();
// // })


// function showModal() {
//   modal.classList.remove("hidden");
 
//   canvas.style.display = 'block';
//   setTimeout(() => {
//       canvas.style.display = 'none';
//   }, 6000);
//   triggerConfetti();
// }


// function closeModal() {
//   modal.classList.add("hidden");
//   window.location.reload();
// }
// function showmodal1(){
//   modal1.classList.remove("hidden");
// }

// closeButton.addEventListener("click", closeModal);


// ReplayButton.addEventListener("click", function(){
//   window.location.reload();
// })

// function checkAllMatched() {
//   if (matchedPairs === totalPairs) {
//     showModal();
//     modal1.classList.add("hidden");
//   }
// }


// function flipCard(card) {
//   if (!flipped && !clickedCards.includes(card) && !locked) {
//     card.classList.add("flipped");
//     flipCount.innerHTML = ++flipCounts;
//     document.querySelector("#audioPlayer2").play();

//     const images = card.querySelectorAll("img");
//     // console.log(images[1]);
//     // console.log(images);
//     images.forEach((img) => {

//       img.style.display = "none";
//     });
//     console.log( images[1]);
//     images[1].style.display = "block";

//     clickedCards.push(card);

//     if (clickedCards.length === 2) {
//       const [firstCard, secondCard] = clickedCards;

//       const firstImage = firstCard.querySelectorAll("img")[1].src;
//       const secondImage = secondCard.querySelectorAll("img")[1].src;

//       locked = true;

//       if (firstImage === secondImage) {
//         clickedCards = [];
//         locked = false;
//         firstCard.classList.add('matched', 'animate-pulse');
//         secondCard.classList.add('matched', 'animate-pulse');
//         matchedPairs++;
//         checkAllMatched();
         
//       } else {
//         setTimeout(() => {
//           clickedCards.forEach((card) => {
//             card.classList.remove("flipped");
//             card.querySelectorAll("img").forEach((img) => {
//               img.style.display = "none";
//             });
//             card.querySelectorAll("img")[0].style.display = "block";
//           });
//           clickedCards = [];
//           locked = false;
//         }, 800);
//       }
//     }

  

//     if (!timerInterval) {
//       timerInterval = setInterval(() => {
//         if (time < 0) {
//           clearInterval(timerInterval);
//           timerInterval = null;
//           document.querySelector("#audioPlayer2").pause();
//           locked = true;
//          showmodal1()
//         } else {
//           spanTime.innerHTML = time-- + " s";
//         }
//       }, 1000);

//     }
//   } else if (clickedCards.length === 1 && clickedCards[0] === card) {
//     flipCard(card);
//   }
// }

// Refresh button functionality
// document.querySelector(".button").addEventListener("click", () => {
//   window.location.reload();
// });



let spanTime = document.querySelector("#time");
let flipCount = document.querySelector("#flip-count");

let flipped = false;
let locked = false;
let flipCounts = 0;
let time = 30;
let timerInterval;

let clickedCards = [];

let totalPairs = document.querySelectorAll(".card").length / 2;
let matchedPairs = 0;

var modal = document.getElementById("myModal");
var modal1 = document.getElementById("myModal1");
var closeButton = document.getElementById("closeModal");
var ReplayButton = document.getElementById("ReplayModal");

function showModal() {
  modal.classList.remove("hidden");
  canvas.style.display = 'block';
  setTimeout(() => {
      canvas.style.display = 'none';
  }, 6000);
  triggerConfetti();
}

function closeModal() {
  modal.classList.add("hidden");
  window.location.reload();
}

function showmodal1() {
  modal1.classList.remove("hidden");
}

closeButton.addEventListener("click", closeModal);

ReplayButton.addEventListener("click", function(){
  window.location.reload();
});

function checkAllMatched() {
  if (matchedPairs === totalPairs) {
    clearInterval(timerInterval); // Stop the timer
    document.querySelector("#audioPlayer2").pause();
    locked = true;
    showModal();
  }
}

function flipCard(card) {
  if (!flipped && !clickedCards.includes(card) && !locked) {
    card.classList.add("flipped");
    flipCount.innerHTML = ++flipCounts;
    document.querySelector("#audioPlayer2").play();

    const images = card.querySelectorAll("img");
    images.forEach((img) => {
      img.style.display = "none";
    });
    images[1].style.display = "block";

    clickedCards.push(card);

    if (clickedCards.length === 2) {
      const [firstCard, secondCard] = clickedCards;
      const firstImage = firstCard.querySelectorAll("img")[1].src;
      const secondImage = secondCard.querySelectorAll("img")[1].src;
      locked = true;

      if (firstImage === secondImage) {
        clickedCards = [];
        locked = false;
        firstCard.classList.add('matched', 'animate-pulse');
        secondCard.classList.add('matched', 'animate-pulse');
        matchedPairs++;
        checkAllMatched();
      } else {
        setTimeout(() => {
          clickedCards.forEach((card) => {
            card.classList.remove("flipped");
            card.querySelectorAll("img").forEach((img) => {
              img.style.display = "none";
            });
            card.querySelectorAll("img")[0].style.display = "block";
          });
          clickedCards = [];
          locked = false;
        }, 800);
      }
    }

    if (!timerInterval) {
      timerInterval = setInterval(() => {
        if (time < 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          document.querySelector("#audioPlayer2").pause();
          locked = true;
          showmodal1();
        } else {
          spanTime.innerHTML = time-- + " s";
        }
      }, 1000);
    }
  } else if (clickedCards.length === 1 && clickedCards[0] === card) {
    flipCard(card);
  }
}




// ---------------------- Generating Random Image ---------------------------

let hidingImgs = document.querySelectorAll(".hiding");
console.log(hidingImgs);

let Himg = ['./images/view-3d-businessman.jpg','./images/3d-rendering-cartoon-like-young-couple_23-2150797550.avif','./images/3d-rendering-cartoon-like-young-couple_23-2150797530.avif','./images/3d-rendering-cartoon-like-young-couple_23-2150797552.jpg','./images/3d-rendering-cartoon-like-young-couple_23-2150797528.jpg','./images/view-3d-girl-with-open-book_23-2150709876.jpg'];
let arr = [];

randonFlippingImages();
function randonFlippingImages(){
  hidingImgs.forEach((carding) => {
    // carding.style.display='block';
    // carding.parentElement.firstElementChild.style.display='none';
    let num = randmFun();
    while(arr.includes(num)){
      num = randmFun();
    }
    carding.src = Himg[num];
    arr.push(num);

    if(arr.length == 6){
      arr = [];
    }
  });
}

function randmFun(){
  const num = Math.floor(Math.random() * 6);
  return num;
}






