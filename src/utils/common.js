import moment from "moment";

const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

const formatDateRelease = (date) =>{
  return moment(date).format(`DD MMMM YYYY`);
};

// Дата комментария отображается в формате год/месяц/день часы:минуты (например «2019/12/31 23:59»).
export {formatTime, formatDateRelease};
