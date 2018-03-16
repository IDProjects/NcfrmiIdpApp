export default (value) => {
    switch (value) {
        case "Abia":
          return require("./states/lgas/Abia");
        case "Adamawa":
          return require("./states/lgas/Adamawa");
        case "Akwa Ibom":
            return require("./states/lgas/Akwa_Ibom");
        case "Anambra":
            return require("./states/lgas/Anambra");
        case "Bauchi":
            return require("./states/lgas/Bauchi");
        default:
            return {};
    }
};
