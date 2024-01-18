export const iDate = (date, stringFormat) => {
  try {
    let t
    if (/(^\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}$)/.test(date)) {
      date = (date || '').split(/\D+/) || []
      date[1] = Number(date[1]) - 1
      t = new Date(...date)
    } else {
      t = new Date(date || new Date())
    }

    if (!t.getDate()) {
      return ''
    }

    const s = Number(t)
    const h = t.getHours()
    const o = {
      D: t.getDay(), // Day index in the week (number)
      H: t.getHours(), // Hour (number)
      J: t.getDate(), // Day of the month (number)
      M: t.getMinutes(), // Minute (number)
      N: t.getMonth() + 1, // Month in Vietnam (number)
      O: t, // Date object
      S: t.getSeconds(), // Second (number)
      d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][t.getDay()], // Day of the week in Vietnam (String)
      f: t.getFullYear(), // Year (number)
      h: ('0' + t.getHours()).substr(-2), // Hour (String)
      j: ('0' + t.getDate()).substr(-2), // Day (String)
      m: ('0' + t.getMinutes()).substr(-2), // Minute (String)
      n: ('0' + (t.getMonth() + 1)).substr(-2), // Month (String)
      s: ('0' + t.getSeconds()).substr(-2), // Second (String)
      t: s, // Milliseconds (number)
      u: parseInt(s / 1000), // Timestamp in seconds (number)
      y: String(t.getFullYear()).substr(-2), // Last two digits of the year (String)
      A: t.getHours() >= 12 ? 'PM' : 'AM', // AM PM
      g: ('0' + (h === 0 ? 12 : h > 12 ? h - 12 : h)).substr(-2), // Return in 12-hour format   
      Month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][t.getMonth()],
      Mo: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][t.getMonth()],
    }
    if (typeof stringFormat === 'string') {
      return stringFormat.replace(
        /{(Mo|Month|.)}/g,
        (a) => o[a.replace(/[{}]/g, '')]
      )
    }

    return o
  } catch (error) {
    return date
  }
}
