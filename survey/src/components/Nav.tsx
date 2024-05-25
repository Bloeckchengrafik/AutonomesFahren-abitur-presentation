import {LOCALE} from "@/lib/locales.ts";

function Nav() {
  return (
    <nav className="flex-0 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-2xl font-bold">{LOCALE["title"]}</h1>
    </nav>
  );
}

export default Nav;
