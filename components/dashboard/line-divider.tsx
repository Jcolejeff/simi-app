
  
const LineDivider = ({ width, color }: {width: string, color: string}) => {
    const dividerStyle = {
        width: width,
        backgroundColor: color,
        height: '1px',
        margin: '0 auto',
      };
    
      return <div style={dividerStyle}></div>;
  };
  
  export default LineDivider;
  

