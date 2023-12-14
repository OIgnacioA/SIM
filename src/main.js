import PrimeVue from "primevue/config";
import "primevue/resources/themes/nova/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
//import "prismjs/themes/prism-coy.css";
import "./assets/styles/layout.scss";

import { createApp, reactive } from "vue";
import router from "./router";
import { createPinia } from 'pinia'
import AppWrapper from "./AppWrapper.vue";

import AutoComplete from "primevue/autocomplete";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Panel from "primevue/panel";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Message from "primevue/message";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import InputText from 'primevue/inputtext';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

router.beforeEach(function (to, from, next) {
  //window.scrollTo(0, 0);
  next();
});
const pinia = createPinia()
const app = createApp(AppWrapper);

app.config.globalProperties.$appState = reactive({
  theme: "lara-light-indigo",
  darkTheme: false,
});

app.use(router);
app.use(pinia)

app.use(PrimeVue, { ripple: true,unstyled: true });
app.use(ConfirmationService);
app.use(ToastService);

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("badge", BadgeDirective);
app.directive("styleclass", StyleClass);

app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("AutoComplete", AutoComplete);
app.component("Badge", Badge);
app.component("Column", Column);
app.component("Dropdown", Dropdown);
app.component("Divider", Divider);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Panel", Panel);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("InputSwitch", InputSwitch);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Message", Message);
app.component("InputText", InputText);
app.component("Checkbox", InputText);

app.mount("#app");

