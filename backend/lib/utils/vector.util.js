function dot(a, b) {
  return a.reduce((acc, _, index) => acc + a[index] * b[index], 0);
}

function magnitude(first) {
  return Math.sqrt(first.reduce((res, value) => res + value ** 2, 0));
}

function L2(a, b) {
  return Math.sqrt(
    a.reduce((res, _, index) => res + (a[index] - b[index]) ** 2, 0)
  );
}

function getCosineSimilarity(a, b) {
  return dot(a, b) / (magnitude(a) * magnitude(b));
}

function getComparisonDetails(a, b) {
  const result = {
    identical: 0,
    strongly_related: 0,
    weakly_related: 0,
    neutral: 0,
    unrelated: 0,
    distance: 0,
  };

  const up = a.reduce((sum, _, index) => sum + a[index] * b[index], 0);
  const ashki = a.reduce((div, value) => div + value ** 2, 0);
  const bshki = b.reduce((div, value) => div + value ** 2, 0);
  const L1 = getCosineSimilarity(a, b);

  const L2_Array = a.map(
    (_, index) =>
      (up - a[index] * b[index]) /
      Math.sqrt((ashki - a[index] ** 2) * (bshki - b[index] ** 2))
  );

  const phi_array = L2_Array.map((L2) => 512 * L1 - 511 * L2);
  let sum = 0;
  const sim = phi_array.map((phi, index) => {
    const val = Math.max(
      (100 * Math.min(phi, L2_Array[index])) / Math.max(phi, L2_Array[index]),
      0
    );
    if (val === 100) {
      result.identical += 1;
    } else if (val >= 90) {
      result.strongly_related += 1;
    } else if (val >= 65) {
      result.weakly_related += 1;
    } else if (val >= 50) {
      result.neutral += 1;
    } else {
      result.unrelated += 1;
    }
    sum += val;
  });

  return result;
}

module.exports = {
  dot,
  magnitude,
  L2,
  getCosineSimilarity,
  getComparisonDetails,
};
