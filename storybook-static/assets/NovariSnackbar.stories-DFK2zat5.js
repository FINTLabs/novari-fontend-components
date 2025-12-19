import{r as n,j as e}from"./iframe-C9GtWCFt.js";import{A as H}from"./Alert-BkS1REhG.js";import{H as f}from"./Label-DpB5uiKT.js";import{B as g}from"./Button-UzCYcQ_b.js";import"./preload-helper-PPVm8Dsz.js";import"./useId-BxoADsoD.js";import"./i18n.hooks-B4P7w0Ue.js";import"./useId-CIodEEcI.js";import"./XMark-CQbgC81V.js";import"./composeEventHandlers-krbYd5LM.js";const P={"top-left":{top:"1rem",left:"1rem"},"top-right":{top:"1rem",right:"1rem"},"bottom-left":{bottom:"1rem",left:"1rem"},"bottom-right":{bottom:"1rem",right:"1rem"},"top-center":{top:"1rem",left:"50%",transform:"translateX(-50%)"},"bottom-center":{bottom:"1rem",left:"50%",transform:"translateX(-50%)"}},S=({autoHideDuration:r=4e3,position:m="top-right",className:t="",size:l="small",items:o,maxVisible:a=3})=>{const[i,u]=n.useState([]),[A,p]=n.useState([]),b=n.useRef(new Set),v=n.useRef(new Set);n.useEffect(()=>{u(d=>{if(!o?.length)return b.current.clear(),v.current.clear(),[];const c=new Map(d.map(s=>[s.id,s]));for(const s of o){if(v.current.has(s.id))continue;if(s.open===!1){c.delete(s.id),b.current.delete(s.id),v.current.delete(s.id);continue}const y=c.get(s.id),k=y?{...y,...s}:{...s,open:!0};c.set(s.id,k),b.current.add(s.id)}return Array.from(c.values())})},[o]);const w=n.useMemo(()=>i.filter(d=>(d.show??!0)&&(d.open??!0)),[i]);n.useEffect(()=>{p(d=>{const c=d.filter(x=>w.some(h=>h.id===x.id)),s=Math.max(a-c.length,0);if(s<=0)return c;const y=new Set(c.map(x=>x.id)),k=w.filter(x=>!y.has(x.id)).slice(0,s);return[...c,...k]})},[w,a]);const T=d=>{v.current.add(d),p(c=>c.filter(s=>s.id!==d)),u(c=>c.filter(s=>s.id!==d)),b.current.delete(d),p(c=>{const s=c.filter(h=>h.id!==d),y=Math.max(a-s.length,0);if(y<=0)return s;const k=new Set(s.map(h=>h.id)),x=w.filter(h=>!k.has(h.id)&&h.id!==d).slice(0,y);return[...s,...x]})},I=Math.max(w.length-A.length,0);return e.jsxs("div",{style:{position:"fixed",zIndex:50,transition:"all 0.2s ease-in-out",animation:"fadeIn 0.3s",...P[m]},className:t,"aria-live":"polite","aria-atomic":"false",role:"region",children:[A.map(d=>e.jsx(V,{item:{...d,open:!0},autoHideDuration:r,onCloseItem:T,size:l},d.id)),I>0&&e.jsxs("div",{style:{marginTop:"0.5rem",fontSize:"0.85rem",color:"#6b7280",textAlign:"center",backgroundColor:"#f3f4f6",borderRadius:"0.5rem",padding:"0.5rem"},children:["+",I," more"]})]})},V=({item:r,autoHideDuration:m,onCloseItem:t,size:l})=>(n.useEffect(()=>{if(!r.open)return;const o=setTimeout(()=>t(r.id),m);return()=>clearTimeout(o)},[r.id,r.open,m,t]),r.open?e.jsxs(H,{variant:r.variant??"info",size:l||"small",style:{position:"relative",marginBottom:"0.5rem"},closeButton:!0,onClose:()=>t(r.id),children:[r.header&&e.jsx(f,{spacing:!0,size:"small",level:"3",children:r.header}),r.message]}):null);S.__docgenInfo={description:"",methods:[],displayName:"NovariSnackbar",props:{autoHideDuration:{required:!1,tsType:{name:"number"},description:"Auto-close duration in ms",defaultValue:{value:"4000",computed:!1}},position:{required:!1,tsType:{name:"union",raw:`| 'top-left'
| 'top-right'
| 'bottom-left'
| 'bottom-right'
| 'top-center'
| 'bottom-center'`,elements:[{name:"literal",value:"'top-left'"},{name:"literal",value:"'top-right'"},{name:"literal",value:"'bottom-left'"},{name:"literal",value:"'bottom-right'"},{name:"literal",value:"'top-center'"},{name:"literal",value:"'bottom-center'"}]},description:"Screen position",defaultValue:{value:"'top-right'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Wrapper class",defaultValue:{value:"''",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"Size of each alert",defaultValue:{value:"'small'",computed:!1}},items:{required:!0,tsType:{name:"Array",elements:[{name:"NovariSnackbarItem"}],raw:"NovariSnackbarItem[]"},description:"New items to enqueue; the component owns lifecycle thereafter"},maxVisible:{required:!1,tsType:{name:"number"},description:"Max concurrently visible alerts (default 3)",defaultValue:{value:"3",computed:!1}}}};const F=[{id:"success-1",variant:"success",message:"Du kan nå legge til tilganger og komponenter."},{id:"info-1",variant:"info",message:"Det kan oppstå noe ustabilitet mellom 22:00 og 23:00."},{id:"warning-1",variant:"warning",message:"Noen felter er ikke fylt ut. Du må rette dette før innsending."},{id:"error-1",variant:"error",message:"Serveren svarte med en feil. Prøv igjen om noen minutter."},{id:"error-2",variant:"error",message:"Navnet må være unikt og følge riktig format."}],q=[{id:"success-1",variant:"success",header:"Klienten ble opprettet",message:"Du kan nå legge til tilganger og komponenter."},{id:"info-1",variant:"info",header:"Tjenesten oppdateres i kveld",message:"Det kan oppstå noe ustabilitet mellom 22:00 og 23:00."},{id:"warning-1",variant:"warning",header:"Manglende metadata",message:"Noen felter er ikke fylt ut. Du må rette dette før innsending."},{id:"error-1",variant:"error",header:"Feil ved lagring",message:"Serveren svarte med en feil. Prøv igjen om noen minutter."},{id:"error-2",variant:"error",header:"Ugyldig klientnavn",message:"Navnet må være unikt og følge riktig format."}],E=({id:r,message:m,variant:t,header:l,size:o,onCloseItem:a})=>e.jsxs(H,{variant:t??"info",size:o||"small",style:{position:"relative",marginBottom:"0.5rem"},closeButton:!0,onClose:()=>a(r),children:[l&&e.jsx(f,{spacing:!0,size:"small",level:"3",children:l}),m]});E.__docgenInfo={description:"",methods:[],displayName:"NovariSnackbarItem",props:{id:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:"Message"},variant:{required:!1,tsType:{name:"union",raw:"'info' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"Visual style one of : 'info' | 'success' | 'warning' | 'error'"},header:{required:!1,tsType:{name:"string"},description:"Optional header"},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"}]},description:"@ignore"},onCloseItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:"@ignore"}}};const G={title:"Components/NovariSnackbar",component:S,subcomponents:{NovariSnackbarItem:E},tags:["autodocs"],decorators:[r=>e.jsxs("div",{style:{padding:"2rem",minHeight:"100vh"},children:[e.jsx(f,{size:"small",style:{marginBottom:"1rem"},children:"Interactive Examples - Refresh page to see snackbars in action"}),e.jsx(r,{})]})],parameters:{layout:"fullscreen",docs:{description:{component:`


A flexible notification system for displaying alerts, messages, and feedback to users. The component automatically manages a queue of notifications and displays them in a fixed position on the screen.

## Key Features

- **Auto-queue management**: Automatically handles multiple notifications
- **Flexible positioning**: 6 different screen positions
- **Auto-hide**: Configurable auto-close duration
- **Multiple variants**: Success, info, warning, and error styles
- **Accessibility**: Built with ARIA live regions for screen readers

## Basic Usage

\`\`\`tsx
import { useState } from 'react';
import { NovariSnackbar, NovariSnackbarItem } from '@novari/components';

function MyComponent() {
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const showSuccess = () => {
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'success',
      message: 'Operation completed successfully!',
      header: 'Success'
    }]);
  };

  return (
    <>
      <button onClick={showSuccess}>Show Success</button>
      <NovariSnackbar items={alerts} />
    </>
  );
}
\`\`\`
                `}}}},B={args:{items:[],autoHideDuration:4e3,position:"top-right",size:"small"},render:()=>{const[r,m]=n.useState([]),t=(o,a,i)=>{const u={id:Date.now().toString(),variant:o,message:a,header:i};m(A=>[...A,u])},l=()=>m([]);return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(f,{size:"medium",style:{marginBottom:"1rem"},children:"Basic Usage Example"}),e.jsx("p",{style:{marginBottom:"1rem"},children:"Copy this code to get started with NovariSnackbar:"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"1rem",borderRadius:"4px",fontSize:"14px",overflow:"auto",marginBottom:"1rem"},children:`import { useState } from 'react';
import { NovariSnackbar, NovariSnackbarItem } from '@novari/components';

function MyComponent() {
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const addAlert = (variant, message, header) => {
    const newAlert = {
      id: Date.now().toString(),
      variant,
      message,
      header,
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  return (
    <>
      <button onClick={() => addAlert('success', 'Success message!', 'Success')}>
        Show Success
      </button>
      <NovariSnackbar items={alerts} />
    </>
  );
}`})]}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap"},children:[e.jsx(g,{onClick:()=>t("success","Operation completed successfully!","Success"),children:"Success"}),e.jsx(g,{onClick:()=>t("info","Here is some useful information.","Info"),children:"Info"}),e.jsx(g,{onClick:()=>t("warning","Please check your input.","Warning"),children:"Warning"}),e.jsx(g,{onClick:()=>t("error","Something went wrong!","Error"),children:"Error"}),e.jsx(g,{variant:"secondary",onClick:l,children:"Clear All"})]}),e.jsx(S,{items:r})]})},parameters:{docs:{story:{height:"60vh"}}}},j={args:{items:[],autoHideDuration:4e3,position:"top-right",size:"small"},render:()=>{const[r,m]=n.useState([]),[t,l]=n.useState("top-right"),o=[{value:"top-left",label:"Top Left"},{value:"top-right",label:"Top Right"},{value:"top-center",label:"Top Center"},{value:"bottom-left",label:"Bottom Left"},{value:"bottom-right",label:"Bottom Right"},{value:"bottom-center",label:"Bottom Center"}],a=()=>{const i={id:Date.now().toString(),variant:"info",message:`Alert positioned at ${t}`,header:"Position Demo"};m(u=>[...u,i])};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(f,{size:"medium",style:{marginBottom:"1rem"},children:"Different Positions"}),e.jsx("p",{style:{marginBottom:"1rem"},children:"Configure the position of snackbars on the screen:"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"1rem",borderRadius:"4px",fontSize:"14px",overflow:"auto",marginBottom:"1rem"},children:`<NovariSnackbar 
  items={alerts} 
  position="top-left"  // or top-right, top-center, bottom-left, bottom-right, bottom-center
/>`})]}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{marginRight:"1rem"},children:"Position:"}),e.jsx("select",{value:t,onChange:i=>l(i.target.value),style:{marginRight:"1rem",padding:"0.5rem"},children:o.map(i=>e.jsx("option",{value:i.value,children:i.label},i.value))}),e.jsx(g,{onClick:a,children:"Add Alert"})]}),e.jsx(S,{items:r,position:t})]})},parameters:{docs:{story:{height:"60vh"}}}},C={args:{items:[],autoHideDuration:4e3,position:"top-right",size:"small"},render:()=>{const[r,m]=n.useState([]),[t,l]=n.useState({name:"",email:""}),o=()=>{const a=[];t.name.trim()||a.push({id:"name-error",variant:"error",message:"Name is required",header:"Validation Error"}),t.email.trim()?t.email.includes("@")||a.push({id:"email-format-error",variant:"error",message:"Please enter a valid email address",header:"Validation Error"}):a.push({id:"email-error",variant:"error",message:"Email is required",header:"Validation Error"}),a.length===0&&a.push({id:"success",variant:"success",message:"Form submitted successfully!",header:"Success"}),m(i=>[...i,...a])};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(f,{size:"medium",style:{marginBottom:"1rem"},children:"Form Validation Example"}),e.jsx("p",{style:{marginBottom:"1rem"},children:"Real-world example of using snackbars for form validation:"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"1rem",borderRadius:"4px",fontSize:"14px",overflow:"auto",marginBottom:"1rem"},children:`const validateForm = () => {
  const newAlerts = [];
  
  if (!formData.name.trim()) {
    newAlerts.push({
      id: 'name-error',
      variant: 'error',
      message: 'Name is required',
      header: 'Validation Error',
    });
  }
  
  if (newAlerts.length === 0) {
    newAlerts.push({
      id: 'success',
      variant: 'success',
      message: 'Form submitted successfully!',
      header: 'Success',
    });
  }

  setAlerts(prev => [...prev, ...newAlerts]);
};`})]}),e.jsxs("div",{style:{maxWidth:"400px"},children:[e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.5rem"},children:"Name:"}),e.jsx("input",{type:"text",value:t.name,onChange:a=>l(i=>({...i,name:a.target.value})),style:{width:"100%",padding:"0.5rem",border:"1px solid #ccc",borderRadius:"4px"}})]}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.5rem"},children:"Email:"}),e.jsx("input",{type:"email",value:t.email,onChange:a=>l(i=>({...i,email:a.target.value})),style:{width:"100%",padding:"0.5rem",border:"1px solid #ccc",borderRadius:"4px"}})]}),e.jsx(g,{onClick:o,children:"Submit Form"})]}),e.jsx(S,{items:r})]})},parameters:{docs:{story:{height:"60vh"}}}},D={args:{items:[],autoHideDuration:4e3,position:"top-right",size:"small"},render:()=>{const[r,m]=n.useState([]),[t,l]=n.useState(!1),o=async a=>{l(!0),await new Promise(u=>setTimeout(u,1500));const i={id:Date.now().toString(),variant:a?"success":"error",message:a?"Data saved successfully!":"Failed to save data. Please try again.",header:a?"Success":"Error"};m(u=>[...u,i]),l(!1)};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(f,{size:"medium",style:{marginBottom:"1rem"},children:"API Response Example"}),e.jsx("p",{style:{marginBottom:"1rem"},children:"Example of handling API responses with snackbars:"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"1rem",borderRadius:"4px",fontSize:"14px",overflow:"auto",marginBottom:"1rem"},children:`const handleApiResponse = async () => {
  setLoading(true);
  
  try {
    const response = await fetch('/api/data');
    const result = await response.json();
    
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'success',
      message: 'Data saved successfully!',
      header: 'Success',
    }]);
  } catch (error) {
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'error',
      message: 'Failed to save data. Please try again.',
      header: 'Error',
    }]);
  }
  
  setLoading(false);
};`})]}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx(g,{onClick:()=>o(!0),loading:t,disabled:t,children:"Simulate Success"}),e.jsx(g,{variant:"danger",onClick:()=>o(!1),loading:t,disabled:t,children:"Simulate Error"})]}),e.jsx(S,{items:r})]})},parameters:{docs:{story:{height:"60vh"}}}},z={args:{items:[],autoHideDuration:4e3,position:"top-right",size:"small"},render:()=>{const[r,m]=n.useState([]),[t,l]=n.useState(4e3),[o,a]=n.useState(3),[i,u]=n.useState("small"),A=()=>{const p=Array.from({length:5},(b,v)=>({id:`alert-${Date.now()}-${v}`,variant:["success","info","warning","error"][v%4],message:`Alert number ${v+1}`,header:`Alert ${v+1}`}));m(b=>[...b,...p])};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:"2rem"},children:[e.jsx(f,{size:"medium",style:{marginBottom:"1rem"},children:"Configuration Options"}),e.jsx("p",{style:{marginBottom:"1rem"},children:"Customize the snackbar behavior with various options:"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"1rem",borderRadius:"4px",fontSize:"14px",overflow:"auto",marginBottom:"1rem"},children:`<NovariSnackbar 
  items={alerts}
  autoHideDuration={4000}  // Auto-close after 4 seconds
  maxVisible={3}           // Show max 3 alerts at once
  size="small"             // or "medium"
  position="top-right"     // Screen position
/>`})]}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{marginRight:"1rem"},children:"Auto-hide duration (ms):"}),e.jsx("input",{type:"number",value:t,onChange:p=>l(Number(p.target.value)),style:{padding:"0.5rem",border:"1px solid #ccc",borderRadius:"4px"}})]}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{marginRight:"1rem"},children:"Max visible:"}),e.jsx("input",{type:"number",value:o,onChange:p=>a(Number(p.target.value)),style:{padding:"0.5rem",border:"1px solid #ccc",borderRadius:"4px"}})]}),e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("label",{style:{marginRight:"1rem"},children:"Size:"}),e.jsxs("select",{value:i,onChange:p=>u(p.target.value),style:{padding:"0.5rem",border:"1px solid #ccc",borderRadius:"4px"},children:[e.jsx("option",{value:"small",children:"Small"}),e.jsx("option",{value:"medium",children:"Medium"})]})]}),e.jsx(g,{onClick:A,children:"Add 5 Alerts"})]}),e.jsx(S,{items:r,autoHideDuration:t,maxVisible:o,size:i})]})},parameters:{docs:{story:{height:"60vh"}}}},N={args:{items:q,autoHideDuration:4e3,position:"top-right",size:"small"},parameters:{docs:{story:{height:"40vh"}}}},R={args:{items:F,autoHideDuration:4e3,position:"top-right",size:"small"},parameters:{docs:{story:{height:"40vh"}}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  render: () => {
    const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
    const addAlert = (variant: SnackbarItemType['variant'], message: string, header?: string) => {
      const newAlert: SnackbarItemType = {
        id: Date.now().toString(),
        variant,
        message,
        header
      };
      setAlerts(prev => [...prev, newAlert]);
    };
    const clearAll = () => setAlerts([]);
    return <div>
                <div style={{
        marginBottom: '2rem'
      }}>
                    <Heading size="medium" style={{
          marginBottom: '1rem'
        }}>
                        Basic Usage Example
                    </Heading>
                    <p style={{
          marginBottom: '1rem'
        }}>
                        Copy this code to get started with NovariSnackbar:
                    </p>
                    <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '14px',
          overflow: 'auto',
          marginBottom: '1rem'
        }}>
          {\`import { useState } from 'react';
import { NovariSnackbar, NovariSnackbarItem } from '@novari/components';

function MyComponent() {
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const addAlert = (variant, message, header) => {
    const newAlert = {
      id: Date.now().toString(),
      variant,
      message,
      header,
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  return (
    <>
      <button onClick={() => addAlert('success', 'Success message!', 'Success')}>
        Show Success
      </button>
      <NovariSnackbar items={alerts} />
    </>
  );
}\`}
                    </pre>
                </div>

                <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
                    <Button onClick={() => addAlert('success', 'Operation completed successfully!', 'Success')}>
                        Success
                    </Button>
                    <Button onClick={() => addAlert('info', 'Here is some useful information.', 'Info')}>
                        Info
                    </Button>
                    <Button onClick={() => addAlert('warning', 'Please check your input.', 'Warning')}>
                        Warning
                    </Button>
                    <Button onClick={() => addAlert('error', 'Something went wrong!', 'Error')}>
                        Error
                    </Button>
                    <Button variant="secondary" onClick={clearAll}>
                        Clear All
                    </Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>;
  },
  parameters: {
    docs: {
      story: {
        height: '60vh'
      }
    }
  }
}`,...B.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  render: () => {
    const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
    const [position, setPosition] = useState<NovariSnackbarPosition>('top-right');
    const positions: Array<{
      value: NovariSnackbarPosition;
      label: string;
    }> = [{
      value: 'top-left',
      label: 'Top Left'
    }, {
      value: 'top-right',
      label: 'Top Right'
    }, {
      value: 'top-center',
      label: 'Top Center'
    }, {
      value: 'bottom-left',
      label: 'Bottom Left'
    }, {
      value: 'bottom-right',
      label: 'Bottom Right'
    }, {
      value: 'bottom-center',
      label: 'Bottom Center'
    }];
    const addAlert = () => {
      const newAlert: SnackbarItemType = {
        id: Date.now().toString(),
        variant: 'info',
        message: \`Alert positioned at \${position}\`,
        header: 'Position Demo'
      };
      setAlerts(prev => [...prev, newAlert]);
    };
    return <div>
                <div style={{
        marginBottom: '2rem'
      }}>
                    <Heading size="medium" style={{
          marginBottom: '1rem'
        }}>
                        Different Positions
                    </Heading>
                    <p style={{
          marginBottom: '1rem'
        }}>
                        Configure the position of snackbars on the screen:
                    </p>
                    <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '14px',
          overflow: 'auto',
          marginBottom: '1rem'
        }}>
          {\`<NovariSnackbar 
  items={alerts} 
  position="top-left"  // or top-right, top-center, bottom-left, bottom-right, bottom-center
/>\`}
                    </pre>
                </div>

                <div style={{
        marginBottom: '1rem'
      }}>
                    <label style={{
          marginRight: '1rem'
        }}>Position:</label>
                    <select value={position} onChange={e => setPosition(e.target.value as NovariSnackbarPosition)} style={{
          marginRight: '1rem',
          padding: '0.5rem'
        }}>
                        {positions.map(pos => <option key={pos.value} value={pos.value}>{pos.label}</option>)}
                    </select>
                    <Button onClick={addAlert}>Add Alert</Button>
                </div>

                <NovariSnackbar items={alerts} position={position} />
            </div>;
  },
  parameters: {
    docs: {
      story: {
        height: '60vh'
      }
    }
  }
}`,...j.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  render: () => {
    const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
    const [formData, setFormData] = useState({
      name: '',
      email: ''
    });
    const validateForm = () => {
      const newAlerts: SnackbarItemType[] = [];
      if (!formData.name.trim()) {
        newAlerts.push({
          id: 'name-error',
          variant: 'error',
          message: 'Name is required',
          header: 'Validation Error'
        });
      }
      if (!formData.email.trim()) {
        newAlerts.push({
          id: 'email-error',
          variant: 'error',
          message: 'Email is required',
          header: 'Validation Error'
        });
      } else if (!formData.email.includes('@')) {
        newAlerts.push({
          id: 'email-format-error',
          variant: 'error',
          message: 'Please enter a valid email address',
          header: 'Validation Error'
        });
      }
      if (newAlerts.length === 0) {
        newAlerts.push({
          id: 'success',
          variant: 'success',
          message: 'Form submitted successfully!',
          header: 'Success'
        });
      }
      setAlerts(prev => [...prev, ...newAlerts]);
    };
    return <div>
                <div style={{
        marginBottom: '2rem'
      }}>
                    <Heading size="medium" style={{
          marginBottom: '1rem'
        }}>
                        Form Validation Example
                    </Heading>
                    <p style={{
          marginBottom: '1rem'
        }}>
                        Real-world example of using snackbars for form validation:
                    </p>
                    <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '14px',
          overflow: 'auto',
          marginBottom: '1rem'
        }}>
          {\`const validateForm = () => {
  const newAlerts = [];
  
  if (!formData.name.trim()) {
    newAlerts.push({
      id: 'name-error',
      variant: 'error',
      message: 'Name is required',
      header: 'Validation Error',
    });
  }
  
  if (newAlerts.length === 0) {
    newAlerts.push({
      id: 'success',
      variant: 'success',
      message: 'Form submitted successfully!',
      header: 'Success',
    });
  }

  setAlerts(prev => [...prev, ...newAlerts]);
};\`}
                    </pre>
                </div>

                <div style={{
        maxWidth: '400px'
      }}>
                    <div style={{
          marginBottom: '1rem'
        }}>
                        <label style={{
            display: 'block',
            marginBottom: '0.5rem'
          }}>Name:</label>
                        <input type="text" value={formData.name} onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))} style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
                    </div>
                    <div style={{
          marginBottom: '1rem'
        }}>
                        <label style={{
            display: 'block',
            marginBottom: '0.5rem'
          }}>Email:</label>
                        <input type="email" value={formData.email} onChange={e => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))} style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
                    </div>
                    <Button onClick={validateForm}>Submit Form</Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>;
  },
  parameters: {
    docs: {
      story: {
        height: '60vh'
      }
    }
  }
}`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  render: () => {
    const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const simulateApiCall = async (success: boolean) => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newAlert: SnackbarItemType = {
        id: Date.now().toString(),
        variant: success ? 'success' : 'error',
        message: success ? 'Data saved successfully!' : 'Failed to save data. Please try again.',
        header: success ? 'Success' : 'Error'
      };
      setAlerts(prev => [...prev, newAlert]);
      setLoading(false);
    };
    return <div>
                <div style={{
        marginBottom: '2rem'
      }}>
                    <Heading size="medium" style={{
          marginBottom: '1rem'
        }}>
                        API Response Example
                    </Heading>
                    <p style={{
          marginBottom: '1rem'
        }}>
                        Example of handling API responses with snackbars:
                    </p>
                    <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '14px',
          overflow: 'auto',
          marginBottom: '1rem'
        }}>
          {\`const handleApiResponse = async () => {
  setLoading(true);
  
  try {
    const response = await fetch('/api/data');
    const result = await response.json();
    
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'success',
      message: 'Data saved successfully!',
      header: 'Success',
    }]);
  } catch (error) {
    setAlerts(prev => [...prev, {
      id: Date.now().toString(),
      variant: 'error',
      message: 'Failed to save data. Please try again.',
      header: 'Error',
    }]);
  }
  
  setLoading(false);
};\`}
                    </pre>
                </div>

                <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
                    <Button onClick={() => simulateApiCall(true)} loading={loading} disabled={loading}>
                        Simulate Success
                    </Button>
                    <Button variant="danger" onClick={() => simulateApiCall(false)} loading={loading} disabled={loading}>
                        Simulate Error
                    </Button>
                </div>

                <NovariSnackbar items={alerts} />
            </div>;
  },
  parameters: {
    docs: {
      story: {
        height: '60vh'
      }
    }
  }
}`,...D.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    items: [],
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  render: () => {
    const [alerts, setAlerts] = useState<SnackbarItemType[]>([]);
    const [autoHideDuration, setAutoHideDuration] = useState(4000);
    const [maxVisible, setMaxVisible] = useState(3);
    const [size, setSize] = useState<'small' | 'medium'>('small');
    const addMultipleAlerts = () => {
      const newAlerts: SnackbarItemType[] = Array.from({
        length: 5
      }, (_, i) => ({
        id: \`alert-\${Date.now()}-\${i}\`,
        variant: ['success', 'info', 'warning', 'error'][i % 4] as SnackbarItemType['variant'],
        message: \`Alert number \${i + 1}\`,
        header: \`Alert \${i + 1}\`
      }));
      setAlerts(prev => [...prev, ...newAlerts]);
    };
    return <div>
                <div style={{
        marginBottom: '2rem'
      }}>
                    <Heading size="medium" style={{
          marginBottom: '1rem'
        }}>
                        Configuration Options
                    </Heading>
                    <p style={{
          marginBottom: '1rem'
        }}>
                        Customize the snackbar behavior with various options:
                    </p>
                    <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '14px',
          overflow: 'auto',
          marginBottom: '1rem'
        }}>
          {\`<NovariSnackbar 
  items={alerts}
  autoHideDuration={4000}  // Auto-close after 4 seconds
  maxVisible={3}           // Show max 3 alerts at once
  size="small"             // or "medium"
  position="top-right"     // Screen position
/>\`}
                    </pre>
                </div>

                <div style={{
        marginBottom: '1rem'
      }}>
                    <div style={{
          marginBottom: '1rem'
        }}>
                        <label style={{
            marginRight: '1rem'
          }}>Auto-hide duration (ms):</label>
                        <input type="number" value={autoHideDuration} onChange={e => setAutoHideDuration(Number(e.target.value))} style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
                    </div>
                    <div style={{
          marginBottom: '1rem'
        }}>
                        <label style={{
            marginRight: '1rem'
          }}>Max visible:</label>
                        <input type="number" value={maxVisible} onChange={e => setMaxVisible(Number(e.target.value))} style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }} />
                    </div>
                    <div style={{
          marginBottom: '1rem'
        }}>
                        <label style={{
            marginRight: '1rem'
          }}>Size:</label>
                        <select value={size} onChange={e => setSize(e.target.value as 'small' | 'medium')} style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                        </select>
                    </div>
                    <Button onClick={addMultipleAlerts}>Add 5 Alerts</Button>
                </div>

                <NovariSnackbar items={alerts} autoHideDuration={autoHideDuration} maxVisible={maxVisible} size={size} />
            </div>;
  },
  parameters: {
    docs: {
      story: {
        height: '60vh'
      }
    }
  }
}`,...z.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleAlerts,
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  parameters: {
    docs: {
      story: {
        height: '40vh'
      }
    }
  }
}`,...N.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleAlertsNoHeadings,
    autoHideDuration: 4000,
    position: 'top-right',
    size: 'small'
  },
  parameters: {
    docs: {
      story: {
        height: '40vh'
      }
    }
  }
}`,...R.parameters?.docs?.source}}};const J=["BasicUsage","DifferentPositions","FormValidationExample","ApiResponseExample","ConfigurationOptions","Default","NoHeadings"];export{D as ApiResponseExample,B as BasicUsage,z as ConfigurationOptions,N as Default,j as DifferentPositions,C as FormValidationExample,R as NoHeadings,J as __namedExportsOrder,G as default};
