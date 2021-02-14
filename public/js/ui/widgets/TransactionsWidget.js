/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
this.element = element;
if(!element){
  throw new error('Переданный элемент не существует!');
  }
  this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const transactionBox = document.querySelector('.transactions-panel');
    transactionBox.addEventListener('click',(e) => {
      const currentTarget = e.target;
      if(currentTarget.classList.contains('create-income-button')){
        const modalWindow = App.getModal('newIncome');
        modalWindow.open();
      }
      else if (currentTarget.classList.contains('create-expense-button')){
        const modalWindow = App.getModal('newExpense');
        modalWindow.open();
      }
    })
  }
}
