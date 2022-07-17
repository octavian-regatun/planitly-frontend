export default class CalendarUtility {
  static doesDateBelongToMonth(day: Date, month: number): "true" | "false" {
    return day.getMonth() === month ? "true" : "false"
  }
}
