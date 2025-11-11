 //Function called runQuiz that contains the history quiz code          
function runQuiz2() 
{         
            //Write your trivia questions here!
            //Create a variable called "counter" and set the value to zero
            // This var will count the # of correct answers
            let counter = 0;
            
            //Create a var called "answerOne" and set the value
            let answerOne = "square";
            
            //Create a var called "answerTwo" and set the value
            let answerTwo = "triangle";
            
            //Create a var called "answerThree" and set the value
            let answerThree = "graphing";

            //Create a var called "answerOne" and set the value
            let answerFour = "y=mx+b";
            
            //Create a var called "answerTwo" and set the value
            let answerFive = "slope";
            
            //Create a var called "answerThree" and set the value
            let answerSix = "intercept";
            
            //Create a var called "answerOne" and set the value
            let answerSeven = "plugging in";
            
            //Create a var called "answerTwo" and set the value
            let answerEight = "hypotenuse";
            
            //Create a var called "answerThree" and set the value
            let answerNine = "pythagorean theorem";

            //Create a var called "answerThree" and set the value
            let answerTen = "quadratic formula";
            
            //Create a var called "responseOne" and store the users answer
            let responseOne = prompt("What shape has four equal sides and four right angles?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseOne == answerOne)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerOne);
             
                
            }
            
               //Create a var called "responseTwo" and store the users answer
            let responseTwo = prompt("What shape has three sides?")
            
            if(responseTwo == answerTwo)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerTwo);
             
                
            }
            
            //Create a var called "responseThree" and store the users answer
            let responseThree = prompt("What is the formula for the slope of a line?")
            
            if(responseThree == answerThree)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerThree);
             
                
            }

            //Create a var called "responseFour" and store the users answer
            let responseFour = prompt("What is the equation of a straight line?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseFour == answerFour)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerFour);
             
                
            }

            //Create a var called "responseFive" and store the users answer
            let responseFive = prompt("What is the term for the steepness of a line?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseFive == answerFive)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerFive);
             
                
            }

            //Create a var called "responseSix" and store the users answer
            let responseSix = prompt("What is the term for where a line crosses an axis?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseSix == answerSix)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerSix);
             
                
            }

            //Create a var called "responseSeven" and store the users answer
            let responseSeven = prompt("What method involves substituting values into an equation to find a solution?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseSeven == answerSeven)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerSeven);
             
                
            }

            //Create a var called "responseEight" and store the users answer
            let responseEight = prompt("In a right triangle, what is the longest side called?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseEight == answerEight)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerEight);
             
                
            }

            //Create a var called "responseNine" and store the users answer
            let responseNine = prompt("What theorem states that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseNine == answerNine)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerNine);
             
                
            }

            //Create a var called "responseTen" and store the users answer
            let responseTen = prompt("What formula is used to find the roots of a quadratic equation?")
            
            //Create an if statemet using a comparison operator to check if the response is correct
            if(responseTen == answerTen)
            {
               /*If the user's respose is correct, the counter var is increased by one and an alert command is sent to a user alerting of a correct answer */
               counter++; 
               alert("Correct!");
                
            }
            //This can also be "or"
            
            else
            {
             /*If the user's response is incorrect, send an alert telling the user and provide the correct answer */ 
             alert("Incorrect, the correct answer is: " + answerTen);
             
                
            }
            
            alert("Nice! You ended with a score of: " + counter + " correct out of 10!");
}