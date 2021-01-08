
/* box names that contain only tuples */

/*
  it's difficult to detect these naturally because a list could just be
  disabled maps {
    Ecopoint: Antartica
  }
  which is also a valid gameSetting because of the ":"
*/
export const listNames = Object.freeze([
  'enabled maps',
  'enabled heroes',
  'disabled maps',
  'disabled heroes',
]);

export const hardTypes = {
  listNames,
}