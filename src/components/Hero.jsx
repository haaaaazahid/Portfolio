import profile from "../assets/profile.jpg";
function Hero() {
return (

<section
id="home"
className="min-h-screen flex flex-col justify-center items-center text-center">

<img
src={profile}
className="w-40 h-40 rounded-full object-cover border-4 border-white"
/>


<h1 className="text-7xl font-bold mt-8">

MOHD ZAHID SHAIKH

</h1>


<p className="mt-5 text-2xl">

Full Stack Developer •  AI-Assisted Web Developer
</p>

</section>

)
}

export default Hero;