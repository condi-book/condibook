const CalcDate = (date: Date) => {
  if (!date) {
    return null;
  }
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let today = new Date();
  let calculatedTime = Math.floor((today.getTime() - date.getTime()) / 1000);

  let resultText = "";
  if (calculatedTime < seconds) {
    resultText = "방금 전";
  } else if (calculatedTime < minute) {
    resultText = "약 " + calculatedTime + "초 전";
  } else if (calculatedTime < hour) {
    resultText = "약 " + Math.floor(calculatedTime / minute) + "분 전";
  } else if (calculatedTime < day) {
    resultText = "약 " + Math.floor(calculatedTime / hour) + "시간 전";
  } else if (calculatedTime < day * 15) {
    resultText = "약 " + Math.floor(calculatedTime / day) + "일 전";
  } else {
    resultText =
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
  }
  return resultText;
};

export default CalcDate;
