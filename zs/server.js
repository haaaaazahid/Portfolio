// Express API + static hosting. Data: data/db.json. Images: uploads/.
const express=require("express"),multer=require("multer"),fs=require("fs"),path=require("path"),crypto=require("crypto");
const PASS=process.env.ADMIN_PASSWORD, SECRET=process.env.SESSION_SECRET||crypto.randomBytes(32).toString("hex");
if(!PASS)console.warn("ADMIN_PASSWORD not set: admin login is disabled.");
const DB=path.join(__dirname,"data","db.json"),UP=path.join(__dirname,"uploads");
fs.mkdirSync(UP,{recursive:true});fs.mkdirSync(path.dirname(DB),{recursive:true});
if(!fs.existsSync(DB))fs.writeFileSync(DB,JSON.stringify({projects:[
 {id:crypto.randomUUID(),title:"Nagrik",status:"To be confirmed",description:"A civic issue reporting platform: image and voice-note reports, location tagging, complaint tracking and an admin dashboard.",tags:["React","Node.js","MySQL","Firebase Auth","Google OAuth","JWT","Socket.IO","Cloudinary"],published:true,order:1},
 {id:crypto.randomUUID(),title:"JCSAM",status:"To be confirmed",description:"A sports administration platform for player registration and college management workflows.",tags:["React","TypeScript","Supabase","Tailwind CSS","Google OAuth","Vite","Framer Motion"],published:true,order:2},
 {id:crypto.randomUUID(),title:"Dravon",status:"In progress",description:"An e-commerce project. Features to be listed after the repository is reviewed.",tags:[],published:true,order:3}],gallery:[],contacts:[]},null,2));
const load=()=>JSON.parse(fs.readFileSync(DB,"utf8"));
const save=d=>{fs.writeFileSync(DB+".tmp",JSON.stringify(d,null,2));fs.renameSync(DB+".tmp",DB)};
const sign=e=>{const p=Buffer.from(String(e)).toString("base64url");return p+"."+crypto.createHmac("sha256",SECRET).update(p).digest("base64url")};
const valid=t=>{const[p,s]=String(t||"").split(".");if(!p||!s)return false;const x=sign(Buffer.from(p,"base64url").toString()).split(".")[1];
 return x.length===s.length&&crypto.timingSafeEqual(Buffer.from(x),Buffer.from(s))&&+Buffer.from(p,"base64url").toString()>Date.now()};
const isAdmin=r=>valid((r.headers.authorization||"").replace("Bearer ",""));
const auth=(q,s,n)=>isAdmin(q)?n():s.status(401).json({error:"Sign in required."});
const hits=new Map();const limited=(k,max)=>{const n=Date.now(),a=(hits.get(k)||[]).filter(t=>n-t<60000);hits.set(k,[...a,n]);return a.length>=max};
const EXT={"image/jpeg":".jpg","image/png":".png","image/webp":".webp","image/gif":".gif"};
const upload=multer({storage:multer.diskStorage({destination:UP,filename:(q,f,cb)=>cb(null,crypto.randomUUID()+EXT[f.mimetype])}),limits:{fileSize:5*1024*1024,files:1},
 fileFilter:(q,f,cb)=>EXT[f.mimetype]?cb(null,true):cb(new Error("Only JPG, PNG, WebP or GIF images up to 5 MB."))});
const rm=u=>{if(u)fs.rm(path.join(UP,path.basename(u)),()=>{})};
const str=(v,n)=>String(v??"").trim().slice(0,n);
const app=express();app.use(express.json({limit:"20kb"}));app.use("/uploads",express.static(UP));
app.post("/api/login",(q,s)=>{if(!PASS||limited("l"+q.ip,5))return s.status(429).json({error:"Login unavailable or too many attempts."});
 const a=Buffer.from(sha(str(q.body.password,200))),b=Buffer.from(sha(PASS));
 if(!crypto.timingSafeEqual(a,b))return s.status(401).json({error:"Wrong password."});s.json({token:sign(Date.now()+12*3600e3)})});
const sha=x=>crypto.createHash("sha256").update(x).digest("hex");
// Projects
app.get("/api/projects",(q,s)=>{const all=q.query.all&&isAdmin(q);s.json(load().projects.filter(p=>all||p.published).sort((a,b)=>a.order-b.order))});
const fields=(b,o={})=>({...o,title:str(b.title,120),status:str(b.status,40),description:str(b.description,2000),tags:str(b.tags,300).split(",").map(t=>t.trim()).filter(Boolean).slice(0,20),
 liveUrl:/^https?:\/\//.test(b.liveUrl)?str(b.liveUrl,300):"",githubUrl:/^https?:\/\//.test(b.githubUrl)?str(b.githubUrl,300):"",published:b.published==="true"||b.published===true});
app.post("/api/projects",auth,upload.single("cover"),(q,s)=>{const d=load();if(!str(q.body.title,1))return s.status(400).json({error:"Title is required."});
 const p=fields(q.body,{id:crypto.randomUUID(),order:d.projects.length+1,cover:q.file?"/uploads/"+q.file.filename:""});d.projects.push(p);save(d);s.json(p)});
app.put("/api/projects/:id",auth,upload.single("cover"),(q,s)=>{const d=load(),i=d.projects.findIndex(p=>p.id===q.params.id);if(i<0)return s.status(404).json({error:"Not found."});
 const old=d.projects[i];if(q.file)rm(old.cover);d.projects[i]=fields(q.body,{...old,cover:q.file?"/uploads/"+q.file.filename:old.cover});save(d);s.json(d.projects[i])});
app.delete("/api/projects/:id",auth,(q,s)=>{const d=load(),p=d.projects.find(x=>x.id===q.params.id);if(!p)return s.status(404).json({error:"Not found."});rm(p.cover);d.projects=d.projects.filter(x=>x!==p);save(d);s.json({ok:true})});
// Gallery
app.get("/api/gallery",(q,s)=>s.json(load().gallery.sort((a,b)=>b.createdAt.localeCompare(a.createdAt))));
app.post("/api/gallery",auth,upload.single("image"),(q,s)=>{if(!q.file)return s.status(400).json({error:"Choose an image."});const d=load();
 const g={id:crypto.randomUUID(),src:"/uploads/"+q.file.filename,category:str(q.body.category,40)||"Training",caption:str(q.body.caption,200),alt:str(q.body.alt,200),createdAt:new Date().toISOString()};d.gallery.push(g);save(d);s.json(g)});
app.delete("/api/gallery/:id",auth,(q,s)=>{const d=load(),g=d.gallery.find(x=>x.id===q.params.id);if(!g)return s.status(404).json({error:"Not found."});rm(g.src);d.gallery=d.gallery.filter(x=>x!==g);save(d);s.json({ok:true})});
// Contact
app.post("/api/contact",(q,s)=>{if(limited("c"+q.ip,3))return s.status(429).json({error:"Too many messages. Try again in a minute."});const b=q.body||{};if(b.website)return s.json({ok:true});
 const m={id:crypto.randomUUID(),name:str(b.name,100),email:str(b.email,150),subject:str(b.subject,150),category:str(b.category,40),message:str(b.message,3000),read:false,at:new Date().toISOString()};
 if(!m.name||!m.subject||!m.message||!/^\S+@\S+\.\S+$/.test(m.email))return s.status(400).json({error:"Fill in name, a valid email, subject and message."});const d=load();d.contacts.unshift(m);save(d);s.json({ok:true})});
app.get("/api/contacts",auth,(q,s)=>s.json(load().contacts));
app.patch("/api/contacts/:id",auth,(q,s)=>{const d=load(),m=d.contacts.find(x=>x.id===q.params.id);if(!m)return s.status(404).json({error:"Not found."});m.read=true;save(d);s.json(m)});
app.delete("/api/contacts/:id",auth,(q,s)=>{const d=load();d.contacts=d.contacts.filter(x=>x.id!==q.params.id);save(d);s.json({ok:true})});
app.use(express.static(path.join(__dirname,"public")));
app.use((e,q,s,n)=>s.status(400).json({error:e.message||"Request failed."}));
app.listen(process.env.PORT||3000,()=>console.log("http://localhost:"+(process.env.PORT||3000)));
