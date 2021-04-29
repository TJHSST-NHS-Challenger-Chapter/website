import { add_ripple } from "../button"
import "../navigation"
import "../register"

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
        fetch(`${window.location.origin}/api/v1/deadline/${deadline.id}`)
            .then(raw => raw.blob())
            .then(blob => {
                // strange DOM trick to download a blob
                const url = window.URL.createObjectURL(blob)
                const anchor = document.createElement("a")
                anchor.style.display = "none"
                anchor.href = url
                anchor.download = "event.ics"
                document.body.append(anchor)
                anchor.click()
                window.URL.revokeObjectURL(url)
                anchor.remove()
            })
            .catch(() => {
                // TODO: replace alert with snackbar notification
                alert("Something went wrong...")
            })
    })
)

const calendar_all_button = add_ripple(document.querySelector(".deadlines__button"))
calendar_all_button.root.addEventListener("click", () => {
    fetch(`${window.location.origin}/api/v1/deadlines`)
        .then(raw => raw.blob())
        .then(blob => {
            // strange DOM trick to download a blob
            const url = window.URL.createObjectURL(blob)
            const anchor = document.createElement("a")
            anchor.style.display = "none"
            anchor.href = url
            anchor.download = "events.ics"
            document.body.append(anchor)
            anchor.click()
            window.URL.revokeObjectURL(url)
            anchor.remove()
        })
        .catch(() => {
            // TODO: replace alert with snackbar notification
            alert("Something went wrong...")
        })
})

const announcement_buttons = Array.from(document.querySelectorAll(".announcement__button")).map(add_ripple)
