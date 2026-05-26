import { motion }
from "framer-motion";

import About from "../components/About";

function AboutPage(){

return(

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

transition={{duration:0.6}}

>

<About/>

</motion.div>

)

}

export default AboutPage;