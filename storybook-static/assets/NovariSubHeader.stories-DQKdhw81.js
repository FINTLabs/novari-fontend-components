import{j as e}from"./iframe-C9GtWCFt.js";import{H as u}from"./VStack-gQ2fOSoJ.js";import"./useId-BxoADsoD.js";import{B as o}from"./Box-CI7GTshJ.js";import{H}from"./Label-DpB5uiKT.js";import{B as x}from"./Button-UzCYcQ_b.js";import{A as s,N as L}from"./NovariHeader-CG4FFN_1.js";import{S as V}from"./ChevronDown-ChZ9QaOW.js";import{S as t}from"./Select-DS1Wsu_N.js";import"./preload-helper-PPVm8Dsz.js";import"./BasePrimitive-DyjfZN5O.js";import"./i18n.hooks-B4P7w0Ue.js";import"./composeEventHandlers-krbYd5LM.js";import"./useFormField-8b588JVz.js";import"./index-BB_C-hE4.js";import"./index-DgqNm8q3.js";import"./useId-CIodEEcI.js";import"./owner-Cl3CaANg.js";const w=({appName:r,width:f,noSpacer:j,menu:k,onMenuClick:v,children:y})=>{const N=f||"1140px";return e.jsxs(e.Fragment,{children:[j?null:e.jsx("div",{style:{width:"100%",borderBottom:"1px solid rgba(107, 19, 61, 0.3)"}}),e.jsx(u,{style:{display:"flex",justifyContent:"center",backgroundColor:"var(--a-bg-subtle)",height:"42px",width:"100%",textAlign:"center"},children:e.jsxs(u,{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"100%",width:N},children:[r?e.jsx(o,{style:{display:"flex",alignItems:"center"},children:e.jsx(H,{size:"medium",style:{color:"var(--a-surface-alt-3-moderate)"},children:r})}):null,e.jsx(u,{gap:"2",children:k.map((a,m)=>{if(Array.isArray(a)){const[h,p]=a;return e.jsx(x,{size:"small",variant:"tertiary-neutral",onClick:()=>v?.(p),children:h},m)}else return e.jsxs(s,{children:[e.jsx(s.Trigger,{children:e.jsx(x,{size:"small",variant:"tertiary-neutral",icon:e.jsx(V,{"aria-hidden":!0}),iconPosition:"right",children:a.label??`Meny ${m+1}`})}),e.jsx(s.Content,{children:a.items.map(({label:h,action:p,icon:S,disabled:b},K)=>e.jsx(s.Item,{onSelect:()=>!b&&v?.(p),disabled:b,icon:S,children:h},K))})]},m)})}),y]})}),e.jsx("div",{style:{width:"100%",borderBottom:"1px solid rgba(107, 19, 61, 0.1)"}})]})};w.__docgenInfo={description:"",methods:[],displayName:"NovariSubHeader",props:{appName:{required:!1,tsType:{name:"string"},description:""},width:{required:!1,tsType:{name:"string"},description:""},noSpacer:{required:!1,tsType:{name:"boolean"},description:""},menu:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:`(
    | [string, string]
    | {
          label?: string;
          items: {
              label: string;
              action: string;
              icon?: React.ReactNode;
              disabled?: boolean;
          }[];
      }
)[]`},description:""},onMenuClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(action: string) => void",signature:{arguments:[{type:{name:"string"},name:"action"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const G={title:"Components/NovariSubHeader",component:w,tags:["autodocs"],parameters:{layout:"Fullscreen",docs:{description:{component:"A second header for the sub-pages that might need new navigation of their own. Looks great directly underneath NovariHeader. The menu works just like the one in the main header."}}},args:{appName:"FintApp",width:"750px",menu:[["Dashboard","/"],["Kontrakter","/Kontrakter"],["Hendelser","/hendelser"],["Konsumere","/Konsumere"],["ProviderError","/providerFeil"]]},decorators:[r=>e.jsxs(o,{children:[e.jsx(r,{}),e.jsx("div",{className:"min-h-50"})]})]},g=()=>e.jsx(L,{showLogoWithTitle:!0,menu:[],appName:"FINT Kunde Portal",onMenuClick:()=>console.log("menu click"),onLogin:()=>console.log("login"),isLoggedIn:!0,onLogout:()=>console.log("logout"),displayName:"Ola Nordmann",children:e.jsxs(t,{hideLabel:!0,label:"wdasdwadsd",size:"small",className:"p-2",children:[e.jsx("option",{value:"",children:"- Velg land -"}),e.jsx("option",{value:"norge",children:"Norge"}),e.jsx("option",{value:"sverige",children:"Sverige"}),e.jsx("option",{value:"danmark",children:"Danmark"})]})}),n={parameters:{docs:{description:{story:""}}}},i={parameters:{docs:{description:{story:"The sub header is by default made up of two elements, the title and the menu, but You are free to add more elements to it in the form of children. The component is built in such a way that the elements take up the entire dedicated width with space between them."}}},args:{menu:[["Kontrakter","/Kontrakter"],["Hendelser","/hendelser"],["Konsumere","/Konsumere"],["ProviderError","/providerFeil"]],children:e.jsxs(t,{label:"Velg bostedsland",hideLabel:!0,size:"small",className:"subHeader-select",children:[e.jsx("option",{value:"",children:"- Velg land -"}),e.jsx("option",{value:"norge",children:"Norge"}),e.jsx("option",{value:"sverige",children:"Sverige"}),e.jsx("option",{value:"danmark",children:"Danmark"})]})}},l={parameters:{docs:{description:{story:"Looks even better when it has the full width of a website. You are free to choose the width the elements of the sub header will fill. If you don't enter any width, the default was selected to fit very well with an Aksel Page with gutters and width=lg."}}},args:{menu:[["Kontrakter","/Kontrakter"],["Hendelser","/hendelser"],["Konsumere","/Konsumere"],["ProviderError","/providerFeil"]],children:e.jsxs(t,{label:"Velg bostedsland",hideLabel:!0,size:"small",className:"subHeader-select",children:[e.jsx("option",{value:"",children:"- Velg land -"}),e.jsx("option",{value:"norge",children:"Norge"}),e.jsx("option",{value:"sverige",children:"Sverige"}),e.jsx("option",{value:"danmark",children:"Danmark"})]})},decorators:[r=>e.jsxs(o,{children:[g(),e.jsx(r,{}),e.jsx("div",{className:"min-h-50"})]})]},d={parameters:{docs:{description:{story:"Looks even better when it has the full width of a website!"}}},args:{noSpacer:!0,menu:[["Kontrakter","/Kontrakter"],["Hendelser","/hendelser"],["Konsumere","/Konsumere"],["ProviderError","/providerFeil"]],children:e.jsxs(t,{label:"Velg bostedsland",hideLabel:!0,size:"small",className:"subHeader-select",children:[e.jsx("option",{value:"",children:"- Velg land -"}),e.jsx("option",{value:"norge",children:"Norge"}),e.jsx("option",{value:"sverige",children:"Sverige"}),e.jsx("option",{value:"danmark",children:"Danmark"})]})},decorators:[r=>e.jsxs(o,{children:[g(),e.jsx(r,{}),e.jsx("div",{className:"min-h-50"})]})]},c={parameters:{docs:{description:{story:"You of course have the option to not have an appName in the sub header."}}},args:{appName:"",menu:[["Dashboard","/"],["Kontrakter","/Kontrakter"],["Hendelser","/hendelser"],["Konsumere","/Konsumere"],["ProviderError","/providerFeil"]],children:e.jsxs(t,{label:"Velg bostedsland",hideLabel:!0,size:"small",className:"subHeaderBg",children:[e.jsx("option",{value:"",children:"- Velg land -"}),e.jsx("option",{value:"norge",children:"Norge"}),e.jsx("option",{value:"sverige",children:"Sverige"}),e.jsx("option",{value:"danmark",children:"Danmark"})]})},decorators:[r=>e.jsxs(o,{children:[g(),e.jsx(r,{}),e.jsx("div",{className:"min-h-50"})]})]};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The sub header is by default made up of two elements, the title and the menu, but You are' + ' free to add more elements to it in the form of children. The component is built in such a way' + ' that the elements take up the entire dedicated width with space between them.'
      }
    }
  },
  args: {
    menu: [['Kontrakter', '/Kontrakter'], ['Hendelser', '/hendelser'], ['Konsumere', '/Konsumere'], ['ProviderError', '/providerFeil']],
    children: <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Looks even better when it has the full width of a website. You are free to choose the width' + " the elements of the sub header will fill. If you don't enter any width, the default was" + ' selected to fit very well with an Aksel Page with gutters and width=lg.'
      }
    }
  },
  args: {
    menu: [['Kontrakter', '/Kontrakter'], ['Hendelser', '/hendelser'], ['Konsumere', '/Konsumere'], ['ProviderError', '/providerFeil']],
    children: <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
  },
  decorators: [Story => <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>]
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Looks even better when it has the full width of a website!'
      }
    }
  },
  args: {
    noSpacer: true,
    menu: [['Kontrakter', '/Kontrakter'], ['Hendelser', '/hendelser'], ['Konsumere', '/Konsumere'], ['ProviderError', '/providerFeil']],
    children: <Select label="Velg bostedsland" hideLabel size="small" className="subHeader-select">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
  },
  decorators: [Story => <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>]
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'You of course have the option to not have an appName in the sub header.'
      }
    }
  },
  args: {
    appName: '',
    menu: [['Dashboard', '/'], ['Kontrakter', '/Kontrakter'], ['Hendelser', '/hendelser'], ['Konsumere', '/Konsumere'], ['ProviderError', '/providerFeil']],
    children: <Select label="Velg bostedsland" hideLabel size="small" className="subHeaderBg">
                <option value="">- Velg land -</option>
                <option value="norge">Norge</option>
                <option value="sverige">Sverige</option>
                <option value="danmark">Danmark</option>
            </Select>
  },
  decorators: [Story => <Box>
                {mockNovariHeader()}
                <Story />
                <div className="min-h-50"></div>
            </Box>]
}`,...c.parameters?.docs?.source}}};const J=["Default","withChild","withNovariHeader","withoutSpacer","withoutAppName"];export{n as Default,J as __namedExportsOrder,G as default,i as withChild,l as withNovariHeader,c as withoutAppName,d as withoutSpacer};
