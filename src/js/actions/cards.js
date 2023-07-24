import VisitModal from "../classes/modal/VisitModal.js"

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


function renderVisits(cards) {

}


const authToken = JSON.parse(localStorage.getItem("authToken"));
const cardsContainer = document.getElementById('cards-list')
const notAvailableCards = `<div><h4 class="alert alert-danger">No items have been added.</h4></div`


if (authToken) {
    Promise.resolve(getUserCards(authToken)).then(res => {

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