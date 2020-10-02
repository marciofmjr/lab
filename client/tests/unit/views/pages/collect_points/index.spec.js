import { shallowMount } from "@vue/test-utils";
import Component from "@/views/pages/collect_points/Index.vue";

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
    expect(wrapper.find("h1").text()).toEqual("Pontos de Coleta");
  });
});
