var parseExpression = str => {
  var data = str.replace('=', '').split('+');
  return {
    val1: parseInt(data[0]),
    val2: parseInt(data[1])
  };
};

var evaluate = (v1, v2, op) => {
  var final = null;
  switch(op) {
    case '+':
      final = sum(v1, v2);
      break;
  }
  return final;
};

var sum = (v1, v2) => {
    return v1 + v2;
  }

module.exports = {
  parseExpression: parseExpression,
  evaluate: evaluate,
  sum: sum
};
