import { add_ripple } from "../button"
import "../navigation"
import "../register"

const officer_buttons = Array.from(document.querySelectorAll(".officer__social")).map(add_ripple)
officer_buttons.forEach(button => (button.unbounded = true))
