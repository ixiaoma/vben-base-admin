import type { App } from 'vue';
import { Button } from './Button';
import {
  Layout,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Descriptions,
  Card,
  Popover,
  Radio,
  Divider,
  Select,
  Cascader,
  Modal,
  Dropdown,
  Menu,
  Tabs,
  Empty,
} from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Checkbox)
    .use(Form)
    .use(Row)
    .use(Col)
    .use(Descriptions)
    .use(Card)
    .use(Popover)
    .use(Radio)
    .use(Divider)
    .use(Modal)
    .use(Cascader)
    .use(Select)
    .use(Dropdown)
    .use(Menu)
    .use(Tabs)
    .use(Empty);
}
