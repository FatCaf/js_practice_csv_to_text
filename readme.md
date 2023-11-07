## Replacing city names in the text with information about them

This project implements a function that accepts text in CSV format, and returns a function that will accept any text as input and replace the city names in it with a string of the type "city name" (X place in the TOP-10 largest cities of Ukraine, population UUUUUU person/people/people)".

## How to use the project

To use the project, do the following:

1. Open the `index.html` file in your browser.
2. In the text field, enter the text in which you want to replace the city names.
3. Click on the "Open" button and download the CSV file that contains information about the cities.
4. After loading the CSV file, the city names in the text will be replaced with information about them.

## How the project works

When you open an HTML file in your browser, the `onUpload()` function is called. This feature allows you to select one or more CSV files to download. After downloading the files, the function reads the contents of each file and creates an associative array of data about cities.

The associative array is then sorted by number in descending order. This ensures that the largest cities are listed first.

The `generateCityObject()` function is then called to create a function that can be used to generate city information. This function takes a city name as input and returns a string with information about the city, including its population and rating.

Finally, the city info function is used to replace all occurrences of city names in the text field with the appropriate city information.

This process is repeated every time the user changes the text in the text box or uploads a new CSV file.
