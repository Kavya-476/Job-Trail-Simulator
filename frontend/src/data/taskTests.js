
export const taskTests = {
    // Task 1: Fix Broken Function Interface
    't1': (userCode) => {
        const logs = [];
        try {
            // Strip 'export' to make it runnable in new Function
            const runCode = userCode.replace(/export\s+function/g, 'function');

            // Create a safe-ish context
            // We Append a caller at the end to return the function we want to test
            const context = `
                ${runCode}
                return formatResponse;
            `;

            const formatResponse = new Function(context)();

            if (typeof formatResponse !== 'function') {
                return { success: false, logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: 'formatResponse function not found.' }] };
            }

            // Test Case
            const testData = { id: 1, name: 'Test' };
            const testCode = 200;
            const result = formatResponse(testData, testCode);

            logs.push({ time: new Date().toLocaleTimeString(), type: 'System', text: 'Running test: formatResponse({id:1}, 200)...' });

            if (result.status === 200) {
                return {
                    success: true,
                    logs: [
                        ...logs,
                        { time: new Date().toLocaleTimeString(), type: 'Success', text: 'Test passed! Result contains { status: 200 }.' }
                    ]
                };
            } else if (result.statusCode === 200) {
                return {
                    success: false,
                    logs: [
                        ...logs,
                        { time: new Date().toLocaleTimeString(), type: 'Failed', text: 'Test failed. Found "statusCode" instead of "status".' },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: 'Expected: { status: 200, ... }' },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: `Received: ${JSON.stringify(result)}` }
                    ]
                };
            } else {
                return {
                    success: false,
                    logs: [
                        ...logs,
                        { time: new Date().toLocaleTimeString(), type: 'Failed', text: 'Test failed. Incorrect output structure.' }
                    ]
                };
            }

        } catch (e) {
            return {
                success: false,
                logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: `Syntax/Runtime Error: ${e.message}` }]
            };
        }
    },

    // Task 3: Sanitize User Inputs
    't3': (userCode) => {
        try {
            const runCode = userCode.replace(/export\s+function/g, 'function');
            const context = `${runCode}; return sanitize;`;
            const sanitize = new Function(context)();

            const input = "Hello <script>alert('xss')</script> World <script>evil()</script>";
            // Checks if ALL script tags are removed, not just the first one
            const output = sanitize(input);

            if (output === "Hello  World " || output === "Hello World") {
                return {
                    success: true,
                    logs: [{ time: new Date().toLocaleTimeString(), type: 'Success', text: 'Test passed! All script tags removed.' }]
                };
            } else {
                return {
                    success: false,
                    logs: [
                        { time: new Date().toLocaleTimeString(), type: 'Failed', text: 'Test failed. Script tags still present.' },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: `Input: ${input}` },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: `Output: ${output}` }
                    ]
                };
            }
        } catch (e) {
            return { success: false, logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: `Error: ${e.message}` }] };
        }
    },

    // Task 4: Add Feature to To-Do List (Hash Map Refactor)
    't4': (userCode) => {
        try {
            // Basic check if they followed instructions (hard to verify O(1) without AST analysis, but we can check correctness)
            const runCode = userCode.replace(/export\s+function/g, 'function');
            const context = `${runCode}; return findUser;`;
            const findUser = new Function(context)();

            const users = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }, { id: 3, name: 'C' }];
            const result = findUser(users, 2);

            if (result && result.name === 'B') {
                // Simple correctness check
                // Check if Map is used in code string as a heuristic
                if (userCode.includes('new Map') || userCode.includes('reduce') || userCode.includes('object') || userCode.includes('{}')) {
                    return { success: true, logs: [{ time: new Date().toLocaleTimeString(), type: 'Success', text: 'Test passed! User found correctly.' }] };
                } else {
                    return { success: true, logs: [{ time: new Date().toLocaleTimeString(), type: 'Success', text: 'Output correct, but did you use a Hash Map/Object for O(1)?' }] };
                }
            } else {
                return { success: false, logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: 'Test failed. Incorrect user returned.' }] };
            }

        } catch (e) {
            return { success: false, logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: `Error: ${e.message}` }] };
        }
    },

    // Task 5: Build RESTful API Endpoint (Add 'Bearer ')
    't5': (userCode) => {
        try {
            const runCode = userCode.replace(/export\s+function/g, 'function');
            const context = `${runCode}; return connect;`;
            const connect = new Function(context)();

            const token = "12345";
            const result = connect(token);

            if (result['Authorization'] === 'Bearer 12345') {
                return { success: true, logs: [{ time: new Date().toLocaleTimeString(), type: 'Success', text: 'Test passed! Authorization header is correct.' }] };
            } else {
                return {
                    success: false,
                    logs: [
                        { time: new Date().toLocaleTimeString(), type: 'Failed', text: 'Test failed. Incorrect Authorization header.' },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: `Expected: 'Bearer 12345'` },
                        { time: new Date().toLocaleTimeString(), type: 'Info', text: `Received: '${result['Authorization']}'` }
                    ]
                };
            }
        } catch (e) {
            return { success: false, logs: [{ time: new Date().toLocaleTimeString(), type: 'Failed', text: `Error: ${e.message}` }] };
        }
    }
};
