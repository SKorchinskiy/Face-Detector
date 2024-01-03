function dotProduct(first_vector, second_vector) {
  return first_vector.reduce(
    (acc, _, index) => acc + first_vector[index] * second_vector[index],
    0
  );
}

function magnitude(target_vector) {
  return Math.sqrt(target_vector.reduce((res, value) => res + value ** 2, 0));
}

function getCosineSimilarity(first_vector, second_vector) {
  return (
    dotProduct(first_vector, second_vector) /
    (magnitude(first_vector) * magnitude(second_vector))
  );
}

function getComparisonResultValue(first_vector, second_vector) {
  const vectorProduct = dotProduct(first_vector, second_vector);
  const firstVectorSquaredSum = first_vector.reduce(
    (div, value) => div + value ** 2,
    0
  );
  const secondVectorSquaredSum = second_vector.reduce(
    (div, value) => div + value ** 2,
    0
  );
  const cosineSimilarity = getCosineSimilarity(first_vector, second_vector);

  const vectorsL2Array = first_vector.map(
    (_, index) =>
      (vectorProduct - first_vector[index] * second_vector[index]) /
      Math.sqrt(
        (firstVectorSquaredSum - first_vector[index] ** 2) *
          (secondVectorSquaredSum - second_vector[index] ** 2)
      )
  );

  const modelParameters = 512;

  const phi_array = vectorsL2Array.map(
    (L2) => modelParameters * cosineSimilarity - (modelParameters - 1) * L2
  );

  return phi_array.map((phi, index) =>
    Math.max(
      (100 * Math.min(phi, vectorsL2Array[index])) /
        Math.max(phi, vectorsL2Array[index]),
      0
    )
  );
}

function getComparisonDetails(first_vector, second_vector) {
  const result = {
    identical: 0,
    strongly_related: 0,
    weakly_related: 0,
    neutral: 0,
    unrelated: 0,
    distance: 0,
  };

  const featureComparisonValues = getComparisonResultValue(
    first_vector,
    second_vector
  );

  featureComparisonValues.forEach((val) => {
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
  });

  return result;
}

module.exports = {
  getCosineSimilarity,
  getComparisonDetails,
};
