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


    #visitToast = ` <div class="alert alert-success visit-toast" role="alert" id="visit-toast">
    Visit Card was added successfully!
  </div>`



    createFooterContent() {
        const cancelBtn = document.createElement('button')
        cancelBtn.setAttribute('type', 'button')
        cancelBtn.setAttribute('class', 'btn btn-danger')
        cancelBtn.setAttribute('data-bs-dismiss', 'modal')
        cancelBtn.innerText = 'Cancel'
        const createBtn = document.createElement('button')
        createBtn.setAttribute('type', 'submit')
        createBtn.setAttribute('class', 'btn btn-success')
        createBtn.setAttribute('id', 'create-visit-btn')
        createBtn.innerText = 'Create Visit'
        const footer = this.createFooter()
        footer.appendChild(cancelBtn)
        footer.appendChild(createBtn)
        return footer

    }
    createSelectList(labelText, list, id) {
        const selectContainer = document.createElement('div')
        selectContainer.setAttribute('class', 'mb-3')
        const label = document.createElement('label')
        label.innerText = labelText
        label.setAttribute('class', 'form-label')
        label.setAttribute('for', id)
        const select = document.createElement('select')
        select.setAttribute('class', 'form-select mb-3')
        select.setAttribute('id', id)
        list.map((el, key) => {
            const option = document.createElement('option')
            option.setAttribute('value', el)
            key === 0 && option.setAttribute('selected', 'true')
            option.innerText = el
            select.appendChild(option)
        })

        selectContainer.appendChild(label)
        selectContainer.appendChild(select)

        return selectContainer
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
        !!type !== 'textarea' && input.setAttribute('required', 'true')
        inputContainer.appendChild(label)
        inputContainer.appendChild(input)
        return inputContainer
    }


    listenSelect(form, e) {
        if (e.target.value === 'Dentist') {
            const dateInput = this.createInput('Date')
            form.appendChild(dateInput)
        } else {
            const dateInput = document?.getElementById('date')?.parentElement
            dateInput?.remove()
        }
        if (e.target.value === 'Therapist') {
            const age = this.createInput('Age', 'number')
            form.appendChild(age)
        }
        else {
            const age = document?.getElementById('age')?.parentElement
            age?.remove()
        }


        if (e.target.value === 'Cardiologist') {
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
            const bodyMass = document?.getElementById('body-mass-index')?.parentElement
            const diseases = document?.getElementById('cardiovascular-diseases')?.parentElement
            const age = document?.getElementById('age-(cardiologist)')?.parentElement
            bloodPressure?.remove()
            bodyMass?.remove()
            diseases?.remove()
            age?.remove()
        }
    }


    loadForm() {

        const form = document.createElement('div')
        const doctors = this.createSelectList('Select a doctor', this.#doctors, 'doctors')
        const levels = this.createSelectList('Select a level', this.#levels, 'levels')
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

    /* 
    title: 'Визит к кардиологу',
        description: 'Плановый визит',
        doctor: 'Cardiologist',
        bp: '24',
        age: 23,
        weight: 70 */

    loadData() {

        const title = document.getElementById('visit-purpose').value
        const description = document.getElementById('brief-visit-description').value
        const doctor = document.getElementById('doctors').value
        const data = { title, description, doctor }
        if (doctor === 'Cardiologist') {
            const bp = document.getElementById('blood-pressure').value.toString()
            const age = document.getElementById('age-(cardiologist)').value
            const weight = document.getElementById('body-mass-index').value
            const diseases = document.getElementById('diseases').value
            data.bp = bp
            data.age = age
            data.weight = weight
            data.diseases = diseases || ''
        } else if (doctor === 'Therapist') {
            const age = document.getElementById('age').value
            data.age = age
        } else if (doctor === 'Dentist') {
            const date = document.getElementById('date').value
            data.date = date
        }

        return data

    }

    showToast() {
        document.body.insertAdjacentHTML('beforeend', this.#visitToast)
        
        const removeToast = () => {
            const toast = document.getElementById('visit-toast')
            toast.remove()
        }
        setTimeout(removeToast, 2000)


    }

    createCard(token) {

        const data = this.loadData()

        fetch('https://ajax.test-danit.com/api/v2/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(d => {
            
        }).catch(err => {
            throw new Error(err)
        }).finally(() => {
            this.showToast()
        })
    }

    renderVisit() {
        const header = this.createHeader('Create Visit')
        const modal = this.render('createVisitBtnModal')
        const modalContent = modal.lastChild.lastChild
        modalContent.appendChild(header)
        const body = this.createBody(this.loadForm())
        modalContent.appendChild(body)
        const footer = this.createFooterContent()
        modalContent.appendChild(footer)
        return modal
    }
}
export default VisitModal