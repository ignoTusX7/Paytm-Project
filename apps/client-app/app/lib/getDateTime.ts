export function getDateTime(date){
    let s = new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    return s;
  }