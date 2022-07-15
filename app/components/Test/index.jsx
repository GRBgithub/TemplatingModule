
import React from 'react';
import STOCKX from '../../test';
const Test = () => {

const [visible,setvisible] = React.useState(false);
  React.useEffect(() => {
    STOCKX.Test.setvisible = setvisible;
    STOCKX.Test.visible = visible;
  }, [visible]);

return (
  <>
    {
      visible &&
      <div className="test">
         Test 
      </div>}
  </>
  )
};
export default Test;
