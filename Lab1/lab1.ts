//EXERCISE 1
const greeter = (myArray, counter) => {
    let greetText = 'Hello';
    for(let index of myArray){
        console.log(greetText+index);
    }
}
greeter(['Randy Savage','Ric Flair','Hulk Hogan'],3)

//EXERCISE 2
const capitalize = (word) => {
    let letters = [...word];
    let [first_letter] = letters;
    first_letter.capitalize();
}