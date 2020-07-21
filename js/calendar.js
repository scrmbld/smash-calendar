//day class
class Day {
  constructor(id, parent) {//int, parent Calendar id
    this.id = id;
    this.element = document.createElement(`div`);
    this.element.id = `n${id}`;
    this.element.classList.add(`day`);
    document.querySelector(`.calendar-container#${parent} .week#n${Math.floor(id / 7)}`).appendChild(this.element);
    this.element = document.querySelector(`.calendar-container #${parent} .week #n${id}`);
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
