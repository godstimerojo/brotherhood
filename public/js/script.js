const enterButton = document.getElementById("enterButton");
const factButton = document.getElementById("factButton");
const finalMessageButton = document.getElementById("finalMessage");

const fact = document.getElementById("fact");
const factNumber = document.getElementById("factNumber");
const finalMessage = document.getElementById("finalMsg");

enterButton.addEventListener("click", function () {
  document.getElementById("aboutUs").scrollIntoView({
    behavior: "smooth"
  });
});

const brotherhoodFacts = [
  "No matter how much we argue, we’ll always have each other’s backs.",
  "We tell each others literally everything, and we keep it a secret.",
  "We always cover for each other, even if it means attacking our parents.",
  "Borrowing of clothes without permission, lol.",
  "We are the most accommodating being, at the end of the day, family is family. Our bond can never be broken.",
  "We are always happy for anyone's win, a win for one is a win for all.",
  "Growing up together gave us memories nobody else can understand."
];

let currentFact = 0;


factButton.addEventListener("click", function () {
  if (currentFact < brotherhoodFacts.length - 1) {
    fact.classList.add("fade-out");

    setTimeout(function () {
      currentFact++;

      fact.textContent = brotherhoodFacts[currentFact];
      factNumber.textContent = `${currentFact + 1} / ${brotherhoodFacts.length}`;

      fact.classList.remove("fade-out");

      if (currentFact === brotherhoodFacts.length - 1) {
        factButton.textContent = "You've heard them all ❤️";
      }
    }, 300);
  }
});

finalMessageButton.addEventListener("click", function () {
  finalMessage.classList.add("show");
  finalMessageButton.textContent = "Message opened ❤️";
  finalMessageButton.disabled = true;
});


