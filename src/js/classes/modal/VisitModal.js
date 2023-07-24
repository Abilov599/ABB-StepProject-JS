import Modal from "./Modal.js";

class VisitModal extends Modal {
    #doctors = [

        'Cardiologist',
        'Dentist',
        'Therapist'
    ]

    #levels = [
        'Normal', 'Priority', 'Urgent'
    ]



    createSelectList(list, id) {

        const select = document.createElement('select')
        select.setAttribute('class', 'form-select mb-3')
        select.setAttribute('id', id)
        list.map((el, key) => {
            const option = document.createElement('option')
            option.setAttribute('value', el.toLowerCase())
            key === 0 && option.setAttribute('selected', 'true')
            option.innerText = el
            select.appendChild(option)
        })

        return select


    }

    createTextArea() {

    }

    createInput(labelText, type = 'text') {
        const inputContainer = document.createElement('div')
        inputContainer.setAttribute('class', 'mb-3')
        const label = document.createElement('label')
        label.innerText = labelText
        label.setAttribute('class', 'form-label')
        label.setAttribute('for', labelText.toLowerCase().replace(' ', '-'))
        const checkType = type !== 'textarea'
        const input = document.createElement(checkType ? 'input' : 'textarea')
        input.setAttribute('class', 'form-control')
        !!checkType && input.setAttribute('type', type)
        input.setAttribute('id', labelText.toLowerCase().replaceAll(' ', '-'))
        input.setAttribute(checkType ? 'placeholder' : 'rows', checkType ? labelText : '3')
        inputContainer.appendChild(label)
        inputContainer.appendChild(input)
        return inputContainer
    }


    listenSelect(form, e) {
        if (e.target.value === 'dentist') {
            const dateInput = this.createInput('Date')
            form.appendChild(dateInput)
        } else {
            const dateInput = document?.getElementById('date')?.parentElement
            dateInput?.remove()
        }
        if (e.target.value === 'therapist') {
            const age = this.createInput('Age', 'number')
            form.appendChild(age)
        }
        else {
            const age = document?.getElementById('age')?.parentElement
            age?.remove()
        }


        if (e.target.value === 'cardiologist') {
            const bloodPressure = this.createInput('Blood Pressure', 'number')
            const bodyMass = this.createInput('Body Mass Index', 'number')
            const diseases = this.createInput('Cardiovascular diseases', 'textarea')
            const age = this.createInput('Age (Cardiologist)', 'number')
            form.appendChild(bloodPressure)
            form.appendChild(bodyMass)
            form.appendChild(diseases)
            form.appendChild(age)
        } else {
            const bloodPressure = document?.getElementById('blood-pressure')?.parentElement
            const bodyMass = document?.getElementById('body-mass')?.parentElement
            const diseases = document?.getElementById('cardiovascular-diseases')?.parentElement
            const age = document?.getElementById('age-(cardiologist)')?.parentElement
            bloodPressure?.remove()
            bodyMass?.remove()
            diseases?.remove()
            age?.remove()
        }



    }


    loadForm() {

        const form = document.createElement('form')
        const doctors = this.createSelectList(this.#doctors, 'doctors')
        const levels = this.createSelectList(this.#levels, 'levels')
        form.appendChild(doctors)
        form.appendChild(this.createInput('Full Name'))
        form.appendChild(this.createInput('Visit Purpose'))
        form.appendChild(this.createInput('Brief visit description', 'textarea'))
        form.appendChild(levels)
        const bloodPressure = this.createInput('Blood Pressure', 'number')
        const bodyMass = this.createInput('Body Mass Index', 'number')
        const diseases = this.createInput('Cardiovascular diseases', 'textarea')
        const age = this.createInput('Age (Cardiologist)', 'number')
        form.appendChild(bloodPressure)
        form.appendChild(bodyMass)
        form.appendChild(diseases)
        form.appendChild(age)
        doctors.onchange = (e) => {

            this.listenSelect(form, e)



        }

        return form
    }

    renderVisit() {
        const header = this.createHeader('Create Visit')
        const modal = this.render('createVisitBtnModal')
        const modalContent = modal.lastChild.lastChild
        modalContent.appendChild(header)
        const body = this.createBody(this.loadForm())
        modalContent.appendChild(body)
        return modal
    }
}
export default VisitModal