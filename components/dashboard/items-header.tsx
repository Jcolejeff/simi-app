
const TextBoxWithLine = ({ text }: { text: string }) => {
    return (
      <div className="text-box-container flex items-center py-5 px-5">
        <p style={{ fontWeight: '500' }}className="text-content">{text}</p>
        <span className="line" style = {{color: 'red'}}></span>
      </div>
    );
  };
  
  export default TextBoxWithLine;
  