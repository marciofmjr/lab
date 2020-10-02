import { shallowMount } from "@vue/test-utils";
import Component from "@/views/pages/orders/View.vue";

const factory = (values = {}) => {
  const $route = {
    params: {
      id: "0c1b57d6-36d8-43a6-b2bf-1b9132bd8905"
    }
  };

  return shallowMount(Component, {
    mocks: {
      $route
    },
    data() {
      return {
        ...values
      };
    }
  });
};
describe("DashboardIndex", () => {
  it("Should render order code", () => {
    const wrapper = factory();
    expect(wrapper.find("#code").text()).toEqual(
      "Código de Retirada:  0c1b57d6-36d8-43a6-b2bf-1b9132bd8905"
    );
  });
});
