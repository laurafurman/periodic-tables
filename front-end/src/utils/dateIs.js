import { today } from "./date-time";

export default function dateIs(change = 0) {
  let nextDate = new Date(today());
  nextDate.setDate(nextDate.getDate() + change);
  return nextDate.toJSON().slice(0, 10);
}
