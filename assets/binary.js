//Copilot("Skeleton for a binary encoder/decoder web app using JavaScript")

document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements
    const textInput = document.getElementById('textInput');
    const binaryOutput = document.getElementById('binaryOutput');
    const binaryInput = document.getElementById('binaryInput');
    const textOutput = document.getElementById('textOutput');
    
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const copyEncodedBtn = document.getElementById('copyEncodedBtn');
    const copyDecodedBtn = document.getElementById('copyDecodedBtn');

    // Function to convert text to binary
    function textToBinary(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }

    // Function to convert binary to text
    function binaryToText(binary) {
        // Remove extra spaces and split by 8-character groups
        const cleanBinary = binary.replace(/\s/g, '');
        
        // Check if binary length is divisible by 8
        if (cleanBinary.length % 8 !== 0) {
            throw new Error('Binary string length must be divisible by 8');
        }

        let result = '';
        for (let i = 0; i < cleanBinary.length; i += 8) {
            const binaryByte = cleanBinary.substr(i, 8);
            const charCode = parseInt(binaryByte, 2);
            result += String.fromCharCode(charCode);
        }
        return result;
    }

    // Function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    }

    // Function to show copy feedback
    function showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#00ff00';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1500);
    }

    // Encode button event listener
    encodeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (text === '') {
            alert('Please enter some text to encode!');
            return;
        }

        try {
            const binary = textToBinary(text);
            binaryOutput.value = binary;
        } catch (error) {
            alert('Error encoding text: ' + error.message);
        }
    });

    // Decode button event listener
    decodeBtn.addEventListener('click', function() {
        const binary = binaryInput.value.trim();
        
        if (binary === '') {
            alert('Please enter binary code to decode!');
            return;
        }

        // Validate binary input (only 0s, 1s, and spaces)
        if (!/^[01\s]+$/.test(binary)) {
            alert('Invalid binary code! Please use only 0s and 1s.');
            return;
        }

        try {
            const text = binaryToText(binary);
            textOutput.value = text;
        } catch (error) {
            alert('Error decoding binary: ' + error.message);
        }
    });

    // Copy encoded binary button
    copyEncodedBtn.addEventListener('click', async function() {
        const binary = binaryOutput.value;
        
        if (binary === '') {
            alert('No binary code to copy! Encode some text first.');
            return;
        }

        const success = await copyToClipboard(binary);
        if (success) {
            showCopyFeedback(this);
        }
    });

    // Copy decoded text button
    copyDecodedBtn.addEventListener('click', async function() {
        const text = textOutput.value;
        
        if (text === '') {
            alert('No text to copy! Decode some binary first.');
            return;
        }

        const success = await copyToClipboard(text);
        if (success) {
            showCopyFeedback(this);
        }
    });

    // Real-time encoding (optional - encode as you type)
    textInput.addEventListener('input', function() {
        const text = this.value;
        if (text.length > 0) {
            try {
                const binary = textToBinary(text);
                binaryOutput.value = binary;
            } catch (error) {
                binaryOutput.value = 'Error: ' + error.message;
            }
        } else {
            binaryOutput.value = '';
        }
    });

    // Real-time decoding (optional - decode as you type)
    binaryInput.addEventListener('input', function() {
        const binary = this.value.trim();
        if (binary.length > 0 && /^[01\s]+$/.test(binary)) {
            try {
                const text = binaryToText(binary);
                textOutput.value = text;
            } catch (error) {
                textOutput.value = 'Error: Invalid binary length';
            }
        } else {
            textOutput.value = '';
        }
    });
});