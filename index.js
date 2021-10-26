// Import stylesheets
import "./style.css";

//table
const fn = d => {
  fetch(`https://api.exchangeratesapi.io/${d}?base=RUB`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var mass = data.rates;
      var n = 0;
      var len = Object.keys(mass).length;
      var cell = 3;
      var str = Math.ceil(len / cell);
      var table = "<table>";
      table += "<caption>Курс рубля на " + currentDate + "</caption>";
      for (var tr = 0; tr < str; tr++) {
        table += "<tr>";
        for (var td = 0; td < cell; td++) {
          table += "<td>";
          if (n < len) {
            table += Object.keys(mass)[n] + " ";
            table += Object.values(mass)[n];
            n++;
          } else {
            table += "&nbsp;";
          }
          table += "</td>";
        }
        table += "</tr>";
      }
      table += "</table>";
      document.getElementById("app").innerHTML = table;
    });
};

if (!Date.prototype.adjustDate) {
  Date.prototype.adjustDate = function(days) {
    var date;
    days = days || 0;
    if (days === 0) {
      date = new Date(this.getTime());
    } else if (days > 0) {
      date = new Date(this.getTime());
      date.setDate(date.getDate() + days);
    } else {
      date = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate() - Math.abs(days)
      );
    }
    this.setTime(date.getTime());
    return this;
  };
}
var currentDate;
var dates = [];
var interDate;
var k = 0;
for (var i = 5; i >= 0; i--) {
  interDate = new Date().adjustDate(-k);
  var year = interDate.getFullYear();
  var month = +interDate.getMonth() + 1;
  var day = interDate.getDate();
  var now = year + "-" + month + "-" + day;
  dates[k] = now;
  currentDate = dates[0];
  k++;
}
console.log(currentDate);
fn(currentDate);
//buttons
var divButton = document.createElement("div");
divButton.setAttribute("id", "buttons");
document.body.appendChild(divButton);
document.body.classList.add("buttons");
const buttons = dates.map(items => `<button>${items}</button>`);
divButton.innerHTML = buttons.join(" ");
divButton.addEventListener("click", event => {
  currentDate = event.target.innerHTML;
  fn(currentDate);
});
