import { shallowMount } from "@vue/test-utils";
import Component from "@/views/pages/orders/Create.vue";

const factory = (values = {}) => {
  return shallowMount(Component, {
    data() {
      return {
        ...values
      };
    }
  });
};

describe("DashboardIndex", () => {
  it("Should match page h1 title", () => {
    const wrapper = factory();
    expect(wrapper.find("h1").text()).toEqual("Criar Ordem de Serviço");
  });
});
