//This program calculates acceleration from distance and time and creates motion graphs
//IDevelop("Helped me fix a little issue with my parseFloat inputs")
//All code for creating graphs come from help with this developer
//Google Gemini AI integration - Idea taken from previous personal project

// Variable 1 Starting speed from user
let initialVelocity;

// Variable 2 How far the object traveled from user  
let distance;

// Variable 3 How long it moves from user
let time;

// Variable 4 Acceleration after calculation
let acceleration;

// Variables to store chart instances
let positionChart = null;
let velocityChart = null;
let accelerationChart = null;

// Function to analyze physics problem with Gemini AI
async function analyzeWithAI() {
    let description = document.getElementById('ai-description').value;
    let apiKey = document.getElementById('api-key').value;
    let resultsDisplay = document.getElementById('results-display');
    
    // Check if inputs are provided
    if (!description.trim()) {
        alert('Please describe your physics problem!');
        return;
    }
    
    if (!apiKey.trim()) {
        alert('Please enter your Gemini API key!');
        return;
    }
    
    // Show loading message
    resultsDisplay.innerHTML = '🤖 AI is analyzing your physics problem...';
    
    try {
        // First, find an available model that supports generateContent
        let availableModel = await checkAvailableModels(apiKey, resultsDisplay);
        
        if (!availableModel) {
            throw new Error('No compatible models found. Your API key might not have access to Gemini models.');
        }
        
        console.log('Using model:', availableModel);
        
        // Then try to use the AI with the discovered model
        await callGeminiAPI(apiKey, description, resultsDisplay, availableModel);
        
    } catch (error) {
        console.error('AI Analysis Error:', error);
        
        // Special handling for CORS issues
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            resultsDisplay.innerHTML = `
                <h3>🚧 Browser Security Restriction</h3>
                <p>Your browser is blocking the API call due to CORS policy.</p>
                <p><strong>Quick Solutions:</strong></p>
                <ul>
                    <li><strong>Use HTTPS:</strong> Try accessing via a secure server instead of localhost</li>
                    <li><strong>Browser Extension:</strong> Install a CORS extension temporarily</li>
                    <li><strong>Different Browser:</strong> Some browsers are less restrictive</li>
                    <li><strong>Manual Input:</strong> Use the calculator manually below - it works perfectly!</li>
                </ul>
                <p><em>Your physics calculator with graphs still works great manually! 🚀</em></p>
            `;
        } else {
            resultsDisplay.innerHTML = `
                <h3>❌ AI Analysis Error:</h3>
                <p>${error.message}</p>
                <p><strong>Common Solutions:</strong></p>
                <ul>
                    <li><strong>API Key:</strong> Get a fresh key from <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
                    <li><strong>Enable API:</strong> Make sure Gemini API is enabled in your Google Cloud Console</li>
                    <li><strong>Billing:</strong> Check if billing is set up (even for free tier)</li>
                    <li><strong>Region:</strong> API might not be available in your region</li>
                </ul>
                <p><em>Use manual input below if AI continues to fail.</em></p>
            `;
        }
    }
}

// Function to check what models are available (for debugging)
async function checkAvailableModels(apiKey, resultsDisplay) {
    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        let data = await response.json();
        
        if (response.ok && data.models) {
            // Log all models for debugging
            console.log('Available models:', data.models.map(m => m.name));
            
            // Find models that support generateContent
            let generateModels = data.models.filter(m => 
                m.supportedGenerationMethods && 
                m.supportedGenerationMethods.includes('generateContent')
            );
            
            console.log('Models that support generateContent:', generateModels.map(m => m.name));
            
            // Return the first available generate model
            return generateModels.length > 0 ? generateModels[0].name : null;
        }
    } catch (error) {
        console.log('Could not fetch available models:', error.message);
    }
    return null;
}

// Helper function to call Gemini API with the discovered model
async function callGeminiAPI(apiKey, description, resultsDisplay, modelName) {
    // Prepare the prompt for Gemini
    let prompt = `
    You are a physics expert. Analyze this physics problem and extract the key values:
    
    Problem: "${description}"
    
    Please respond with ONLY a JSON object in this exact format:
    {
        "initialVelocity": number_in_meters_per_second,
        "distance": number_in_meters,
        "time": number_in_seconds,
        "explanation": "brief explanation of the problem and solution approach"
    }
    
    If any values are missing or need to be calculated, use reasonable physics principles to estimate them.
    Convert all units to metric (m/s, meters, seconds).
    `;
    
    try {
        // Remove "models/" prefix if it's already in the model name
        let cleanModelName = modelName.startsWith('models/') ? modelName.substring(7) : modelName;
        
        // Build the correct URL
        let apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelName}:generateContent?key=${apiKey}`;
        console.log('Calling API URL:', apiUrl);
        
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        let data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || `HTTP ${response.status}: ${data.error?.status || 'Unknown error'}`);
        }
        
        // Parse AI response
        let aiText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from AI response
        let jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('AI response format error - could not find JSON in response');
        }
        
        let aiData = JSON.parse(jsonMatch[0]);
        
        // Fill in the calculator inputs with AI suggestions
        document.getElementById('initialVelocity').value = aiData.initialVelocity || 0;
        document.getElementById('distance').value = aiData.distance || 0;
        document.getElementById('time').value = aiData.time || 1;
        
        // Show AI analysis
        resultsDisplay.innerHTML = `
            <h3>🤖 AI Analysis Success!</h3>
            <p>${aiData.explanation}</p>
            <p><strong>Suggested Values:</strong></p>
            <p>Initial Velocity: ${aiData.initialVelocity} m/s</p>
            <p>Distance: ${aiData.distance} meters</p>
            <p>Time: ${aiData.time} seconds</p>
            <p><em>Click "Calculate Motion" below to generate graphs and detailed results!</em></p>
        `;
        
    } catch (error) {
        // If CORS error, suggest alternative
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
            throw new Error('Browser CORS restriction. Try using the manual input instead, or access via HTTPS.');
        }
        throw new Error(`Gemini API Error: ${error.message}`);
    }
}

// Main function that runs when button gets clicked
function calculateMotion() {
    // Clear old results
    let resultsDisplay = document.getElementById('results-display');
    resultsDisplay.innerHTML = 'Calculating...';
    
    // Get what the user typed and make it into numbers
    // parseFloat is like parseInt but it allows decimal points
    initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
    distance = parseFloat(document.getElementById('distance').value);
    time = parseFloat(document.getElementById('time').value);
    
    // Make sure the input is a real number
    // isNaN checks if something is "Not a Number" - Google for the definition
    if (isNaN(initialVelocity) || isNaN(distance) || isNaN(time)) {
        // alert() shows a popup to the user
        alert('Please enter valid numbers!');
        // Restore original message when there's an error
        resultsDisplay.innerHTML = 'Results will appear here after calculation...';
        // Hide graphs when there's an error
        document.getElementById('graph-container').style.display = 'none';
        // stops the function from continuing
        return;
    }
    
    // Make sure time is not zero to avoid division by zero
    if (time === 0) {
        alert('Time cannot be zero!');
        // Restore original message when there's an error
        resultsDisplay.innerHTML = 'Results will appear here after calculation...';
        // Hide graphs when there's an error
        document.getElementById('graph-container').style.display = 'none';
        return;
    }
    
    // Figure out acceleration using rearranged equation: a = 2(d - v₀t)/t^2
    // This comes from solving d = v₀t + ½at^2 for a
    acceleration = 2 * (distance - (initialVelocity * time)) / (time * time);
    
    // Figure out final speed using math: v = v₀ + at
    let finalVelocity = initialVelocity + (acceleration * time);
    
    // Put results in the specific results paragraph using innerHTML
    // toFixed(1) rounds numbers to 1 decimal place
    resultsDisplay.innerHTML = `
        <h3>Physics Results:</h3>
        <p>Initial Velocity: ${initialVelocity} m/s</p>
        <p>Distance: ${distance} meters</p>
        <p>Time: ${time} seconds</p>
        <p><strong>Acceleration: ${acceleration.toFixed(1)} m/s^2</strong></p>
        <p><strong>Final Velocity: ${finalVelocity.toFixed(1)} m/s</strong></p>
    `;
    
    // Show the graph container
    document.getElementById('graph-container').style.display = 'block';
    
    // Create the motion graphs
    createMotionGraphs();
}

// Function to create all three motion graphs
function createMotionGraphs() {
    // Create time data points (20 points from 0 to input time)
    let timePoints = [];
    let positionData = [];
    let velocityData = [];
    let accelerationData = [];
    
    // Generate data points for smooth curves
    for (let i = 0; i <= 20; i++) {
        let t = (time * i) / 20; // Time from 0 to input time
        timePoints.push(t.toFixed(1));
        
        // Position equation: x = v₀t + ½at²
        let position = (initialVelocity * t) + (0.5 * acceleration * t * t);
        positionData.push(position.toFixed(2));
        
        // Velocity equation: v = v₀ + at
        let velocity = initialVelocity + (acceleration * t);
        velocityData.push(velocity.toFixed(2));
        
        // Acceleration is constant
        accelerationData.push(acceleration.toFixed(2));
    }
    
    // Destroy existing charts if they exist
    if (positionChart) positionChart.destroy();
    if (velocityChart) velocityChart.destroy();
    if (accelerationChart) accelerationChart.destroy();
    
    // Create Position vs Time graph
    let positionCtx = document.getElementById('positionChart').getContext('2d');
    positionChart = new Chart(positionCtx, {
        type: 'line',
        data: {
            labels: timePoints,
            datasets: [{
                label: 'Position (m)',
                data: positionData,
                borderColor: '#13F0EC',
                backgroundColor: 'rgba(19, 240, 236, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Position vs Time',
                    color: '#13F0EC'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Position (m)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
    
    // Create Velocity vs Time graph
    let velocityCtx = document.getElementById('velocityChart').getContext('2d');
    velocityChart = new Chart(velocityCtx, {
        type: 'line',
        data: {
            labels: timePoints,
            datasets: [{
                label: 'Velocity (m/s)',
                data: velocityData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Velocity vs Time',
                    color: '#00d4ff'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Velocity (m/s)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
    
    // Create Acceleration vs Time graph
    let accelerationCtx = document.getElementById('accelerationChart').getContext('2d');
    accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: {
            labels: timePoints,
            datasets: [{
                label: 'Acceleration (m/s²)',
                data: accelerationData,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Acceleration vs Time',
                    color: '#ff6b6b'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Acceleration (m/s²)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}