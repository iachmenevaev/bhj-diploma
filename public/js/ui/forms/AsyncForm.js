/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
        
    if(!element){
      throw new error('Переданный элемент не существует!');
    }
    this.elementForm = element;
    this.registerEvents();
  }
  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.elementForm.addEventListener('submit',(e) =>{
      e.preventDefault();
      this.submit();
    })    
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
 const inputData = [... this.elementForm.querySelectorAll('input')];
//     inputData.forEach((current) => {
//       let dataObject = {};
//       dataObject[current.name] = current.value;
//       return dataObject;
//     },{}); 
//   }
    return  inputData.reduce((previous,key) =>{
      previous[key.name] = key.value;
      return previous;
    },{});
  }

  onSubmit( options ) {


  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    const nameForm = this.elementForm.closest('.modal').dataset.modalId;
    const data = App.getForm(nameForm).getData();
    this.onSubmit(data,nameForm);

  }
}

