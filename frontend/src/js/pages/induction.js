import { MDCTextField } from "@material/textfield"

import { add_ripple } from "../button"
import "../navigation"
import "../register"

const seating_chart_button = add_ripple(document.querySelector(".info__button"))

const firstname_text_field = new MDCTextField(document.querySelector(".induction-form__firstname"))
const lastname_text_field = new MDCTextField(document.querySelector(".induction-form__lastname"))