// 手机号掩码
export function formatPhone(val: string) {
  if(!val){
    return null
  }
  let pat = /(\d{3})\d*(\d{4})/;
  return val ? val.replace(pat, "$1****$2") : '';
}

/**
 *
 * description: 金额转换
 *
 */

const toDecimal2 = (x) => {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return parseFloat(s);
};

// 分转化为元 - 正则解决精度
const regFenToYuan = (fen) => {
  let num = fen;
  num = fen * 0.01;
  num += '';
  const reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  num = num.replace(reg, '$1');
  num = toDecimal2(num);
  return num;
};

// 添加千分位
export const priceToThousands = (num) => {
  num = toDecimal2(num);
  //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
  num = num.toString().replace(/\$|\,/g, '');
  //如果num不是数字，则将num置0，并返回
  if ('' == num || isNaN(num)) {
    return '';
  }
  //如果num是负数，则获取她的符号
  const sign = num.indexOf('-') > 0 ? '-' : '';
  //如果存在小数点，则获取数字的小数部分
  let cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
  cents = cents.length > 1 ? cents : ''; //注意：这里如果是使用change方法不断的调用，小数是输入不了的
  //获取数字的整数数部分
  num = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')) : num;
  //如果没有小数点，整数部分不能以0开头
  // if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
  if ('' == cents) {
    if (num.length > 1 && '0' == num.substr(0, 1)) {
      return '';
    }
  }
  //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
  else {
    if (num.length > 1 && '0' == num.substr(0, 1)) {
      return '';
    }
  }
  //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
  /*
    也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
    字符串长度为0/1/2/3时都不用添加
    字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
   */
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }
  //将数据（符号、整数部分、小数部分）整体组合返回
  return sign + num + cents;
};

//分转元添加千分位
export const regFenToYuanToThousands = (fen) => {
  return priceToThousands(regFenToYuan(fen));
};

// 元转分 - 解决精度问题 yuan:要转换的钱，单位元； digit：转换倍数
export const regYuanToFen = (yuan, digit) => {
  let m = 0,
    s1 = yuan.toString(),
    s2 = digit.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};
