/**
 * shallow comparing of two object
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const shallowComparing = (obj1, obj2) => {
  if (Object.keys(obj1).length === 0) return false;

  for(let prop in obj1) {
    if(obj1[prop] !== obj2[prop]) {
      return false;
    }
  }
  return true;
};