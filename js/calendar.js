//day class
class Day {
  constructor(id, parent) {//int, parent Calendar id
    this.id = id;
    this.element = document.querySelector(`.calendar-container#${parent} .week #n${id}`);
    let dayNum = document.createElement(`h3`);
    dayNum.textContent = `${id}`;
    this.element.appendChild(dayNum);
  }
}

class Calendar {
  constructor(id) {
    this.id = id;
    this.element = document.querySelector(`.calendar-container #${id}`);
    this.dayList = [];
    for (let i = 0; i < 35; i++) {
      this.dayList.push(new Day(i, id));
    }
  }
}

//generate the calendar
var calendar = new Calendar(`n1`);
