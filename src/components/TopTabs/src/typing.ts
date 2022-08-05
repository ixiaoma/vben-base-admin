export interface TabProps {
  id: string;
  receiveName: string;
  [key: string]: any;
}

export interface TabInstance {
  setTabProps: (props: Partial<TabProps> | boolean) => void;
  openTabs: (props: Partial<TabProps> | boolean) => void;
}

export interface ReturnMethods extends TabInstance {
  setActiveKey: (activeKey) => void;
}

export type RegisterFn = (tabInstance: TabInstance) => void;

export type UseTabReturnType = [RegisterFn, ReturnMethods];
