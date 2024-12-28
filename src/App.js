import React, { useState } from 'react';
import { OpenAI } from 'openai';
import './App.css';
import TaskGenerator from './components/TaskGenerator';
import ExcuseGenerator from './components/ExcuseGenerator';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function App() {
  const [currentTask, setCurrentTask] = useState('');
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateNewTask = async () => {
    setIsLoading(true);
    try {
      const prompt = `Generate a funny but horrible mom task and excuse pair based on this context. Pick ONE specific topic from the following list and focus the entire task/excuse pair on that single topic:
      - The falling apart house and mom's cheap fixes
      - Jerry's low blood sugar and mom's frustration
      - Mom's love for Whataburger and Wendy's
      - Dealing with dead animals (especially goats)
      - Mom's constant dizziness and lack of sleep
      - The cat non-profit that mom prioritizes over family
      - Mom parking in handicap spaces with an expired permit
      - The junk in the yard
      - The disgusting rabbit cages with fleas
      - The overbreeding chickens
      - Mom not answering her phone
      - Mom's fear of her brother Wes

      The task should be something simple but funny that mom might ask her child to do, with brief humorous context in parentheses. The excuse should be an equally funny reason why mom can't do it herself. Focus on just one topic per task/excuse pair and avoid mixing multiple topics. Example formats:
      Task: "Go get my purse from my car (It's 100 degrees outside)"
      Excuse: "I just did my hair and don't want to ruin it."
      Task: "Unlock the shed for me (She lost the key)"
      Excuse: "My arthritis is acting up again."
      Task: "Bury the goat in the back field (It's been dead for a week)"
      Excuse: "I'm allergic to dead goat smell, remember?"`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a creative assistant that generates funny but horrible mom tasks and excuses." },
          { role: "user", content: prompt }
        ]
      });

      const response = completion.choices[0].message.content;
      const taskMatch = response.match(/Task:\s*"([^"]+)"/);
      const excuseMatch = response.match(/Excuse:\s*"([^"]+)"/);
      
      const task = taskMatch ? taskMatch[1] : 'Failed to parse task';
      const excuse = excuseMatch ? excuseMatch[1] : 'Mom is too busy to make excuses right now.';

      setCurrentTask(task);
      setCurrentExcuse(excuse);
    } catch (error) {
      console.error('Error generating task:', error);
      setCurrentTask('Failed to generate task. Try again!');
      setCurrentExcuse('Mom is too busy to make excuses right now.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Mom's Horrible Tasks</h1>
      </header>
      <main>
        <TaskGenerator task={currentTask} />
        <ExcuseGenerator excuse={currentExcuse} />
        <button 
          className="generate-button" 
          onClick={generateNewTask}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate New Task'}
        </button>
      </main>
    </div>
  );
}

export default App;
