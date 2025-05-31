import './Navbar.css';
import { Home, Pencil, KeyRound, Mail } from 'lucide-react';

function Navbar(){
    return(
        <nav className="Navbar">
            <ul className="ul">
                <li className="title">Sketchy Business</li>
                <li className="li"><a href="/home" className="a"><Home size={25} color="#F0EFEB" strokeWidth={1.5} />Home</a></li>
                <li className="li"><a href="/drawings" className="a"><Pencil size={25} color="#F0EFEB" strokeWidth={1.5} />Drawings</a></li>
                <li className="li"><a href="/loginpage" className="a"><KeyRound size={25} color="#F0EFEB" strokeWidth={1.5} />Login</a></li>
                <li className="li"><a href="#" className="a"><Mail size={25} color="#F0EFEB" strokeWidth={1.5} />Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar