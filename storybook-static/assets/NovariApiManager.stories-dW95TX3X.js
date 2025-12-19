import{r as j,j as r}from"./iframe-C9GtWCFt.js";import{B as T}from"./Button-UzCYcQ_b.js";import"./preload-helper-PPVm8Dsz.js";import"./useId-BxoADsoD.js";import"./i18n.hooks-B4P7w0Ue.js";import"./Label-DpB5uiKT.js";import"./composeEventHandlers-krbYd5LM.js";const l={red:"\x1B[31m",green:"\x1B[32m",yellow:"\x1B[33m",blue:"\x1B[34m",brown:"\x1B[38;5;136m",reset:"\x1B[0m"},P={error:l.red,warn:l.yellow,info:l.green,debug:l.brown},w={error:0,warn:1,info:2,debug:3};class ${currentLogLevel;constructor(e){this.currentLogLevel=e.level}shouldLog(e){return w[e]<=w[this.currentLogLevel]}getColor(e){return P[e]||l.blue}format(e,t,...d){if(!this.shouldLog(e))return;const n=new Date().toISOString();console.log(`[${n}] ${this.getColor(e)}${e}:${l.reset}`,t,...d)}error(e,...t){this.format("error",e,...t)}warn(e,...t){this.format("warn",e,...t)}info(e,...t){this.format("info",e,...t)}debug(e,...t){this.format("debug",e,...t)}}class C{config;logger;constructor(e){this.config=e;const t=e.logLevel??"info";this.logger=new $({level:t})}async call({method:e,endpoint:t,body:d,contentType:n="application/json",functionName:c,additionalHeaders:u={},customErrorMessage:f,customSuccessMessage:h,customSuccessVariant:y="success"}){const p=`${this.config.baseUrl}${t}`;this.logger.info("Starting function:",c),this.logger.debug("Headers being sent:",{"Content-Type":n,...this.config.defaultHeaders,...u});const x={"Content-Type":n,...this.config.defaultHeaders,...u},b={method:e,headers:x},o=d;o&&e!=="GET"&&(b.body=typeof o=="string"?o:JSON.stringify(o)),this.logger.info(`${e} API URL: ${p}`),o&&this.logger.debug("Request body:",o);try{const s=await fetch(p,b);if(!s.ok){const m=await s.text();return this.logger.error(`Response from ${c}: ${m}`),{success:!1,message:f||m,variant:"error",status:s.status,body:o}}let a,E="";if(s.status!==204){const m=s.headers.get("Content-Type");try{if(m?.includes("application/json")){const i=await s.json();i?.message?(E=i.message,i?.data?a=i.data:a=void 0):a=i}else m?.includes("text/plain")&&(E=await s.text(),a=E)}catch(i){this.logger.error(`Response parsing error for ${c}:`,i)}}return this.logger.info(`${e} Finished with success: ${c}:${s.status}`),{success:!0,message:h||E||s.statusText,variant:y||"success",data:a,status:s.status,body:s.body||o}}catch(s){const a=s instanceof Error?s.message:"Unknown error occurred";return this.logger.error("API call error:",a),{success:!1,message:f||a,variant:"error",status:500,body:o}}}}const R=({baseUrl:g,endpoint:e,method:t,body:d,customErrorMessage:n,customSuccessMessage:c})=>{const[u,f]=j.useState(""),[h,y]=j.useState(!1),[p,x]=j.useState(null),b=new C({baseUrl:g}),o=async()=>{y(!0),x(null);try{const s=await b.call({method:t,endpoint:e,body:d,functionName:"storybook-demo",customErrorMessage:n,customSuccessMessage:c});f(JSON.stringify(s,null,2))}catch(s){x(s instanceof Error?s.message:"An error occurred")}finally{y(!1)}};return r.jsxs("div",{style:{padding:"20px"},children:[r.jsxs("div",{style:{marginBottom:"20px"},children:[r.jsx("strong",{children:"Configuration:"}),r.jsx("pre",{style:{marginTop:"8px",background:"#f5f5f5",padding:"12px",borderRadius:"4px"},children:`const api = new NovariApiManager({ 
  baseUrl: '${g}'
});

const response = await api.call<IUser>({
  method: "${t}",
  endpoint: "${e}",
  functionName: "getUsers",
  customErrorMessage: "${n||"Get users failed"}", 
  customSuccessMessage: "${c||"Get users successful"}"
});`})]}),r.jsx(T,{variant:"primary",loading:h,onClick:o,style:{marginBottom:"16px"},children:h?"Loading...":"Make API Call"}),p&&r.jsxs("div",{style:{color:"red",marginBottom:"16px"},children:["Error: ",p]}),u&&r.jsxs("div",{children:[r.jsx("strong",{children:"Response:"}),r.jsx("pre",{style:{background:"#f5f5f5",padding:"16px",borderRadius:"4px",overflow:"auto"},children:u})]})]})},F={title:"Utils/NovariApiManager",component:R,parameters:{layout:"centered",docs:{canvas:{sourceState:"none"},description:{component:`
### Usage Examples

1. GET Request with Data:

\`\`\`typescript
const response = new NovariApiManager({ 
  baseUrl: 'https://api.example.com', 
  defaultHeaders: { "x-nin": "9999999999" } 
});

const response = await apiManager.call<IUser>({
  method: "GET",
  endpoint: "users/list",
  functionName: "getUsers",
  customErrorMessage: "Get users failed", // Optional
  customSuccessMessage: "Get users successfull", // Optional
});

// Response Success:
{
  "success": true,
  "message": "Get users successful",
  "variant": "success",
  "status": 200
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
}

// Response Error:
{
  "success": false,
  "message": "Get users failed",
  "variant": "error",
  "status": 200
}
\`\`\`

2. POST Request with Body and Message:

\`\`\`typescript
const response = new NovariApiManager({ 
  baseUrl: 'https://api.example.com', 
  defaultHeaders: { "x-nin": "9999999999" } 
});

const response = await apiManager.call({
  method: "POST",
  endpoint: "users/create",
  functionName: "createUser",
  customErrorMessage: "Create user failed",
  customSuccessMessage: "Create user successful",
  body:
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
});

// Response Success:
{
  "success": true,
  "message": "Create user successful",
  "variant": "success",
  "status": 200
}

// Response Error:
{
  "success": false,
  "message": "Create user failed",
  "variant": "error",
  "status": 500
}
\`\`\`


        `}}},tags:["autodocs"],argTypes:{baseUrl:{control:"text",description:"Base URL for the API"},endpoint:{control:"text",description:"API endpoint path"},method:{control:"select",options:["GET","POST","PUT","DELETE"],description:"HTTP method"},body:{control:"object",description:"Request body (for POST/PUT)"},message:{control:"text",description:"Message to override response message"},customErrorMessage:{control:"text",description:"Custom error message to override default"},customSuccessMessage:{control:"text",description:"Custom success message to override default"}}},S={args:{baseUrl:"https://jsonplaceholder.typicode.com",endpoint:"/todos/1",method:"GET",customSuccessMessage:"Successfully retrieved todo",customErrorMessage:"Failed to get todo"}},M={args:{baseUrl:"https://jsonplaceholder.typicode.com",endpoint:"/posts",method:"POST",body:{title:"foo",body:"bar",userId:1},message:"Custom message for the response",customSuccessMessage:"Post created successfully",customErrorMessage:"Failed to create post"}},v={args:{baseUrl:"https://jsonplaceholder.typicode.com",endpoint:"/posts/1",method:"PUT",body:{id:1,title:"Updated title",body:"Updated content",userId:1},customSuccessMessage:"Post updated successfully",customErrorMessage:"Failed to update post"}},U={args:{baseUrl:"https://jsonplaceholder.typicode.com",endpoint:"/posts/1",method:"DELETE",customSuccessMessage:"Post deleted successfully",customErrorMessage:"Failed to delete post"}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/todos/1',
    method: 'GET',
    customSuccessMessage: 'Successfully retrieved todo',
    customErrorMessage: 'Failed to get todo'
  }
}`,...S.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/posts',
    method: 'POST',
    body: {
      title: 'foo',
      body: 'bar',
      userId: 1
    },
    message: 'Custom message for the response',
    customSuccessMessage: 'Post created successfully',
    customErrorMessage: 'Failed to create post'
  }
}`,...M.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/posts/1',
    method: 'PUT',
    body: {
      id: 1,
      title: 'Updated title',
      body: 'Updated content',
      userId: 1
    },
    customSuccessMessage: 'Post updated successfully',
    customErrorMessage: 'Failed to update post'
  }
}`,...v.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/posts/1',
    method: 'DELETE',
    customSuccessMessage: 'Post deleted successfully',
    customErrorMessage: 'Failed to delete post'
  }
}`,...U.parameters?.docs?.source}}};const N=["GetExample","PostExample","PutExample","DeleteExample"];export{U as DeleteExample,S as GetExample,M as PostExample,v as PutExample,N as __namedExportsOrder,F as default};
