
import React from 'react';
import STOCKX from '../../test';
const Zack = () => {

const [visible,setvisible] = React.useState(false);
  React.useEffect(() => {
    STOCKX.Zack.setvisible = setvisible;
    STOCKX.Zack.visible = visible;
  }, [visible]);

return (
  <>
    {
      visible &&
      <div id="Zack">
         Zack 
      </div>}
  </>
  )
};
export default Zack;
