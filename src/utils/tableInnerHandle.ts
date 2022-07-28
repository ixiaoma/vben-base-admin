import { h } from 'vue';
export type hCssParams = {
  data?: any;
  elCss?: any;
  isEllip?: boolean;
  el?: any;
};
const overflowEllip = {
  width: '100%',
  overflow: 'hidden',
  'text-overflow': 'ellipsis',
  'white-space': 'nowrap',
  '-webkit-overflow': 'hidden',
  '-webkit-text-overflow': 'ellipsis',
  '-webkit-white-space': 'nowrap',
};
export const vueHFn = function (params: hCssParams) {
  const { elCss, data, isEllip = true, el = 'div' } = params;
  const elNeCss = elCss || { title: data, style: isEllip ? overflowEllip : {} };
  return h(el, elNeCss, data);
};
