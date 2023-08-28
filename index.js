import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const todosDaily = [];
const todosWork = [];

app.get("/", (req, res) => {
  res.render("index", {
    date: getDate(),
    todosDaily: todosDaily,
    todosWork: todosWork,
  });
});

app.get("/work", (req, res) => {
  res.render("work", {
    date: getDate(),
    todosDaily: todosDaily,
    todosWork: todosWork,
  });
});

app.post("/addTodoDaily", (req, res) => {
  todosDaily.push(req.body.newItem);
  res.redirect("/");
});

app.post("/addTodoWork", (req, res) => {
  todosWork.push(req.body.newItem);
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function getDate() {
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fullDate = new Date();
  const day = fullDate.getDay();
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayName[day]}, ${date}${nthNumber(date)} ${
    monthName[month]
  } ${year}  `;
}
