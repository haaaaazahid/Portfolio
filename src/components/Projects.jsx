function Projects() {

const projects = [

{
title:"NAGRIK – Citizens Improving the City",

desc:
"AI-powered civic issue reporting platform where citizens can report potholes, garbage, streetlight failures and track resolutions.",

tech:
"React • Firebase • Railway MySQL • Authentication • Image Uploads • Geolocation • Tailwind CSS • Real-time Civic Issue Reporting",

live:
"https://nagrik-six.vercel.app/"
},

{
title:"JCSAM Hub",

desc:
"AI-enhanced sports management platform for Mumbai’s junior colleges, enabling digital player registrations, college onboarding, sport-wise event management, notices, results tracking, galleries, and real-time administration through a centralized portal.",

tech:
"React • TypeScript • Supabase • Tailwind • Framer Motion • Real-time Admin Dashboard",

live:
"https://jcsam-hub.vercel.app/"
},

{
title:"Smart Rainwater Harvesting",

desc:
"An innovative sensor-based automated rainwater harvesting system designed to reduce flooding, collect and purify rainwater, and generate renewable electricity through micro-turbines. The system uses retractable smart sheets, underground pipelines, and centralized filtration hubs for sustainable water and energy management across roads, highways, and railway infrastructure.",

tech:
"IoT • Rain Sensors • Automation • Embedded Systems • Microcontrollers • Renewable Energy • Water Filtration • Micro-Turbines • Smart Infrastructure • Sustainable Engineering",

live:null
}

]

return (

<section
id="projects"
className="min-h-screen px-10 pt-32 py-20">

<h2 className="text-5xl font-bold text-center">

Projects

</h2>


<div className="grid md:grid-cols-2 gap-10 mt-16">

{projects.map((project,index)=>(

<div
key={index}
className="bg-slate-800 p-8 rounded-2xl hover:scale-105 transition duration-300">

<h3 className="text-3xl font-bold">

{project.title}

</h3>


<p className="mt-5 text-gray-300 leading-7">

{project.desc}

</p>


<p className="mt-5">

Tech:

<span className="text-blue-400">

 {project.tech}

</span>

</p>


<div className="mt-8">

{project.live && (

<a
href={project.live}
target="_blank"
rel="noreferrer">

<button
className="bg-white text-black px-5 py-3 rounded-lg hover:scale-105 transition">

Live Demo

</button>

</a>

)}

</div>

</div>

))}

</div>

</section>

)

}

export default Projects;