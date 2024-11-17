'use server'
import * as dataOps from '../../data/dataOps.js';
const axios = require('axios');

// This function accepts 'prompt' as an argument, processes it, and returns the command execution result
export async function handleChatRequest(prompt) {
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
        Replace "op" with the corresponding operation from the list of operation
        Replace "number" with the corresponding floor number
        Replace "state" with the corresponding true/false
        Replace "statement" with the proper closure - humand readable
        OTHERWISE: 
        Replace "op" with "N/A"
        Replace "number" with "N/A"
        Replace "state" with "N/A"
        Replacye "statement" with "I could not understand. Please try again"
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
                'Authorization': 'Bearer 1824d9fd-474a-456d-ae63-8529951295d3',
                'Content-Type': 'application/json'
            },
        });

        // Parse the response from the model
        const content = JSON.parse(response.data.choices[0].message.content);


        // Execute the corresponding command
        let result;
        switch (content.operation) {
            case 'switchElectricity':
                result = dataOps.switchElectricity(content.floor, content.status);
                console.log(result);
                break;
            case 'switchWater':
                result = dataOps.switchWater(content.floor, content.status);
                console.log(result);
                break;
            default:
                result = { error: 'Invalid operation' };
                break;
        }

        // Return the result
        return content.closure;

    } catch (error) {
        // Handle any errors and return them
        console.log(error.message)
        return error.message
    }
}
