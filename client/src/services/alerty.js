import swal from "sweetalert";

export default (title, description = null, type = "success", button = null) => {
  var config = {};
  if (title) {
    config.title = title;
  }
  if (description) {
    config.text = description;
  }
  if (type) {
    config.icon = type;
  }
  if (button) {
    config.button = button;
  }

  if (type === "danger") {
    config.icon = "warning";
    config.buttons = true;
    config.dangerMode = true;
    delete config.button;
  }

  return swal(config);
};
