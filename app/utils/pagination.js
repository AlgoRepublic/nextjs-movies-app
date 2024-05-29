export const pagyParams = (page, perPage) => {
  page = parseInt(page, 10) || 1;
  perPage = parseInt(perPage, 10) || 12;

  page = page < 1 ? 1 : page;
  perPage = perPage < 1 ? 12 : perPage;

  return { page, perPage };
};

export const pagyRes = (records, count, page, perPage) => {
  const params = pagyParams(page, perPage);

  page = params.page;
  perPage = params.perPage;

  return {
    metadata: {
      count: count || 0,
      page,
      perPage: perPage,
    },
    records: records || [],
  };
};
