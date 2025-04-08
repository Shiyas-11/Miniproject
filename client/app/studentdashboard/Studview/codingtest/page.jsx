"use client";

import { useState ,useRef} from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';


//comment out later
const lang={
    javascript: {lang:"javascript",comment:"//",defaultcode:"console.log('Hello World')"},
    python: {lang:"python",comment:"#",defaultcode:"print('Hello World')"},
    c: {lang:"c",comment:"//",defaultcode:"printf('Hello World')"},
    cpp: {lang:"cpp",comment:"//",defaultcode:"cout<<'Hello World'<<endl;"},
    java: {lang:"java",comment:"//",defaultcode:"System.out.println('Hello World');"},
}


//end of comment out later
export default function CodingTestPage() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [darkMode, setDarkMode] = useState(false);
    const editorRef = useRef(null);
    const runCode = () => {
        setOutput("Running...");
        setTimeout(() => setOutput("Execution successful!"), 1000);
    };

    const submitCode = () => {
        setOutput("Submitting...");
        setTimeout(() => setOutput("Submission successful!"), 1000);
    };
    const handleEditorMount=(editor, monaco)=>{
        editorRef.current = editor;
      }
    return (
        <div className={`flex flex-col h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* Navbar */}
            <nav className="p-4 flex justify-between items-center bg-gray-400 dark:bg-gray-900 border-b">
                <h1 className="text-lg font-bold dark:text-white">Coding Test</h1>
                <div className="flex gap-4">
                    <LanguageSelect onSelect={setSelectedLanguage} onChange={()=>{console.log(selectedLanguage)} }/>
                    <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            </nav>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel */}
                <div className="flex-1 p-4 border-r overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Merge Strings Alternately</h2>
    <p className="mb-2">You are given two strings word1 and word2...</p>
    <h3 className="text-xl font-semibold mb-2">Example:</h3>
    <pre className={`p-2 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        Input: word1 = "abc", word2 = "pqr" Output: "apbqcr"
    </pre>
    <pre className={`p-2 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        Input: word1 = "ab", word2 = "pqrs" Output: "apbqrs"
    </pre>
                    <h3 className="text-xl font-semibold mb-2">Constraints:</h3>
                    <ul className="list-disc pl-5">
                        <li>1 ≤ word1.length, word2.length ≤ 100</li>
                        <li>word1 and word2 consist of lowercase English letters.</li>
                    </ul>
                </div>

                {/* Right Panel */}
                <div className="flex-1 p-4 overflow-auto">
                    <Tabs defaultValue="code">
                        <TabsList className="flex gap-2 mb-4">
                            <TabsTrigger value="code">Code</TabsTrigger>
                            <TabsTrigger value="output">Output</TabsTrigger>
                        </TabsList>
                        <TabsContent value="code">
                        <Editor height="50vh"
                         defaultLanguage={selectedLanguage} 
                         defaultValue={lang[selectedLanguage]["defaultcode"]} 
                         language={selectedLanguage}
                         onMount={handleEditorMount}
                        //  theme="vs-dark"
                         />

    <div className="mt-2 flex gap-2">
        <Button onClick={runCode} className="bg-blue-500">Run</Button>
        <Button onClick={submitCode} className="bg-green-500">Submit</Button>
    </div>
</TabsContent>

                        <TabsContent value="output">
                            <pre className="p-2 bg-gray-200 dark:bg-gray-800 rounded">{output}</pre>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

function LanguageSelect({ onSelect }) {
    return (
        <select
            onChange={(e) => {onSelect(e.target.value);}}
            className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
        </select>
    );
}

function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        >
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
