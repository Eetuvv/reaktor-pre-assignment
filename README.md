My solution to <a href = https://www.reaktor.com/assignment-2022-developers/>Reaktor's pre-assignment</a>. Not the most modern solution, but it works.
<br>
I was getting a cors-error when fetching data from the API, so I decided to host a <a href = https://github.com/Rob--W/cors-anywhere>cors-anywhere proxy</a> and redirect the requests through it to bypass the error.
<br>
<br>
 Since the API gives many pages of data with tens of thousands of game results, fetching takes a long time. Game statistics will update as new data is fetched, so by waiting a while it will be up-to-date.
<br>
Obviously a better solution would've been to create a database and fetch all the data in there beforehand, but I chose to not have one for this small assignment.
<br>
<br>
Website can be viewed here: https://sleepy-lake-80278.herokuapp.com/
