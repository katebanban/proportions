const form = document.querySelector(".proportions__form");
const formValue1 = document.querySelector("#value-1");
const formValue2 = document.querySelector("#value-2");
const formValue3 = document.querySelector("#value-3");
const unknownValue = document.querySelector("#value-4");
const btn = document.querySelector(".proportions__btn");
const btnReverse = document.querySelector(".proportions__btn-reverse");
const allValuesColumn = document.querySelectorAll(
  ".proportions__values-column"
);

// Создаём массив со всеми инпутами
let allFormValues = [formValue1, formValue2, formValue3];

// Создаём функцию, в которую мы положим 4 задачи:
function calcValues() {
  // (1) создаём переменные, в которые помещаем те значения, кот. мы будем получать из инпутов (от польз-ля)
  let value1 = formValue1.value;
  let value2 = formValue2.value;
  let value3 = formValue3.value;

  // (2) создаём переменную, в которую положим формулу вычисления неизвестного значения пропорции
  let result = (value2 * value3) / value1;

  // (3) проверяем получившийся результат: если число дробное - то округляем его до 1 знака после запятой
  if (Number.isInteger(result) === false) {
    result = result.toFixed(1);
  }

  // (4) создаём условие для последнего инпута: если инпуты 1 или 2, или 3 пустые - то ничего не происходит, иначе - помещаем в него результат
  if (value1 === "" || value2 === "" || value3 === "") {
    unknownValue.value = "";
  } else {
    unknownValue.value = result;
  }
}

// Перебираем массив со всеми инпутами и навешиваем на каждый из них отслеживатель событий, кот. реагирует на изменения в инпуте (добавление/удаление значения): если инпут пустой - то обводим его красным, если полный - то оставляем его с прозрачной обводкой
allFormValues.forEach((formValue) => {
  formValue.addEventListener("change", () => {
    if (formValue.value === "") {
      formValue.style.border = "3px dashed red";
    } else {
      formValue.style.borderColor = "transparent";
    }

	 // зовём ранее созданную функцию
    calcValues();
  });
});

// навешиваем событие на клик по кнопке формы
form.addEventListener("submit", function (e) {
  e.preventDefault(); //! предотвращает отправку формы по умолчанию

  // Перебираем массив со всеми инпутами: если инпут пустой - то обводим его красным, если полный - то оставляем его с прозрачной обводкой
  for (let formValue of allFormValues) {
    if (formValue.value === "") {
      formValue.style.border = "3px dashed red";
    } else {
      formValue.style.borderColor = "transparent";
    }
  }

  // зовём ранее созданную функцию
  calcValues();
});

//* КНОПКА РЕВЁРС
// По клику на неё навешиваем/снимаем класс active на саму кнопку Ревёрс (чтобы навесить на неё анимацию поворота) и на 2 колонки (чтоб махнуть местами инпуты внутри них (вверх/вниз))
btnReverse.addEventListener("click", () => {
  btnReverse.classList.toggle("active");

  allValuesColumn.forEach((valuesColumn) => {
    valuesColumn.classList.toggle("active");
  });
});
