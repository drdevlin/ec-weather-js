const nestedProp = (obj, ...props) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (obj.hasOwnProperty(props[0])) {
    const sliced = props.slice(1);
    return nestedProp(obj[props[0]], ...sliced);
  } else {
    return null;
  }
}

module.exports = nestedProp;