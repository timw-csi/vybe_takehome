import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sidenav">
      <ul>
        <li>
          <Link to="/marketCap">Market Cap Distribution</Link>
        </li>
        <li>
          <Link to="/tps">Transactions Per Second</Link>
        </li>
        <li>
          <Link to="/balances">Wallet Balances</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
