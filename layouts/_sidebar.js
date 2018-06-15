import Link from 'next/link'
import { Nav } from 'react-bootstrap';

export default () => {
  return (
    <Nav className="nav-sidebar">
      <li>
        <Link href="/">Dashboard</Link>
      </li>
      <li>
        <Link href="/aggregation">Aggregation</Link>
      </li>
    </Nav>
  );
};
