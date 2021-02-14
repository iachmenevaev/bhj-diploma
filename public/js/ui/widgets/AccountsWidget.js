/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
   
    if(!element){
      throw new Error('Переданный элемент не существует!');
    }
    this.element = element;
    this.registerEvents()
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
     const createAccountElement = document.querySelector('.create-account');
     createAccountElement.addEventListener('click',(e) =>{
      e.stopPropagation();
      const createNewModal = App.getModal('newAccount');            
      createNewModal.open();
     });
 this.element.addEventListener('click', (e) =>{

      const currentElement = e.target;
      const account = currentElement.closest('.account');
      
      if (account && account.classList.contains('account')){
      this.onSelectAccount(currentElement);
      }
    });
  }
  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const isCurrentUser = User.current();
    if (!isCurrentUser) {
      return;
    }
    Account.list(isCurrentUser,(err,response) => {
        if (response.success){
          console.log(response);
          this.renderItem(response);     
        }
      })
 
    }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountArray = [...this.element.querySelectorAll('.account')];
    accountArray.forEach((element) =>
      element.remove()
    );
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if (!element) {
      return;
    }
    const currentAccount = element.closest('.account');
    const accounts = [...element
        .closest('.accounts-panel')
        .querySelectorAll('.account')];
    accounts.forEach((account) => account.classList.remove('active'));
    const parent = element.closest('.account');
    parent.classList.add('active');
    App.showPage( 'transactions', { account_id: currentAccount.dataset.accountId });
  }
  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    return `<li class ="account" data-account-id=${item.id}>
    <a href =#>
    <span>${item.name}</span>/
    <span>${item.sum}₽</span>
    </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    if(item.success){
      this.clear();
    }
    let accountArr = item.data;
    const accountContainer = document.querySelector('.accounts-panel > li');
    console.log(accountContainer);
    let template = accountArr.map((account) => this.getAccountHTML(account)).join('  ');
    accountContainer.insertAdjacentHTML('afterend',template);
  }
}

