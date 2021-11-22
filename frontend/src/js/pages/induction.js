import { MDCTextField } from "@material/textfield"

import { add_ripple } from "../button"
import "../navigation"
import "../register"

const seating_chart_button = add_ripple(document.querySelector(".info__button"))

const firstname_text_field = new MDCTextField(document.querySelector(".induction-form__firstname"))
const lastname_text_field = new MDCTextField(document.querySelector(".induction-form__lastname"))

const form = document.querySelector(".induction-form")

form.addEventListener("submit", e => {
    e.preventDefault()
    const action = form.getAttribute("action")
    const form_data = Object.fromEntries(new FormData(form).entries())
    console.log(form_data)
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
                region: string,
                number: number
            } */
            if (json.success) {

                // TODO show the number and region somehow
                console.log(json)
            }
        })

    // needed to stop actual submission
    return false
})