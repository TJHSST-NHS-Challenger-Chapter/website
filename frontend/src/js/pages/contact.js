import { MDCTextField } from "@material/textfield"

import { add_ripple } from "../button"
import "../navigation"

const subject_text_field = new MDCTextField(document.querySelector(".contact-form__subject"))
const message_text_field = new MDCTextField(document.querySelector(".contact-form__message"))

const send_button = add_ripple(document.querySelector(".contact-form__button--send"))
const reset_button = add_ripple(document.querySelector(".contact-form__button--reset"))

// fix for reset button since the textarea doesn't unfocus by default on reset
reset_button.root.addEventListener("click", () => {
    message_text_field.root.classList.remove("mdc-text-field--label-floating")
    message_text_field.root.classList.remove("mdc-text-field--focused")
    message_text_field.root.querySelector(".mdc-notched-outline").classList.remove("mdc-notched-outline--notched")
    message_text_field.root.querySelector(".mdc-notched-outline__notch").style.width = ""
    message_text_field.root.querySelector(".mdc-floating-label").classList.remove("mdc-floating-label--float-above")
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
