var widthPeo = function widthPeo() {
  // Its a Peo object.
  // Need to copy it before releasing
  return this.peo.copy();
};

module.exports = widthPeo;
