
import React from 'react';
import STOCKX from '../../test';
const test = () => {

const [visible,setvisible] = React.useState(false);
  React.useEffect(() => {
    STOCKX.test.setvisible = setvisible;
    STOCKX.test.visible = visible;
  }, [visible]);

return (
  <>
    {
      visible &&
      <div className="test">
         YOLO 
      </div>}
  </>
  )
};
export default test;
