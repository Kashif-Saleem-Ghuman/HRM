export default function (req, res, next, context) {
  console.log(context, "redirectsssssssssssssss")

  const redirects = [
    {
      from: "/",
      to: "/myprofile",
    },
  ];
  const redirect = redirects.find((r) => r.from === req.url);
  if (redirect) {
    res.writeHead(301, { Location: redirect.to });
    res.end();
  } else {
    next();
  }
}
