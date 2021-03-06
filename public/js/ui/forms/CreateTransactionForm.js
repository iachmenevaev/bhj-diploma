/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.element = element;
    if (!element){
      throw new error('Элемент не передан!');
    }
   this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (err,data) => {
      if(data.success){
        const selectElement = this.element.querySelector('select');
        // const optionElement = [...selectElement.querySelectorAll('option')];
        selectElement.innerHTML = ''
        // optionElement.forEach((option) => option.remove());
        selectElement.insertAdjacentHTML('afterbegin', data.data.map((item) => `<option value="${item.id}">${item.name}</option>`).join(' '));
     }
   })
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    const typeForm = this.element.closest('.modal').dataset.modalId;
    Transaction.create(options,(err,response) =>{
      if (response.success){
        console.log(options);
        App.update();
        this.element.reset();
       App.modals[typeForm].close();
       }
    })
  }
}
