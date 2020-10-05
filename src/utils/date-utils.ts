export class DateUtils {
  static getISOString(d: Date): string {
    return d.toISOString().split('T')[0];
  }
}
