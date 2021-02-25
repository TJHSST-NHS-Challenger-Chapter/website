import { add_ripple } from "../button"
import "../navigation"

const calendar_buttons = Array.from(document.querySelectorAll(".deadline__button")).map(add_ripple)
calendar_buttons.map(b => b.root.addEventListener("click", () => console.log("[download the individual event now]")))

const calendar_all_button = add_ripple(document.querySelector(".deadlines__button"))
calendar_all_button.root.addEventListener("click", () => console.log("[download all of the events now]"))

const announcement_buttons = Array.from(document.querySelectorAll(".announcement__button")).map(add_ripple)
announcement_buttons.map((b, i) => b.root.addEventListener("click", () => console.log(`[clicked button #${i + 1}]`)))
