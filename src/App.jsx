import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const C = { bg:"#FFFFFF", grey:"#E8E5DE", greyMid:"#C8C4BC", black:"#363636", red:"#FF4B4F", redDark:"#C8102E", white:"#FFFFFF", muted:"#888888", border:"#D8D5CE" };
const FONT = "'Avenir Next','Avenir','Century Gothic','Nunito',sans-serif";
const fmt = n => n == null ? "—" : Number(n).toLocaleString("de-DE");
const seoColor = v => v == null ? C.muted : v <= 10 ? "#2E7D32" : v <= 20 ? "#E65100" : C.red;
const RADIAN = Math.PI / 180;
const PASSWORD = "vVw0!rB?Wv3Nc68-MP26";

const iUsers = { DE:79.38,AT:8.6,UK:66.5,CH:8.71,NL:17.62,ES:45.36,BE:11.06,ME:9.21,FR:64.26,IT:55.76,SV:21.59,US:320 };
const flags  = { DE:"🇩🇪",UK:"🇬🇧",AT:"🇦🇹",ES:"🇪🇸",IT:"🇮🇹",FR:"🇫🇷",CH:"🇨🇭",NL:"🇳🇱",BE:"🇧🇪",US:"🇺🇸",ME:"🇦🇪",SV:"🇸🇪" };

const M = [
  { key:"jul25",s:"Jul",l:"Juli 2025",      pv:10563,pvDE:5734, uv:7946, uvDE:4548, imp:28848,clk:664, cpc:"0,75",kst:"501", org:59, seo:[{kw:"Mediaagentur",p:41},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}], uu:{DE:4213,AT:282,UK:2030,CH:129,NL:218,ES:422,BE:69,ME:53,FR:251,IT:207,SV:19,US:53}, bpv:{DE:5159,UK:2377,ES:494,AT:349,FR:285,NL:255,IT:246,CH:153,BE:80,ME:62,SV:21,US:62}, lp:1144,sv:485,nw:253 },
  { key:"aug25",s:"Aug",l:"August 2025",    pv:10663,pvDE:5817, uv:7937, uvDE:4364, imp:24508,clk:668, cpc:"0,75",kst:"501", org:57, seo:[{kw:"Mediaagentur",p:40},{kw:"Mediaagentur München",p:22},{kw:"Mediaplus",p:1}],  uu:{DE:3933,AT:327,UK:1873,CH:109,NL:162,ES:324,BE:73,ME:60,FR:188,IT:82,SV:50,US:13}, bpv:{DE:4868,UK:2175,ES:477,AT:473,FR:205,NL:192,IT:104,CH:117,BE:85,ME:69,SV:57,US:24}, lp:839,sv:950,nw:459 },
  { key:"sep25",s:"Sep",l:"September 2025", pv:6132, pvDE:3180, uv:3307, uvDE:1710, imp:23042,clk:639, cpc:"0,78",kst:"498", org:67, seo:[{kw:"Mediaagentur",p:8},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}],  uu:{DE:1357,AT:159,UK:691,CH:51,NL:93,ES:176,BE:37,ME:25,FR:132,IT:103,SV:36,US:14}, bpv:{DE:2411,UK:1076,ES:350,AT:260,FR:176,IT:143,NL:134,BE:76,CH:68,ME:38,SV:49,US:20}, lp:593,sv:545,nw:465 },
  { key:"okt25",s:"Okt",l:"Oktober 2025",   pv:6352, pvDE:3361, uv:3256, uvDE:1690, imp:21506,clk:687, cpc:"0,71",kst:"486", org:62, seo:[{kw:"Mediaagentur",p:18},{kw:"Mediaagentur München",p:41},{kw:"Mediaplus",p:1}], uu:{DE:1421,AT:165,UK:641,CH:53,NL:108,ES:122,BE:39,ME:16,FR:87,IT:111,SV:28,US:31}, bpv:{DE:2638,UK:1042,ES:257,AT:269,FR:125,NL:173,IT:168,CH:83,BE:63,ME:24,SV:41,US:39}, lp:875,sv:510,nw:627 },
  { key:"nov25",s:"Nov",l:"November 2025",  pv:6703, pvDE:3339, uv:3647, uvDE:1832, imp:17838,clk:727, cpc:"0,68",kst:"494", org:71, seo:[{kw:"Mediaagentur",p:18},{kw:"Mediaagentur München",p:41},{kw:"Mediaplus",p:1}], uu:{DE:1521,AT:183,UK:842,CH:67,NL:129,ES:139,BE:41,ME:26,FR:139,IT:111,SV:28,US:30}, bpv:{DE:2682,UK:1340,AT:313,ES:296,FR:224,NL:179,IT:164,CH:96,BE:57,ME:38,SV:46,US:37}, lp:807,sv:586,nw:442 },
  { key:"dez25",s:"Dez",l:"Dezember 2025",  pv:5780, pvDE:2891, uv:2985, uvDE:1480, imp:19548,clk:668, cpc:"0,74",kst:"491", org:75, seo:[{kw:"Mediaagentur",p:null},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}], uu:{DE:1271,AT:150,UK:715,CH:63,NL:43,ES:180,BE:25,ME:23,FR:116,IT:48,SV:29,US:44}, bpv:{DE:2366,UK:1138,ES:413,AT:239,FR:195,CH:93,IT:70,NL:56,BE:31,ME:10,SV:47,US:54}, lp:877,sv:582,nw:298 },
  { key:"jan26",s:"Jan",l:"Januar 2026",    pv:7113, pvDE:3392, uv:3988, uvDE:1906, imp:18819,clk:795, cpc:"0,63",kst:"500", org:70, seo:[{kw:"Mediaagentur",p:null},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}], uu:{DE:1646,AT:219,UK:932,CH:92,NL:48,ES:276,BE:47,ME:30,FR:178,IT:90,SV:36,US:38}, bpv:{DE:2758,UK:1405,ES:561,AT:354,FR:248,IT:141,CH:135,NL:62,BE:59,ME:36,SV:65,US:36}, lp:877,sv:585,nw:366 },
  { key:"feb26",s:"Feb",l:"Februar 2026",   pv:7375, pvDE:3508, uv:4086, uvDE:1940, imp:15899,clk:813, cpc:"0,61",kst:"492", org:66, seo:[{kw:"Mediaagentur",p:null},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}], uu:{DE:1689,AT:242,UK:867,CH:74,NL:71,ES:276,BE:173,ME:23,FR:131,IT:143,SV:40,US:29}, bpv:{DE:2874,UK:1299,ES:486,AT:433,FR:207,IT:270,BE:219,CH:121,NL:108,ME:33,SV:56,US:51}, lp:813,sv:614,nw:308 },
  { key:"mar26",s:"Mär",l:"März 2026",      pv:8406, pvDE:4377, uv:4580, uvDE:2333, imp:16931,clk:811, cpc:"0,62",kst:"500", org:68, seo:[{kw:"Mediaagentur",p:null},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:1}], uu:{DE:1948,AT:238,UK:841,CH:99,NL:63,ES:276,BE:63,ME:19,FR:142,IT:320,SV:31,US:38}, bpv:{DE:3500,UK:1293,IT:493,ES:431,AT:356,FR:245,CH:148,BE:83,NL:80,ME:25,SV:74,US:66}, lp:1175,sv:786,nw:640 },
  { key:"apr26",s:"Apr",l:"April 2026",     pv:13229,pvDE:7206, uv:5030, uvDE:2576, imp:17325,clk:723, cpc:"0,68",kst:"492", org:71, seo:[{kw:"Mediaagentur",p:9},{kw:"Mediaagentur München",p:12},{kw:"Mediaplus",p:1}],  uu:{DE:2327,AT:239,UK:723,CH:84,NL:75,ES:243,BE:60,ME:44,FR:156,IT:253,SV:0,US:43}, bpv:{DE:6529,UK:2055,ES:602,IT:551,AT:364,FR:258,NL:188,BE:182,CH:149,ME:167,SV:0,US:106}, lp:3138,sv:999,nw:322 },
  { key:"mai26",s:"Mai",l:"Mai 2026",       pv:13496,pvDE:7186, uv:4536, uvDE:2543, imp:19287,clk:701, cpc:"0,71",kst:"499", org:69, seo:[{kw:"Mediaagentur",p:3},{kw:"Mediaagentur München",p:6},{kw:"Mediaplus",p:1}],   uu:{DE:3245,AT:166,UK:164,CH:76,NL:99,ES:207,BE:70,ME:37,FR:138,IT:101,SV:31,US:231}, bpv:{DE:6684,UK:4857,ES:486,NL:430,IT:275,AT:247,BE:229,FR:205,CH:102,ME:204,SV:162,US:532}, lp:2377,sv:1026,nw:508 },
  { key:"jun26",s:"Jun",l:"Juni 2026",      pv:13842,pvDE:6950, uv:4468, uvDE:2334, imp:16670,clk:704, cpc:"0,70",kst:"490", org:69, seo:[{kw:"Mediaagentur",p:2},{kw:"Mediaagentur München",p:1},{kw:"Mediaplus",p:1}],   uu:{DE:1897,AT:174,UK:810,CH:81,NL:105,ES:190,BE:90,ME:24,FR:119,IT:193,SV:31,US:40}, bpv:{DE:6085,UK:3056,ES:513,NL:473,IT:521,AT:265,BE:200,FR:184,CH:130,ME:118,SV:162,US:106}, lp:591,sv:1629,nw:557 },
];

const HIST = {
  "22/23":{pv:[7028,6812,6983,6868,7279,7148,8010,8313,9246,7271,7713,2881],uv:[5908,5796,5951,5915,6237,6248,6745,7016,7809,6137,6685,2483]},
  "23/24":{pv:[1408,1594,1839,1281,1532,1325,975,1111,861,1140,1680,2694],uv:[678,640,869,603,738,801,456,503,430,483,882,2027]},
  "24/25":{pv:[3168,2160,3858,5610,5814,6537,7433,6919,7532,3937,3630,3734],uv:[2592,2018,2493,5276,5448,5644,6242,5576,6008,2909,2873,3044]},
};
const HCOL = {"22/23":{pv:"#aaa",uv:"#bbb"},"23/24":{pv:"#888",uv:"#999"},"24/25":{pv:"#555",uv:"#666"}};

const sumF=(arr,f)=>{const v=arr.map(x=>x[f]).filter(x=>x!=null);return v.length?v.reduce((a,b)=>a+b,0):null;};
const buildP=(arr)=>{
  const uu={},bpv={};
  Object.keys(iUsers).forEach(c=>{uu[c]=arr.reduce((s,m)=>s+(m.uu[c]||0),0);bpv[c]=arr.reduce((s,m)=>s+(m.bpv[c]||0),0);});
  const ls=[...arr].reverse().find(m=>m.seo&&m.seo.some(s=>s.p!=null));
  const kst=arr.map(m=>m.kst).filter(v=>v&&v!=="—").reduce((a,b)=>a+Number(b),0);
  const orgs=arr.map(m=>m.org).filter(x=>x!=null);
  return {pv:sumF(arr,"pv"),pvDE:sumF(arr,"pvDE"),uv:sumF(arr,"uv"),uvDE:sumF(arr,"uvDE"),
    imp:sumF(arr,"imp"),clk:sumF(arr,"clk"),cpc:arr[arr.length-1]?.cpc||"—",kst:kst>0?String(kst):"—",
    org:orgs.length?Math.round(orgs.reduce((a,b)=>a+b,0)/orgs.length):null,
    seo:ls?ls.seo:[{kw:"Mediaagentur",p:null},{kw:"Mediaagentur München",p:null},{kw:"Mediaplus",p:null}],
    uu,bpv,lp:sumF(arr,"lp"),sv:sumF(arr,"sv"),nw:sumF(arr,"nw")};
};
const byK=ks=>buildP(M.filter(m=>ks.includes(m.key)));
const Q={q1:byK(["jul25","aug25","sep25"]),q2:byK(["okt25","nov25","dez25"]),q3:byK(["jan26","feb26","mar26"]),q4:byK(["apr26","mai26"])};

const PERIODS=[
  {label:"Geschäftsjahr",sub:"01.07.25 – 30.06.26",getData:()=>({...buildP(M),pvPrev:138146,uvPrev:106618,isFY:true})},
  {label:"Q1",sub:"01.07.25 – 30.09.25",getData:()=>({...Q.q1,pvPrev:null,uvPrev:null,prevLabel:null,isQ:true})},
  {label:"Q2",sub:"01.10.25 – 31.12.25",getData:()=>({...Q.q2,pvPrev:Q.q1.pv,uvPrev:Q.q1.uv,prevLabel:"Q1",isQ:true})},
  {label:"Q3",sub:"01.01.26 – 31.03.26",getData:()=>({...Q.q3,pvPrev:Q.q2.pv,uvPrev:Q.q2.uv,prevLabel:"Q2",isQ:true})},
  {label:"Q4",sub:"01.04.26 – 30.06.26",getData:()=>({...Q.q4,pvPrev:Q.q3.pv,uvPrev:Q.q3.uv,prevLabel:"Q3",isQ:true})},
  {label:"Letztes Geschäftsjahr",sub:"01.07.24 – 30.06.25",getData:()=>({pv:138146,pvDE:69500,uv:106618,uvDE:52000,pvPrev:121000,uvPrev:93000,imp:210000,clk:7200,cpc:"0,72",kst:"—",org:59,seo:[{kw:"Mediaagentur",p:3},{kw:"Mediaagentur München",p:28},{kw:"Mediaplus",p:1}],uu:{},bpv:{},lp:null,sv:null,nw:null,isFY:true,isLastFY:true})},
  ...M.map((m,i)=>({label:m.l,sub:m.s+" 25/26",getData:()=>({...m,pvPrev:i>0?M[i-1].pv:null,uvPrev:i>0?M[i-1].uv:null,prevLabel:i>0?M[i-1].s:null,isMonth:true})})),
];

const trendM=M.map(m=>({m:m.s,pv:m.pv?Math.round(m.pv/1000):null,uv:m.uv?Math.round(m.uv/1000):null,pvDE:m.pvDE?Math.round(m.pvDE/1000):null,uvDE:m.uvDE?Math.round(m.uvDE/1000):null}));
const trendQ=[{m:"Q1",pv:Math.round((10563+10663+6132)/1000),uv:Math.round((7946+7937+3307)/1000)},{m:"Q2",pv:Math.round((6352+6703+5780)/1000),uv:Math.round((3256+3647+2985)/1000)},{m:"Q3",pv:Math.round((7113+7375+8406)/1000),uv:Math.round((3988+4086+4580)/1000)},{m:"Q4",pv:Math.round((13229+13496)/1000),uv:Math.round((5030+4536)/1000)}];
const seaM=M.map(m=>({m:m.s,imp:m.imp,clicks:m.clk,cpc:m.cpc!=="—"?parseFloat(m.cpc.replace(",",".")):null}));

const TT=({active,payload,label})=>{
  if(!active||!payload||!payload.length) return null;
  return <div style={{background:C.white,border:`1px solid ${C.border}`,padding:"8px 12px",fontSize:12,color:C.black,fontFamily:FONT,boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}}><div style={{fontWeight:700,marginBottom:4,borderBottom:`2px solid ${C.red}`,paddingBottom:3}}>{label}</div>{payload.map((p,i)=>p.value!=null?<div key={i} style={{color:p.color===C.white?C.black:p.color,marginTop:2}}>{p.name}: <strong>{p.value}</strong></div>:null)}</div>;
};
const Panel=({children,style={}})=><div style={{background:C.white,border:`1px solid ${C.border}`,padding:"14px 16px",fontFamily:FONT,...style}}>{children}</div>;
const PT=({children})=><div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.muted,marginBottom:8}}>{children}</div>;
const MB=({label,value,max,pct,color})=>(
  <div style={{marginBottom:6}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.black,marginBottom:3}}><span>{label}</span><span style={{color:C.muted,fontSize:11}}>{pct!=null?pct+" %":fmt(value)}</span></div>
    <div style={{background:C.grey,height:3}}><div style={{width:`${Math.round((value/max)*100)}%`,background:color||C.red,height:3}}/></div>
  </div>
);
const Btn=({active,onClick,children})=>(
  <button onClick={onClick} style={{background:active?C.red:C.grey,border:"none",color:active?C.white:C.black,fontSize:10,fontWeight:700,letterSpacing:0.5,padding:"5px 10px",cursor:"pointer",fontFamily:FONT,textTransform:"uppercase"}}>{children}</button>
);
const Growth=({curr,prev,label})=>{
  if(!curr||!prev) return null;
  const pct=((curr-prev)/prev*100).toFixed(1);
  const pos=parseFloat(pct)>=0;
  return <div style={{marginTop:8,paddingTop:6,borderTop:`1px solid ${C.border}`}}><div style={{fontSize:9,color:C.muted,marginBottom:2,letterSpacing:0.5,textTransform:"uppercase"}}>{label}</div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:600,color:C.muted}}>{fmt(prev)}</span><span style={{fontSize:11,fontWeight:700,color:pos?"#2E7D32":C.red,background:pos?"#E8F5E9":"#FFEBEE",padding:"1px 6px"}}>{pos?"▲":"▼"} {Math.abs(pct)} %</span></div></div>;
};
const Logo=()=>(
  <svg width="36" height="42" viewBox="0 0 36 42" fill="none">
    <rect x="10" y="0"  width="12" height="12" fill="#ccc"/>
    <rect x="10" y="12" width="12" height="12" fill="white"/>
    <rect x="0"  y="12" width="10" height="12" fill="#999"/>
    <rect x="10" y="24" width="12" height="12" fill={C.red}/>
    <rect x="22" y="20" width="12" height="16" fill="#bbb"/>
  </svg>
);

const TABS=["Dashboard","Traffic","SEA"];
const periodGroups=[
  {g:"Zeiträume",items:PERIODS.slice(0,5)},
  {g:"Vorjahr",items:[PERIODS[5]]},
  {g:"Monate",items:PERIODS.slice(6)},
];

export default function App() {
  const [auth,setAuth]=useState(false);
  const [pw,setPw]=useState("");
  const [err,setErr]=useState(false);
  const [tab,setTab]=useState(0);
  const [pi,setPi]=useState(0);
  const [tv,setTv]=useState("monthly");
  const [tg,setTg]=useState("global");
  const [hist,setHist]=useState([]);

  const handleLogin=()=>{ if(pw===PASSWORD){setAuth(true);setErr(false);}else{setErr(true);setPw("");} };

  if(!auth) return (
    <div style={{background:C.black,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONT}}>
      <div style={{background:C.white,padding:40,width:340,borderTop:`4px solid ${C.red}`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <Logo/>
          <div style={{borderLeft:`2px solid ${C.red}`,paddingLeft:12}}>
            <div style={{fontWeight:800,fontSize:13,color:C.black,letterSpacing:1,textTransform:"uppercase"}}>Website Performance</div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:1,textTransform:"uppercase"}}>Mediaplus · House of Communication</div>
          </div>
        </div>
        <div style={{fontSize:9,color:C.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>Passwort</div>
        <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false);}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Passwort eingeben"
          style={{width:"100%",padding:"10px 12px",border:`1px solid ${err?C.red:C.border}`,fontSize:13,fontFamily:FONT,outline:"none",color:C.black,background:C.white,boxSizing:"border-box"}} autoFocus/>
        {err&&<div style={{fontSize:11,color:C.red,marginTop:6}}>Falsches Passwort. Bitte erneut versuchen.</div>}
        <button onClick={handleLogin} style={{width:"100%",marginTop:16,background:C.red,border:"none",color:C.white,fontSize:12,fontWeight:700,padding:"11px 0",cursor:"pointer",fontFamily:FONT,letterSpacing:1.5,textTransform:"uppercase"}}>ANMELDEN</button>
      </div>
    </div>
  );

  const d=PERIODS[pi].getData();
  const cmpLabel=d.isFY&&!d.isLastFY?"24/25 Global":d.isQ&&d.prevLabel?`Vorquartal (${d.prevLabel})`:d.isMonth&&d.prevLabel?`Vormonat (${d.prevLabel})`:null;
  const toggleH=fy=>setHist(p=>p.includes(fy)?p.filter(x=>x!==fy):[...p,fy]);

  const cD=Object.entries(iUsers).map(([c,iu])=>({c,v:parseFloat(((d.uu[c]||0)/iu).toFixed(4))})).filter(e=>e.v>0).sort((a,b)=>b.v-a.v);
  const bD=Object.entries(d.bpv||{}).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const bMax=bD[0]?.[1]||1;
  const pvL=d.lp||0,pvS=d.sv||0,pvN=d.nw||0,pvBr=d.pv?Math.max(0,d.pv-pvL-pvS-pvN):0;
  const pvRaw=[{name:"Landing Pages",abs:pvL,color:C.red},{name:"Services",abs:pvS,color:C.black},{name:"Newsroom",abs:pvN,color:C.greyMid},{name:"Brand Pages",abs:pvBr,color:C.grey}].filter(e=>e.abs>0);
  const pvT=pvRaw.reduce((s,e)=>s+e.abs,0);
  const pvD=pvRaw.map(e=>({...e,pct:pvT?Math.round((e.abs/pvT)*100):0}));
  const rl=({cx,cy,midAngle,innerRadius,outerRadius,pct})=>{if(pct<6)return null;const r=innerRadius+(outerRadius-innerRadius)*0.5;return <text x={cx+r*Math.cos(-midAngle*RADIAN)} y={cy+r*Math.sin(-midAngle*RADIAN)} fill={C.white} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} fontFamily={FONT}>{pct}%</text>;};
  const baseTrend=tv==="monthly"?trendM:trendQ;
  const merged=baseTrend.map((row,i)=>{
    const r=Object.assign({},row);
    if(tg==="global"&&tv==="monthly") hist.forEach(fy=>{if(HIST[fy]){r[`pv_${fy}`]=Math.round(HIST[fy].pv[i]/1000);r[`uv_${fy}`]=Math.round(HIST[fy].uv[i]/1000);}});
    return r;
  });

  return (
    <div style={{background:C.grey,minHeight:"100vh",fontFamily:FONT,color:C.black}}>
      <div style={{background:C.black,padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <Logo/>
          <div style={{borderLeft:`2px solid ${C.red}`,paddingLeft:14}}>
            <div style={{fontWeight:800,fontSize:15,color:C.white,letterSpacing:1,textTransform:"uppercase"}}>Website Performance</div>
            <div style={{fontSize:10,color:"#aaa",letterSpacing:1,textTransform:"uppercase"}}>Mediaplus · House of Communication</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{position:"relative"}}>
            <select value={pi} onChange={e=>setPi(Number(e.target.value))} style={{background:"#222",border:"1px solid #555",color:C.white,fontSize:11,fontWeight:600,padding:"7px 32px 7px 12px",cursor:"pointer",appearance:"none",fontFamily:FONT,outline:"none"}}>
              {periodGroups.map(g=><optgroup key={g.g} label={g.g}>{g.items.map(p=>{const i=PERIODS.indexOf(p);return <option key={i} value={i}>{p.label} · {p.sub}</option>;})}</optgroup>)}
            </select>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#aaa",fontSize:8}}>▼</span>
          </div>
          <div style={{background:C.red,color:C.white,fontWeight:700,padding:"6px 14px",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>FY 2025/26</div>
          <span style={{fontSize:10,color:"#aaa"}}>Stand: 27.05.2026</span>
        </div>
      </div>

      <div style={{background:C.white,borderBottom:`3px solid ${C.red}`,padding:"0 24px",display:"flex"}}>
        {TABS.map((t,i)=>(
          <button key={t} onClick={()=>setTab(i)} style={{background:"none",border:"none",cursor:"pointer",padding:"12px 20px",fontSize:11,fontWeight:700,letterSpacing:1.5,color:tab===i?C.red:C.muted,borderBottom:tab===i?`3px solid ${C.red}`:"3px solid transparent",marginBottom:-3,fontFamily:FONT,textTransform:"uppercase"}}>{t}</button>
        ))}
      </div>

      <div style={{padding:"20px 24px 32px"}}>
        {tab===0&&<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",gap:16}}>
            <div style={{display:"flex",gap:12,flex:1}}>
              <Panel style={{flex:1,borderTop:`3px solid ${C.red}`}}>
                <PT>Page Views</PT>
                <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{d.isFY&&!d.isLastFY?"25/26 Global":d.l||d.label}</div>
                <div style={{fontSize:28,fontWeight:800,color:C.black}}>{fmt(d.pv)}</div>
                <div style={{fontSize:11,color:C.muted}}>🇩🇪 DE: <strong style={{color:C.black}}>{fmt(d.pvDE)}</strong></div>
                <Growth curr={d.pv} prev={d.pvPrev} label={cmpLabel}/>
              </Panel>
              <Panel style={{flex:1,borderTop:`3px solid ${C.black}`}}>
                <PT>Unique Users</PT>
                <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{d.isFY&&!d.isLastFY?"25/26 Global":d.l||d.label}</div>
                <div style={{fontSize:28,fontWeight:800,color:C.black}}>{fmt(d.uv)}</div>
                <div style={{fontSize:11,color:C.muted}}>🇩🇪 DE: <strong style={{color:C.black}}>{fmt(d.uvDE)}</strong></div>
                <Growth curr={d.uv} prev={d.uvPrev} label={cmpLabel}/>
              </Panel>
            </div>
            <Panel style={{flex:2,borderTop:`3px solid ${C.red}`}}>
              <PT>Unique Users per 1k Internet Users · nach Land</PT>
              {cD.length>0?<ResponsiveContainer width="100%" height={140}><BarChart data={cD} margin={{top:20,right:4,left:-20,bottom:0}}><CartesianGrid stroke={C.grey} strokeDasharray="3 3" vertical={false}/><XAxis dataKey="c" tick={{fill:C.muted,fontSize:11}}/><YAxis tick={{fill:C.muted,fontSize:10}} tickFormatter={v=>v.toFixed(1)}/><Tooltip content={<TT/>}/><Bar dataKey="v" name="UU/1k" label={{position:"top",fontSize:9,fill:C.muted,formatter:v=>v.toFixed(4)}}>{cD.map((_,i)=><Cell key={i} fill={i===0?C.red:i===1?C.black:C.greyMid}/>)}</Bar></BarChart></ResponsiveContainer>:<div style={{color:C.muted,fontSize:12,marginTop:16}}>Keine Länderdaten</div>}
            </Panel>
          </div>

          <div style={{display:"flex",gap:16}}>
            <Panel style={{flex:3,borderTop:`3px solid ${C.black}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <PT>Trendverlauf (in Tsd.)</PT>
                <div style={{display:"flex",gap:4}}>
                  <Btn active={tg==="global"} onClick={()=>setTg("global")}>Global</Btn>
                  <Btn active={tg==="de"} onClick={()=>setTg("de")}>DE</Btn>
                  <span style={{width:1,height:20,background:C.border,display:"inline-block",margin:"0 2px"}}/>
                  <Btn active={tv==="monthly"} onClick={()=>setTv("monthly")}>Monatlich</Btn>
                  <Btn active={tv==="quarterly"} onClick={()=>setTv("quarterly")}>Quartale</Btn>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:8,alignItems:"center"}}>
                {[[`PV 25/26 ${tg==="de"?"DE":"Global"}`,C.red],[`UV 25/26 ${tg==="de"?"DE":"Global"}`,C.black]].map(([l,c])=><span key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:C.muted}}><span style={{width:14,height:2,background:c,display:"inline-block"}}/>{l}</span>)}
                {tg==="global"&&tv==="monthly"&&["22/23","23/24","24/25"].map(fy=><label key={fy} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:C.muted,cursor:"pointer",userSelect:"none"}}><input type="checkbox" checked={hist.includes(fy)} onChange={()=>toggleH(fy)} style={{accentColor:C.red,cursor:"pointer"}}/><span style={{width:12,height:0,borderTop:`2px dashed ${HCOL[fy].pv}`,display:"inline-block"}}/>FY {fy}</label>)}
              </div>
              <ResponsiveContainer width="100%" height={155}>
                <LineChart data={merged} margin={{top:4,right:8,left:-10,bottom:0}}>
                  <CartesianGrid stroke={C.grey} strokeDasharray="3 3"/>
                  <XAxis dataKey="m" tick={{fill:C.muted,fontSize:10}}/><YAxis tick={{fill:C.muted,fontSize:10}}/>
                  <Tooltip content={<TT/>}/>
                  <Line dataKey={tg==="de"?"pvDE":"pv"} name={`PV 25/26 ${tg==="de"?"DE":"Global"}`} stroke={C.red} strokeWidth={2.5} dot={{r:3,fill:C.red}} connectNulls/>
                  <Line dataKey={tg==="de"?"uvDE":"uv"} name={`UV 25/26 ${tg==="de"?"DE":"Global"}`} stroke={C.black} strokeWidth={2} strokeDasharray="6 3" dot={{r:2,fill:C.black}} connectNulls/>
                  {tg==="global"&&hist.map(fy=>[
                    <Line key={`pv_${fy}`} dataKey={`pv_${fy}`} name={`PV ${fy}`} stroke={HCOL[fy].pv} strokeWidth={1.5} strokeDasharray="4 3" dot={false} connectNulls/>,
                    <Line key={`uv_${fy}`} dataKey={`uv_${fy}`} name={`UV ${fy}`} stroke={HCOL[fy].uv} strokeWidth={1} strokeDasharray="2 3" dot={false} connectNulls/>,
                  ])}
                </LineChart>
              </ResponsiveContainer>
            </Panel>
            <Panel style={{flex:1,borderTop:`3px solid ${C.red}`}}>
              <PT>SEO Rankings</PT>
              {d.seo.map(r=>(
                <div key={r.kw} style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:C.muted,marginBottom:4}}>{r.kw}</div>
                  <span style={{background:seoColor(r.p),color:C.white,fontWeight:800,padding:"3px 12px",fontSize:14}}>{r.p!=null?`#${r.p}`:"—"}</span>
                </div>
              ))}
            </Panel>
            <Panel style={{flex:1,borderTop:`3px solid ${C.black}`}}>
              <PT>SEA</PT>
              {[["Impressions",fmt(d.imp)],["Klicks",fmt(d.clk)],["CPC",d.cpc+" €"],["Kosten",d.kst!=="—"?fmt(Number(d.kst))+" €":"—"],["CTR",d.clk&&d.imp?((d.clk/d.imp)*100).toFixed(2).replace(".",",")+" %":"—"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:9,borderBottom:`1px solid ${C.grey}`,paddingBottom:6}}>
                  <span style={{color:C.muted,fontSize:10,letterSpacing:0.5,textTransform:"uppercase"}}>{k}</span>
                  <span style={{color:C.black,fontWeight:700}}>{v}</span>
                </div>
              ))}
            </Panel>
          </div>

          <div style={{display:"flex",gap:16}}>
            <Panel style={{flex:1,borderTop:`3px solid ${C.black}`}}>
              <PT>Brand Pages</PT>
              {bD.length>0?bD.map(([c,v])=><MB key={c} label={`${flags[c]||""} ${c}`} value={v} max={bMax} color={C.red}/>):<div style={{color:C.muted,fontSize:12}}>Keine Daten</div>}
            </Panel>
            <Panel style={{flex:2,borderTop:`3px solid ${C.red}`}}>
              <PT>Page Views nach Bereich</PT>
              {pvD.length>0?<div style={{display:"flex",alignItems:"center",gap:16}}>
                <ResponsiveContainer width={150} height={150}><PieChart><Pie data={pvD} dataKey="pct" cx="50%" cy="50%" outerRadius={68} labelLine={false} label={rl}>{pvD.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip content={<TT/>}/></PieChart></ResponsiveContainer>
                <div style={{flex:1}}>{pvD.map(e=><div key={e.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><span style={{width:10,height:10,background:e.color,flexShrink:0}}/><span style={{fontSize:11,color:C.muted,flex:1}}>{e.name}</span><span style={{fontSize:12,fontWeight:700,color:C.black}}>{fmt(e.abs)}</span></div>)}</div>
              </div>:<div style={{color:C.muted,fontSize:12}}>Keine Daten</div>}
            </Panel>
            <Panel style={{flex:1,borderTop:`3px solid ${C.black}`}}>
              <PT>Traffic-Mix</PT>
              {d.org!=null?[["Organic",d.org],["Ref.Dom.",Math.round((1-d.org/100)*0.37*100)],["Direct",Math.round((1-d.org/100)*0.30*100)],["SoMe",Math.round((1-d.org/100)*0.20*100)],["Paid",Math.round((1-d.org/100)*0.13*100)]].map(([l,v])=><MB key={l} label={l} value={v} max={d.org} pct={v} color={C.red}/>):<div style={{color:C.muted,fontSize:12}}>Keine Daten</div>}
            </Panel>
          </div>
        </div>}

        {tab===1&&<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
            <Panel style={{borderTop:`3px solid ${C.red}`}}><div style={{fontSize:13,fontWeight:800,color:C.black,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>Organic <span style={{color:C.muted,fontWeight:400}}>({d.org||"—"} %)</span></div>{[["Google",90],["Bing",6],["Ecosia",1],["DuckDuckGo",0.3]].map(([l,v])=><div key={l} style={{fontSize:12,color:C.muted,marginBottom:7,borderBottom:`1px solid ${C.grey}`,paddingBottom:5}}><span style={{color:C.black,fontWeight:600}}>{l}</span> — {v} %</div>)}</Panel>
            <Panel style={{background:C.black,border:`1px solid ${C.black}`,borderTop:`3px solid ${C.red}`}}><div style={{fontSize:13,fontWeight:800,color:C.white,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>Social Media <span style={{color:"#aaa",fontWeight:400}}>(6 %)</span></div>{[["LinkedIn",80],["Facebook",10],["Instagram",8],["YouTube",0.4]].map(([l,v])=><div key={l} style={{fontSize:12,color:"#aaa",marginBottom:7,borderBottom:"1px solid #444",paddingBottom:5}}><span style={{color:C.white,fontWeight:600}}>{l}</span> — {v} %</div>)}</Panel>
            <Panel style={{borderTop:`3px solid ${C.black}`}}><div style={{fontSize:13,fontWeight:800,color:C.black,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>Paid <span style={{color:C.muted,fontWeight:400}}>(4 %)</span></div><div style={{fontSize:12,color:C.muted}}><span style={{color:C.black,fontWeight:600}}>Google</span> — 100 %</div></Panel>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <Panel style={{background:C.red,border:`1px solid ${C.redDark}`}}><div style={{fontSize:13,fontWeight:800,color:C.white,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>Referring Domains (11 %)</div>{[["Typed/Bookmark",24],["ChatGPT",21],["MS Teams",13],["Perplexity",5],["Gemini",3]].map(([l,v])=><div key={l} style={{fontSize:12,color:"rgba(255,255,255,0.75)",marginBottom:7,borderBottom:"1px solid rgba(255,255,255,0.2)",paddingBottom:5}}><span style={{color:C.white,fontWeight:600}}>{l}</span> — {v} %</div>)}</Panel>
            <Panel style={{borderTop:`3px solid ${C.black}`}}><div style={{fontSize:13,fontWeight:800,color:C.black,marginBottom:10,textTransform:"uppercase",letterSpacing:0.5}}>Direct <span style={{color:C.muted,fontWeight:400}}>(9 %)</span></div><div style={{fontSize:12,color:C.muted}}><span style={{color:C.black,fontWeight:600}}>Typed / Bookmark</span> — 100 %</div></Panel>
          </div>
        </div>}

        {tab===2&&<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",gap:12}}>
            {[["Impressions gesamt",fmt(M.reduce((s,m)=>s+(m.imp||0),0)),C.red],["Klicks gesamt",fmt(M.reduce((s,m)=>s+(m.clk||0),0)),C.black],["Ø CPC",(M.filter(m=>m.cpc!=="—").reduce((s,m)=>s+parseFloat(m.cpc.replace(",",".")),0)/M.filter(m=>m.cpc!=="—").length).toFixed(2).replace(".",",")+" €",C.greyMid],["Kosten gesamt",fmt(M.reduce((s,m)=>s+(m.kst!=="—"?Number(m.kst):0),0))+" €","#888"]].map(([label,value,color])=>(
              <Panel key={label} style={{flex:1,padding:0,overflow:"hidden"}}>
                <div style={{height:3,background:color}}/>
                <div style={{padding:"12px 14px"}}><div style={{fontSize:9,color:C.muted,marginBottom:6,letterSpacing:1.5,textTransform:"uppercase"}}>{label}</div><div style={{fontSize:22,fontWeight:800,color:C.black}}>{value}</div></div>
              </Panel>
            ))}
          </div>
          <Panel style={{borderTop:`3px solid ${C.red}`}}><PT>Impressions · monatlicher Verlauf</PT><ResponsiveContainer width="100%" height={180}><BarChart data={seaM} margin={{top:4,right:8,left:0,bottom:0}}><CartesianGrid stroke={C.grey} strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}}/><YAxis tick={{fill:C.muted,fontSize:10}} tickFormatter={v=>v>=1000?(v/1000).toFixed(0)+"k":v}/><Tooltip content={<TT/>}/><Bar dataKey="imp" name="Impressions" fill={C.red}/></BarChart></ResponsiveContainer></Panel>
          <div style={{display:"flex",gap:16}}>
            <Panel style={{flex:1,borderTop:`3px solid ${C.black}`}}><PT>Klicks · monatlicher Verlauf</PT><ResponsiveContainer width="100%" height={180}><BarChart data={seaM} margin={{top:4,right:8,left:0,bottom:0}}><CartesianGrid stroke={C.grey} strokeDasharray="3 3" vertical={false}/><XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}}/><YAxis tick={{fill:C.muted,fontSize:10}}/><Tooltip content={<TT/>}/><Bar dataKey="clicks" name="Klicks" fill={C.black}/></BarChart></ResponsiveContainer></Panel>
            <Panel style={{flex:1,borderTop:`3px solid ${C.red}`}}><PT>CPC · monatlicher Verlauf (€)</PT><ResponsiveContainer width="100%" height={180}><LineChart data={seaM} margin={{top:4,right:8,left:-10,bottom:0}}><CartesianGrid stroke={C.grey} strokeDasharray="3 3"/><XAxis dataKey="m" tick={{fill:C.muted,fontSize:11}}/><YAxis tick={{fill:C.muted,fontSize:10}} domain={[0.5,0.9]} tickFormatter={v=>v.toFixed(2)+" €"}/><Tooltip content={<TT/>}/><Line dataKey="cpc" name="CPC (€)" stroke={C.red} strokeWidth={2.5} dot={{r:4,fill:C.red}} connectNulls/></LineChart></ResponsiveContainer></Panel>
          </div>
        </div>}
      </div>
    </div>
  );
}
