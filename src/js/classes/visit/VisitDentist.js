import Visit from "./Visit.js";
class VisitDentist extends Visit {
    constructor(fullName, title, description, urgencyLevel, lastVisitDate) {
      super(fullName, 'Dentist', title, description, urgencyLevel);
      this.lastVisitDate = lastVisitDate;
    }
  
    renderAdditionalInfo() {
      return `
        <p class="card-text">Last Visit Date: ${this.lastVisitDate}</p>
      `;
    }
  }
  