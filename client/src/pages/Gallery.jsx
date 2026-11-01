import { Helmet } from "react-helmet-async";
import Gallery from "../components/Gallery";
import { Words } from "../components/ui";
export default () => <div className="wrap pb-20 pt-40"><Helmet><title>Gallery</title><meta name="description" content="Training and project photos." /></Helmet><Words text="Gallery." className="h-hero mb-10" /><Gallery /></div>;
