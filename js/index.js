$(()=>{
    $('#loading').fadeIn(1000,()=>{
    getMeals()
    });
    $('#loading').fadeOut(1000);

})


// ! Start Open - Close - Icon
    $('.open-close-icon').on('click',function() {
        $(this).toggleClass('fa-x fa-align-justify');
        $('.sideNav').toggleClass('open')
        if ($('.sideNav').hasClass('open')) {
            $('.navLinks li').removeClass('animate__backInUp');
            $('.navLinks li').addClass('animate__bounceOutDown');

        } 
        else {
            $('.navLinks li').addClass('animate__backInUp');
            $('.navLinks li').removeClass('animate__bounceOutDown');
        }
        });
// ! End Open - Close - Icon


// !
$('.search').on('click',()=>{
    $('#loading').fadeIn(1000,()=>{
        
        $('#ingredients').addClass('d-none');
        $('#details').addClass('d-none');
        $('#data').addClass('d-none');
        $('#search').removeClass('d-none');
        $('#categories').addClass('d-none');
        $('#contactUs').addClass('d-none');
        $('#area').addClass('d-none');
    $('#details').addClass('d-none');
        
      });
      $('#loading').fadeOut(1000);
  

})

$('.categories').on('click',()=>{
    $('#loading').fadeIn(1000,()=>{
        getCategories()
      });
      $('#loading').fadeOut(1000);

    $('#ingredients').addClass('d-none');
    $('#search').addClass('d-none');
    $('#categories').removeClass('d-none');
    $('#contactUs').addClass('d-none');
    $('#area').addClass('d-none');
    $('#data').addClass('d-none');
    $('#details').addClass('d-none');

})

$('.area').on('click',()=>{
    $('#loading').fadeIn(1000,()=>{
        getArea()
      });
      $('#loading').fadeOut(1000);
    $('#ingredients').addClass('d-none');
    $('#search').addClass('d-none');
    $('#categories').addClass('d-none');
    $('#contactUs').addClass('d-none');
    $('#area').removeClass('d-none');
    $('#data').addClass('d-none');
    $('#details').addClass('d-none');

})

$('.ingredients').on('click',()=>{
    $('#loading').fadeIn(1000,()=>{
        getIngredients()
   
      });
      $('#loading').fadeOut(1000);
    $('#ingredients').removeClass('d-none');
    $('#search').addClass('d-none');
    $('#categories').addClass('d-none');
    $('#contactUs').addClass('d-none');
    $('#area').addClass('d-none');
    $('#data').addClass('d-none');
    $('#details').addClass('d-none');
})


$('.contact').on('click',()=>{
    $('#loading').fadeIn(1000,()=>{
   
        $('#ingredients').addClass('d-none');
        $('#data').addClass('d-none');
        $('#search').addClass('d-none');
        $('#categories').addClass('d-none');
        $('#contactUs').removeClass('d-none');
        $('#area').addClass('d-none');
        $('#details').addClass('d-none');

      });
      $('#loading').fadeOut(1000);
  
})

// !



// ! Start Meals
async function getMeals()
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`);
    let result = await myHttp.json();
    console.log(result.meals);
    displayMeals(result.meals);

}


function displayMeals(list)
{
    let blackBox ='';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        blackBox +=`<div class="col-md-3">

        <div id=${element.idMeal} class="meal overflow-hidden position-relative rounded-2">
            <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">

            <div class="mealLayer d-flex position-absolute align-items-center text-black p-2">
                <h3 class="text-black">${element.strMeal}</h3>
            </div>
        </div>
    </div>`;
        
    }
    $('#data .row').html(blackBox);
    $('#data .meal').on('click',(e)=>{
        let id = $(e.target).closest('.meal').attr('id');
            console.log(id);
            $('#loading').fadeIn(1000,()=>{
                getMealDetails(id);
                $('#data').addClass('d-none');
                $('#details').removeClass('d-none');
        
            });
            $('#loading').fadeOut(1000);
    });
}
// ! End Meals


// ! Start categories
async function getCategories()
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let result = await myHttp.json();
    console.log(result.categories);
    displayCategories(result.categories);
}

async function getCategoriesMeal(cat)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    let result = await myHttp.json();
    console.log(result.meals.slice(0,20));
    displayMeals(result.meals.slice(0,20));
    $('#loading').fadeIn(1000,()=>{
        $('#categories').addClass('d-none')
        $('#data').removeClass('d-none')
    });
    $('#loading').fadeOut(1000);

    
}

function displayCategories(list)
{
    let blackBox ='';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        blackBox +=`<div class="col-md-3">

        <div onclick="getCategoriesMeal('${element.strCategory}')" class="meal-category overflow-hidden position-relative rounded-2">
            <img src="${element.strCategoryThumb}" class="w-100 rounded-2" alt="">

            <div class="mealLayer-category d-flex flex-column position-absolute align-items-center justify-content-center text-black p-2">
                <h3 class="text-black">${element.strCategory}</h3>
                <p class="text-black text-center">${element.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`;
        
    }
    $('#categories .row').html(blackBox);
    
}
// ! End categories



// ! Start Area
async function getArea()
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let result = await myHttp.json();
    console.log(result.meals);
    displayArea(result.meals);

}

async function getAreaMeal(area)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let result = await myHttp.json();
    console.log(result.meals.slice(0,20));
    displayMeals(result.meals.slice(0,20));
    $('#loading').fadeIn(1000,()=>{
        $('#area').addClass('d-none')
        $('#data').removeClass('d-none')
    });
    $('#loading').fadeOut(1000);
}

function displayArea(list)
{
    let blackBox ='';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        blackBox +=`<div class="col-md-3">
        <div onclick="getAreaMeal('${element.strArea}')" class="areaCard rounded-2 text-center text-white">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${element.strArea}</h3>
    </div>
    </div>`;
        
    }
    $('#area .row').html(blackBox);

}

// ! End Area


// ! Start Ingredients
async function getIngredients()
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let result = await myHttp.json();
    console.log(result.meals);
    dispalyIngredients(result.meals.slice(0,20));

}

async function getIngredientsMeal(ingr)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`);
    let result = await myHttp.json();
    console.log(result.meals.slice(0,20));
    displayMeals(result.meals.slice(0,20));
    $('#ingredients').addClass('d-none')
    $('#data').removeClass('d-none')

}

function dispalyIngredients(list)
{
    let blackBox ='';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        
        blackBox +=`<div class="col-md-3">
        <div onclick="getIngredientsMeal('${element.strIngredient}')" class="ingredientsCard rounded-2 text-center text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${element.strIngredient}</h3>
            <p>${element.strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
    </div>`;
        
    }
    $('#ingredients .row').html(blackBox);

}
// ! End Ingredients


// ! Start Meal Details
async function getMealDetails(id)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let result = await myHttp.json();
    console.log(result.meals[0]);
    displayMealDetails(result.meals[0]);
}

function displayMealDetails(meal)
{

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) 
    {
        tags = [];
    }

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) { 
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let blackBox =` <div class="col-md-4">

        <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="">
        <h2 class="text-white">${meal.strMeal}</h2>
    </div>

    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;
        
    $('#details .row').html(blackBox);

    }

// ! End Meal Details


// ! Start Contact Us
    
function validateName() {
    const regex = /^[A-Za-z][A-Za-z\s-]*$/;
    let isValid=regex.test($('#nameInput').val())
    return isValid
}
function validateEmail() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid=regex.test($('#emailInput').val())
    return isValid
}
function validatePhone() {
    const regex = /^(012|011|015|010)\d{8}$/;
    let isValid=regex.test($('#phoneInput').val())
    return isValid
}
function validateAge() {
    const regex = /^(0?[1-9]|[1-9][0-9])$/;
    let isValid=regex.test($('#ageInput').val())
    return isValid

}
function validatePassword() {

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isValid=regex.test($('#passwordInput').val())
    return isValid
}
function validateRePassword() {

    return $('#repasswordInput').val()==$('#passwordInput').val()
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function takeInput(){
    $('#nameInput').on('input', () => {
        nameInputTouched = true;
    });
    $('#phoneInput').on('input', () => {
        phoneInputTouched = true;
    });
    $('#emailInput').on('input', () => {
        emailInputTouched = true;
    });
    $('#ageInput').on('input', () => {
        ageInputTouched = true;
    });
    $('#phone').on('input', () => {
        phoneInputTouched = true;
    });
    $('#passwordInput').on('input', () => {
        passwordInputTouched = true;
        setTimeout(() => {
        }, 1000)
    });
    $('#repasswordInput').on('input', () => {
        repasswordInputTouched = true;
        setTimeout(() => {
        }, 1000)
    });
    }
        
    function inputsValidation() {
        if (nameInputTouched) {
            if (!validateName()) {
                $('#nameInput').next('.alert-danger').remove();
                    $('#nameInput').after('<div class="alert alert-danger my-1">Special characters and numbers not allowed</div>');
                } else {
                    $('#nameInput').next('.alert-danger').remove();
                }
        }
        if (emailInputTouched) {
    
            if (!validateEmail()) {
                $('#emailInput').next('.alert-danger').remove();
                $('#emailInput').after('<div class="alert alert-danger my-1">Email not valid *exemple@yyy.zzz</div>');
            } else {
                $('#emailInput').next('.alert-danger').remove();
            }
        }
    
        if (phoneInputTouched) {
            if (!validatePhone()) {
                $('#phoneInput').next('.alert-danger').remove();
                $('#phoneInput').after('<div class="alert alert-danger my-1">Enter valid Phone Number</div>');
            } else {
                $('#phoneInput').next('.alert-danger').remove();
            }
        }
    
        if (ageInputTouched) {
            if (!validateAge()) {
                $('#ageInput').next('.alert-danger').remove();
                $('#ageInput').after('<div class="alert alert-danger my-1">Enter valid age</div>');
            } else {
                $('#ageInput').next('.alert-danger').remove();
            }
        }
    
        if (passwordInputTouched) {
            if (!validatePassword()) {
                $('#passwordInput').next('.alert-danger').remove();
                $('#passwordInput').after('<div class="alert alert-danger my-1">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>');
            } else {
                $('#passwordInput').next('.alert-danger').remove();
            }
        }
        if (repasswordInputTouched) {
            if (!validateRePassword()) {
                $('#repasswordInput').next('.alert-danger').remove();
                $('#repasswordInput').after('<div class="alert alert-danger my-1">Enter valid repassword</div>');
            } else {
                $('#repasswordInput').next('.alert-danger').remove();
            }
        }
    
    
        if (validateName() &&
            validateEmail() &&
            validateAge() &&
            validatePhone() &&
            validatePassword()&&
            validateRePassword() ) {
                $('#submitBtn').removeAttr('disabled');
                
        } else {
            $('#submitBtn').attr('disabled', 'disabled');
        }
    }

    takeInput()
    $('input').on('keyup',()=>{
        inputsValidation()
    })
    
    function clearForm(){
        $('#nameInput').val('')
        $('#emailInput').val('')
        $('#phoneInput').val('')
        $('#ageInput').val('')
        $('#passwordInput').val('')
        $('#repasswordInput').val('')
    }
    
    $('#submitBtn').on('click',()=>{
        clearForm();
    })

// ! End Contact Us


// ! Start Search
async function searchByName(searchName ,uniqId)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
    let result = await myHttp.json();
    displaySearch(result.meals , uniqId);
}

async function searchByLetter(searchLetter)
{
    let myHttp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`);
    let result = await myHttp.json();
    displaySearch(result.meals , uniqId);
}

function displaySearch(list , uniqId)
{
    let blackBox ='';

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (!uniqId.has(element.idMeal)) {
            blackBox += `<div class="col-md-3">

            <div id=${element.idMeal} class="meal overflow-hidden position-relative rounded-2">
                <img src="${element.strMealThumb}" class="w-100 rounded-2" alt="">
    
                <div class="mealLayer d-flex position-absolute align-items-center text-black p-2">
                    <h3 class="text-black">${element.strMeal}</h3>
                </div>
            </div>
        </div>`;
            uniqId.add(element.idMeal);
        }
        
    }
    $('#search .row').append(blackBox);
    $('#search .meal').on('click', (e) => {
        let id = $(e.target).closest('.meal').attr('id'); 
            getMealDetails(id);
            $('#search').addClass('d-none');
            $('#details').removeClass('d-none');

})
}
let timeoutId;
    let uniqId = new Set();
    $('#searchName').on('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            let searchName = $('#searchName').val();
            searchByName(searchName, uniqId);
        }, 1000);
    });


    $('#searchId').on('input', () => {
        let searchLetter = $('#searchId').val();
        if (searchLetter.length > 1) {
            searchLetter = searchLetter.substring(0, 1);
            $('#searchId').val();
        }
        searchByLetter(searchLetter);
        if (searchLetter === '') {
            $('#details').addClass('d-none');
        }
    });
// ! End Search

