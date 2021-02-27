import { MDCTopAppBar } from "@material/top-app-bar"
import { MDCDrawer } from "@material/drawer"

import { add_ripple } from "./button"

// set up drawer and nav links
const drawer = MDCDrawer.attachTo(document.querySelector(".nav-drawer"))
for (const nav_link of drawer.root.querySelectorAll(".mdc-list-item")) {
    add_ripple(nav_link)
    nav_link.addEventListener("click", e => {
        e.preventDefault()
        console.log(`[load ${nav_link.getAttribute("href")}]`)
    })
}

// allow the drawer to be opened by the nav bar
const nav_bar = MDCTopAppBar.attachTo(document.querySelector(".nav-bar"))
nav_bar.root.querySelector(".nav-bar__menu-button").addEventListener("click", () => (drawer.open = !drawer.open))

// make nav-drawer a modal on small devices and standard on large ones
const mq = window.matchMedia("only screen and (min-width: 1200px)") // this media query isn't related to anything else
const on_mq_change = ({ matches }) => {
    // Switches the drawer from modal to always visible once the breakpoint is reached.
    drawer.root.classList[matches ? "remove" : "add"]("mdc-drawer--modal")

    // Shifts the nav_bar to the left to accomodate for the space taken up once the drawer is always visible.
    nav_bar.root.classList[matches ? "add" : "remove"]("nav-bar--shifted-left")

    // Hide the nav-bar's button to open the drawer when the drawer is always visible.
    const nav_button = nav_bar.root.querySelector(".nav-bar__menu-button")
    nav_button.classList[matches ? "add" : "remove"]("nav-bar__menu-button--hidden")

    const root = document.querySelector(".root")
    root.style.paddingLeft = matches ? `${drawer.root.getBoundingClientRect().width}px` : null
}
mq.addEventListener("change", on_mq_change)
on_mq_change({ matches: mq.matches })
