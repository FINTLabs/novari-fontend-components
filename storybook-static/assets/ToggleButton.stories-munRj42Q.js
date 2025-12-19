import{r as w,j as y}from"./iframe-C9GtWCFt.js";import{B as h}from"./Button-UzCYcQ_b.js";import"./preload-helper-PPVm8Dsz.js";import"./useId-BxoADsoD.js";import"./i18n.hooks-B4P7w0Ue.js";import"./Label-DpB5uiKT.js";import"./composeEventHandlers-krbYd5LM.js";const d=({label:t,selected:n=!1,onChange:e})=>{const[o,a]=w.useState(n),p=()=>{const u=!o;a(u),e&&e(u)};return y.jsx(h,{size:"small",onClick:p,className:`transition-colors rounded-md px-4 py-2 font-medium ${o?"!bg-[#6B133D] text-white hover:bg-[#500F2D]":"!bg-[#5A51E1] text-white hover:bg-[#4438C1]"}`,children:t})};d.__docgenInfo={description:"",methods:[],displayName:"ToggleButton",props:{label:{required:!0,tsType:{name:"string"},description:""},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(selected: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"selected"}],return:{name:"void"}}},description:""}}};const{expect:s,fn:b,userEvent:g,within:m}=__STORYBOOK_MODULE_TEST__,T={title:"Experimental-Novari/ToggleButton",component:d,tags:["autodocs","experimental"],parameters:{layout:"centered"},args:{label:"Toggle Me",onChange:b()}},c={},i={args:{selected:!0}},l={args:{label:"Click Me"},play:async({args:t,canvasElement:n,step:e})=>{const a=m(n).getByRole("button",{name:/click me/i});await e("Click the button to toggle",async()=>{await g.click(a)}),await e("Verify onChange was called",async()=>{await s(t.onChange).toHaveBeenCalled()}),await e("Click again to toggle back",async()=>{await g.click(a)}),await e("Verify onChange was called twice",async()=>{await s(t.onChange).toHaveBeenCalledTimes(2)})}},r={args:{label:"Toggle Me",selected:!1},play:async({args:t,canvasElement:n,step:e})=>{const a=m(n).getByRole("button",{name:/toggle me/i});await e("Verify button is clickable",async()=>{await s(a).not.toBeDisabled()}),await e("Click the button",async()=>{await g.click(a)}),await e("Verify onChange was called with true",async()=>{await s(t.onChange).toHaveBeenCalledWith(!0)}),await e("Click again to toggle back",async()=>{await g.click(a)}),await e("Verify onChange was called with false",async()=>{await s(t.onChange).toHaveBeenCalledWith(!1)})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    selected: true
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Click Me'
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /click me/i
    });
    await step('Click the button to toggle', async () => {
      await userEvent.click(button);
    });
    await step('Verify onChange was called', async () => {
      await expect(args.onChange).toHaveBeenCalled();
    });
    await step('Click again to toggle back', async () => {
      await userEvent.click(button);
    });
    await step('Verify onChange was called twice', async () => {
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  }
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Toggle Me',
    selected: false
  },
  play: async ({
    args,
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /toggle me/i
    });
    await step('Verify button is clickable', async () => {
      await expect(button).not.toBeDisabled();
    });
    await step('Click the button', async () => {
      await userEvent.click(button);
    });
    await step('Verify onChange was called with true', async () => {
      await expect(args.onChange).toHaveBeenCalledWith(true);
    });
    await step('Click again to toggle back', async () => {
      await userEvent.click(button);
    });
    await step('Verify onChange was called with false', async () => {
      await expect(args.onChange).toHaveBeenCalledWith(false);
    });
  }
}`,...r.parameters?.docs?.source}}};const S=["Default","Selected","Interactive","ToggleBehavior"];export{c as Default,l as Interactive,i as Selected,r as ToggleBehavior,S as __namedExportsOrder,T as default};
