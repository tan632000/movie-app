import * as moment from 'moment'
import 'moment-timezone'
export function formatTimezoneSing(time) {
  return time === '-' ? time : moment.default(time).tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss')
}
