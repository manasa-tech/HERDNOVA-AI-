import React, { useEffect, useRef, useState } from 'react';
import { Camera, ScanLine, Mic, Send, CloudSun, History, Users, Home, Languages, ImagePlus, X, Volume2, Menu, Sprout, MessageCircle, Plus, Search, MapPin, Sun, Wind, Droplets, ChevronRight, Bot, User, LoaderCircle, Stethoscope, Apple } from 'lucide-react';
import './styles.css';

const API = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const copy = {
  English: {welcome:'Namaste, farmer!',subtitle:'Your farm companion is ready to help.',dashboard:'Dashboard',history:'Previous Chats',community:'Community',weather:'Today’s weather',scan:'Scan your cattle',scanHint:'Take a photo or upload one to get started.',camera:'Open camera',upload:'Upload photo',recent:'Recent activity',viewAll:'View all',ask:'Ask HerdNova anything…',voice:'Tap to speak',send:'Send',health:'Cattle health check',healthHint:'Scan a cattle photo to begin an AI-assisted check.',noHistory:'Your conversations and scans will appear here.',communityHint:'Ask other farmers, share tips, and learn together.',post:'Write a community post…',publish:'Publish post',scanNow:'Analyze photo',listening:'Listening…',thinking:'Thinking…',welcomeChat:'Hello! I’m HerdNova. Ask me about cattle care, feed, weather, or your farm.',weatherDemo:'Sample weather — connect your weather API for live data.',feed:'Cattle feed',care:'Farm essentials',language:'Language',cameraHelp:'Allow camera access, then take a photo.',emptyPosts:'No posts yet. Be the first to share a tip!',today:'Today',all:'All activity',you:'You',assistant:'HerdNova AI',scanSaved:'Scan saved.'},
  Kannada: {welcome:'ನಮಸ್ಕಾರ ರೈತರೇ!',subtitle:'ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಿದ್ಧವಾಗಿದೆ.',dashboard:'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',history:'ಹಿಂದಿನ ಸಂಭಾಷಣೆಗಳು',community:'ಸಮುದಾಯ',weather:'ಇಂದಿನ ಹವಾಮಾನ',scan:'ನಿಮ್ಮ ಜಾನುವಾರು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',scanHint:'ಪ್ರಾರಂಭಿಸಲು ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',camera:'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ',upload:'ಫೋಟೋ ಅಪ್‌ಲೋಡ್',recent:'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',viewAll:'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',ask:'HerdNova ಅನ್ನು ಏನಾದರೂ ಕೇಳಿ…',voice:'ಮಾತನಾಡಲು ಒತ್ತಿರಿ',send:'ಕಳುಹಿಸಿ',health:'ಜಾನುವಾರು ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ',healthHint:'AI ಸಹಾಯದ ಪರಿಶೀಲನೆಗಾಗಿ ಜಾನುವಾರದ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',noHistory:'ನಿಮ್ಮ ಸಂಭಾಷಣೆಗಳು ಮತ್ತು ಸ್ಕ್ಯಾನ್‌ಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.',communityHint:'ಇತರ ರೈತರನ್ನು ಕೇಳಿ, ಸಲಹೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',post:'ಸಮುದಾಯ ಪೋಸ್ಟ್ ಬರೆಯಿರಿ…',publish:'ಪೋಸ್ಟ್ ಪ್ರಕಟಿಸಿ',scanNow:'ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ',listening:'ಕೇಳುತ್ತಿದೆ…',thinking:'ಯೋಚಿಸುತ್ತಿದೆ…',welcomeChat:'ನಮಸ್ಕಾರ! ನಾನು HerdNova. ಜಾನುವಾರು ಆರೈಕೆ, ಮೇವು ಅಥವಾ ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.',weatherDemo:'ಮಾದರಿ ಹವಾಮಾನ — ನೇರ ಮಾಹಿತಿಗಾಗಿ ಹವಾಮಾನ API ಸಂಪರ್ಕಿಸಿ.',feed:'ಜಾನುವಾರು ಮೇವು',care:'ಕೃಷಿ ಅಗತ್ಯ ವಸ್ತುಗಳು',language:'ಭಾಷೆ',cameraHelp:'ಕ್ಯಾಮೆರಾ ಅನುಮತಿ ನೀಡಿ, ನಂತರ ಫೋಟೋ ತೆಗೆಯಿರಿ.',emptyPosts:'ಇನ್ನೂ ಪೋಸ್ಟ್‌ಗಳಿಲ್ಲ. ಮೊದಲ ಸಲಹೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ!',today:'ಇಂದು',all:'ಎಲ್ಲ ಚಟುವಟಿಕೆಗಳು',you:'ನೀವು',assistant:'HerdNova AI',scanSaved:'ಸ್ಕ್ಯಾನ್ AI ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ.'},
  Hindi: {welcome:'नमस्ते किसान!',subtitle:'आपका खेती सहायक मदद के लिए तैयार है।',dashboard:'डैशबोर्ड',history:'पिछली बातचीत',community:'समुदाय',weather:'आज का मौसम',scan:'अपने पशु को स्कैन करें',scanHint:'शुरू करने के लिए फोटो लें या अपलोड करें।',camera:'कैमरा खोलें',upload:'फोटो अपलोड करें',recent:'हाल की गतिविधि',viewAll:'सभी देखें',ask:'HerdNova से कुछ भी पूछें…',voice:'बोलने के लिए टैप करें',send:'भेजें',health:'पशु स्वास्थ्य जाँच',healthHint:'AI-सहायता वाली जाँच के लिए पशु की फोटो स्कैन करें।',noHistory:'आपकी बातचीत और स्कैन यहाँ दिखाई देंगे।',communityHint:'अन्य किसानों से पूछें और सुझाव साझा करें।',post:'समुदाय पोस्ट लिखें…',publish:'पोस्ट प्रकाशित करें',scanNow:'फोटो का विश्लेषण करें',listening:'सुन रहा है…',thinking:'सोच रहा है…',welcomeChat:'नमस्ते! मैं HerdNova हूँ। पशुओं की देखभाल, चारा या मौसम के बारे में पूछें।',weatherDemo:'नमूना मौसम — लाइव जानकारी के लिए मौसम API जोड़ें।',feed:'पशु चारा',care:'खेती की ज़रूरी चीज़ें',language:'भाषा',cameraHelp:'कैमरे की अनुमति दें, फिर फोटो लें।',emptyPosts:'अभी कोई पोस्ट नहीं है। पहली सलाह साझा करें!',today:'आज',all:'सभी गतिविधियाँ',you:'आप',assistant:'HerdNova AI',scanSaved:'स्कैन AI इतिहास में सहेजा गया।'},
  Tamil: {welcome:'வணக்கம் விவசாயி!',subtitle:'உங்கள் பண்ணை உதவியாளர் உதவத் தயாராக உள்ளது.',dashboard:'முகப்பு',history:'முந்தைய உரையாடல்கள்',community:'சமூகம்',weather:'இன்றைய வானிலை',scan:'உங்கள் கால்நடையை ஸ்கேன் செய்யுங்கள்',scanHint:'தொடங்க புகைப்படம் எடுக்கவும் அல்லது பதிவேற்றவும்.',camera:'கேமராவைத் திற',upload:'புகைப்படத்தைப் பதிவேற்று',recent:'சமீபத்திய செயல்பாடு',viewAll:'அனைத்தையும் காண்க',ask:'HerdNova-விடம் கேளுங்கள்…',voice:'பேச தட்டவும்',send:'அனுப்பு',health:'கால்நடை ஆரோக்கியச் சோதனை',healthHint:'AI உதவியுடன் சோதிக்க கால்நடைப் புகைப்படத்தை ஸ்கேன் செய்யுங்கள்.',noHistory:'உங்கள் உரையாடல்களும் ஸ்கேன்களும் இங்கே தோன்றும்.',communityHint:'மற்ற விவசாயிகளிடம் கேட்டு ஆலோசனைகளைப் பகிருங்கள்.',post:'சமூகப் பதிவை எழுதுங்கள்…',publish:'பதிவிடு',scanNow:'புகைப்படத்தைப் பகுப்பாய்வு செய்',listening:'கேட்கிறது…',thinking:'சிந்திக்கிறது…',welcomeChat:'வணக்கம்! நான் HerdNova. கால்நடை பராமரிப்பு, தீவனம் அல்லது வானிலை பற்றி கேளுங்கள்.',weatherDemo:'மாதிரி வானிலை — நேரலை தகவலுக்கு வானிலை API-ஐ இணைக்கவும்.',feed:'கால்நடைத் தீவனம்',care:'பண்ணைத் தேவைகள்',language:'மொழி',cameraHelp:'கேமரா அனுமதியை வழங்கி புகைப்படம் எடுக்கவும்.',emptyPosts:'இன்னும் பதிவுகள் இல்லை. முதல் ஆலோசனையைப் பகிருங்கள்!',today:'இன்று',all:'அனைத்து செயல்பாடுகள்',you:'நீங்கள்',assistant:'HerdNova AI',scanSaved:'ஸ்கேன் AI வரலாற்றில் சேமிக்கப்பட்டது.'}
};
const locales = {English:'en-IN',Kannada:'kn-IN',Hindi:'hi-IN',Tamil:'ta-IN'};
const initialPosts = [
 {id:1,author:'Ravi • Mandya',text:'Which green fodder is working well during this season? Any local suggestions?',time:'Today'},
 {id:2,author:'Lakshmi • Mysuru',text:'Remember to keep clean drinking water available for your cattle throughout the day.',time:'Today'}
];


export default function App(){
 const [language,setLanguage] = useState(localStorage.getItem('herdnova-language') || 'English');
 const [page,setPage] = useState('dashboard');
 const [mobileNav,setMobileNav] = useState(false);
 const [photo,setPhoto] = useState(null);
 const [preview,setPreview] = useState('');
 const [scanning,setScanning] = useState(false);
 const [scanResult,setScanResult] = useState('');
 const [history,setHistory] = useState(()=>{try{return JSON.parse(localStorage.getItem('herdnova-history')||'[]')}catch{return []}});
 const [chatOpen,setChatOpen] = useState(false);
 const [messages,setMessages] = useState(()=>{try{return JSON.parse(localStorage.getItem('herdnova-chat')||'[]')}catch{return []}});
 const [draft,setDraft] = useState('');
 const [listening,setListening] = useState(false);
 const [busy,setBusy] = useState(false);
 const [posts,setPosts] = useState(()=>{try{return JSON.parse(localStorage.getItem('herdnova-posts')||'null')||initialPosts}catch{return initialPosts}});
 const [postDraft,setPostDraft] = useState('');
 const [search,setSearch] = useState('');
 const [weather,setWeather] = useState(null);
 const fileRef = useRef(null); const cameraRef = useRef(null); const chatEndRef=useRef(null); const recognitionRef=useRef(null);
 const t = copy[language] || copy.English;
 useEffect(()=>{localStorage.setItem('herdnova-language',language)},[language]);
 useEffect(()=>{localStorage.setItem('herdnova-history',JSON.stringify(history))},[history]);
 useEffect(()=>{localStorage.setItem('herdnova-chat',JSON.stringify(messages))},[messages]);
 useEffect(()=>{localStorage.setItem('herdnova-posts',JSON.stringify(posts))},[posts]);
 useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:'smooth'})},[messages,chatOpen]);
 useEffect(()=>{fetch(`${API}/api/weather`).then(r=>r.ok?r.json():null).then(setWeather).catch(()=>{})},[]);
 function addHistory(type,title,detail){setHistory(prev=>[{id:Date.now(),type,title,detail,time:new Date().toLocaleString()},...prev].slice(0,100))}
 function choosePhoto(file){if(!file)return;if(!file.type.startsWith('image/')){alert('Please choose an image file.');return}setPhoto(file);setPreview(URL.createObjectURL(file));setScanResult('')}
 async function analyzePhoto(){if(!photo){fileRef.current?.click();return}setScanning(true);setScanResult('');try{const fd=new FormData();fd.append('file',photo);fd.append('language',language);let response=await fetch(`${API}/api/analyze-image`,{method:'POST',body:fd});let data;if(response.ok){data=await response.json()}else{response=await fetch(`${API}/api/analyze`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:`Analyze this cattle image: ${photo.name}. Image upload endpoint is not available; provide safe general next steps.`,farm_id:1,language})});if(response.ok)data=await response.json();else throw new Error('Backend analysis endpoints are not available.')}const result=data.result||data.analysis||data.message||JSON.stringify(data);setScanResult(typeof result==='string'?result:JSON.stringify(result,null,2));addHistory('scan',t.health,typeof result==='string'?result:JSON.stringify(result));}catch(e){const msg=language==='Kannada'?'ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಲು ಬ್ಯಾಕೆಂಡ್ ಸಂಪರ್ಕವಾಗಲಿಲ್ಲ. FastAPI ಚಾಲನೆಯಲ್ಲಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.':language==='Hindi'?'फोटो का विश्लेषण करने के लिए बैकएंड से संपर्क नहीं हुआ। FastAPI चल रहा है या नहीं जाँचें।':language==='Tamil'?'புகைப்படத்தைப் பகுப்பாய்வு செய்ய backend இணைக்கப்படவில்லை. FastAPI இயங்குகிறதா எனச் சரிபார்க்கவும்.':'Could not connect to the analysis backend. Check that FastAPI is running and supports POST /api/analyze-image or POST /api/analyze.';setScanResult(msg+'\n\n'+e.message)}finally{setScanning(false)}}
 function speak(text,lang=language){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=locales[lang]||'en-IN';window.speechSynthesis.speak(u)}
 function startVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert('Voice recognition is not supported in this browser. Try Chrome.');return}if(listening){recognitionRef.current?.stop();setListening(false);return}const r=new SR();recognitionRef.current=r;r.lang=locales[language]||'en-IN';r.interimResults=false;r.maxAlternatives=1;r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onerror=()=>setListening(false);r.onresult=e=>{setDraft(e.results[0][0].transcript);sendMessage(e.results[0][0].transcript)};r.start()}
 async function sendMessage(text = draft) {
  const query = text.trim();

  if (!query || busy) return;

  const userMsg = {
    id: Date.now(),
    role: "user",
    text: query,
  };

  const next = [...chat, userMsg];

  setChat(next);
  setDraft("");
  setBusy(true);

  try {
    const response = await fetch(`${API}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: query,
        language: language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || `Request failed: ${response.status}`
      );
    }

    const answer =
      data.answer ??
      data.response ??
      data.result ??
      data.message ??
      "The backend returned no answer.";

    setChat([
      ...next,
      {
        id: Date.now() + 1,
        role: "assistant",
        text:
          typeof answer === "string"
            ? answer
            : JSON.stringify(answer, null, 2),
      },
    ]);
  } catch (error) {
    setChat([
      ...next,
      {
        id: Date.now() + 1,
        role: "assistant",
        text: `API error: ${error.message}`,
      },
    ]);
  } finally {
    setBusy(false);
  }
}
 function publishPost(){if(!postDraft.trim())return;setPosts(p=>[{id:Date.now(),author:'You',text:postDraft.trim(),time:'Just now'},...p]);addHistory('community','Community post',postDraft.trim());setPostDraft('')}
 const nav=[{id:'dashboard',label:t.dashboard,icon:Home},{id:'history',label:t.history,icon:MessageCircle},{id:'doctor',label:'Doctor Consultation',icon:Stethoscope},{id:'nutrition',label:'Nutrition Plan',icon:Apple},{id:'community',label:t.community,icon:Users}];
 return <div className="app-shell" lang={locales[language]?.split('-')[0]}>
  <aside className={`sidebar ${mobileNav?'open':''}`}><div className="brand"><div className="brand-icon"><Sprout size={23}/></div><div><strong>HerdNova <span>AI</span></strong><small>Smart livestock companion</small></div><button className="icon-btn close-nav" onClick={()=>setMobileNav(false)} aria-label="Close menu"><X/></button></div><div className="nav-label">MENU</div><nav>{nav.map(n=><button key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setMobileNav(false)}}><n.icon size={19}/><span>{n.label}</span>{page===n.id&&<ChevronRight size={16} className="nav-arrow"/>}</button>)}</nav><div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Bot size={20}/></div><strong>Need a hand?</strong><p>Ask your farm assistant in your language.</p><button onClick={()=>setChatOpen(true)}>Talk to AI <ChevronRight size={15}/></button></div><div className="profile"><div className="avatar">🌾</div><div><strong>Farmer</strong><small>Farm dashboard</small></div><span className="online-dot"/></div></div></aside>
  {mobileNav&&<button className="mobile-scrim" onClick={()=>setMobileNav(false)} aria-label="Close navigation"/>}
  <main className="main-area"><header className="topbar"><button className="icon-btn menu-toggle" onClick={()=>setMobileNav(true)} aria-label="Open menu"><Menu/></button><div className="crumb"><span>HerdNova AI</span><span className="crumb-slash">/</span><strong>{nav.find(n=>n.id===page)?.label||t.dashboard}</strong></div><div className="top-actions"><div className="language-picker"><Languages size={17}/><select value={language} onChange={e=>setLanguage(e.target.value)} aria-label={t.language}><option value="English">English</option><option value="Kannada">ಕನ್ನಡ</option><option value="Hindi">हिन्दी</option><option value="Tamil">தமிழ்</option></select></div><div className="top-avatar">🌱</div></div></header>
  <div className="content">
   {page==='dashboard'&&<><section className="welcome-row"><div><div className="eyebrow"><span className="live-dot"/> YOUR FARM, MADE SIMPLER</div><h1>{t.welcome}</h1><p>{t.subtitle}</p></div><div className="date-pill"><Sun size={16}/>{new Date().toLocaleDateString(language==='Kannada'?'kn-IN':language==='Hindi'?'hi-IN':language==='Tamil'?'ta-IN':'en-IN',{weekday:'short',day:'numeric',month:'short'})}</div></section>
    <section className="weather-card"><div className="weather-main"><div className="weather-icon"><CloudSun size={30}/></div><div><span className="weather-label">{t.weather}</span><div className="weather-temp">{weather?.temperature ?? weather?.temp ?? '28'}<span>°C</span><span className="weather-condition">{weather?.condition||weather?.description||'Partly cloudy'}</span></div><small>{weather?.location||'Local farm'} · {t.weatherDemo}</small></div></div><div className="weather-stats"><div><Droplets size={17}/><span>Humidity</span><strong>{weather?.humidity??'64'}%</strong></div><div><Wind size={17}/><span>Wind</span><strong>{weather?.wind_speed??'12'} km/h</strong></div></div></section>
    <section className="scan-card"><div className="scan-copy"><div className="section-kicker"><ScanLine size={16}/> AI-POWERED CARE</div><h2>{t.scan}</h2><p>{t.scanHint}</p><div className="scan-actions"><button className="btn btn-primary" onClick={()=>cameraRef.current?.click()}><Camera size={18}/>{t.camera}</button><button className="btn btn-outline" onClick={()=>fileRef.current?.click()}><ImagePlus size={18}/>{t.upload}</button><button className={`btn btn-outline voice-scan-btn ${listening?'listening':''}`} onClick={()=>{setChatOpen(true);setTimeout(()=>startVoice(),120)}}><Mic size={18}/>{t.voice}</button><input ref={cameraRef} className="hidden-input" type="file" accept="image/*" capture="environment" onChange={e=>choosePhoto(e.target.files?.[0])}/><input ref={fileRef} className="hidden-input" type="file" accept="image/*" onChange={e=>choosePhoto(e.target.files?.[0])}/></div></div><div className="scan-visual">{preview?<><img src={preview} alt="Selected cattle"/><button className="remove-photo" onClick={()=>{setPhoto(null);setPreview('');setScanResult('')}} aria-label="Remove photo"><X size={16}/></button></>:<div className="cow-illustration"><span className="sun-orb"/><div className="cow-emoji">🐄</div><div className="scan-ring"><ScanLine size={24}/></div><span className="visual-caption">CARE STARTS HERE</span></div>}</div>{preview&&<button className="btn btn-primary analyze-btn" disabled={scanning} onClick={analyzePhoto}>{scanning?<LoaderCircle className="spin" size={17}/>:<ScanLine size={17}/>} {scanning?t.thinking:t.scanNow}</button>}</section>
    {scanResult&&<section className="result-card"><div className="result-head"><div className="result-icon"><Bot size={20}/></div><div><strong>{t.health}</strong><small>AI analysis result</small></div><button className="icon-btn" onClick={()=>setScanResult('')} aria-label="Close result"><X size={18}/></button></div><pre>{scanResult}</pre><p className="disclaimer">AI guidance is not a veterinary diagnosis. Contact a veterinarian if an animal appears unwell.</p></section>}
    <section className="section-heading"><div><h2>Recent conversations</h2><p>Pick up where you left off</p></div><button className="text-link" onClick={()=>setPage('history')}>Previous chats <ChevronRight size={16}/></button></section><div className="activity-list">{history.slice(0,3).length?history.slice(0,3).map(item=><Activity key={item.id} item={item}/>):<div className="empty-activity"><div className="empty-icon"><History size={22}/></div><div><strong>{t.noHistory}</strong><p>Scan a photo or start a voice conversation to build your history.</p></div></div>}</div>
   </>}
   {page==='history'&&<><PageTitle title={t.history} subtitle="Continue your earlier conversations with their saved context."/><div className="history-chat-cta"><div className="chat-cta-icon"><MessageCircle/></div><div><strong>Previous conversation</strong><p>Your chat is saved on this device. Open it to continue asking follow-up questions.</p></div><button className="btn btn-primary" onClick={()=>setChatOpen(true)}>Open previous chat <ChevronRight size={16}/></button></div><div className="history-list">{messages.length?messages.map(m=><article className="activity-item" key={m.id}><div className={`activity-icon ${m.role==='user'?'chat':'scan'}`}>{m.role==='user'?<User size={19}/>:<Bot size={19}/>}</div><div className="activity-content"><div className="activity-title-row"><strong>{m.role==='user'?'You':'HerdNova AI'}</strong><span>{m.time?new Date(m.time).toLocaleString():''}</span></div><p>{m.text}</p></div></article>):<div className="empty-state"><h3>No previous chats yet</h3><p>Start a voice conversation and your messages will appear here.</p><button className="btn btn-primary" onClick={()=>setChatOpen(true)}>Start conversation</button></div>}</div></>}
   {page==='doctor'&&<section className="special-card"><PageTitle title="Doctor Consultation" subtitle="Describe your animal’s symptoms and get guidance on what to do next."/><div className="result-card"><div className="result-head"><div className="result-icon"><Stethoscope size={20}/></div><div><strong>Veterinary consultation assistant</strong><small>Not a replacement for a veterinarian</small></div></div><p>Tell HerdNova about symptoms, age, appetite, temperature, and how long the animal has been unwell. For severe symptoms, contact a local veterinarian urgently.</p><button className="btn btn-primary" onClick={()=>{setChatOpen(true);setDraft(language==='Kannada'?'ನನ್ನ ಜಾನುವಾರಿಗೆ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.':language==='Hindi'?'मेरे पशु को स्वास्थ्य समस्या है। कृपया मदद करें।':language==='Tamil'?'என் கால்நடைக்கு உடல்நலப் பிரச்சினை உள்ளது. உதவுங்கள்.':'I need a veterinary consultation for my cattle. Help me assess the symptoms and next steps.')}}><Mic size={18}/> Start consultation by voice</button></div></section>}
   {page==='nutrition'&&<section className="special-card"><PageTitle title="Nutrition Plan" subtitle="Get a feeding plan tailored to your animal and farming conditions."/><div className="result-card"><div className="result-head"><div className="result-icon"><Apple size={20}/></div><div><strong>Personalized cattle nutrition</strong><small>Feed plan assistant</small></div></div><p>Share the animal type, age, approximate weight, milk production, available fodder, and budget so the assistant can suggest a practical plan.</p><button className="btn btn-primary" onClick={()=>{setChatOpen(true);setDraft(language==='Kannada'?'ನನ್ನ ಜಾನುವಾರಿಗೆ ಪೌಷ್ಟಿಕ ಆಹಾರ ಯೋಜನೆ ನೀಡಿ.':language==='Hindi'?'मेरे पशु के लिए पोषण योजना बनाएं।':language==='Tamil'?'என் கால்நடைக்கு ஊட்டச்சத்து திட்டம் தயார் செய்யுங்கள்.':'Create a nutrition plan for my cattle. Ask me for the animal details you need.')}}><Mic size={18}/> Create plan by voice</button></div></section>}
   {page==='community'&&<><PageTitle title={t.community} subtitle={t.communityHint}/><div className="compose-card"><div className="compose-avatar">🌾</div><div className="compose-body"><textarea value={postDraft} onChange={e=>setPostDraft(e.target.value)} placeholder={t.post} rows={3}/><div className="compose-footer"><span>Share a question, tip, or local update</span><button className="btn btn-primary btn-small" onClick={publishPost} disabled={!postDraft.trim()}><Plus size={16}/>{t.publish}</button></div></div></div><div className="feed-header"><h2>Farmer feed</h2><span>{posts.length} posts</span></div><div className="post-list">{posts.length?posts.map(post=><article className="post-card" key={post.id}><div className="post-top"><div className="post-avatar">{post.author==='You'?'🌱':'👩🏽‍🌾'}</div><div className="post-author"><strong>{post.author}</strong><small>{post.time} · <MapPin size={12}/> Local farming community</small></div><button className="icon-btn" title="Read aloud" onClick={()=>speak(post.text)}><Volume2 size={18}/></button></div><p>{post.text}</p><div className="post-actions"><button onClick={()=>{setDraft(language==='Kannada'?'ಈ ಪೋಸ್ಟ್ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ವಿವರಿಸಿ':language==='Hindi'?'इस पोस्ट के बारे में और बताएं':language==='Tamil'?'இந்தப் பதிவைப் பற்றி மேலும் கூறுங்கள்':'Tell me more about this post');setChatOpen(true)}}><MessageCircle size={16}/> Ask AI about this</button><button onClick={()=>speak(post.text)}><Volume2 size={16}/> Listen</button></div></article>):<div className="empty-state"><p>{t.emptyPosts}</p></div>}</div></>}

  </div><footer className="footer"><span>🌿 HerdNova AI</span><span>Built for farmers · Simple, local, helpful</span></footer></main>
  <button className={`assistant-fab ${chatOpen?'fab-open':''}`} onClick={()=>setChatOpen(v=>!v)} aria-label="Open voice assistant">{chatOpen?<X size={23}/>:<><span className="fab-pulse"/><MessageCircle size={23}/></>}</button>
  {chatOpen&&<section className="chat-panel" aria-label="HerdNova voice assistant"><div className="chat-header"><div className="chat-bot-icon"><Bot size={22}/></div><div className="chat-title"><strong>{t.assistant}</strong><small><span className="live-dot"/> Ready to help · {language}</small></div><button className="icon-btn" onClick={()=>setChatOpen(false)} aria-label="Close assistant"><X size={19}/></button></div><div className="chat-messages">{messages.length===0&&<div className="bot-welcome"><div className="welcome-bot"><Bot size={24}/></div><p>{t.welcomeChat}</p><div className="quick-prompts"><button onClick={()=>sendMessage(language==='Kannada'?'ನನ್ನ ಹಸುವಿಗೆ ಯಾವ ಆಹಾರ ಒಳ್ಳೆಯದು?':language==='Hindi'?'मेरी गाय के लिए कौन सा चारा अच्छा है?':language==='Tamil'?'என் மாட்டுக்கு எந்த தீவனம் நல்லது?':'What feed is good for my cow?')}>🌿 Cattle feed</button><button onClick={()=>sendMessage(language==='Kannada'?'ಇಂದಿನ ಹವಾಮಾನ ಹೇಗಿದೆ?':language==='Hindi'?'आज मौसम कैसा है?':language==='Tamil'?'இன்றைய வானிலை எப்படி?':'What is today’s weather?')}>🌦️ Weather</button></div></div>}{messages.map(m=><div className={`chat-message ${m.role==='user'?'from-user':'from-bot'}`} key={m.id}><div className="message-avatar">{m.role==='user'?<User size={15}/>:<Bot size={15}/>}</div><div className="message-bubble"><p>{m.text}</p><button className="speak-message" onClick={()=>speak(m.text)} title="Read aloud"><Volume2 size={14}/></button></div></div>)}{busy&&<div className="typing"><span/><span/><span/> {t.thinking}</div>}<div ref={chatEndRef}/></div><div className="chat-input-area"><button className={`mic-btn ${listening?'listening':''}`} onClick={startVoice} title={t.voice}><Mic size={19}/></button><div className="chat-input-wrap"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')sendMessage()}} placeholder={listening?t.listening:t.ask}/><small>{t.voice} · {language}</small></div><button className="send-btn" onClick={()=>sendMessage()} disabled={!draft.trim()||busy} aria-label={t.send}><Send size={18}/></button></div><div className="chat-footnote">Voice replies use the selected language. AI advice is for guidance, not a veterinary diagnosis.</div></section>}
 </div>
}
function PageTitle({title,subtitle}){return <section className="page-title"><div className="eyebrow"><span className="live-dot"/> HERDNOVA FARM SPACE</div><h1>{title}</h1><p>{subtitle}</p></section>}
function Activity({item,expanded=false,onOpenChat}){const Icon=item.type==='scan'?ScanLine:item.type==='community'?Users:MessageCircle;return <article className={`activity-item ${expanded?'expanded':''}`}><div className={`activity-icon ${item.type}`}><Icon size={19}/></div><div className="activity-content"><div className="activity-title-row"><strong>{item.title}</strong><span>{item.time}</span></div>{item.detail&&<p>{item.detail}</p>}{expanded&&item.type==='chat'&&<button className="text-link" onClick={onOpenChat}>Continue chat <ChevronRight size={15}/></button>}</div><span className="activity-kind">{item.type==='scan'?'SCAN':item.type==='community'?'POST':'CHAT'}</span></article>}
