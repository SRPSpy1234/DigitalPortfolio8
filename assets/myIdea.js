//This program calculates acceleration from distance and time and creates motion graphs
//Chart.js library used for creating interactive graphs
//I spent a total of 3 hours working on these graphs...
//Help with debugging the graph creation and graph points from IDevelop
//Interactive graph feature from a mix of IDev's ideas and previous knowledge + research (Chart.js docs)

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

// Interactive mode variables
let isInteractiveMode = false;
let interactiveData = {
    timePoints: [],
    positionData: [],
    velocityData: [],
    accelerationData: []
};

// Main function that runs when button gets clicked
function calculateMotion() {
    // Clear old results first by targeting the specific results paragraph
    // getElementById finds the exact element we want to update
    let resultsDisplay = document.getElementById('results-display');
    resultsDisplay.innerHTML = 'Calculating...';
    
    // Check if page has input elements for validation purposes
    let inputElements = document.getElementsByTagName('input');
    
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
    
    // Figure out acceleration using rearranged equation: a = 2(d - v0*t)/t^2
    // This comes from solving d = v0*t + (1/2)*a*t^2 for a
    acceleration = 2 * (distance - (initialVelocity * time)) / (time * time);
    
    // Figure out final speed using math: v = v0 + a*t
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
        
        // Position equation: x = v0*t + (1/2)*a*t^2
        let position = (initialVelocity * t) + (0.5 * acceleration * t * t);
        positionData.push(position.toFixed(2));
        
        // Velocity equation: v = v0 + a*t
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
                label: 'Acceleration (m/s^2)',
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
                        text: 'Acceleration (m/s^2)',
                        color: '#ffffff'
                    },
                    ticks: { color: '#ffffff' }
                }
            }
        }
    });
}

// Interactive Mode Functions

// Switch to calculation mode (normal physics calculator)
function switchToCalculationMode() {
    isInteractiveMode = false;
    document.getElementById('calculation-mode').classList.add('active');
    document.getElementById('interactive-mode').classList.remove('active');
    document.getElementById('interactive-controls').style.display = 'none';
    
    // Hide graphs until user calculates
    document.getElementById('graph-container').style.display = 'none';
}

// Switch to interactive mode (drag and edit graphs)
function switchToInteractiveMode() {
    isInteractiveMode = true;
    document.getElementById('interactive-mode').classList.add('active');
    document.getElementById('calculation-mode').classList.remove('active');
    document.getElementById('interactive-controls').style.display = 'block';
    document.getElementById('graph-container').style.display = 'block';
    
    // Clear results display
    document.getElementById('results-display').innerHTML = 'Interactive mode: Create and edit your own motion graphs!';
}

// Create interactive graph with draggable points
function createInteractiveGraph() {
    let minTime = parseFloat(document.getElementById('min-time').value);
    let maxTime = parseFloat(document.getElementById('max-time').value);
    let minPosition = parseFloat(document.getElementById('min-position').value);
    let maxPosition = parseFloat(document.getElementById('max-position').value);
    let pointCount = parseInt(document.getElementById('point-count').value);
    
    // Validate inputs
    if (minTime >= maxTime) {
        alert('Maximum time must be greater than minimum time!');
        return;
    }
    
    if (minPosition >= maxPosition) {
        alert('Maximum position must be greater than minimum position!');
        return;
    }
    
    if (pointCount < 3 || pointCount > 20) {
        alert('Number of points must be between 3 and 20!');
        return;
    }
    
    // Generate time points based on user-specified count
    interactiveData.timePoints = [];
    interactiveData.positionData = [];
    interactiveData.velocityData = [];
    interactiveData.accelerationData = [];
    
    let timeStep = (maxTime - minTime) / (pointCount - 1);
    let positionRange = maxPosition - minPosition;
    
    for (let i = 0; i < pointCount; i++) {
        let t = minTime + (i * timeStep);
        let progress = i / (pointCount - 1); // 0 to 1
        let position = minPosition + (progress * positionRange); // Linear distribution across range
        
        interactiveData.timePoints.push(t.toFixed(1));
        interactiveData.positionData.push(position.toFixed(1));
        interactiveData.velocityData.push(5); // Constant 5 m/s
        interactiveData.accelerationData.push(0); // No acceleration
    }
    
    createInteractiveCharts();
}

// Create charts with draggable points
function createInteractiveCharts() {
    // Destroy existing charts
    if (positionChart) positionChart.destroy();
    if (velocityChart) velocityChart.destroy();
    if (accelerationChart) accelerationChart.destroy();
    
    // Position Chart
    let positionCtx = document.getElementById('positionChart').getContext('2d');
    positionChart = new Chart(positionCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Position (m)',
                data: interactiveData.positionData,
                borderColor: '#13F0EC',
                backgroundColor: 'rgba(19, 240, 236, 0.1)',
                tension: 0.1,
                pointRadius: 8,
                pointHoverRadius: 10,
                pointBackgroundColor: '#13F0EC',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Position vs Time (Drag Points to Edit)',
                    color: '#13F0EC'
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Position (m)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                }
            },
            onHover: (event, activeElements) => {
                positionCtx.canvas.style.cursor = activeElements.length > 0 ? 'grab' : 'default';
            }
        }
    });
    
    // Add mouse down event listener for dragging
    positionCtx.canvas.addEventListener('mousedown', (event) => {
        let activeElements = positionChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            startDragging(positionChart, 'position', activeElements[0].index, event);
        }
    });
    
    // Add double-click listener for typing values
    positionCtx.canvas.addEventListener('dblclick', (event) => {
        let activeElements = positionChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            typeValueForPoint('position', activeElements[0].index);
        }
    });
    
    // Velocity Chart
    let velocityCtx = document.getElementById('velocityChart').getContext('2d');
    velocityChart = new Chart(velocityCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Velocity (m/s)',
                data: interactiveData.velocityData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.1,
                pointRadius: 8,
                pointHoverRadius: 10,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Velocity vs Time (Drag Points to Edit)',
                    color: '#00d4ff'
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Velocity (m/s)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                }
            },
            onHover: (event, activeElements) => {
                velocityCtx.canvas.style.cursor = activeElements.length > 0 ? 'grab' : 'default';
            }
        }
    });
    
    // Add mouse down event listener for dragging
    velocityCtx.canvas.addEventListener('mousedown', (event) => {
        let activeElements = velocityChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            startDragging(velocityChart, 'velocity', activeElements[0].index, event);
        }
    });
    
    // Add double-click listener for typing values
    velocityCtx.canvas.addEventListener('dblclick', (event) => {
        let activeElements = velocityChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            typeValueForPoint('velocity', activeElements[0].index);
        }
    });
    
    // Acceleration Chart
    let accelerationCtx = document.getElementById('accelerationChart').getContext('2d');
    accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Acceleration (m/s^2)',
                data: interactiveData.accelerationData,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.1,
                pointRadius: 8,
                pointHoverRadius: 10,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Acceleration vs Time (Drag Points to Edit)',
                    color: '#ff6b6b'
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Acceleration (m/s^2)', color: '#ffffff' },
                    ticks: { color: '#ffffff' }
                }
            },
            onHover: (event, activeElements) => {
                accelerationCtx.canvas.style.cursor = activeElements.length > 0 ? 'grab' : 'default';
            }
        }
    });
    
    // Add mouse down event listener for dragging
    accelerationCtx.canvas.addEventListener('mousedown', (event) => {
        let activeElements = accelerationChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            startDragging(accelerationChart, 'acceleration', activeElements[0].index, event);
        }
    });
    
    // Add double-click listener for typing values
    accelerationCtx.canvas.addEventListener('dblclick', (event) => {
        let activeElements = accelerationChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activeElements.length > 0) {
            event.preventDefault();
            typeValueForPoint('acceleration', activeElements[0].index);
        }
    });
}

// Allow user to type in a specific value for a point
function typeValueForPoint(dataType, pointIndex) {
    let currentValue;
    let currentTime = interactiveData.timePoints[pointIndex];
    let unit;
    let promptMessage;
    
    // Get current value and set up prompt
    if (dataType === 'position') {
        currentValue = interactiveData.positionData[pointIndex];
        unit = 'meters';
        promptMessage = `Enter new position value (${unit}):`;
    } else if (dataType === 'velocity') {
        currentValue = interactiveData.velocityData[pointIndex];
        unit = 'm/s';
        promptMessage = `Enter new velocity value (${unit}):`;
    } else if (dataType === 'acceleration') {
        currentValue = interactiveData.accelerationData[pointIndex];
        unit = 'm/s^2';
        promptMessage = `Enter new acceleration value (${unit}):`;
    }
    
    // Show prompt with current value
    let newValue = prompt(promptMessage, currentValue);
    
    // Validate and update if user didn't cancel
    if (newValue !== null) {
        let numValue = parseFloat(newValue);
        if (!isNaN(numValue)) {
            // Update the data point
            if (dataType === 'position') {
                interactiveData.positionData[pointIndex] = numValue.toFixed(1);
            } else if (dataType === 'velocity') {
                interactiveData.velocityData[pointIndex] = numValue.toFixed(1);
            } else if (dataType === 'acceleration') {
                interactiveData.accelerationData[pointIndex] = numValue.toFixed(1);
            }
            
            // Ask if user wants to change time as well
            let changeTime = confirm(`Do you also want to change the time value for this point?\nCurrent time: ${currentTime}s`);
            if (changeTime) {
                let newTime = prompt('Enter new time value (seconds):', currentTime);
                if (newTime !== null) {
                    let timeValue = parseFloat(newTime);
                    if (!isNaN(timeValue) && timeValue >= 0) {
                        interactiveData.timePoints[pointIndex] = timeValue.toFixed(1);
                        
                        // Update all chart labels
                        if (positionChart && positionChart.data) {
                            positionChart.data.labels = [...interactiveData.timePoints];
                        }
                        if (velocityChart && velocityChart.data) {
                            velocityChart.data.labels = [...interactiveData.timePoints];
                        }
                        if (accelerationChart && accelerationChart.data) {
                            accelerationChart.data.labels = [...interactiveData.timePoints];
                        }
                    } else {
                        alert('Please enter a valid positive number for time!');
                    }
                }
            }
            
            // Update all charts
            if (positionChart) positionChart.update();
            if (velocityChart) velocityChart.update();
            if (accelerationChart) accelerationChart.update();
        } else {
            alert('Please enter a valid number!');
        }
    }
}

// Start dragging for a specific point
function startDragging(chart, dataType, pointIndex, mouseDownEvent) {
    let isDragging = false;
    let canvas = chart.canvas;
    let startX = mouseDownEvent.clientX;
    let startY = mouseDownEvent.clientY;
    let startValue = parseFloat(
        dataType === 'position' ? interactiveData.positionData[pointIndex] :
        dataType === 'velocity' ? interactiveData.velocityData[pointIndex] :
        interactiveData.accelerationData[pointIndex]
    );
    let startTime = parseFloat(interactiveData.timePoints[pointIndex]);
    
    // Sensitivity factors
    let baseSensitivityY = 0.02; // For value changes
    let baseSensitivityX = 0.005; // For time changes (smaller for precision)
    
    function onMouseMove(event) {
        if (!isDragging) return;
        
        // Check if Shift key is held for faster movement
        let currentSensitivityY = event.shiftKey ? baseSensitivityY * 2.5 : baseSensitivityY;
        let currentSensitivityX = event.shiftKey ? baseSensitivityX * 2.5 : baseSensitivityX;
        
        // Update cursor to show fast mode
        canvas.style.cursor = event.shiftKey ? 'move' : 'grabbing';
        
        // Calculate movement deltas
        let deltaY = startY - event.clientY; // Inverted so up = positive
        let deltaX = event.clientX - startX; // Right = positive
        
        let valueChange = deltaY * currentSensitivityY;
        let timeChange = deltaX * currentSensitivityX;
        
        let newValue = startValue + valueChange;
        let newTime = Math.max(0, startTime + timeChange); // Prevent negative time
        
        // Update the data point
        interactiveData.timePoints[pointIndex] = newTime.toFixed(1);
        
        if (dataType === 'position') {
            interactiveData.positionData[pointIndex] = newValue.toFixed(1);
        } else if (dataType === 'velocity') {
            interactiveData.velocityData[pointIndex] = newValue.toFixed(1);
        } else if (dataType === 'acceleration') {
            interactiveData.accelerationData[pointIndex] = newValue.toFixed(1);
        }
        
        // Update chart labels (time points) for all charts
        if (positionChart && positionChart.data) {
            positionChart.data.labels = [...interactiveData.timePoints];
        }
        if (velocityChart && velocityChart.data) {
            velocityChart.data.labels = [...interactiveData.timePoints];
        }
        if (accelerationChart && accelerationChart.data) {
            accelerationChart.data.labels = [...interactiveData.timePoints];
        }
        
        // Update chart smoothly without animation
        chart.update('none');
    }
    
    function onMouseUp(event) {
        // Stop dragging
        isDragging = false;
        canvas.style.cursor = 'default';
        
        // Remove event listeners
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        // Final update with animation
        chart.update('active');
    }
    
    // Start dragging only when mouse button is pressed down
    isDragging = true;
    canvas.style.cursor = 'grabbing';
    
    // Add event listeners for mouse movement and release
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Analyze the created graph and extract physics data
function analyzeGraph() {
    if (interactiveData.timePoints.length === 0) {
        alert('Create an interactive graph first!');
        return;
    }
    
    // Calculate average values and trends
    let avgVelocity = interactiveData.velocityData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / interactiveData.velocityData.length;
    let avgAcceleration = interactiveData.accelerationData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / interactiveData.accelerationData.length;
    let totalDistance = Math.max(...interactiveData.positionData) - Math.min(...interactiveData.positionData);
    let totalTime = Math.max(...interactiveData.timePoints) - Math.min(...interactiveData.timePoints);
    
    // Display analysis
    document.getElementById('results-display').innerHTML = `
        <h3>Graph Analysis:</h3>
        <p><strong>Total Distance:</strong> ${totalDistance.toFixed(1)} meters</p>
        <p><strong>Total Time:</strong> ${totalTime} seconds</p>
        <p><strong>Average Velocity:</strong> ${avgVelocity.toFixed(1)} m/s</p>
        <p><strong>Average Acceleration:</strong> ${avgAcceleration.toFixed(1)} m/s^2</p>
        <p><strong>Motion Type:</strong> ${avgAcceleration < 0.1 && avgAcceleration > -0.1 ? 'Uniform Motion' : 'Accelerated Motion'}</p>
        <p><em>Data points: ${interactiveData.timePoints.length}</em></p>
    `;
}

// Reset the interactive graph
function resetGraph() {
    if (confirm('Reset the graph to default values?')) {
        createInteractiveGraph();
        document.getElementById('results-display').innerHTML = 'Interactive mode: Create and edit your own motion graphs!';
    }
}

// Present clean view of the custom graph with labeled coordinates
function presentCleanGraph() {
    if (interactiveData.timePoints.length === 0) {
        alert('Create an interactive graph first!');
        return;
    }
    
    // Destroy existing charts
    if (positionChart) positionChart.destroy();
    if (velocityChart) velocityChart.destroy();
    if (accelerationChart) accelerationChart.destroy();
    
    // Create clean presentation charts
    createPresentationCharts();
}

// Create fullscreen overlay for a single graph
function showFullscreenGraph(chartType, chartTitle, chartData, borderColor, backgroundColor) {
    // Create fullscreen overlay
    let overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
    
    // Create close instruction
    let closeInstruction = document.createElement('div');
    closeInstruction.style.cssText = `
        color: white;
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
    `;
    closeInstruction.innerHTML = `${chartTitle}<br><span style="font-size: 14px; opacity: 0.8;">Click anywhere to close</span>`;
    
    // Create canvas container
    let canvasContainer = document.createElement('div');
    canvasContainer.style.cssText = `
        width: 90vw;
        height: 70vh;
        background-color: #1a1a1a;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Create canvas
    let canvas = document.createElement('canvas');
    canvas.id = 'fullscreen-canvas';
    canvas.style.cssText = `
        width: 100%;
        height: 100%;
    `;
    
    canvasContainer.appendChild(canvas);
    overlay.appendChild(closeInstruction);
    overlay.appendChild(canvasContainer);
    document.body.appendChild(overlay);
    
    // Create fullscreen chart
    let ctx = canvas.getContext('2d');
    let fullscreenChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: chartData.label,
                data: chartData.data,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: borderColor,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    color: borderColor,
                    font: { size: 24 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff', font: { size: 18 } },
                    ticks: { color: '#ffffff', font: { size: 14 } }
                },
                y: {
                    title: { display: true, text: chartData.yLabel, color: '#ffffff', font: { size: 18 } },
                    ticks: { color: '#ffffff', font: { size: 14 } }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    let meta = chart.getDatasetMeta(i);
                    meta.data.forEach((element, index) => {
                        let time = interactiveData.timePoints[index];
                        let value = chartData.data[index];
                        let x = element.x;
                        let y = element.y - 20;
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '14px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(`(${time}, ${value})`, x, y);
                    });
                });
            }
        }]
    });
    
    // Close on click
    overlay.addEventListener('click', function() {
        fullscreenChart.destroy();
        document.body.removeChild(overlay);
    });
}

// Create clean charts with small points and coordinate labels
function createPresentationCharts() {
    // Position Chart - Clean Presentation
    let positionCtx = document.getElementById('positionChart').getContext('2d');
    positionChart = new Chart(positionCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Position (m)',
                data: interactiveData.positionData,
                borderColor: '#13F0EC',
                backgroundColor: 'rgba(19, 240, 236, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#13F0EC',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Position vs Time - Presentation View (Click to Expand)',
                    color: '#13F0EC',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Position (m)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                }
            },
            onClick: function(event, activeElements) {
                // This will be handled by canvas event listener instead
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    let meta = chart.getDatasetMeta(i);
                    meta.data.forEach((element, index) => {
                        let time = interactiveData.timePoints[index];
                        let value = interactiveData.positionData[index];
                        let x = element.x;
                        let y = element.y - 15;
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '10px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(`(${time}, ${value})`, x, y);
                    });
                });
            }
        }]
    });
    
    // Velocity Chart - Clean Presentation
    let velocityCtx = document.getElementById('velocityChart').getContext('2d');
    velocityChart = new Chart(velocityCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Velocity (m/s)',
                data: interactiveData.velocityData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Velocity vs Time - Presentation View (Click to Expand)',
                    color: '#00d4ff',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Velocity (m/s)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                }
            },
            onClick: function(event, activeElements) {
                // This will be handled by canvas event listener instead
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    let meta = chart.getDatasetMeta(i);
                    meta.data.forEach((element, index) => {
                        let time = interactiveData.timePoints[index];
                        let value = interactiveData.velocityData[index];
                        let x = element.x;
                        let y = element.y - 15;
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '10px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(`(${time}, ${value})`, x, y);
                    });
                });
            }
        }]
    });
    
    // Acceleration Chart - Clean Presentation
    let accelerationCtx = document.getElementById('accelerationChart').getContext('2d');
    accelerationChart = new Chart(accelerationCtx, {
        type: 'line',
        data: {
            labels: interactiveData.timePoints,
            datasets: [{
                label: 'Acceleration (m/s^2)',
                data: interactiveData.accelerationData,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#ff6b6b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Acceleration vs Time - Presentation View (Click to Expand)',
                    color: '#ff6b6b',
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                },
                y: {
                    title: { display: true, text: 'Acceleration (m/s^2)', color: '#ffffff', font: { size: 14 } },
                    ticks: { color: '#ffffff' }
                }
            },
            onClick: function(event, activeElements) {
                // This will be handled by canvas event listener instead
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    let meta = chart.getDatasetMeta(i);
                    meta.data.forEach((element, index) => {
                        let time = interactiveData.timePoints[index];
                        let value = interactiveData.accelerationData[index];
                        let x = element.x;
                        let y = element.y - 15;
                        
                        ctx.fillStyle = '#ffffff';
                        ctx.font = '10px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(`(${time}, ${value})`, x, y);
                    });
                });
            }
        }]
    });
    
    // Add click listeners for fullscreen expansion
    positionCtx.canvas.addEventListener('click', function(event) {
        if (event.offsetY < 50) { // Title area
            showFullscreenGraph(
                'position',
                'Position vs Time - Fullscreen View',
                {
                    label: 'Position (m)',
                    data: interactiveData.positionData,
                    yLabel: 'Position (m)'
                },
                '#13F0EC',
                'rgba(19, 240, 236, 0.1)'
            );
        }
    });
    
    velocityCtx.canvas.addEventListener('click', function(event) {
        if (event.offsetY < 50) { // Title area
            showFullscreenGraph(
                'velocity',
                'Velocity vs Time - Fullscreen View',
                {
                    label: 'Velocity (m/s)',
                    data: interactiveData.velocityData,
                    yLabel: 'Velocity (m/s)'
                },
                '#00d4ff',
                'rgba(0, 212, 255, 0.1)'
            );
        }
    });
    
    accelerationCtx.canvas.addEventListener('click', function(event) {
        if (event.offsetY < 50) { // Title area
            showFullscreenGraph(
                'acceleration',
                'Acceleration vs Time - Fullscreen View',
                {
                    label: 'Acceleration (m/s^2)',
                    data: interactiveData.accelerationData,
                    yLabel: 'Acceleration (m/s^2)'
                },
                '#ff6b6b',
                'rgba(255, 107, 107, 0.1)'
            );
        }
    });
    
    // Update results display
    document.getElementById('results-display').innerHTML = `
        <h3>Presentation View Active</h3>
        <p>Displaying your custom motion graphs with coordinate labels for presentation.</p>
        <p><em>Click "Create Interactive Graph" to return to editing mode.</em></p>
    `;
}

// Chemical formula parser and breakdown feature for science page
const POLYATOMIC_IONS = [
    { formula: 'NH4', name: 'Ammonium', charge: 1 },
    { formula: 'OH', name: 'Hydroxide', charge: -1 },
    { formula: 'NO3', name: 'Nitrate', charge: -1 },
    { formula: 'SO4', name: 'Sulfate', charge: -2 },
    { formula: 'CO3', name: 'Carbonate', charge: -2 },
    { formula: 'PO4', name: 'Phosphate', charge: -3 },
    { formula: 'HCO3', name: 'Bicarbonate', charge: -1 },
    { formula: 'CN', name: 'Cyanide', charge: -1 },
    { formula: 'MnO4', name: 'Permanganate', charge: -1 },
    { formula: 'Cr2O7', name: 'Dichromate', charge: -2 },
    { formula: 'NO2', name: 'Nitrite', charge: -1 },
    { formula: 'SO3', name: 'Sulfite', charge: -2 },
    { formula: 'CH3COO', name: 'Acetate', charge: -1 }
];

const COMMON_COMPOUNDS = [
    { formula: 'CO', name: 'Carbon Monoxide', type: 'neutral molecule' },
    { formula: 'CO2', name: 'Carbon Dioxide', type: 'neutral molecule' },
    { formula: 'H2O', name: 'Water', type: 'neutral molecule' },
    { formula: 'H2O2', name: 'Hydrogen Peroxide', type: 'neutral molecule' },
    { formula: 'O2', name: 'Oxygen', type: 'neutral molecule' },
    { formula: 'N2', name: 'Nitrogen', type: 'neutral molecule' },
    { formula: 'H2', name: 'Hydrogen', type: 'neutral molecule' },
    { formula: 'CH4', name: 'Methane', type: 'neutral molecule' },
    { formula: 'C2H6', name: 'Ethane', type: 'neutral molecule' },
    { formula: 'C3H8', name: 'Propane', type: 'neutral molecule' },
    { formula: 'NH3', name: 'Ammonia', type: 'neutral molecule' },
    { formula: 'SO2', name: 'Sulfur Dioxide', type: 'neutral molecule' },
    { formula: 'NO', name: 'Nitric Oxide', type: 'neutral molecule' },
    { formula: 'NO2', name: 'Nitrogen Dioxide', type: 'neutral molecule' },
    { formula: 'HCl', name: 'Hydrochloric Acid', type: 'neutral molecule' },
    { formula: 'H2SO4', name: 'Sulfuric Acid', type: 'neutral molecule' },
    { formula: 'NaCl', name: 'Sodium Chloride', type: 'ionic compound' },
    { formula: 'CaCO3', name: 'Calcium Carbonate', type: 'ionic compound' },
    { formula: 'NaOH', name: 'Sodium Hydroxide', type: 'ionic compound' },
    { formula: 'KOH', name: 'Potassium Hydroxide', type: 'ionic compound' },
    { formula: 'MgSO4', name: 'Magnesium Sulfate', type: 'ionic compound' },
    { formula: 'CuSO4', name: 'Copper(II) Sulfate', type: 'ionic compound' },
    { formula: 'Fe2O3', name: 'Iron(III) Oxide', type: 'ionic compound' },
    { formula: 'Al2O3', name: 'Aluminum Oxide', type: 'ionic compound' },
    { formula: 'CaO', name: 'Calcium Oxide', type: 'ionic compound' },
    { formula: 'Na2CO3', name: 'Sodium Carbonate', type: 'ionic compound' }
];

const ATOMIC_WEIGHTS = {
    H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
    Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
    Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, I: 126.904, Ag: 107.8682, Au: 196.96657, Pb: 207.2, Hg: 200.59,
    Sn: 118.71, Ni: 58.693, Co: 58.933, Mn: 54.938, Cr: 51.996, Ti: 47.867
};

const ELEMENT_NAMES = {
    H: 'Hydrogen', He: 'Helium', Li: 'Lithium', Be: 'Beryllium', B: 'Boron', C: 'Carbon', N: 'Nitrogen',
    O: 'Oxygen', F: 'Fluorine', Ne: 'Neon', Na: 'Sodium', Mg: 'Magnesium', Al: 'Aluminum', Si: 'Silicon',
    P: 'Phosphorus', S: 'Sulfur', Cl: 'Chlorine', Ar: 'Argon', K: 'Potassium', Ca: 'Calcium',
    Ti: 'Titanium', Cr: 'Chromium', Mn: 'Manganese', Fe: 'Iron', Co: 'Cobalt', Ni: 'Nickel',
    Cu: 'Copper', Zn: 'Zinc', Br: 'Bromine', Ag: 'Silver', Sn: 'Tin', I: 'Iodine',
    Au: 'Gold', Hg: 'Mercury', Pb: 'Lead'
};

function breakDownFormula() {
    let input = document.getElementById('chemicalFormula').value.trim();
    let output = document.getElementById('chemical-results');
    if (!input) {
        output.innerHTML = '<p>Please enter a chemical formula to analyze.</p>';
        return;
    }

    try {
        let parsed = parseChemicalFormula(input);
        let compound = identifyCommonCompound(input);
        let ions = identifyPolyatomicIons(input);
        let molarMass = calculateMolarMass(parsed.atomCounts);
        let classification = classifyFormula(parsed.charge, ions, compound);

        output.innerHTML = `
            <h3>Chemical Formula Breakdown</h3>
            <div class="chemical-summary">
                <p><strong>Formula:</strong> ${parsed.formula}</p>
                ${compound ? `<p><strong>Compound Name:</strong> ${compound.name}</p>` : ''}
                <p><strong>Net Charge:</strong> ${formatCharge(parsed.charge)}</p>
                <p><strong>Classification:</strong> ${classification}</p>
                <p><strong>Molar Mass Estimate:</strong> ${molarMass ? molarMass.toFixed(2) + ' g/mol' : 'Unknown'}</p>
            </div>
            <h4>Atom Counts</h4>
            <ul class="chemical-list">
                ${Object.entries(parsed.atomCounts).map(([element, count]) => `<li>${ELEMENT_NAMES[element] || element} (${element}): ${count}</li>`).join('')}
            </ul>
            ${ions.length ? `<h4>Likely Polyatomic Ions</h4>
                <ul class="chemical-list">
                    ${ions.map(ion => `<li>${ion.name} (${ion.formula}) - count: ${ion.count}, charge: ${formatCharge(ion.charge)}</li>`).join('')}
                </ul>` : '<p>No common polyatomic ions detected.</p>'}
        `;
    } catch (error) {
        output.innerHTML = `<p>Unable to parse the formula. Please check the format and try again.</p><p><em>${error.message}</em></p>`;
    }
}

function parseChemicalFormula(formula) {
    let cleaned = formula.replace(/\s+/g, '');
    let charge = 0;

    // Multi-digit charge requires explicit caret to avoid clashing with subscripts
    // e.g. SO4^2- (charge -2) vs NH4+ (subscript 4, charge +1). Sign defaults to +.
    let multiMatch = cleaned.match(/\^(\d+)([+-]?)$/);
    if (multiMatch) {
        let magnitude = parseInt(multiMatch[1], 10);
        let sign = multiMatch[2] === '-' ? -1 : 1;
        charge = sign * magnitude;
        cleaned = cleaned.slice(0, -multiMatch[0].length);
    } else {
        let singleMatch = cleaned.match(/([+-])$/);
        if (singleMatch) {
            charge = singleMatch[1] === '+' ? 1 : -1;
            cleaned = cleaned.slice(0, -1);
        }
    }

    if (cleaned.includes('^')) {
        throw new Error("'^' should appear only before a charge at the end, e.g. SO4^2-");
    }

    let index = 0;
    function parseSegment() {
        let counts = {};
        while (index < cleaned.length) {
            if (cleaned[index] === '(') {
                index++;
                let innerCounts = parseSegment();
                if (cleaned[index] !== ')') {
                    throw new Error('Missing closing parenthesis');
                }
                index++;
                let multiplierMatch = cleaned.slice(index).match(/^\d+/);
                let multiplier = multiplierMatch ? parseInt(multiplierMatch[0], 10) : 1;
                if (multiplierMatch) {
                    index += multiplierMatch[0].length;
                }
                Object.entries(innerCounts).forEach(([element, value]) => {
                    counts[element] = (counts[element] || 0) + value * multiplier;
                });
                continue;
            }

            if (cleaned[index] === ')') {
                break;
            }

            let match = cleaned.slice(index).match(/^([A-Z][a-z]?)(\d*)/);
            if (!match) {
                throw new Error(`Invalid formula near '${cleaned.slice(index)}'`);
            }

            let element = match[1];
            let amount = match[2] ? parseInt(match[2], 10) : 1;
            counts[element] = (counts[element] || 0) + amount;
            index += match[0].length;
        }
        return counts;
    }

    let atomCounts = parseSegment();
    if (index !== cleaned.length) {
        throw new Error('Unexpected characters remain in the formula');
    }

    return { formula, atomCounts, charge };
}

function stripCharge(formula) {
    return formula.replace(/\s+/g, '').replace(/\^\d+[+-]?$/, '').replace(/[+-]$/, '');
}

function identifyCommonCompound(formula) {
    let normalized = stripCharge(formula);
    return COMMON_COMPOUNDS.find(compound => compound.formula === normalized);
}

function identifyPolyatomicIons(formula) {
    let normalized = stripCharge(formula);
    let ionsFound = [];
    POLYATOMIC_IONS.forEach((ion) => {
        let escaped = ion.formula.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let totalCount = 0;
        let match;

        // Parenthesized form: (ION)N  e.g. Ca(NO3)2
        let parenRegex = new RegExp(`\\(${escaped}\\)(\\d*)`, 'g');
        while ((match = parenRegex.exec(normalized)) !== null) {
            totalCount += match[1] ? parseInt(match[1], 10) : 1;
        }

        // Unparenthesized form: ion must be followed by uppercase letter, (, or end of string
        // This correctly handles NaOH, CaCO3, KNO3, Na2SO4, NH4Cl, etc.
        let freeRegex = new RegExp(`${escaped}(\\d*)(?=[A-Z(]|$)`, 'g');
        while ((match = freeRegex.exec(normalized)) !== null) {
            totalCount += match[1] ? parseInt(match[1], 10) : 1;
        }

        if (totalCount > 0) {
            ionsFound.push({ ...ion, count: totalCount });
        }
    });
    return ionsFound;
}

function calculateMolarMass(atomCounts) {
    return Object.entries(atomCounts).reduce((total, [element, count]) => {
        let weight = ATOMIC_WEIGHTS[element] || 0;
        return total + weight * count;
    }, 0);
}

function classifyFormula(charge, ions, compound) {
    if (charge > 0) return 'Cation';
    if (charge < 0) return 'Anion';
    if (compound) return compound.type;
    if (ions.length) return 'Ionic compound / contains polyatomic ions';
    return 'Neutral molecule';
}

function formatCharge(charge) {
    if (charge === 0) return '0';
    return charge > 0 ? `+${charge}` : `${charge}`;
}
