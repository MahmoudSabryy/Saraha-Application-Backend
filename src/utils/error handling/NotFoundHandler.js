const NotFoundHandler = (req, res, next) => {
  return next(new Error("Not Found Handler !!!", { cause: 404 }));
};
export default NotFoundHandler;
