export default class StringUtility {
  static capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}
