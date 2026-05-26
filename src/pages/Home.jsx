import { motion } from "framer-motion";
import Hero from "../components/Hero";

function Home(){

return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:1}}
>

<Hero/>

</motion.div>

)

}

export default Home;