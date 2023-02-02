declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "*.css" {
  const style: string;
  export default style;
}

declare module "*.scss" {
  const style: string;
  export default style;
}

declare module "*.json" {
  const value: any;
  export default value;
}
