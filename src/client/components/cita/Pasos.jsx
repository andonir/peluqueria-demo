import { Context } from "../../../common/context/Context";
import { useContext, useEffect} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../../common/supabase/config";
import { getProfile } from "../../../common/supabase/functions";

const Pasos = () => {
  const { user } = useAuth();
  const { currentStep, setCurrentStep, setProfile } = useContext(Context);

  

  const decreaseCurrentStep = () => {
    setCurrentStep((steps) => {
      if (steps > 1) return steps - 1;
      return steps;
    });
  };
  const increaseCurrentStep = () => {
    setCurrentStep((steps) => {
      if (steps < 3) return steps + 1;
      return steps;
    });
  };

  useEffect(()=>{
    if(!user) return;
    console.log(user)
    if(user) setCurrentStep(2)
  },[user])
  return (
    <>
      <div className="pasos-container">
       
        <div className="linea-puntos">
          <div className={currentStep == 1 ? "paso paso-selected" : "paso"}>
            <span className="circulo">1</span>
          </div>
          <div className={currentStep == 2 ? "paso paso-selected" : "paso"}>
            <span className="circulo">2</span>
          </div>
          <div className={currentStep == 3 ? "paso paso-selected" : "paso"}>
            <span className="circulo">3</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pasos;
