import { motion } from "framer-motion";
import Skills from "../components/Skills";

function SkillsPage(){

return(

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
transition={{duration:0.6}}
>

<Skills/>

</motion.div>

)

}

export default SkillsPage;