
// Operation list
const operations_list = [
    'switchElectricity',
    'switchWater'
];

// Get the list of operations
export const getOperationsList = () => {
    return operations_list;
};

// Operation to switch electricity for a given floor
export const switchElectricity = (systemState, floor, status) => {
    if (status == 'true')
        status = true
    else if (status == 'false')
        status = false
    else
        return { status: "error", message: "Status must be a boolean (true/false)" };

    // Ensure the floor exists in systemState
    if (systemState.floor && systemState.floor[floor]) {
        systemState.floor[floor].electricity = status;
        console.log(`Electricity on floor ${floor} is now ${systemState.floor[floor].electricity ? 'ON' : 'OFF'}`);
        console.log('System state', systemState)
        return systemState;
    } else {
        return systemState;
    }
};

// Operation to switch water for a given floor
export const switchWater = (systemState, floor, status) => {
    if (status == 'true')
        status = true
    else if (status == 'false')
        status = false
    else
        return { status: "error", message: "Status must be a boolean (true/false)" };

    // Ensure the floor exists in systemState
    if (systemState.floor && systemState.floor[floor]) {
        systemState.floor[floor].water = status;
        console.log(`Water on floor ${floor} is now ${systemState.floor[floor].water ? 'ON' : 'OFF'}`);
        console.log('System state', systemState)
        return systemState;
    } else {
        return systemState;
    }
};
