import { MDCTextField } from "@material/textfield"
import { MDCSnackbar } from "@material/snackbar"

import { add_ripple } from "../button"
import "../navigation"
import "../register"

const form = document.querySelector(".contact-form")
const snackbar = new MDCSnackbar(document.querySelector(".snackbar"))

const email_text_field = new MDCTextField(document.querySelector(".contact-form__email"))
const subject_text_field = new MDCTextField(document.querySelector(".contact-form__subject"))
const message_text_field = new MDCTextField(document.querySelector(".contact-form__message"))

const send_button = add_ripple(document.querySelector(".contact-form__button--send"))
const reset_button = add_ripple(document.querySelector(".contact-form__button--reset"))

// fix for reset button since the text fields don't unfocus by default on reset
reset_button.root.addEventListener("click", () =>
    [email_text_field, subject_text_field, message_text_field].map(text_field => {
        text_field.root.classList.remove("mdc-text-field--label-floating")
        text_field.root.classList.remove("mdc-text-field--focused")
        text_field.root.querySelector(".mdc-notched-outline").classList.remove("mdc-notched-outline--notched")
        text_field.root.querySelector(".mdc-notched-outline__notch").style.width = ""
        text_field.root.querySelector(".mdc-floating-label").classList.remove("mdc-floating-label--float-above")
    })
)

// intercept submission
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
            if (json.success) {
                // display thanks message :)
                snackbar.labelText = "Contact submitted!  Thanks for your input :)"
                snackbar.open()
                // clear form since it wasn't actually submitted
                reset_button.root.click()
            }
        })

    // needed to stop actual submission
    return false
})

// only allow textarea to resize vertically.  CSS property doesn't work since material uses custom JS
const observer = new MutationObserver(mutations => {
    for (const mutation of mutations)
        if (
            mutation.type === "attributes" &&
            mutation.attributeName == "style" &&
            mutation.target.getAttribute("style").includes("width")
        )
            mutation.target.style = mutation.target.getAttribute("style").replace(/width:\s*\d+px;\s?/g, "")
})
observer.observe(document.querySelector(".mdc-text-field__resizer"), { attributes: true })
