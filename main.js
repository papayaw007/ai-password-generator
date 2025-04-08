const genPwd = document.getElementById("gen-password");
const copy = document.getElementById("copy-btn");
const characters = document.getElementById("character-input");
const incUpper = document.getElementById("checkbox");
const incUpperBox = document.getElementById("check-icon");
const incLower = document.getElementById("checkbox-2");
const incLowerBox = document.getElementById("check-icon-2");
const incNumber = document.getElementById("checkbox-3");
const incNumberBox = document.getElementById("check-icon-3");
const incSymbol = document.getElementById("checkbox-4");
const incSymbolBox = document.getElementById("check-icon-4");
const textPrompt = document.getElementById("text-prompt");
const strength1 = document.getElementById("strength1");
const strength2 = document.getElementById("strength2");
const strength3 = document.getElementById("strength3");
const strength4 = document.getElementById("strength4");
const generate = document.getElementById("gen-btn");

const character = characters.textContent;

let startPrompt = "i want to generate a password.";
const boxes = [incUpperBox, incLowerBox, incNumberBox, incSymbolBox];
const strengths = ["strength1", "strength2", "strength3", "strength4"];

const promptMaker = (a) => `It should include ${a}.`;

const resetting = () => {
  incUpperBox.classList.add("hidden");
  incLowerBox.classList.add("hidden");
  incNumberBox.classList.add("hidden");
  incSymbolBox.classList.add("hidden");
  strength1.classList.replace("bg-yellow-200", "bg-grey-200");
  strength2.classList.replace("bg-yellow-200", "bg-grey-200");
  strength3.classList.replace("bg-yellow-200", "bg-grey-200");
  strength4.classList.replace("bg-yellow-200", "bg-grey-200");

};

const getCharacter = () => characters.value



incUpper.addEventListener("click", () => {
  incUpperBox.classList.remove("hidden");
  startPrompt += promptMaker("uppercase letters");
});

incLower.addEventListener("click", function () {
  incLowerBox.classList.remove("hidden");
  startPrompt += promptMaker("lowercase letters");
});

incNumber.addEventListener("click", function () {
  incNumberBox.classList.remove("hidden");
  startPrompt += promptMaker("numbers");
});

incSymbol.addEventListener("click", function () {
  incSymbolBox.classList.remove("hidden");
  startPrompt += promptMaker("symbols");
  console.log(startPrompt);
});

generate.addEventListener("click", async() => {

    const t = textPrompt.value;
    console.log(t);
    startPrompt = startPrompt + `It should have ${getCharacter()} number of characters.`;
    
  let on = 0;
  boxes.forEach((box) => {
    if (!box.classList.contains("hidden")) {
      on += 1;
    }
  });
  for (let i = 0; i < on && i < strengths.length; i++) {
    const el = document.getElementById(strengths[i]);
    if (el) {
      el.classList.replace("bg-grey-200", "bg-yellow-200");
    }
  }

  startPrompt = startPrompt + ' ' + t;
  //console.log(startPrompt);

  try {
    genPwd.textContent = "Generating...";
    
    // Get the prompt string from the textarea
    const promptString = startPrompt;
    
    const password = await generatePasswordWithPrompt(promptString);
    genPwd.textContent = password;
} catch (error) {
    genPwd.textContent = "Error generating password: " + error.message;
    console.error(error);
}
});



// Function to call OpenAI API with your prompt string

// Replace with your actual API key (use environment variables in production)

async function generatePasswordWithPrompt(promptString) {

    const isLocalhost = window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1';
    
    const API_URL = isLocalhost 
    ? 'http://localhost:3000/api/generate-password'
    : 'https://ai-password-generator-backend.onrender.com';

    try {
      const response =  await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ promptString })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      
      return data.password;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }


copy.addEventListener('click', () => {
    // Use the Clipboard API
    const texts = genPwd.textContent;
    navigator.clipboard.writeText(texts)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });

      resetting();
      genPwd.textContent = 'P4$5W0rD!';
      characters.value= '';
      textPrompt.value = '';
  });
