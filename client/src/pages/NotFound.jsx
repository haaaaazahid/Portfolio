import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Words, Reveal, Magnetic } from "../components/ui";
export default function NotFound() {
  return <div className="wrap pb-20 pt-40"><Helmet><title>Page not found</title><meta name="robots" content="noindex" /></Helmet>
    <Words text="Page not found." className="h-hero" /><Reveal d={0.4}><p className="lead mb-8 mt-6">That page does not exist or has moved.</p><Magnetic><Link to="/" className="btn">Back to home</Link></Magnetic></Reveal></div>;
}
