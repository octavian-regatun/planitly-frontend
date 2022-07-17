import StringUtility from "./StringUtility"

export default class MonthUtility {
  static getString(number: number, options?: { capitalized: boolean }) {
    const strings = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ]

    if (options?.capitalized) return StringUtility.capitalize(strings[number])

    return strings[number]
  }
}
