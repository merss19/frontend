export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    let action = {type: type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action;
  }
}
