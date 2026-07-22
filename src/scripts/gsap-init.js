import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once
gsap.registerPlugin(ScrollTrigger);

// Export for use across the app
export { gsap, ScrollTrigger };
