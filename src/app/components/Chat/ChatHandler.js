'use server'
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
                'Authorization': 'Bearer 5f3a45eb-e9b8-4e48-805c-27f51785f4eb',
                'Content-Type': 'application/json'
            },
        });

        // Parse the response from the model
        const content = JSON.parse(response.data.choices[0].message.content);
        // console.log(content);

        const state2 = JSON.parse(JSON.stringify(state));


        // Execute the corresponding command
        let result;
        switch (content.operation) {
            case 'switchElectricity':
                result = dataOps.switchElectricity(state2, content.floor, content.status);
                console.log(result)
                break;
            case 'switchWater':
                result = dataOps.switchWater(state2, content.floor, content.status);
                console.log(result);
                break;
            default:
                result = { error: 'Invalid operation' };
                break;
        }

        console.log(result)

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
