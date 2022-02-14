//format value
export const formatPrice = (num) => {
  const n = String(num),
    p = n.indexOf(".");
  return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    p < 0 || i < p ? `${m}.` : m
  );
};

export const POST_TYPES = {
  MOBILE: "mobile",
  LAPTOP: "alptop",
  PC: "pc",
};

export const handleCalculateTime = (time) => {
  if (time) {
    let createAt = new Date(2021, 10, 31, 20, 0, 0).getTime();
    let current = new Date(2021, 10, 31, 23, 0, 0).getTime();
    let distance = current - createAt;
    if (distance <= 0) return "";
    else {
      let years = Math.floor(distance / (365 * 24 * 3600 * 1000));
      let months = Math.floor(distance / (30 * 24 * 3600 * 1000));
      let days = Math.floor(distance / (24 * 3600 * 1000));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (years > 0) return `${years} năm trước`;
      else if (months > 0 && months < 12) return `${months} tháng trước`;
      else if (days > 7 && days < 31)
        return `${Math.floor(days / 7)} tuần trước`;
      else if (days > 0 && days < 7) return `${days} ngày trước`;
      else if (hours > 0 && hours < 24) return `${hours} giờ trước`;
      else if (minutes > 0 && minutes < 60) return `${minutes} phút trước`;
      else if (seconds > 0 && seconds < 60) return "Vừa xong";
      else return "";
    }
  }
  return "";
};
