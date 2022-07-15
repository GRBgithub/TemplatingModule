import STOCKX from "./test";
import gsap from "gsap";
class Controller {
  constructor() {
    this.timeline = gsap;
  
    window.addEventListener("click", () => {
 
        STOCKX.Button.setstate(STOCKX.Button.state.ETAT1);
  
   
    });
  }
}

export default Controller;
