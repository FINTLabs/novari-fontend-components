import{r as f,j as e}from"./iframe-C9GtWCFt.js";import"./preload-helper-PPVm8Dsz.js";const c=({maxValue:s,value:t,firstColor:a="#7F78E8",secondColor:n="#6B133D"})=>{const i=f.useId(),d=Math.floor(t/s*100),l=2*Math.PI*56,p=l*(1-t/s),u=()=>`inset 2px 2px 6px -1px ${a}`,h=()=>`2px 2px 6px -1px ${n}`;return e.jsxs("div",{style:{position:"relative",height:"128px",width:"128px"},children:[e.jsx("div",{style:{borderRadius:"100%",boxShadow:h(),padding:"16px",height:"128px",width:"128px"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"100%",boxShadow:u(),height:"96px",width:"96px"},children:e.jsxs("p",{style:{fontSize:"32px",paddingLeft:"8px"},children:[d,"%"]})})}),e.jsxs("svg",{xmlns:"https://www.w3.org/200/svg",version:"1.1",width:"128px",height:"128px",style:{position:"absolute",top:0,left:0},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:i,children:[e.jsx("stop",{offset:"0%",stopColor:n}),e.jsx("stop",{offset:"100%",stopColor:a})]})}),e.jsx("g",{transform:"scale(-1,1) translate(-128,0)",children:e.jsx("circle",{cx:"64",cy:"64",r:"56",strokeLinecap:"round",fill:"none",stroke:`url(#${i})`,strokeDasharray:l,strokeDashoffset:p,strokeWidth:"16px",transform:"rotate(-90 64 64)"})})]})]})};c.__docgenInfo={description:"",methods:[],displayName:"NovariCircularProgressBar",props:{maxValue:{required:!0,tsType:{name:"number"},description:""},value:{required:!0,tsType:{name:"number"},description:""},firstColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#7F78E8"',computed:!1}},secondColor:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"#6B133D"',computed:!1}}}};const g={title:"Components/NovariCircularProgressBar",component:c,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile component that shows progress and percentage of two values given. It calculates the percentage of **value** from **maxValue** and displays the rounded down percentage while visualizing the progression through the circle. "}}},args:{maxValue:54,value:24}},o={parameters:{docs:{codePanel:!0,description:{story:"These are the colors the component will default to if colors aren't specified: Novari Blålilla and Burgunder."}}}},r={parameters:{docs:{codePanel:!0,description:{story:"You may of course choose any colors you see fit for your application, like for example the Novari Beige and Korall as shown here. Both the Progression Circle itself and the shadow around it will take on the colors you desire. firstColor specifies the color and shadow on top, and secondColor specifies the bottom."}}},args:{maxValue:300,value:299,firstColor:"#F8ECDC",secondColor:"#F76650"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      codePanel: true,
      description: {
        story: "These are the colors the component will default to if colors aren't specified:" + ' Novari Blålilla and Burgunder.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      codePanel: true,
      description: {
        story: 'You may of course choose any colors you see fit for your application, like for example the' + ' Novari Beige and Korall as shown here. Both the Progression Circle itself and the shadow' + ' around it will take on the colors you desire. firstColor specifies the color and shadow on' + ' top, and secondColor specifies the bottom.'
      }
    }
  },
  args: {
    maxValue: 300,
    value: 299,
    firstColor: '#F8ECDC',
    secondColor: '#F76650'
  }
}`,...r.parameters?.docs?.source}}};const y=["Default","Custom"];export{r as Custom,o as Default,y as __namedExportsOrder,g as default};
