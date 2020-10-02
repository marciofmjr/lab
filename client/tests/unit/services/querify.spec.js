import querify from "@/services/querify";

it("Given {}, should be querifyed", () => {
  const query = {};
  expect(querify(query)).toEqual("");
});

it("Given { limit: 1, order: 'name', include: 'group' }, should be querifyed", () => {
  const query = {
    limit: 1,
    order: "name",
    include: "group"
  };
  expect(querify(query)).toEqual("?limit=1&order=name&include=group");
});

it("Given { include: 'group' }, should be querifyed", () => {
  const query = {
    include: "group"
  };
  expect(querify(query)).toEqual("?include=group");
});

it("Given { q: { name: 'marcio', email: 'marcio@agrifertil.com' } }, should be querifyed", () => {
  const query = {
    q: {
      name: "marcio",
      email: "marcio@agrifertil.com"
    }
  };
  expect(querify(query)).toEqual("?q=name:marcio,email:marcio@agrifertil.com");
});

it("Given { q: { name: '*via*' } }, should be querifyed", () => {
  const query = {
    q: {
      name: "*via*"
    }
  };
  expect(querify(query)).toEqual("?q=name:*via*");
});
