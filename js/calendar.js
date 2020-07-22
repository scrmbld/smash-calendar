//month data
const MONTHS = {
  names: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
  lengths: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  getLength: function(month) {
    console.assert(month > 0 && month < 12);
    return this.lengths[month]
  },
  getName: function(month) {
    console.assert(month > 0 && month < 12);
    return this.names[month];
  },
  lastMonth: function(month) {
    return (month + 11) % 12;
  }
};

//day class
class Day {
  constructor(id, parent) {//int, parent Calendar id
    this.id = id;
    this.element = document.querySelector(`.calendar-container#${parent} .week #n${id}`);
    this.dayNum = document.createElement(`h3`);
    this.dayNum.textContent = `${id}`;
    this.element.appendChild(this.dayNum);
  }
}

class Calendar {
  constructor(id, time = new Date()) {//string div.calendar-container's id, int month, Date
    let month = time.getMonth();
    let year = time.getFullYear();
    let start = new Date(`${month + 1}/1/${year} 1:00:00`).getDay();;//the id of the first day of the current month
    console.log(start);
    //initialize attributes
    this.id = id;
    this.element = document.querySelector(`.calendar-container#${id}`);
    this.header = document.querySelector(`.calendar-container#${id} h1`);
    this.dayList = [];

    //update header content
    this.element.querySelector(`h1`).textContent = `${MONTHS.getName(month)} ${year}`;

    //generate 5 rows (weeks) of 7 days (total 35)
    for (let i = 0; i < 35; i++) {
      this.dayList.push(new Day(i, id));//create day

      //determine day number
      if (i > MONTHS.getLength(month) + start || i <= start) {//if it's in the next month
        this.dayList[i].element.classList.add(`not-current`);
        this.dayList[i].dayNum.textContent = (i) % MONTHS.getLength(month);
      } else if (this.dayList[i].dayNum.textContent <= start) {
        this.dayList[i].dayNum.textContent = MONTHS.getLength(MONTHS.lastMonth(month)) - (start - i);
      } else this.dayList[i].dayNum.textContent = i - start;
    }
  }
}

//generate the calendar
var calendar = new Calendar(`n1`);
