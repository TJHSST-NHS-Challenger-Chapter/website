import { MDCTextField } from "@material/textfield"
import { MDCDialog } from "@material/dialog";

import { add_ripple } from "../button"
import "../navigation"
import "../register"

const seating_chart_button = add_ripple(document.querySelector(".info__button"))

const firstname_text_field = new MDCTextField(document.querySelector(".induction-form__firstname"))
const lastname_text_field = new MDCTextField(document.querySelector(".induction-form__lastname"))

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
                region: string?,
                number: number?
            } */
            if (json.success) {
                const {firstname, lastname} = form_data
                const {region, number} = json
                if (region && number)
                    dialog.root.querySelector(".seating-dialog__content").innerHTML = `Welcome, <b style="font-weight:bold">${firstname} ${lastname}</b>. Your seat is <b style="font-weight:bold">#${number}</b> at <b style="font-weight:bold">${region}</b>. See the seating chart .pdf file for that seat's location in the room.`
                else
                    dialog.root.querySelector(".seating-dialog__content").innerHTML = `We're sorry, but the name <b style="font-weight:bold">${firstname} ${lastname}</b> doesn't seem to be part of our seating chart database. Please contact one of the NHS officers if you think it should be.`
                dialog.layout()
                dialog.open()
            }
        })

    // needed to stop actual submission
    return false
})