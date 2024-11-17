'use server'
import { Console } from 'console';
import * as dataOps from '../../data/dataOps.js';
const axios = require('axios');

// This function accepts 'prompt' as an argument, processes it, and returns the command execution result
export async function handleChatRequest(prompt, state) {
    try {
        const operation_list = dataOps.getOperationsList();

        // Validate prompt
        if (!prompt) {
            throw new Error('Prompt not provided');
        }

        /*
        const prompt_appended = `
        Return ONLY in this JSON format, NO MATTER WHAT:
        {
        "operation": "op",
        "floor": "number",
        "status": "state",
        "closure": "statement"
        }
        `
        + "\nPrompt: " + prompt + 
        `
        \nList of operation:
        ${operation_list.join(', ')}
        \n
        IF THE PROMPT IS RELEVANT:
        "operation" can only take a value from List of operation. Replace "op" with the corresponding operation from the list of operation
        "floor" can only take a numeric value. Replace "number" with the corresponding floor number
        "state" can only take the value 'true' or 'false'. Replace "state" with the corresponding true/false
        Replace "statement" with the proper closure - humand readable
        OTHERWISE: 
        Replace "op" with "N/A"
        Replace "number" with "N/A"
        Replace "state" with "N/A"
        Replace "statement" with "I could not understand. Please try again"
        `;
        */
        const prompt_appended = `
        ALWAYS RETURN IN THIS FORMAT:
        "operation": "op"
        "updated_state": "updated"
        "closure": "statement"
        "op" can only take a value from the list of operation. Replace "op" with the correct operation judging by the prompt.
        "updated" can only take a JSON CONFORMED STRING that is EXACTLY SIMILAR IN FORMAT TO THE CURRENT STATE. Use the prompt to return the correct updated state.
        "statement" can only take a string. "statement" should take the value of a closure string after the prompt is carried out and must be human readable.
        
        Answer format example:
        {
        "operation": "switchElectricity",
        "updated_state": "{\"floor\":{\"1\":{\"electricity\":\"true\",\"water\":\"true\"},\"2\":{\"electricity\":\"true\",\"water\":\"true\"},\"3\":{\"electricity\":\"true\",\"water\":\"true\"}}}",
        "closure": "The electricity for floor 1 has been turned off."
        }
        \n 
        Be mindful of double quote when generating the JSON\n
        Current State:\n
        ${JSON.stringify(state)}\n
        Prompt: ${prompt}\n
        List of operation: 
        ${operation_list.join(', ')}
        IF THE PROMPT NOT RELEVANT TO UPDATING THE CURRENT STATE:
        Replace "updated" with the current state.
        Replace "statement" with "I do not understand. Please try again".
        `
        
        // Sending prompt to the external API
        let data = {
            "stream": false,
            "model": "Meta-Llama-3.1-8B-Instruct",
            "messages": [
                {
                "role": "user",
                "content": "You are a helpful assistant"
                },
                {
                "role": "user",
                "content": prompt_appended
                }
            ]
        }

        const response = await axios.post('https://api.sambanova.ai/v1/chat/completions', data, {
            headers: {
                'Authorization': 'Bearer 7a33af3b-087e-4d65-98d8-47d44b3da2e9',
                'Content-Type': 'application/json'
            },
        });

        console.log(response.data.choices[0].message.content)
        // Parse the response from the model
        const content = JSON.parse(response.data.choices[0].message.content);
        // console.log(content);
        // Execute the corresponding command
        let result = JSON.parse(content.updated_state);
        console.log(`Result: ${result}`)

        // Return the result
        return {
            closure: content.closure,
            result
        }

    } catch (error) {
        // Handle any errors and return them
        console.log(error.message)
        return error.message
    }
}
