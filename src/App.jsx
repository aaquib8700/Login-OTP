import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const emptyArray = ["", "", "", ""];
  const [inputs, setInputs] = useState(emptyArray);
  const [missing, setMissing] = useState(emptyArray)
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const CODE='1234';
  
  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value;
    console.log(val, index);
    if (!Number(val)) return;
    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  };

  const handleOnKeyDown = (e, index) => {
    console.log(e.keyCode, index);
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste=(e)=>{
    const data=e.clipboardData.getData('text');
    console.log('paste data',data);
    if(!Number(data) || data.length!==inputs.length)
      return;
    
    const pastCode=data.split('');
    setInputs(pastCode);
    refs[inputs.length-1].current.focus();
  }

  const handleSubmit=()=>{
     const missed=inputs.map((item,i)=>{
      if(item=='')
        return i;
     }).filter((item)=>(item || item===0));
     console.log('missed',missed);
     setMissing(missed);
     if(missed.length){
      return;
     }
     const userInput=inputs.join('');
     const isMatch=userInput===CODE;
     const msg=isMatch ? 'Code is valid':'Code is not valid';
     alert(msg);
  }

  console.log("inputs", inputs);
  return (
    <div className="text-center flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-2xl">Two-Factor code input</h1>
      <div>
        {emptyArray.map((item, index) => {
          return (
            <input
              ref={refs[index]}
              value={inputs[index]}
              className={`w-[40px] h-[40px] m-2.5 font-semibold text-xl text-center focus:outline-blue-700 ${missing.includes(index) ? 'border-2 border-red-800' : 'border-1 border-zinc-400'} `}
              type="text"
              maxLength="1"
              key={index}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit} className="px-3 py-1 bg-red-200 rounded-md font-semibold text-red-600 hover:bg-red-300">
        Submit
      </button>
    </div>
  );
};

export default App;

