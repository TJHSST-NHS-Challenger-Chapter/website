import { MDCRipple } from "@material/ripple/index"

export const withRipple = (...buttons) =>
    buttons.map((button) => new MDCRipple(button))
