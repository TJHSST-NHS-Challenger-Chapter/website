import { add_ripple } from "../button"
import "../navigation"

const question_toggles = Array.from(document.querySelectorAll(".question")).map(add_ripple)
question_toggles.forEach(({ root: el }) => {
    el.addEventListener("click", () => {
        el.classList.toggle("question--expanded")

        const icon = el.querySelector(".question__icon")
        icon.textContent = `expand_${icon.textContent.endsWith("more") ? "less" : "more"}`
    })
})
