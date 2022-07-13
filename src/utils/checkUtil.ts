import { message } from 'ant-design-vue';
//判断列表是否选中
export function isSelect(list: Array<string | number>, isSingle: Boolean = false) {
  if (!list.length) {
    message.warning('请勾选想要操作的数据');
    return;
  }
  if (isSingle && list.length > 1) {
    message.warning('只能选择一条数据进行操作');
    return;
  }
}
