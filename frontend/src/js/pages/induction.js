import { MDCTextField } from "@material/textfield"
import { MDCDialog } from "@material/dialog";

import { add_ripple } from "../button"
import "../navigation"
import "../register"

const seating_chart_button = add_ripple(document.querySelector(".info__button"))

const form_student_id = new MDCTextField(document.querySelector(".induction-form__id"))
const form_submit_button = add_ripple(document.querySelector(".induction-form__button"))

const form = document.querySelector(".induction-form")
const dialog = new MDCDialog(document.querySelector(".seating-dialog"))

form.addEventListener("submit", e => {
    e.preventDefault()
    const action = form.getAttribute("action")
    const form_data = Object.fromEntries(new FormData(form).entries())
    // make AJAX request instead
    fetch(action, {
        method: "POST",
        body: JSON.stringify(form_data),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            /* expected shape is {
                sucess: boolean,
                row: string?,
                seat: number?,
                section: string?,
                firstname: string?,
                lastname: string?
            } */
            if (json.success) {
                const {id} = form_data
                const {row, seat, section, firstname, lastname} = json
                if (row && seat && section && firstname && lastname)
                    dialog.root.querySelector(".seating-dialog__content").innerHTML = `Welcome, <b style="font-weight:bold">${firstname} ${lastname}</b>. Your seat is <b style="font-weight:bold">#${seat}</b> in row <b style="font-weight:bold">${row}</b> in the <b style="font-weight:bold">${section.toLowerCase()}</b> section. See the seating chart .pdf file for that seat's location in the room.`
                else
                    dialog.root.querySelector(".seating-dialog__content").innerHTML = `We're sorry, but the student ID <b style="font-weight:bold">${id}</b> doesn't seem to be part of our seating chart database. Please contact one of the NHS officers if you think it should be.`
                dialog.layout()
                dialog.open()
            }
        })

    // needed to stop actual submission
    return false
})