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
