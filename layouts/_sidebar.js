import Link from 'next/link'

export default () => {
  return (
    <ul className="nav-sidebar nav">
      <li>
        <Link href="/"><a>Dashboard</a></Link>
      </li>
      <li>
        <Link href="/aggregation"><a>Aggregation</a></Link>
      </li>
    </ul>
  );
};
