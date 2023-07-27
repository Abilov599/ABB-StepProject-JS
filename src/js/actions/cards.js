import VisitModal from "../classes/modal/VisitModal.js"
import VisitCardiologist from "../classes/visit/VisitCardiologist.js"
import VisitDentist from "../classes/visit/VisitDentist.js"
import VisitTherapist from "../classes/visit/VisitTherapist.js"

const CARDS_URL = 'https://ajax.test-danit.com/api/v2/cards'



async function getUserCards(token) {

    try {
        const res = await fetch(CARDS_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data
    } catch (err) {
        throw new Error(err.message)
    }
}


const cardsContainer = document.getElementById('cards-list')
function renderVisits(cards) {
    cards.map(card => {
        let visitCard;
        const {doctor, fullName, title, description, urgencyLevel, age, bp, weight, diseases, date} = card
        console.log(card)
        if (doctor === 'Therapist'){
            visitCard = new VisitTherapist(fullName, title, description, urgencyLevel,age )
        } else if(doctor === 'Cardiologist'){
            visitCard = new VisitCardiologist(fullName, title, description, urgencyLevel, bp, weight, diseases,age )
        } else if(doctor === 'Dentist'){
            visitCard = new VisitDentist(fullName, title, description, urgencyLevel, date)
        }

        cardsContainer.insertAdjacentHTML('beforeend', visitCard.render())

    })


}


const authToken = JSON.parse(localStorage.getItem("authToken"));
const notAvailableCards = `<div><h4 class="alert alert-danger">No items have been added.</h4></div`


if (authToken) {
    Promise.resolve(getUserCards(authToken)).then(res => {
        renderVisits(res)
    })
} else {


    cardsContainer.insertAdjacentHTML('beforeend', notAvailableCards)
}



/* VISIT MODAL FOR CREATING */
const visitModal = new VisitModal()
document.body.append(visitModal.renderVisit('createVisitBtnModal'))
const visitBtn = document?.querySelector('#create-visit-btn')
visitBtn.addEventListener('click', e => {
    visitModal.createCard(authToken)
})