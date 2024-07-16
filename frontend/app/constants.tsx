function strip(s : string) {
  return s.trim().replace(/[\n\r\t\s]+/g, ' ')
}

export const PLACEHOLDERS = [
  strip(`
    I am trying want to register for an exam for the module XYZ but
    I didn't do it in time. I asked the teaching assistants but they
    could not do anything for me, what should I do?
  `),
  strip(`
    You can contact the office @email, I found their contact details [here].
    Make sure to include A, B, C along with D.
  `),
   "But I ..."
]
export const MAKE_IT_A_DIALOGUE_VALUE = "+ Make it a dialogue!"
export const LIGHT_THEME = "retro";
export const DARK_THEME = "coffee";
export const DEFAULT_THEME = LIGHT_THEME
