const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayOutput = document.getElementById("DD");
const monthOutput = document.getElementById("MM");
const yearOutput = document.getElementById("YY");
const form = document.querySelector("form");

const lightRed = "hsl(0, 100%, 67%)";
const lightGray = "hsl(0, 0%, 86%)";
const smokeyGrey = "hsl(0, 1%, 44%)"


const date = new Date();
let curDay = date.getDate();
let curMonth = 1 + date.getMonth();
let curYear = date.getFullYear();

const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const warning = (target, colorInp, colorLabel, text) => {
  target.style.borderColor = colorInp;
  target.parentElement.querySelector("label").style.color= colorLabel;
  target.parentElement.querySelector("small").innerText = text;
};

const validate = () => {
  let validator = true;
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    if (!input.value) {
      warning(input, lightRed, lightRed, "This field is required.");
      validator = false;
    } else if (dayInput.value > 31) {
      warning(dayInput, lightRed, lightRed, "Must be a valid day");
      validator = false;
    } else if (monthInput.value > 12) {
      warning(monthInput, lightRed, lightRed, "Must be a valid month");
      validator = false;
    } else if (yearInput.value > year) {
      warning(yearInput, lightRed, lightRed, "Must be a valid month");
      validator = false;
    } else {
      warning(input, lightGray, smokeyGrey, "");
      validator = true;
    }
  });

  return validator;
};

const ageCalculator = (b) => {
  if (b.day > curDay) {
    curDay = curDay + monthsDays[curMonth - 1];
    curMonth = curMonth - 1;
  }

  if (b.month > curMonth) {
    curMonth = curMonth + 12;
    curYear = curYear - 1;
  }

  const years = curYear - b.year;
  const months = curMonth - b.month;
  const days = curDay - b.day;

  return { years, months, days };
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    const birthdate = {
      year: yearInput.value,
      month: monthInput.value,
      day: dayInput.value,
    };

    const { years, months, days } = ageCalculator(birthdate);

    dayOutput.innerHTML = days;
    monthOutput.innerHTML = months;
    yearOutput.innerHTML = years;
  }
};

form.addEventListener("submit", handleSubmit);
