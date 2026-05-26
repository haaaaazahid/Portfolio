function Skills() {

const skills = [
"HTML",
"CSS",
"JavaScript",
"React",
"Node.js",
"Express",
"PHP",
"Git",
"Github",
"MySQL",
"Tailwind",
"REST API"
];

return (

<section
id="skills"
className="min-h-screen flex flex-col justify-center items-center">

<h2 className="text-5xl font-bold">

Skills

</h2>


<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

{skills.map((skill,index)=>(

<div
key={index}
className="bg-slate-800 px-8 py-6 rounded-xl hover:scale-110 transition">

{skill}

</div>

))}

</div>

</section>

)

}

export default Skills;