import './NavTab.css';

function NavTab() {
  return (
    <header className='navtab'>
      <ul className='navtab__nav'>
        <li>
          <a href='#aboutproject' className='navtab__link link'>
            О проекте
          </a>
        </li>
        <li>
          <a href='#techs' className='navtab__link link'>
            Технологии
          </a>
        </li>
        <li>
          <a href='#aboutme' className='navtab__link link'>
            Студент
          </a>
        </li>
      </ul>
    </header>
  );
}

export default NavTab;
