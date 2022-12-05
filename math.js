const Mathematics = {
  clamp: function (value, minimum, maximum) {
    return min(max(value, minimum), maximum);
  },

  // Intersection: Given two points on each line segment
  getPointOfIntersection: function (p1, p2, p3, p4) {
    let t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / ((p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x));
    let x = p1.x + t * (p2.x - p1.x);
    let y = p1.y + t * (p2.y - p1.y);
    return createVector(x, y);
  }
};
