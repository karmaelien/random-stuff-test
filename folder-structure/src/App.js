import './App.css';
//import {React,useState} from 'react';
import { useState } from 'react';

function App() {
  //react useState hook, defines variables and functions to set those variables
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [contact,setContact] = useState("");
  const [email,setEmail] = useState("");
  const [gender,setGender] = useState("male");
  const [subjects,setSubjects] = useState({
    english : true,
    math: false,
    physics:false,
  });
  const [resume,setResume] = useState("");
  const [url,setUrl] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [about, setAbout] = useState("");

  // takes previous subjects and reverses specific subject
  const handleSubjectChange = (sub) =>{
    setSubjects((prev)=>({
      ...prev, //makes shallow copy of previous
      [sub]:!prev[sub],
  }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(
      firstName,
      lastName,
      email,
      contact,
      gender,
      selectedOption,
      subjects,
      resume,
      url,
      about
    )
    // add form submission logic
  }
  
// reset state variables
  const handleReset =() => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    setGender("male");
    setSubjects({
      english : true,
      math: false,
      physics:false,
    });
    setResume("");
    setUrl();
    setSelectedOption("");
    setAbout("");
  }

  return (
    <>
      <div className='App'>
        <h1>Form in ReactJS</h1>
        <fieldset>
          <form action="#" method="get"> 
            <label htmlFor="firstname">First Name : </label>
            <input 
              type="text" 
              name = "firstname" 
              id="firstname" 
              placeholder="Enter First Name" 
              value={firstName}
              onChange={(e)=> setFirstName(e.target.value)}
              required
            />
            <label htmlFor="lastname">Last Name : </label>
            <input 
              type="text" 
              name = "lastname" 
              id="lastname" 
              placeholder="Enter Last Name" 
              value={lastName}
              onChange={(e)=> setLastName(e.target.value)}
              required
            />
            <label htmlFor='contact'>Contact</label>
            <input 
              type='tel'
              name='contact'
              id='contact'
              placeholder='Enter your mobile number'
              value={contact}
              onChange={(e)=> setContact(e.target.value)}
              required 
            />
            <label htmlFor='Email'>Enter your Email:</label>
            <input 
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required 
            />
            
            {/* radio */}

            <label htmlFor='gender'>Gender</label>
            <input type='radio' name='gender' id='male' value='male'
            onChange={(e)=> setGender(e.target.value)}/>
            Male
            <input type='radio' name='gender' id='female' value='female'
            onChange={(e)=> setGender(e.target.value)}/>
            Female
            <input type='radio' name='gender' id='other' value='other'
            onChange={(e)=> setGender(e.target.value)}/>
            Other

            {/* checkboxes */}
            <label htmlFor='lang'>Your best Subject : </label>
            <input type='checkbox' name='lang' id='english'
            checked={subjects.english===true} 
            onChange={(e)=> handleSubjectChange("english")}/>
            English
            <input type='checkbox' name='lang' id='math'
            checked={subjects.math===true}
            onChange={(e)=> handleSubjectChange("math")}/>
            Math
            <input type='checkbox' name='lang' id='physics'
            checked={subjects.physics===true}
            onChange={(e)=> handleSubjectChange("physics")}/>
            Physics

            {/* uploading documents */}
            <label htmlFor='file'>Upload Resume</label>
            <input type='file' name='file' id='file' onChange={(e)=> setResume(e.target.files[0])} required/>

            {/* Url */ }
            <label htmlFor='url'>Enter URL : </label>
            <input type='url' name='url' id='url' 
            onChange={(e)=> setUrl(e.target.value)} required />
            
            <label htmlFor='selection'>Select your choice</label>
            <select name='select' id='select' value={selectedOption}
            onChange={(e)=> setSelectedOption(e.target.value)}>
              <option value='' disabled>Select your Answer</option>
              <optgroup label='Beginners'>
                <option value='1'>HTML</option>
                <option value='2'>CSS</option>
                <option value='3'>JavaScript</option>
              </optgroup>
              <optgroup label='Advanced'>
                <option value='4'>React</option>
                <option value='5'>Node</option>
                <option value='6'>Express</option>
                <option value='7'>MongoDB</option>
              </optgroup>
            </select>

            {/* Text area */}
            <label htmlFor='about'>About</label>
            <textarea name='about' id='about' 
            cols='30' rows='10' required placeholder='About yourself'
            onChange={(e)=> setAbout(e.target.value)}></textarea>

            <button type='reset' value='reset' onClick={()=> handleReset}>
              Reset
            </button>
            <button type='submit' value='submit' onClick={(e)=>handleSubmit(e)}>
              Submit
            </button>

          </form>
        </fieldset>

      </div>



    </>
   
  );
}

export default App;
