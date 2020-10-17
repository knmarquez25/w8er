const current = new Date();

// console.log(`${current}    \n${new Date(current.getTime() - 1800000)}`);
const d1 = new Date("2020-11-15T15:15:00");
const d2 = new Date("2020-11-15T16:20:00");

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = ("0" + minutes).slice(-2);
  var strTime = hours + ":" + minutes + ampm;
  return strTime;
}

const getCurrentTimeDelta = (a, b) => {
  const ONE_MINUTE = 60;
  const ONE_HOUR = 3600;

  const timeDelta = Math.floor((a.getTime() - b.getTime()) / 1000);
  console.log(formatAMPM(a), formatAMPM(b), timeDelta);

  if (timeDelta < -3600)
    return `in ${Math.floor((-1 * timeDelta) / 3600)}h ${Math.floor(
      ((-1 * timeDelta) % 3600) / 60
    )}m`;
  else if (timeDelta < 0) return `in ${-1 * Math.floor(timeDelta / 60)}m`;
  else if (timeDelta < ONE_MINUTE) return `< 1m`;
  else if (timeDelta < ONE_HOUR) return `${Math.floor(timeDelta / 60)}m`;
  else {
    return `${Math.floor(timeDelta / 3600)}h ${Math.floor(
      (timeDelta % 3600) / 60
    )}m`;
  }
};

console.log(getCurrentTimeDelta(d1, d2));
console.log(getCurrentTimeDelta(d2, d1));
