import { add_ripple } from "../button"
import { MDCSnackbar } from "@material/snackbar"
import "../navigation"
import "../register"

const snackbar = new MDCSnackbar(document.querySelector(".snackbar"))

// add classes, since Markdown doesn't
document.querySelectorAll(".announcement__body > *, .deadline__body > *").forEach(child => {
    child.classList.add(...child.parentElement.classList)
    child.querySelectorAll("a").forEach(link => {
        link.classList.add("typography--link")
        link.target = "_blank"
        link.rel = "noopener noreferrer"
    })
})

const calendar_buttons = Array.from(document.querySelectorAll(".deadline__button")).map(add_ripple)
calendar_buttons.map(b =>
    b.root.addEventListener("click", e => {
        const deadline = e.target.parentElement.parentElement.parentElement
        try {
            open(`${window.location.origin}/api/v1/deadline/${deadline.id}`)
            // snackbar alert
            snackbar.labelText = "Event downloaded Successfully!"
            snackbar.open()
        } catch (error) {
            snackbar.labelText = "Something went wrong..."
            snackbar.open()
        }
    })
)

const calendar_all_button = add_ripple(document.querySelector(".deadlines__button"))
calendar_all_button.root.addEventListener("click", () => {
    try {
        open(`${window.location.origin}/api/v1/deadlines`)
        // snackbar alert
        snackbar.labelText = "Events downloaded Successfully!"
        snackbar.open()
    } catch (error) {
        snackbar.labelText = "Something went wrong..."
        snackbar.open()
    }
})

const announcement_buttons = Array.from(document.querySelectorAll(".announcement__button")).map(add_ripple)
