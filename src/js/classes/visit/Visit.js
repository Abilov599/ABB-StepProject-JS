export default class Visit {
  constructor(id, fullName, doctor, title, description, urgencyLevel) {
    this.fullName = fullName;
    this.doctor = doctor;
    this.title = title;
    this.description = description;
    this.urgencyLevel = urgencyLevel;
    this.showMore = false;
    this.id = id;
  }

  deleteVisit() {
    console.log(this.id);
    document.querySelector(`.card${this.id}`).remove();
  }

  render() {
    const additionalInfo = this.showMore ? this.renderAdditionalInfo() : "";

    return `
        <div class="card mb-5 card${this.id}">
          <div class="card-body">
            <h5 class="card-title">${this.doctor} Visit - ${this.title}</h5>
            <p class="card-text">Full Name: ${this.fullName}</p>
            <p class="card-text">Urgency Level: ${this.urgencyLevel}</p>
            <button class="btn btn-primary" id="showMoreBtn">Show More</button>
            <button class="btn btn-secondary" id="editBtn">Edit</button>
            <button class="btn btn-danger" id="deleteBtn">&#10005;</button>
            ${additionalInfo}
          </div>
        </div>
      `;
  }

  renderAdditionalInfo() {
    return "";
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
