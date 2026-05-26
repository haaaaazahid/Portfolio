import { motion } from "framer-motion";
import Achievements from "../components/Achievements";

function AchievementsPage(){

return(

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
transition={{duration:0.6}}
>

<Achievements/>

</motion.div>

)

}

export default AchievementsPage;