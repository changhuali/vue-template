// log req info in node server
export const logReqInfo = (req, res, next) => {
  const date = new Date();
  console.log(
    `path: %s\nTime: %s\n`,
    req.url.cyan,
    `${date.toLocaleString()}:${date.getMilliseconds().toString().padStart(3, 0)}`.cyan
  );
  next();
}
