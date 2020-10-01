export default query => {
  if (!query || query === "") {
    return "";
  }

  if (Object.keys(query).length === 0 && query.constructor === Object) {
    return "";
  }

  const params = [];
  const queries = [];

  for (var prop in query) {
    const name = prop;
    let value = "";

    if (name === "q") {
      for (var prop2 in query[name]) {
        const name2 = prop2;
        const value2 = query[name][name2];
        queries.push(`${name2}:${value2}`);
      }
      value = queries.join(",");
    } else {
      value = query[name];
    }

    params.push(`${name}=${value}`);
  }

  return "?" + params.join("&");
};
