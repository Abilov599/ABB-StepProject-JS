import VisitModal from "../classes/modal/VisitModal.js";
import VisitCardiologist from "../classes/visit/VisitCardiologist.js";
import VisitDentist from "../classes/visit/VisitDentist.js";
import VisitTherapist from "../classes/visit/VisitTherapist.js";

const CARDS_URL = "https://ajax.test-danit.com/api/v2/cards";

async function getUserCards(token) {
  try {
    const res = await fetch(CARDS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

const cardsContainer = document.getElementById("cards-list");
function renderVisits(cards) {
  cards.map((card) => {
    let visitCard;
    const {
      id,
      doctor,
      fullName,
      title,
      description,
      urgencyLevel,
      age,
      bp,
      weight,
      diseases,
      date,
    } = card;
    console.log(id);
    if (doctor === "Therapist") {
      visitCard = new VisitTherapist(
        id,
        fullName,
        title,
        description,
        urgencyLevel,
        age
      );
    } else if (doctor === "Cardiologist") {
      visitCard = new VisitCardiologist(
        id,
        fullName,
        title,
        description,
        urgencyLevel,
        bp,
        weight,
        diseases,
        age
      );
    } else if (doctor === "Dentist") {
      visitCard = new VisitDentist(
        id,
        fullName,
        title,
        description,
        urgencyLevel,
        date
      );
    }

    cardsContainer.insertAdjacentHTML("beforeend", visitCard.render());
    const deleteBtn = document.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", () => {
      visitCard.deleteVisit(deleteBtn.parentNode.parentNode);
      fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    });
  });
}

const authToken = JSON.parse(localStorage.getItem("authToken"));
const notAvailableCards = `<div><h4 class="alert alert-danger">No items have been added.</h4></div`;

/* VISIT MODAL FOR CREATING */
const visitModal = new VisitModal();
document.body.append(visitModal.renderVisit("createVisitBtnModal"));
const visitBtn = document?.querySelector("#create-visit-btn");
visitBtn.addEventListener("click", (e) => {
  visitModal.createCard(authToken);
});

if (authToken) {
  Promise.resolve(getUserCards(authToken)).then((res) => {
    renderVisits(res.reverse());
  });
} else {
  cardsContainer.insertAdjacentHTML("beforeend", notAvailableCards);
}
