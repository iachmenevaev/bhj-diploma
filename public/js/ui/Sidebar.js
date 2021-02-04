/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
     const sideBtn = document.querySelector('.visible-xs');
    sideBtn.addEventListener('touchend',() => {
      if (document.body.className.includes('sidebar-open') && document.body.className.includes('sidebar-collapse')) {
        document.body.classList.remove('sidebar-open');
        document.body.classList.remove('sidebar-collapse');}
      else {
    document.body.classList.add('sidebar-open');
    document.body.classList.add('sidebar-collapse');
     }
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
   const loginBtn = document.querySelector('.menu-item_login');
   const registBtn = document.querySelector('.menu-item_register');
   const logoutBtn = document.querySelector('.menu-item_logout');
   loginBtn.addEventListener('click',(e) =>{
   const modalWindow = App.getModal('login');
   modalWindow.open();
   })
   registBtn.addEventListener('click',(e) => {
    const modalWindow = App.getModal('register');
    modalWindow.open();
  })
  logoutBtn.addEventListener('click',(e) => {
    User.logout(User.current(),User.unsetCurrent)
    //дописать App.setState('init');
  })
 }
}
