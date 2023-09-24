const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

function getPagination(query) {
  const limit = +query.limit || DEFAULT_LIMIT;
  const page = +query.page || DEFAULT_PAGE;
  const skip = (page - 1) * limit;
  return {
    limit,
    skip,
    getMetaData: (total) => getMetaData.call(this, skip, limit, total),
  };
}

function getMetaData(skip, limit, total) {
  const hasPrev = !!skip;
  const hasNext = skip + limit < total;
  const pages = Math.ceil(total / limit);

  return {
    hasPrev,
    hasNext,
    pages,
  };
}

module.exports = {
  getPagination,
};
