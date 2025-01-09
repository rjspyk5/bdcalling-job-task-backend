const handleError = (err, res) => {
  if (err?.code === 11000) {
    return res.status(409).send({
      success: false,
      message: "Email already exists",
    });
  }
  if (err?.name === "ValidationError") {
    return res.status(400).send({
      success: false,
      message: `Validation Error: ${err?.message}`,
    });
  }
  if (err?.name === "CastError") {
    return res.status(400).send({
      success: false,
      message: `Data type Error: ${err?.message}`,
    });
  }
  return res
    .status(500)
    .send({ success: false, message: "Internal server error" });
};
module.exports = handleError;
