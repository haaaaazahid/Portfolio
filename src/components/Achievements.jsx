import { useState } from "react";

import nccFlag from "../assets/nccflag.jpg";
import nccGroup from "../assets/nccgroup.jpg";
import cert from "../assets/aavishkarcert.jpg";

function Achievements() {

const [selected,setSelected] = useState(null);

const achievements = [

{
title:"Company Sergeant Major (CSM) • NCC",
img:nccFlag
},

{
title:"NCC Leadership & Medals",
img:nccGroup
},

{
title:"Aavishkar Research Competition",
img:cert
}

];

return (

<>

<section
id="achievements"
className="min-h-screen px-10 py-20">

<h2 className="text-5xl font-bold text-center">

Achievements

</h2>


<div className="grid md:grid-cols-2 gap-10 mt-16">

{achievements.map((item,index)=>(

<div
key={index}
className="bg-slate-800 rounded-2xl overflow-hidden hover:-translate-y-2 transition">

<img
src={item.img}
alt={item.title}
onClick={()=>setSelected(item.img)}
className="cursor-pointer w-full h-72 object-cover"
/>


<h3 className="text-xl font-bold p-6">

🏆 {item.title}

</h3>

</div>

))}

</div>

</section>


{selected && (

<div
onClick={()=>setSelected(null)}
className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">

<img
src={selected}
className="max-h-[90vh] max-w-[90vw] rounded-lg"
/>

</div>

)}

</>

);

}

export default Achievements;