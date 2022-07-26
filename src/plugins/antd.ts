import type { App } from 'vue';

import {
  Button,
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  DatePicker,
  Tabs,
  Tooltip,
  Tag,
  Popover,
  Dropdown,
  Space,
  Tree,
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';
import 'dayjs/locale/zh-cn';

export function setupAntd(app: App<Element>) {
  app
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(Tabs)
    .use(Tooltip)
    .use(Tag)
    .use(Popover)
    .use(Dropdown)
    .use(Space)
    .use(Tree)
    .use(DatePicker);
}
