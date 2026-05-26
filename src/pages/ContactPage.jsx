import { motion } from "framer-motion";
import Contact from "../components/Contact";

function ContactPage(){

return(

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0}}
transition={{duration:0.6}}
>

<Contact/>

</motion.div>

)

}

export default ContactPage;