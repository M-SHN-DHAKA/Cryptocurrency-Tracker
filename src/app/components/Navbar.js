import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          CryptoTracker
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;